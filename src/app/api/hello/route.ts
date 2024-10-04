import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	return NextResponse.json({ msg: `Hello from server on -${new Date()} ` });
}
