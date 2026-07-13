const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Leer .env.local manualmente para evitar la dependencia de dotenv
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach(line => {
      const parts = line.split('=');
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const value = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
        if (key && !key.startsWith('#')) {
          process.env[key] = value;
        }
      }
    });
  }
}

async function createBuckets() {
  loadEnv();

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Faltan variables de entorno en .env.local');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  const buckets = ['noticias', 'sermones'];

  for (const bucketName of buckets) {
    console.log(`Intentando crear/verificar el bucket: ${bucketName}...`);
    
    // Intentar crear el bucket
    const { data, error } = await supabase.storage.createBucket(bucketName, {
      public: true, // Permitir acceso público de lectura
    });

    if (error) {
      if (error.message.includes('already exists')) {
        console.log(`El bucket '${bucketName}' ya existe.`);
      } else {
        console.error(`Error al crear el bucket '${bucketName}':`, error.message);
      }
    } else {
      console.log(`¡Bucket '${bucketName}' creado con éxito!`);
    }

    // Configurar políticas de acceso público (aunque 'public: true' suele ser suficiente para lectura)
    // Para escritura, usamos el service_role que ya salta RLS.
  }
}

createBuckets();
