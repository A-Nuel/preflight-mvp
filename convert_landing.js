const fs = require('fs');

const path = 'C:/Users/Hp/.gemini/antigravity/scratch/thi pj 2/stitch_ui_designs/stitch_project_initiation/preflight_ai_command_center_v2_redesign/code.html';
let html = fs.readFileSync(path, 'utf8');

const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if(bodyMatch) {
  let bodyContent = bodyMatch[1];
  
  // Basic React HTML-to-JSX conversions
  bodyContent = bodyContent.replace(/class=/g, 'className=');
  bodyContent = bodyContent.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');
  bodyContent = bodyContent.replace(/<img([^>]*[^/])>/g, '<img$1 />');
  bodyContent = bodyContent.replace(/<input([^>]*[^/])>/g, '<input$1 />');
  bodyContent = bodyContent.replace(/<br([^>]*[^/])>/g, '<br$1 />');
  bodyContent = bodyContent.replace(/<hr([^>]*[^/])>/g, '<hr$1 />');
  
  // Remove style attributes for now to avoid React style object errors
  bodyContent = bodyContent.replace(/style="[^"]*"/g, '');
  
  // Convert standard anchor tags to Next.js Links
  bodyContent = bodyContent.replace(/<a /g, '<Link ');
  bodyContent = bodyContent.replace(/<\/a>/g, '</Link>');
  // Default hrefs to #
  bodyContent = bodyContent.replace(/href=""/g, 'href="#"');
  
  // Replace Lucide icons or material-symbols with spans or keep them as spans since they are importing Google Fonts
  // Actually, the original uses <span className="material-symbols-outlined">...</span>. React allows this perfectly.

  const component = `import Link from "next/link";\n\nexport default function Home() {\n  return (\n    <div className="min-h-screen relative overflow-x-hidden flex flex-col bg-[#040509] text-[#e5e1e4]">\n${bodyContent}\n    </div>\n  );\n}`;
  
  fs.writeFileSync('C:/Users/Hp/.gemini/antigravity/scratch/thi pj 2/preflight/src/app/page.tsx', component);
  console.log('Successfully converted landing page!');
} else {
  console.log('Body tag not found!');
}
