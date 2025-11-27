#!/bin/bash
# Backup completo para migración de MBP → Acer
# Ejecutar desde la raíz del proyecto: ./backup.sh

set -e

BACKUP_DIR="$HOME/Desktop/gsc-inmobiliaria-backup-$(date +%Y%m%d-%H%M%S)"
PROJECT_DIR="$(pwd)"

echo "🚀 Iniciando backup completo..."
echo "📂 Destino: $BACKUP_DIR"

mkdir -p "$BACKUP_DIR"

# 1. Código fuente (Git)
echo ""
echo "1️⃣  Empaquetando código fuente..."
git bundle create "$BACKUP_DIR/gsc-inmobiliaria.bundle" --all
echo "   ✅ Git bundle creado (incluye todas las ramas y commits)"

# 2. Archivos no versionados pero necesarios
echo ""
echo "2️⃣  Copiando archivos de configuración..."
cp .env "$BACKUP_DIR/.env" 2>/dev/null || echo "   ⚠️  No se encontró .env (usar .env.example en destino)"
cp .env.example "$BACKUP_DIR/.env.example"
echo "   ✅ Configuración respaldada"

# 3. Base de datos Postgres
echo ""
echo "3️⃣  Respaldando base de datos Postgres..."
if docker ps | grep -q postgres; then
    docker exec gsc-inmobiliaria-postgres-1 pg_dumpall -U gsc > "$BACKUP_DIR/postgres-dump.sql"
    echo "   ✅ Dump de Postgres creado"
else
    echo "   ⚠️  Contenedor de Postgres no está corriendo"
    echo "   💡 Si necesitas los datos, ejecuta: docker compose up -d postgres"
fi

# 4. Archivos de Strapi (uploads, configuración generada)
echo ""
echo "4️⃣  Respaldando archivos de Strapi..."
if [ -d "$PROJECT_DIR/apps/cms/public/uploads" ]; then
    mkdir -p "$BACKUP_DIR/strapi-uploads"
    cp -r "$PROJECT_DIR/apps/cms/public/uploads" "$BACKUP_DIR/strapi-uploads/"
    echo "   ✅ Uploads de Strapi respaldados"
else
    echo "   ℹ️  No hay uploads en Strapi aún"
fi

# Configuración generada de Strapi
if [ -d "$PROJECT_DIR/apps/cms/.tmp" ]; then
    cp -r "$PROJECT_DIR/apps/cms/.tmp" "$BACKUP_DIR/strapi-tmp"
fi

# 5. Volúmenes de Docker (postgres-data como fallback)
echo ""
echo "5️⃣  Respaldando volúmenes de Docker..."
if [ -d "$PROJECT_DIR/postgres-data" ]; then
    tar -czf "$BACKUP_DIR/postgres-data.tar.gz" -C "$PROJECT_DIR" postgres-data
    echo "   ✅ postgres-data empaquetado"
else
    echo "   ℹ️  No existe carpeta postgres-data local"
fi

# 6. Crear archivo README con instrucciones de restauración
echo ""
echo "6️⃣  Generando instrucciones de restauración..."
cat > "$BACKUP_DIR/RESTORE.md" << 'EOF'
# Restauración en Notebook Acer

## Prerrequisitos
- Git
- Node.js 18+ y npm
- Docker + Docker Compose

## Pasos de restauración

### 1. Restaurar código fuente
```bash
# Crear directorio del proyecto
mkdir -p ~/Developer/Projects/gsc-inmobiliaria
cd ~/Developer/Projects/gsc-inmobiliaria

# Clonar desde bundle
git clone gsc-inmobiliaria.bundle .
git remote remove origin  # Remover referencia al bundle
# git remote add origin <tu-repo-remoto>  # Opcional: reconectar a GitHub
```

### 2. Configurar variables de entorno
```bash
# Copiar archivo de configuración
cp .env.example .env

# Si respaldaste tu .env original:
# cp ruta/al/backup/.env .env

# Editar y verificar valores (especialmente secretos de Strapi)
nano .env
```

### 3. Restaurar base de datos Postgres
```bash
# Opción A: Desde dump SQL (recomendado)
docker compose up -d postgres
sleep 5
cat postgres-dump.sql | docker exec -i gsc-inmobiliaria-postgres-1 psql -U gsc

# Opción B: Desde volumen (si postgres-dump.sql no existe)
tar -xzf postgres-data.tar.gz -C .
# Luego: docker compose up -d
```

### 4. Restaurar archivos de Strapi
```bash
# Si hay uploads respaldados
mkdir -p apps/cms/public/uploads
cp -r strapi-uploads/uploads/* apps/cms/public/uploads/

# Restaurar .tmp si existe
if [ -d strapi-tmp ]; then
    cp -r strapi-tmp apps/cms/.tmp
fi
```

### 5. Instalar dependencias
```bash
# Desde la raíz del proyecto
npm install

# O por separado
cd apps/web && npm install
cd ../cms && npm install
```

### 6. Levantar servicios
```bash
# Desde la raíz
docker compose up -d

# Verificar Strapi en http://localhost:1337
# Si es primera vez, crear usuario admin

# Levantar web (en otra terminal)
cd apps/web
npm run dev

# Verificar en http://localhost:3000
```

### 7. Verificación
- [ ] Postgres corriendo: `docker ps`
- [ ] Strapi responde en http://localhost:1337/admin
- [ ] Web app en http://localhost:3000
- [ ] Datos de propiedades visibles
- [ ] Imágenes cargando correctamente

## Troubleshooting

### Strapi no arranca
```bash
# Reconstruir contenedor
docker compose down
docker compose up --build -d strapi
docker compose logs -f strapi
```

### Permisos en Linux/Acer
```bash
# Ajustar ownership si es necesario
sudo chown -R $USER:$USER apps/cms
```

### Regenerar secretos de Strapi
Si no respaldaste .env, genera nuevos secretos:
```bash
# En Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Notas
- El backup fue creado en: $(date)
- Plataforma origen: MacOS (MBP)
- Plataforma destino: Linux/Windows (Acer notebook)
EOF

# 7. Crear checksum para verificar integridad
echo ""
echo "7️⃣  Generando checksums..."
(cd "$BACKUP_DIR" && shasum -a 256 * > checksums.txt)
echo "   ✅ Checksums creados"

# 8. Resumen final
echo ""
echo "=========================================="
echo "✅ BACKUP COMPLETO"
echo "=========================================="
echo "📦 Ubicación: $BACKUP_DIR"
echo ""
echo "📋 Contenido:"
ls -lh "$BACKUP_DIR"
echo ""
echo "📊 Tamaño total:"
du -sh "$BACKUP_DIR"
echo ""
echo "🎯 Próximos pasos:"
echo "   1. Copiar $BACKUP_DIR a USB/disco externo"
echo "   2. Transferir a Acer notebook"
echo "   3. Seguir instrucciones en RESTORE.md"
echo ""
echo "💡 Opcional: Comprimir todo el backup:"
echo "   tar -czf gsc-backup.tar.gz -C ~/Desktop $(basename $BACKUP_DIR)"
echo "=========================================="
