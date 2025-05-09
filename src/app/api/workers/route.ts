import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const workers = await prisma.worker.findMany();
  return NextResponse.json(workers);
}
