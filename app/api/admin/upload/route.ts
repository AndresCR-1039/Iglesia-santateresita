import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as string || "media";

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

    // Usamos el service_role para saltar RLS y poder subir archivos sin que el usuario 
    // esté logueado en Supabase Auth (ya que usamos nuestro propio JWT)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Generar un nombre de archivo único
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Subir el archivo
    const { data, error } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      // Si el error es que el bucket no existe, intentamos avisar
      if (error.message.includes("not found")) {
        return NextResponse.json({ 
          error: `El bucket '${bucket}' no existe en Supabase. Por favor, créalo en el Dashboard.` 
        }, { status: 404 });
      }
      throw error;
    }

    // Obtener la URL pública
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return NextResponse.json({ url: publicUrl });
  } catch (error: any) {
    console.error("Error en upload:", error);
    return NextResponse.json({ error: error.message || "Error al subir archivo" }, { status: 500 });
  }
}
