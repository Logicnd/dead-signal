import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ARCHIVE_COOKIE_NAME,
  SEALED_COOKIE_NAME,
  getSessionCookieValue,
  hasObserverAccess,
  validateObserverPhrase,
} from "@/lib/auth";
import { OBSERVER_DENIAL_RESPONSES } from "@/lib/arg-content";

function getDenialResponse() {
  return OBSERVER_DENIAL_RESPONSES[
    Math.floor(Math.random() * OBSERVER_DENIAL_RESPONSES.length)
  ];
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const stageTwoOpen = hasObserverAccess(
    cookieStore.get(ARCHIVE_COOKIE_NAME)?.value,
  );

  if (!stageTwoOpen) {
    return NextResponse.json(
      {
        ok: false,
        message: "secondary seal required.",
      },
      {
        status: 403,
      },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { checksum?: unknown }
    | null;
  const checksum =
    typeof body?.checksum === "string" ? body.checksum : "";

  if (!validateObserverPhrase(checksum)) {
    return NextResponse.json(
      {
        ok: false,
        message: getDenialResponse(),
      },
      {
        status: 401,
      },
    );
  }

  const response = NextResponse.json({
    ok: true,
    message: "final checksum accepted.",
    redirect: "/sealed",
  });

  response.cookies.set({
    name: SEALED_COOKIE_NAME,
    value: getSessionCookieValue("sealed"),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 6,
  });

  return response;
}
