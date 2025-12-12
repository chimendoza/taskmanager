import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    
    const name = req.nextUrl.searchParams.get("name") || "";

    
    const users = await prisma.user.findMany({
      where: {
        name: {
          contains: name,
          
        },
      },
      orderBy: {
        created: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "No se pudieron cargar los usuarios" },
      { status: 500 }
    );
  }
}
