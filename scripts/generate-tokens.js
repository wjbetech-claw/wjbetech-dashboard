const fs = require('fs')
const path = require('path')
const tokensPath = path.join(__dirname, '..', 'design', 'tokens.json')
const outCss = path.join(__dirname, '..', 'src', 'styles', 'tokens.generated.css')
const outTailwind = path.join(__dirname, '..', 'design', 'tailwind.tokens.js')

const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf8'))
const { themes, shared } = tokens

function toCssVars(obj, prefix=''){
  const lines = []
  for(const k of Object.keys(obj)){
    const v = obj[k]
    if(typeof v === 'object'){
      lines.push(...toCssVars(v, prefix ? prefix + '-' + k : k))
    } else {
      const name = `--${(prefix?prefix+'-':'')+k}`
      lines.push(`${name}: ${v};`)
    }
  }
  return lines
}

// build :root (light)
const light = themes.light.color
const dark = themes.dark.color
let css = '/* Auto-generated from design/tokens.json — do not edit by hand */\n'
css += ':root {\n'
css += toCssVars(light).map(l=>'  '+l).join('\n') + '\n'
// shared tokens
css += '  /* shared */\n'
if(shared.radius) css += toCssVars(shared.radius,'radius').map(l=>'  '+l).join('\n') + '\n'
if(shared.spacing) css += toCssVars(shared.spacing,'spacing').map(l=>'  '+l).join('\n') + '\n'
if(shared.font) css += toCssVars(shared.font,'font').map(l=>'  '+l).join('\n') + '\n'
if(shared.shadow) css += toCssVars(shared.shadow,'shadow').map(l=>'  '+l).join('\n') + '\n'
css += '}\n\n'

css += 'html[data-theme="dark"] {\n'
css += toCssVars(dark).map(l=>'  '+l).join('\n') + '\n'
css += '}\n'

fs.writeFileSync(outCss, css)
console.log('Wrote', outCss)

// write tailwind tokens (light defaults)
const tailwind = {
  colors: light,
  spacing: shared.spacing || {},
  radius: shared.radius || {},
  font: shared.font || {},
}
fs.writeFileSync(outTailwind, 'module.exports = ' + JSON.stringify(tailwind, null, 2) + '\n')
console.log('Wrote', outTailwind)
