const { Project } = require('ts-morph');
const fs=require('fs');
const proj=new Project({tsConfigFilePath:'tsconfig.json'});
const sourceFiles=proj.getSourceFiles().filter(sf=>sf.getFilePath().includes('/src/'));
const inbound=new Map();
sourceFiles.forEach(sf=>inbound.set(sf.getFilePath(),0));
sourceFiles.forEach(sf=>{
  const imports=sf.getImportDeclarations().map(d=>d.getModuleSpecifierValue());
  imports.forEach(mod=>{
    try{
      let resolved=null;
      if(mod.startsWith('.')||mod.startsWith('/')){
        const base = sf.getDirectory().getPath()+"/"+mod.replace(/\.(js|ts)x?$/,'')
        resolved=proj.getSourceFile(base+'.ts') || proj.getSourceFile(base+'.tsx') || proj.getSourceFile(base+'.js') || proj.getSourceFile(base+'.jsx')
      } else {
        resolved=proj.getSourceFile(mod)
      }
      if(resolved){ inbound.set(resolved.getFilePath(), (inbound.get(resolved.getFilePath())||0)+1) }
    }catch(e){}
  })
});
const orphans=[];
inbound.forEach((cnt,path)=>{
  if(cnt===0 && !/\.test\.(ts|tsx)$/.test(path) && !/index\.(ts|tsx)$/.test(path)) orphans.push(path)
});
fs.writeFileSync('reports/tsmorph-orphans.json', JSON.stringify(orphans, null, 2));
console.log('done', orphans.length);
