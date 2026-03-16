import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ACCESS_COOKIE_NAME, hasArchiveAccess } from "@/lib/auth";
import { HANDSHAKE_PAYLOAD } from "@/lib/arg-content";

export async function GET() {
  const cookieStore = await cookies();
  const stageOneOpen = hasArchiveAccess(
    cookieStore.get(ACCESS_COOKIE_NAME)?.value,
  );

  if (!stageOneOpen) {
    return NextResponse.json(
      {
        status: "sealed",
        note: "first seal required",
      },
      {
        status: 403,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return NextResponse.json(HANDSHAKE_PAYLOAD, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
