import { NextResponse } from "next/server"

export async function GET(request: Request) {
  return NextResponse.redirect(new URL("/contracts", request.url))
}
