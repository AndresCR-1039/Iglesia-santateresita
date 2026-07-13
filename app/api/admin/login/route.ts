import { NextResponse } from "next/server";
import { signJWT } from "@/lib/auth-jwt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const adminUser = process.env.ADMIN_USER;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminUser && password === adminPassword) {
      const token = await signJWT({ email, role: "admin" });

      const response = NextResponse.json(
        { message: "Login successful" },
        { status: 200 }
      );

      // Set auth cookie
      response.cookies.set("admin_session", token, {
        httpOnly: true,
        secure: false, // Cambiado a false para evitar problemas en IP local sin HTTPS
        sameSite: "lax",
        maxAge: 60 * 60 * 24, // 24 hours
        path: "/",
      });

      return response;
    }

    return NextResponse.json(
      { error: "Credenciales inválidas" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}
