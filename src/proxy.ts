import jwt from "jsonwebtoken";
import { paths } from "./constants/paths";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function proxy(req: Request) {
  const url = new URL(req.url);

  
  if (url.pathname === paths.login || url.pathname === paths.refresh) {
    return;
  }

  if (url.pathname.startsWith(paths.base)) {
    try {
      let token: string | undefined;

      
      const cookieHeader = req.headers.get("cookie") || "";
      const match = cookieHeader.match(/access_token=([^;]+)/);
      token = match?.[1];

      
      if (!token) {
        const authHeader = req.headers.get("authorization");
        token = authHeader?.split(" ")[1];
      }

      if (!token) throw new Error("Solicitud no válida");

      
      jwt.verify(token, JWT_SECRET);
    } catch (err) {
      return new Response(
        JSON.stringify({ error: "No autorizado" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  }


  return;
}
