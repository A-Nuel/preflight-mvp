const fs = require('fs');
let html = fs.readFileSync('../stitch_ui_designs/stitch_project_initiation/decision_intelligence_dashboard_v3_flagship/code.html', 'utf8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if(bodyMatch) {
  let bodyContent = bodyMatch[1];
  
  bodyContent = bodyContent.replace(/class=/g, 'className=');
  bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
  bodyContent = bodyContent.replace(/<img([^>]*[^/])>/g, '<img$1 />');
  bodyContent = bodyContent.replace(/<input([^>]*[^/])>/g, '<input$1 />');
  bodyContent = bodyContent.replace(/<br([^>]*[^/])>/g, '<br$1 />');
  bodyContent = bodyContent.replace(/<hr([^>]*[^/])>/g, '<hr$1 />');
  
  // Clean up SVGs which might have self closing issues or camelCase issues in React
  bodyContent = bodyContent.replace(/stroke-width/g, 'strokeWidth');
  bodyContent = bodyContent.replace(/stroke-linecap/g, 'strokeLinecap');
  bodyContent = bodyContent.replace(/stroke-dasharray/g, 'strokeDasharray');
  bodyContent = bodyContent.replace(/stroke-dashoffset/g, 'strokeDashoffset');
  bodyContent = bodyContent.replace(/stroke-linejoin/g, 'strokeLinejoin');
  bodyContent = bodyContent.replace(/fill-rule/g, 'fillRule');
  bodyContent = bodyContent.replace(/clip-rule/g, 'clipRule');
  bodyContent = bodyContent.replace(/viewbox/gi, 'viewBox');
  bodyContent = bodyContent.replace(/style="([^"]*)"/g, (match, p1) => {
    // very basic inline style to object converter for known properties
    let styleObj = {};
    p1.split(';').forEach(s => {
      let parts = s.split(':');
      if (parts.length === 2) {
        let key = parts[0].trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        let val = parts[1].trim();
        styleObj[key] = val;
      }
    });
    return `style={${JSON.stringify(styleObj)}}`;
  });
  
  fs.writeFileSync('temp_dashboard.tsx', bodyContent);
  console.log('Done converting to temp_dashboard.tsx');
}
