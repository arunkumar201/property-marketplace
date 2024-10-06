import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(_request: NextRequest) {
	return NextResponse.json({ msg: `Hello from server on -${new Date()} ` });
}
