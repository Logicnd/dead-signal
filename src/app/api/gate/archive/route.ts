import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  ARCHIVE_COOKIE_NAME,
  getSessionCookieValue,
  hasArchiveAccess,
  validateArchivePhrase,
} from "@/lib/auth";
import { ARCHIVE_DENIAL_RESPONSES } from "@/lib/arg-content";

function getDenialResponse() {
  return ARCHIVE_DENIAL_RESPONSES[
    Math.floor(Math.random() * ARCHIVE_DENIAL_RESPONSES.length)
  ];
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const stageOneOpen = hasArchiveAccess(
    cookieStore.get(ACCESS_COOKIE_NAME)?.value,
  );

  if (!stageOneOpen) {
    return NextResponse.json(
      {
        ok: false,
        message: "first seal required.",
      },
      {
        status: 403,
      },
    );
  }

  const body = (await request.json().catch(() => null)) as
    | { phrase?: unknown }
    | null;
  const phrase = typeof body?.phrase === "string" ? body.phrase : "";

  if (!validateArchivePhrase(phrase)) {
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
    message: "secondary seal opened.",
    redirect: "/observer",
  });

  response.cookies.set({
    name: ARCHIVE_COOKIE_NAME,
    value: getSessionCookieValue("observer"),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 6,
  });

  return response;
}
