import { NextResponse } from "next/server";
import { TRANSMISSION_PAYLOAD } from "@/lib/arg-content";

export function GET() {
  return NextResponse.json(TRANSMISSION_PAYLOAD, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
