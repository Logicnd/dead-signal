import { NextResponse } from "next/server";
import {
  ACCESS_COOKIE_NAME,
  getSessionCookieValue,
  validateAccessKey,
} from "@/lib/auth";
import { ACCESS_DENIAL_RESPONSES } from "@/lib/arg-content";

function getDenialResponse() {
  return ACCESS_DENIAL_RESPONSES[
    Math.floor(Math.random() * ACCESS_DENIAL_RESPONSES.length)
  ];
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { accessKey?: unknown }
    | null;

  const accessKey =
    typeof body?.accessKey === "string" ? body.accessKey : "";

  if (!validateAccessKey(accessKey)) {
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
    message: "access granted.",
    redirect: "/archive",
  });

  response.cookies.set({
    name: ACCESS_COOKIE_NAME,
    value: getSessionCookieValue("archive"),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 6,
  });

  return response;
}
