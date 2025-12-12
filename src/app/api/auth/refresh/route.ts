
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return NextResponse.json(
        { error: "Refresh token no proporcionado" },
        { status: 400 }
      );
    }

    
    let payload: any;
    try {
      payload = jwt.verify(refreshToken, REFRESH_SECRET);
    } catch {
      return NextResponse.json(
        { error: "Refresh token inválido" },
        { status: 401 }
      );
    }

    
    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user || user.token !== refreshToken) {
      return NextResponse.json(
        { error: "Refresh token no coincide" },
        { status: 401 }
      );
    }

    const newAccessToken = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    const newRefreshToken = jwt.sign(
      { id: user.id, username: user.username },
      REFRESH_SECRET,
      { expiresIn: "7d" }
    );


    await prisma.user.update({
      where: { id: user.id },
      data: { token: newRefreshToken },
    });

    return NextResponse.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error refrescando token" },
      { status: 500 }
    );
  }
}
