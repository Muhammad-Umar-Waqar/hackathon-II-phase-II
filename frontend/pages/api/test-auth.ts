import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Test 1: Check if auth module loads
    const { auth } = await import("../../../lib/auth");

    // Test 2: Check if auth object exists
    if (!auth) {
      return res.status(500).json({ error: "Auth object is null" });
    }

    // Test 3: Check if handler exists
    if (!auth.handler) {
      return res.status(500).json({ error: "Auth handler is missing" });
    }

    // Test 4: Check environment variables
    const envCheck = {
      DATABASE_URL: !!process.env.DATABASE_URL,
      BETTER_AUTH_SECRET: !!process.env.BETTER_AUTH_SECRET,
      BETTER_AUTH_URL: !!process.env.BETTER_AUTH_URL,
    };

    res.status(200).json({
      status: "OK",
      message: "Better Auth is initialized correctly",
      env: envCheck,
      authType: typeof auth,
      hasHandler: typeof auth.handler,
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to initialize Better Auth",
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}
