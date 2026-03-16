import { NextResponse } from "next/server";
import { SYSTEM_STATUS_PAYLOAD } from "@/lib/arg-content";

export function GET() {
  return NextResponse.json(SYSTEM_STATUS_PAYLOAD, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
