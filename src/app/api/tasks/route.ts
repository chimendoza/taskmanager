import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const tasks = await prisma.task.findMany({ orderBy: { created: "desc" } });
    return NextResponse.json(tasks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudieron cargar las tareas" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title) throw new Error("Falta el título de la tarea");

    const task = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description || "",
        status: body.status || "pending",
        userId: 1,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo crear la tarea", message: error }, { status: 400 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    if (!id || !status) throw new Error("Faltan datos para actualizar la tarea");

    const task = await prisma.task.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(task);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo actualizar la tarea", message: error }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;
    if (!id) throw new Error("Falta el id de la tarea");

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ message: "Tarea eliminada" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudo eliminar la tarea", message: error }, { status: 400 });
  }
}


