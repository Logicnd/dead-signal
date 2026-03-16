import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ARCHIVE_COOKIE_NAME, hasObserverAccess } from "@/lib/auth";
import { OBSERVER_REPORT_PAYLOAD } from "@/lib/arg-content";

export async function GET() {
  const cookieStore = await cookies();
  const stageTwoOpen = hasObserverAccess(
    cookieStore.get(ARCHIVE_COOKIE_NAME)?.value,
  );

  if (!stageTwoOpen) {
    return NextResponse.json(
      {
        status: "sealed",
        note: "secondary seal required",
      },
      {
        status: 403,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }

  return NextResponse.json(OBSERVER_REPORT_PAYLOAD, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
