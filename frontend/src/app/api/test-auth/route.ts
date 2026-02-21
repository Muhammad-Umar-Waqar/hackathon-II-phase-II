import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Test if Better Auth is configured
    const { auth } = await import("@/lib/auth");

    return NextResponse.json({
      status: "ok",
      message: "Better Auth is configured",
      hasHandler: typeof auth.handler === "function",
    });
  } catch (error: any) {
    return NextResponse.json({
      status: "error",
      message: error.message,
      stack: error.stack,
    }, { status: 500 });
  }
}
