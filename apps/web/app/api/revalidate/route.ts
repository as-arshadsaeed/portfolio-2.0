import { NextRequest, NextResponse } from "next/server";
import { sanityRevalidateSchema } from "@portfolio/schemas/webhook/sanity-revalidate";
import { revalidateHandlers } from "@/lib/webhooks/revalidate-handlers";
import { logger } from "@portfolio/logger";

export async function POST(req: NextRequest) {
  try {
    const secret = req.headers.get("x-webhook-secret");

    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json(
        { revalidated: false, message: "Invalid secret" },
        { status: 401 },
      );
    }

    const json = await req.json();

    const parsed = sanityRevalidateSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { revalidated: false, error: "Invalid payload" },
        { status: 400 },
      );
    }

    const { _type } = parsed.data;

    const handler = revalidateHandlers[_type];

    if (handler) {
      handler(parsed.data);
    }

    return NextResponse.json({
      revalidated: true,
      type: _type,
      now: Date.now(),
    });
  } catch (error) {
    logger.error("Revalidation error:", error);

    return NextResponse.json(
      {
        revalidated: false,
        error: "Internal server error",
      },
      { status: 500 },
    );
  }
}
