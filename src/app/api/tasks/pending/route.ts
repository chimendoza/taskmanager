import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const pendingCount = await prisma.task.count({
      where: { status: "pending" },
    });

    return NextResponse.json({ pending: pendingCount });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error contando tareas pendientes" }, { status: 500 });
  }
}
