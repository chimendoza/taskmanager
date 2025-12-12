import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";

async function main() {


  const hashedPassword = await bcrypt.hash("admin123", 10);


  const existingAdmin = await prisma.user.findUnique({
    where: { username: "admin" },
  });

  if (!existingAdmin) {
    
    await prisma.user.create({
      data: {
        name: "Admin",
        username: "admin",
        password: hashedPassword,
        token: null,
      },
    });
    console.log("Usuario Admin creado");
  } 

  const existingEditor = await prisma.user.findUnique({
    where: { username: "editor" },
  });


    if (!existingEditor) {
    
    await prisma.user.create({
      data: {
        name: "Editor",
        username: "editor",
        password: hashedPassword,
        token: null,
      },
    });
    console.log("Usuario Editor creado");
  } 



}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
