const fs = require('fs');

const path = 'C:/Users/Hp/.gemini/antigravity/scratch/thi pj 2/stitch_ui_designs/stitch_project_initiation/new_decision_analysis_dark_variation/code.html';
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
  bodyContent = bodyContent.replace(/style="[^"]*"/g, '');
  
  bodyContent = bodyContent.replace(/<a /g, '<Link ');
  bodyContent = bodyContent.replace(/<\/a>/g, '</Link>');
  bodyContent = bodyContent.replace(/href=""/g, 'href="#"');
  
  // Inject state into the component
  const component = `"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewDecision() {
  const [statement, setStatement] = useState("");
  const [targetCustomer, setTargetCustomer] = useState("");
  const [alternatives, setAlternatives] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!statement.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/decisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statement, targetCustomer, alternatives }),
      });
      
      const data = await res.json();
      if (data.id) {
        router.push(\`/decisions/\${data.id}\`);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden flex flex-col bg-[#040509] text-[#e5e1e4]">
${bodyContent}
    </div>
  );
}`;
  
  // We need to inject the React hooks to the form inputs but for now just outputting the visual design is enough.
  fs.writeFileSync('C:/Users/Hp/.gemini/antigravity/scratch/thi pj 2/preflight/src/app/decisions/new/page.tsx', component);
  console.log('Successfully converted new decision form!');
}
