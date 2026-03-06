const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

async function processImage(srcPath, outDir){
  const ext = path.extname(srcPath)
  const base = path.basename(srcPath, ext)
  const outWebp = path.join(outDir, base + '.webp')
  const outAvif = path.join(outDir, base + '.avif')
  try{
    await sharp(srcPath).resize({ width: 1200 }).toFile(outWebp)
    await sharp(srcPath).resize({ width: 1200 }).toFile(outAvif)
    console.log('optimized', srcPath)
  }catch(e){
    console.error('failed', srcPath, e)
  }
}

async function walk(dir, outDir){
  const items = fs.readdirSync(dir)
  for(const it of items){
    const p = path.join(dir, it)
    const stat = fs.statSync(p)
    if(stat.isDirectory()){
      await walk(p, outDir)
    } else if(/\.(png|jpg|jpeg)$/i.test(p)){
      await processImage(p, outDir)
    }
  }
}

async function main(){
  const src = path.join(process.cwd(), 'public')
  const out = path.join(process.cwd(), 'public', 'optimized')
  if(!fs.existsSync(out)) fs.mkdirSync(out, { recursive: true })
  await walk(src, out)
}

main().catch(e=>{ console.error(e); process.exit(1) })
