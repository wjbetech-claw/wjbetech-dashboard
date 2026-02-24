const fs = require('fs'); const path = require('path');
const tokensPath = path.join(__dirname, '..', 'design', 'tokens.json');
const outCss = path.join(__dirname, '..', 'src', 'styles', 'tokens.generated.css');
const outTailwind = path.join(__dirname, '..', 'design', 'tailwind.tokens.js');
const tokens = JSON.parse(fs.readFileSync(tokensPath,'utf8'));
let themes = tokens.themes;
let shared = tokens.shared;
if(!themes){ // adapt flat format
  themes = { light: { color: tokens.color || {} }, dark: { color: tokens.color || {} } };
  shared = { radius: tokens.radius || {}, spacing: tokens.spacing || {}, font: tokens.font || {}, shadow: tokens.shadow || {} };
}
function toCssVars(obj,prefix=''){
  const lines=[];
  for(const k of Object.keys(obj)){
    const v = obj[k];
    if(typeof v === 'object') lines.push(...toCssVars(v, prefix? prefix+'-'+k: k));
    else lines.push(`--${prefix?prefix+'-':''}${k}: ${v};`);
  }
  return lines;
}
const light = themes.light.color; const dark = themes.dark.color;
let css='/* Auto-generated */\n:root{\n'+toCssVars(light).map(l=>'  '+l).join('\n')+'\n';
css += toCssVars(shared.radius,'radius').map(l=>'  '+l).join('\n') + '\n';
css += toCssVars(shared.spacing,'spacing').map(l=>'  '+l).join('\n') + '\n';
css += toCssVars(shared.font,'font').map(l=>'  '+l).join('\n') + '\n';
css += toCssVars(shared.shadow,'shadow').map(l=>'  '+l).join('\n') + '\n';
css += '}\n\n';
css += 'html[data-theme="dark"]{\n'+toCssVars(dark).map(l=>'  '+l).join('\n')+'\n}\n';
fs.writeFileSync(outCss,css);
fs.writeFileSync(outTailwind,'module.exports = '+JSON.stringify({colors: light, spacing: shared.spacing, radius: shared.radius, font: shared.font},null,2)+"\n");
console.log('generated tokens')
