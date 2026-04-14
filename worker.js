// @ts-nocheck
export default {
    async fetch(request, env) {
        const url = new URL(request.url);

        // 📱 PWA Manifest
        if (url.pathname === "/manifest.json") {
            return new Response(JSON.stringify({
                name: "TreeBundle",
                short_name: "TreeBundle",
                start_url: "/",
                display: "standalone",
                background_color: "#000000",
                theme_color: "#3b82f6",
                icons: [
                    { 
                        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z'/%3E%3Cpath d='M12 22v-3'/%3E%3C/svg%3E",
                        sizes: "512x512",
                        type: "image/svg+xml"
                    }
                ]
            }), { headers: { "Content-Type": "application/json" } });
        }

        // ❓ Help Page Route
        if (url.pathname === "/help") {
            return new Response(renderHelp(), { headers: { "Content-Type": "text/html" } });
        }

        // 🏠 Main App Route
        return new Response(renderApp(), { headers: { "Content-Type": "text/html" } });
    },
};

function renderApp() {
    return `
    <!DOCTYPE html>
    <html lang="en" class="dark">
    <head>
      <meta charset="UTF-8">
      <title>TreeBundle | Project Bundler for AI</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="theme-color" content="#3b82f6">
      <meta name="apple-mobile-web-app-capable" content="yes">
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
      <link rel="manifest" href="/manifest.json">
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z'/%3E%3Cpath d='M12 22v-3'/%3E%3C/svg%3E">
      
      <!-- Watermark: HTML comment -->
      <!-- TreeBundle - Made with ❤️ by pavnxet | github.com/pavnxet/TreeBundle -->
      
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;500;600;700&family=Fira+Code:wght@400;500&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>

      <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js"></script>
      
      <script>
        tailwind.config = {
          darkMode: 'class',
          theme: { extend: { fontFamily: { sans: ['"Noto Sans"', 'sans-serif'], mono: ['"Fira Code"', 'monospace'] } } }
        }
      </script>

      <style>
        i[data-lucide] {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .lucide {
          display: inline-block;
          width: 1em;
          height: 1em;
          stroke-width: 2;
          stroke: currentColor;
          fill: none;
          vertical-align: middle;
        }
        body { background-color: #000; color: #ecf0f1; font-family: "Noto Sans", sans-serif; -webkit-font-smoothing: antialiased; }
        .heroui-card { background: #111114; border: 1px solid #27272a; border-radius: 1rem; backdrop-filter: blur(10px); }
        .heroui-input { background: #1c1c1f; border: 2px solid transparent; transition: all 0.2s; }
        .heroui-input:focus { border-color: #3b82f6; outline: none; background: #0a0a0b; }
        textarea::-webkit-scrollbar { width: 6px; }
        textarea::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 10px; }
        .persist-toast { position: fixed; bottom: 20px; right: 20px; background: #10b981; color: #000; padding: 10px 20px; border-radius: 8px; font-weight: bold; font-size: 12px; display: none; z-index: 50; }
        .btn-glow { box-shadow: 0 0 20px rgba(59, 130, 246, 0.25); }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .watermark { opacity: 0.3; transition: opacity 0.2s; }
        .watermark:hover { opacity: 0.8; }
      </style>
    </head>
    <body class="p-4 md:p-8">
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon-tree-pine" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14l3 -3l-3 -3"/><path d="M12 21v-7l-2 -2"/><path d="M7 14l-3 -3l3 -3"/><path d="M12 3v7l2 2"/></symbol>
      <symbol id="icon-help-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></symbol>
      <symbol id="icon-github" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></symbol>
      <symbol id="icon-download-cloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></symbol>
      <symbol id="icon-file-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2z"/><line x1="12" x2="12" y1="11" y2="17"/><line x1="9" x2="15" y1="14" y2="14"/></symbol>
      <symbol id="icon-trash-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 4V2h8v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></symbol>
      <symbol id="icon-cpu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></symbol>
      <symbol id="icon-package" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></symbol>
      <symbol id="icon-layers-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-8.58 3.9a2 2 0 0 1-1.66 0L3.18 17.65"/><path d="m22 12.65-8.58 3.9a2 2 0 0 1-1.66 0L3.18 12.65"/></symbol>
      <symbol id="icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></symbol>
      <symbol id="icon-loader-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></symbol>
      <symbol id="icon-chevron-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></symbol>
      <symbol id="icon-target" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></symbol>
      <symbol id="icon-list-checks" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><polyline points="3 6 4 7 6 5"/><polyline points="3 12 4 13 6 11"/><polyline points="3 18 4 19 6 17"/></symbol>
      <symbol id="icon-file-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2z"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/></symbol>
      <symbol id="icon-sliders" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/></symbol>
      <symbol id="icon-file-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2z"/><path d="M10 9h4"/><path d="M12 13h4"/><path d="M8 17h8"/></symbol>
      <symbol id="icon-check-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></symbol>
      <symbol id="icon-settings-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></symbol>
      <symbol id="icon-grip-horizontal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="1"/><circle cx="19" cy="9" r="1"/><circle cx="5" cy="9" r="1"/><circle cx="12" cy="15" r="1"/><circle cx="19" cy="15" r="1"/><circle cx="5" cy="15" r="1"/></symbol>
      <symbol id="icon-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.17 9.17a2 2 0 0 0 2.83 0l7-7a2 2 0 0 0 0-2.83L12 2Z"/><path d="M7 7h.01"/></symbol>
      <symbol id="icon-alert-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></symbol>
      <symbol id="icon-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>
      <symbol id="icon-code" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></symbol>
      <symbol id="icon-database" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/></symbol>
      <symbol id="icon-bug" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></symbol>
      <symbol id="icon-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></symbol>
    </svg>

    <div id="toast" class="persist-toast">Config Saved Locally</div>
    <div id="easteregg-toast" class="persist-toast" style="background: #8b5cf6; display: none;">🎉 Konami Code Activated! 🎉</div>

    <div class="max-w-7xl mx-auto">
      <header class="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <div class="flex items-center gap-3">
          <div class="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-900/40"><svg class="lucide text-white w-6 h-6"><use href="#icon-tree-pine"/></svg></div>
          <div>
            <h1 class="text-2xl font-bold tracking-tight">Tree<span class="text-blue-500">Bundle</span></h1>
            <p class="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">AI-Ready Project Bundler</p>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <a href="/help" class="text-xs font-bold text-zinc-500 hover:text-blue-400 transition-colors flex items-center gap-2" aria-label="Help Tutorial">
            <svg class="lucide w-4 h-4"><use href="#icon-help-circle"/></svg> Help
          </a>
          <div id="status-pill" class="text-[10px] font-black px-4 py-2 rounded-xl bg-zinc-950 text-emerald-500 border border-zinc-800 flex items-center gap-2 uppercase tracking-tighter">
            <span class="w-2.5 h-2.5 rounded-full bg-emerald-500" id="status-dot"></span> <span id="status-text">System Idle</span>
          </div>
        </div>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 space-y-4">
          
          <div class="heroui-card p-4 flex flex-wrap md:flex-nowrap gap-3 items-center">
            <div class="flex-1 relative w-full">
              <svg class="lucide absolute left-4 top-3.5 w-4 h-4 text-zinc-500"><use href="#icon-github"/></svg>
              <input type="text" id="repoUrl" placeholder="https://github.com/owner/repo" 
                class="w-full heroui-input pl-12 pr-4 py-3 rounded-xl text-sm placeholder:text-zinc-700 font-mono"
                aria-label="GitHub Repository URL">
            </div>
            <button onclick="fetchGitHubRepo()" id="ingestBtn" class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-500 transition-all flex items-center gap-2 btn-glow" aria-label="Ingest GitHub Repository">
              <svg class="lucide w-4 h-4" id="ingest-icon"><use href="#icon-download-cloud"/></svg> Ingest Repo
            </button>
          </div>

          <div class="heroui-card p-4 flex items-center justify-between border-dashed border-2 border-zinc-800 hover:border-blue-500/40 cursor-pointer group transition-all"
               onclick="document.getElementById('fileIn').click()" role="button" tabindex="0" aria-label="Upload local document">
            <div class="flex items-center gap-4">
               <div class="bg-zinc-800 p-3 rounded-xl group-hover:bg-blue-500/10 transition-colors text-zinc-500 group-hover:text-blue-500">
                  <svg class="lucide w-5 h-5"><use href="#icon-file-plus"/></svg>
               </div>
               <div>
                  <p id="fileMsg" class="text-xs font-bold text-zinc-300 uppercase tracking-widest">Local Document Ingest</p>
                  <p class="text-[10px] text-zinc-600 font-mono">PDF, DOCX, JS, PY, HTML, CSS, JSON</p>
               </div>
            </div>
            <input type="file" id="fileIn" class="hidden" onchange="handleFile(this)" aria-label="File input">
          </div>

          <div class="heroui-card p-1 relative shadow-2xl overflow-hidden">
            <div class="absolute top-4 right-4 z-10 flex gap-2">
              <button onclick="clearEditor()" class="bg-zinc-800/80 hover:bg-red-900/30 p-2 rounded-lg text-red-500 transition-colors" title="Clear Editor" aria-label="Clear editor">
                <svg class="lucide w-4 h-4"><use href="#icon-trash-2"/></svg>
              </button>
            </div>
            <textarea id="editor" 
              class="w-full h-[550px] p-8 font-mono text-sm heroui-input rounded-[calc(1rem-4px)] text-emerald-400 leading-relaxed"
              placeholder="// Concatenated project code will appear here..."
              aria-label="Editor content"></textarea>
            <div class="absolute bottom-2 left-4 text-[8px] text-zinc-700 watermark select-none">Made with ❤️ by pavnxet</div>
          </div>
        </div>

        <div class="lg:col-span-4 space-y-6">
          <div class="heroui-card p-6 space-y-6">
            <div class="flex items-center justify-between">
              <h2 class="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                <svg class="lucide w-4 h-4"><use href="#icon-cpu"/></svg> Engine Settings
              </h2>
              <button onclick="clearAllSettings()" class="text-[10px] text-zinc-500 hover:text-red-400 underline" aria-label="Reset all settings">Reset Defaults</button>
            </div>

            <div class="space-y-4">
              <div>
                <label class="text-[10px] font-bold text-zinc-600 mb-2 block uppercase">Lines Per Split</label>
                <input type="number" id="lineSize" value="2000" onchange="saveSettings()" class="w-full heroui-input px-4 py-3 rounded-lg text-sm font-bold text-zinc-200" aria-label="Lines per split">
              </div>
              <div>
                <label class="text-[10px] font-bold text-zinc-600 mb-2 block uppercase">Naming Template</label>
                <input type="text" id="namePattern" value="{{name}}_part_{{n}}" onchange="saveSettings()" class="w-full heroui-input px-4 py-3 rounded-lg text-sm font-mono text-blue-400" aria-label="Naming template">
              </div>
              <div>
                <label class="text-[10px] font-bold text-zinc-600 mb-2 block uppercase">Footer Disclaimer</label>
                <textarea id="disclaimer" onchange="saveSettings()" rows="2" class="w-full heroui-input px-4 py-3 rounded-lg text-sm text-zinc-400 resize-y" aria-label="Footer disclaimer">Disclaimer: more has to come wait</textarea>
              </div>
            </div>

            <div class="space-y-3 py-4 border-y border-zinc-800/50">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" id="wiseBoundary" checked class="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-0">
                <span class="text-xs text-zinc-400 group-hover:text-white transition-colors">Wise Header Snap (FILE:)</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" id="smartCode" checked class="w-4 h-4 rounded border-zinc-700 bg-zinc-800 text-blue-600 focus:ring-0">
                <span class="text-xs text-zinc-400 group-hover:text-white transition-colors">Smart Code Awareness</span>
              </label>
            </div>

            <div class="bg-blue-600/5 p-4 rounded-xl border border-blue-600/10">
              <label class="text-[9px] text-blue-400 font-black uppercase mb-2 block">GitHub Token (Persistent)</label>
              <input type="password" id="ghToken" placeholder="ghp_..." onchange="saveSettings()" 
                class="w-full bg-black/40 border border-zinc-800 px-3 py-2.5 rounded-lg text-xs text-zinc-400 focus:border-blue-500/50 transition-all outline-none font-mono"
                aria-label="GitHub personal access token">
              <p class="text-[8px] text-zinc-600 mt-1">Stored only in your browser's localStorage.</p>
            </div>

            <button onclick="processAll()" id="bundleBtn" class="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-3 active:scale-95 transition-all group" aria-label="Bundle project">
              <svg class="lucide w-5 h-5 group-hover:scale-110 transition-transform"><use href="#icon-package"/></svg> BUNDLE PROJECT
            </button>
          </div>

          <div id="manifestArea" class="hidden heroui-card p-6 border-emerald-900/20 bg-emerald-950/5">
            <h2 class="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-2 mb-4">
              <svg class="lucide w-4 h-4"><use href="#icon-layers-2"/></svg> tree.txt Index
            </h2>
            <pre id="treeOutput" class="text-[10px] font-mono text-emerald-400/60 overflow-x-auto leading-relaxed"></pre>
          </div>
        </div>
      </div>
      <footer class="mt-8 text-center text-[10px] text-zinc-700">
        <a href="https://github.com/pavnxet/TreeBundle" target="_blank" class="hover:text-blue-400 transition-colors watermark inline-flex items-center gap-1">
          <svg class="lucide w-3 h-3 fill-red-500 text-red-500"><use href="#icon-heart"/></svg> Made with love by pavnxet
        </a>
      </footer>
    </div>

    <script>
      function refreshIcons() {
        // No-op - icons are now updated via SVG symbols
      }

      window.addEventListener("load", function() {
        if (typeof loadSettings === "function") loadSettings();
      });
      
      console.log("%c\uD83C\uDF33 TreeBundle %c| Made with \u2764\uFE0F by pavnxet | github.com/pavnxet/TreeBundle", "font-weight:bold; color:#3b82f6; font-size:14px;", "color:#a5d6ff; font-size:12px;");
      
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      // ---------- Easter Egg: Konami Code (case-insensitive) ----------
      var konamiCode = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];
      var konamiIndex = 0;
      window.addEventListener("keydown", function(e) {
        var key = e.key.toLowerCase();
        var targetKey = konamiCode[konamiIndex];
        if (key === targetKey) {
          konamiIndex++;
          if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
          }
        } else {
          konamiIndex = 0;
        }
      });

      function activateEasterEgg() {
        console.log("%c\uD83C\uDF89 Konami Code Activated! \uD83C\uDF33 TreeBundle loves you!", "font-size:16px; color:#8b5cf6; font-weight:bold;");
        var eggToast = document.getElementById("easteregg-toast");
        eggToast.style.display = "block";
        setTimeout(function() { eggToast.style.display = "none"; }, 3000);
        
        var statusText = document.getElementById("status-text");
        var original = statusText.textContent;
        statusText.textContent = "\uD83E\uDD5A Easter Egg Found!";
        setTimeout(function() { statusText.textContent = original; }, 2000);
      }

      // ---------- Persistent Settings ----------
      var FIELDS = ["lineSize", "namePattern", "disclaimer", "ghToken"];
      var STORAGE_PREFIX = "treebundle_v1_";

      function saveSettings() {
        FIELDS.forEach(function(id) {
          var el = document.getElementById(id);
          localStorage.setItem(STORAGE_PREFIX + id, el.value);
        });
        showToast("Config Saved Locally");
      }

      function loadSettings() {
        FIELDS.forEach(function(id) {
          var saved = localStorage.getItem(STORAGE_PREFIX + id);
          if (saved !== null) {
            var el = document.getElementById(id);
            if (el) el.value = saved;
          }
        });
      }

      function clearAllSettings() {
        if (confirm("Reset all settings to defaults? This will clear your saved GitHub token.")) {
          FIELDS.forEach(function(id) { localStorage.removeItem(STORAGE_PREFIX + id); });
          document.getElementById("lineSize").value = "2000";
          document.getElementById("namePattern").value = "{{name}}_part_{{n}}";
          document.getElementById("disclaimer").value = "Disclaimer: more has to come wait";
          document.getElementById("ghToken").value = "";
          showToast("Settings reset to defaults");
        }
      }

      function showToast(msg) {
        var t = document.getElementById("toast");
        t.textContent = msg;
        t.style.display = "block";
        setTimeout(function() { t.style.display = "none"; }, 2000);
      }

      // ---------- Status Management ----------
      var selectedFile = null;
      function updateStatus(text, color, dotColor) {
        document.getElementById("status-text").textContent = text;
        document.getElementById("status-dot").className = "w-2.5 h-2.5 rounded-full " + dotColor + " animate-pulse";
        document.getElementById("status-pill").style.color = color;
      }

      function clearEditor() { 
        document.getElementById("editor").value = ""; 
        selectedFile = null;
        updateStatus("System Idle", "#10b981", "bg-emerald-500"); 
        document.getElementById("fileMsg").textContent = "Local Document Ingest";
      }

      function handleFile(input) {
        if (input.files[0]) {
          selectedFile = input.files[0];
          document.getElementById("fileMsg").textContent = "READY: " + selectedFile.name.toUpperCase();
          updateStatus("File Ready", "#3b82f6", "bg-blue-500");
        }
      }

      // ---------- Binary Detection ----------
      function isBinary(path) {
        var binaryExtensions = [
          ".png", ".jpg", ".jpeg", ".gif", ".bmp", ".ico", ".webp", ".svgz",
          ".pdf", ".zip", ".tar", ".gz", ".bz2", ".7z", ".rar",
          ".exe", ".dll", ".so", ".dylib", ".class", ".jar", ".war", ".ear",
          ".mp3", ".mp4", ".mov", ".avi", ".mkv", ".flv", ".wmv",
          ".woff", ".woff2", ".ttf", ".eot", ".otf",
          ".db", ".sqlite", ".sqlite3", ".pyc", ".pyo", ".pyd",
        ];
        var lower = path.toLowerCase();
        return binaryExtensions.some(function(ext) { return lower.endsWith(ext); });
      }

      // ---------- GitHub Ingest ----------
      async function fetchGitHubRepo() {
        var urlInput = document.getElementById("repoUrl").value.trim();
        var token = document.getElementById("ghToken").value.trim();
        var editor = document.getElementById("editor");
        var icon = document.getElementById("ingest-icon");
        var btn = document.getElementById("ingestBtn");
        
        if (!urlInput) {
          alert("Please enter a GitHub URL or owner/repo");
          return;
        }

        btn.disabled = true;
        icon.classList.add("animate-spin");
        updateStatus("Validating...", "#3b82f6", "bg-blue-500");

        try {
          var cleanUrl = urlInput.replace(/\/$/, "").replace(/\.git$/, "");
          var parts = cleanUrl.split("/");
          var owner, repo;
          
          if (cleanUrl.includes("github.com")) {
            var githubIndex = parts.indexOf("github.com");
            owner = parts[githubIndex + 1];
            repo = parts[githubIndex + 2];
          } else {
            var splitted = cleanUrl.split("/");
            owner = splitted[0];
            repo = splitted[1];
          }
          
          if (!owner || !repo) throw new Error("Invalid GitHub reference. Use 'owner/repo' or full URL.");
          
          updateStatus("Fetching repo info...", "#3b82f6", "bg-blue-500");
          
          var headers = token ? { "Authorization": "token " + token } : {};
          
          var repoRes = await fetch("https://api.github.com/repos/" + owner + "/" + repo, { headers: headers });
          var repoData = await repoRes.json();
          
          if (repoRes.status === 403 && repoRes.headers.get("X-RateLimit-Remaining") === "0") {
            var resetTime = new Date(parseInt(repoRes.headers.get("X-RateLimit-Reset")) * 1000);
            throw new Error("GitHub API rate limit exceeded. Resets at " + resetTime.toLocaleTimeString() + ". Add a token or wait.");
          }
          if (repoData.message === "Not Found") throw new Error("Repository not found or private (add token).");
          
          var branch = repoData.default_branch;
          
          var treeRes = await fetch("https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + branch + "?recursive=1", { headers: headers });
          var treeData = await treeRes.json();
          
          if (treeRes.status === 403 && treeRes.headers.get("X-RateLimit-Remaining") === "0") {
            var resetTime = new Date(parseInt(treeRes.headers.get("X-RateLimit-Reset")) * 1000);
            throw new Error("Rate limit exceeded during tree fetch. Resets at " + resetTime.toLocaleTimeString());
          }
          if (!treeData.tree) throw new Error("API limit reached or repository is empty.");
          
          var files = treeData.tree.filter(function(f) {
            var path = f.path;
            var isExcluded = path.includes("node_modules/") || 
                               path.includes(".git/") || 
                               path.includes("package-lock.json") ||
                               path.includes("yarn.lock") ||
                               path.includes("pnpm-lock.yaml");
            return f.type === "blob" && !isBinary(path) && !isExcluded;
          });
          
          var MAX_FILES = 500;
          if (files.length > MAX_FILES) {
            var proceed = confirm("Repository contains " + files.length + " text files. Ingesting more than " + MAX_FILES + " may be slow. Continue?");
            if (!proceed) {
              updateStatus("Ingest Cancelled", "#ef4444", "bg-red-500");
              return;
            }
          }
          
          var dump = "";
          var processed = 0;
          
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            processed++;
            updateStatus("Ingesting " + processed + "/" + files.length, "#eab308", "bg-yellow-500");
            
            var res = await fetch("https://raw.githubusercontent.com/" + owner + "/" + repo + "/" + branch + "/" + file.path, { headers: headers });
            if (res.ok) {
              var content = await res.text();
              dump += "================================================================================\\n";
              dump += "FILE: " + file.path + "\\n";
              dump += "================================================================================\\n\\n";
              dump += content + "\\n\\n";
            }
          }
          
          editor.value = dump;
          updateStatus("Ingest Complete (" + processed + " files)", "#10b981", "bg-emerald-500");
        } catch (err) {
          alert(err.message);
          updateStatus("Ingest Failed", "#ef4444", "bg-red-500");
        } finally {
          icon.classList.remove("animate-spin");
          btn.disabled = false;
        }
      }

      // ---------- Smart Split Boundary ----------
      function findPerfectBreak(lines, idx) {
        var wise = document.getElementById("wiseBoundary").checked;
        var smart = document.getElementById("smartCode").checked;
        var lookAhead = 200;
        
        if (wise) {
          for (var i = idx; i < Math.min(idx + lookAhead, lines.length - 1); i++) {
            if (lines[i].startsWith("====") && lines[i+1] && lines[i+1].startsWith("FILE:")) {
              return i;
            }
          }
          for (var i = idx; i < Math.min(idx + lookAhead, lines.length); i++) {
            if (lines[i].startsWith("FILE:")) {
              return i;
            }
          }
        }
        
        if (smart) {
          for (var i = idx; i < Math.min(idx + 60, lines.length); i++) {
            var line = lines[i].trim();
            if (line === "" || line.endsWith("}") || line.endsWith(")") || line.endsWith(";")) {
              return i + 1;
            }
          }
        }
        
        return idx;
      }

      // ---------- Process and Bundle ----------
      async function processAll() {
        var bundleBtn = document.getElementById("bundleBtn");
        var originalBtnHTML = bundleBtn.innerHTML;
        bundleBtn.disabled = true;
        bundleBtn.innerHTML = '<svg class="lucide w-5 h-5 animate-spin"><use href="#icon-loader-2"/></svg> BUNDLING...';
        
        try {
          updateStatus("Preparing...", "#3b82f6", "bg-blue-500");
          
          var text = document.getElementById("editor").value;
          var base = "project_bundle";

          if (!text.trim() && selectedFile) {
            updateStatus("Parsing document...", "#3b82f6", "bg-blue-500");
            base = selectedFile.name.replace(/\\.[^/.]+$/, "");
            var ext = selectedFile.name.split(".").pop().toLowerCase();
            
            if (ext === "pdf") {
              var ab = await selectedFile.arrayBuffer();
              var pdf = await pdfjsLib.getDocument({ data: ab }).promise;
              text = "";
              for (var i = 1; i <= pdf.numPages; i++) {
                var page = await pdf.getPage(i);
                var content = await page.getTextContent();
                text += content.items.map(function(s) { return s.str; }).join(" ") + "\\n";
              }
            } else if (ext === "docx") {
              var ab = await selectedFile.arrayBuffer();
              var res = await mammoth.extractRawText({ arrayBuffer: ab });
              text = res.value;
            } else {
              text = await selectedFile.text();
            }
            document.getElementById("editor").value = text;
          }

          if (!text.trim()) throw new Error("No data to process. Ingest a repo or upload a file.");
          
          if (text.length > 5000000) {
            var proceed = confirm("The content is over 5 million characters. Generating a large ZIP may cause browser lag. Continue?");
            if (!proceed) {
              updateStatus("Bundle Cancelled", "#ef4444", "bg-red-500");
              return;
            }
          }

          updateStatus("Splitting...", "#3b82f6", "bg-blue-500");
          
          var lines = text.split("\\n");
          var size = parseInt(document.getElementById("lineSize").value, 10);
          if (isNaN(size) || size < 1) throw new Error("Invalid line size");
          
          var zip = new JSZip();
          var cur = 0;
          var parts = [];

          while (cur < lines.length) {
            var next = cur + size;
            if (next < lines.length) {
              next = findPerfectBreak(lines, next);
            }
            parts.push(lines.slice(cur, next));
            cur = next;
          }

          updateStatus("Generating ZIP...", "#3b82f6", "bg-blue-500");
          
          var tree = "INDEX\\n";
          var pattern = document.getElementById("namePattern").value;
          var disc = document.getElementById("disclaimer").value;

          parts.forEach(function(chunk, i) {
            var n = (i + 1).toString().padStart(3, "0");
            var fileName = pattern.replace("{{n}}", n).replace("{{name}}", base) + ".txt";
            var content = chunk.join("\\n") + "\\n\\n" + (i + 1) + "/" + parts.length + "\\n" + disc;
            zip.file(fileName, content);
            tree += (i === parts.length - 1 ? "└── " : "├── ") + fileName + "\\n";
          });

          zip.file("tree.txt", tree);
          
          var blob = await zip.generateAsync({ type: "blob" });
          var a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = base + "_bundle.zip";
          a.click();

          updateStatus("Bundle Complete", "#10b981", "bg-emerald-500");
          document.getElementById("manifestArea").classList.remove("hidden");
          document.getElementById("treeOutput").textContent = tree;
          refreshIcons();
        } catch (e) {
          alert(e.message);
          updateStatus("Bundle Failed", "#ef4444", "bg-red-500");
        } finally {
          bundleBtn.disabled = false;
          bundleBtn.innerHTML = originalBtnHTML;
          refreshIcons();
        }
      }

      window.fetchGitHubRepo = fetchGitHubRepo;
      window.processAll = processAll;
      window.clearEditor = clearEditor;
      window.handleFile = handleFile;
      window.saveSettings = saveSettings;
      window.clearAllSettings = clearAllSettings;
    </script>
    </body>
    </html>
  `;
}

function renderHelp() {
    return `
    <!DOCTYPE html>
    <html lang="en" class="dark">
    <head>
      <meta charset="UTF-8">
      <title>TreeBundle – Complete Guide</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="manifest" href="/manifest.json">
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%233b82f6' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z'/%3E%3Cpath d='M12 22v-3'/%3E%3C/svg%3E">
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>

      <script>
        tailwind.config = { darkMode: 'class', theme: { extend: { fontFamily: { sans: ['"Noto Sans"', 'sans-serif'] } } } }
      </script>
      <style>
        i[data-lucide] {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        body { background-color: #000; color: #ecf0f1; font-family: "Noto Sans", sans-serif; }
        .heroui-card { background: #111114; border: 1px solid #27272a; border-radius: 1rem; }
        .code-block { background: #1c1c1f; border: 1px solid #2a2a2e; border-radius: 0.5rem; padding: 1rem; font-family: 'Fira Code', monospace; font-size: 0.8rem; color: #a5d6ff; }
        .lucide {
          display: inline-block;
          width: 1em;
          height: 1em;
          stroke-width: 2;
          stroke: currentColor;
          fill: none;
          vertical-align: middle;
        }
      </style>
    </head>
    <body class="p-4 md:p-8">
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
      <symbol id="icon-tree-pine" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 14l3 -3l-3 -3"/><path d="M12 21v-7l-2 -2"/><path d="M7 14l-3 -3l3 -3"/><path d="M12 3v7l2 2"/></symbol>
      <symbol id="icon-help-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" x2="12.01" y1="17" y2="17"/></symbol>
      <symbol id="icon-github" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></symbol>
      <symbol id="icon-download-cloud" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"/><path d="M12 12v9"/><path d="m8 17 4 4 4-4"/></symbol>
      <symbol id="icon-file-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2z"/><line x1="12" x2="12" y1="11" y2="17"/><line x1="9" x2="15" y1="14" y2="14"/></symbol>
      <symbol id="icon-trash-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 4V2h8v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></symbol>
      <symbol id="icon-cpu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></symbol>
      <symbol id="icon-package" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m7.5 4.27 9 5.15"/><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></symbol>
      <symbol id="icon-layers-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-8.58 3.9a2 2 0 0 1-1.66 0L3.18 17.65"/><path d="m22 12.65-8.58 3.9a2 2 0 0 1-1.66 0L3.18 12.65"/></symbol>
      <symbol id="icon-heart" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></symbol>
      <symbol id="icon-loader-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></symbol>
      <symbol id="icon-chevron-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></symbol>
      <symbol id="icon-target" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></symbol>
      <symbol id="icon-list-checks" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="10" x2="21" y1="6" y2="6"/><line x1="10" x2="21" y1="12" y2="12"/><line x1="10" x2="21" y1="18" y2="18"/><polyline points="3 6 4 7 6 5"/><polyline points="3 12 4 13 6 11"/><polyline points="3 18 4 19 6 17"/></symbol>
      <symbol id="icon-file-up" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2z"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/></symbol>
      <symbol id="icon-sliders" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="4" y1="21" y2="14"/><line x1="4" x2="4" y1="10" y2="3"/><line x1="12" x2="12" y1="21" y2="12"/><line x1="12" x2="12" y1="8" y2="3"/><line x1="20" x2="20" y1="21" y2="16"/><line x1="20" x2="20" y1="12" y2="3"/><line x1="2" x2="6" y1="14" y2="14"/><line x1="10" x2="14" y1="8" y2="8"/><line x1="18" x2="22" y1="16" y2="16"/></symbol>
      <symbol id="icon-file-text" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4 4v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2z"/><path d="M10 9h4"/><path d="M12 13h4"/><path d="M8 17h8"/></symbol>
      <symbol id="icon-check-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></symbol>
      <symbol id="icon-settings-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></symbol>
      <symbol id="icon-grip-horizontal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="9" r="1"/><circle cx="19" cy="9" r="1"/><circle cx="5" cy="9" r="1"/><circle cx="12" cy="15" r="1"/><circle cx="19" cy="15" r="1"/><circle cx="5" cy="15" r="1"/></symbol>
      <symbol id="icon-tag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.17 9.17a2 2 0 0 0 2.83 0l7-7a2 2 0 0 0 0-2.83L12 2Z"/><path d="M7 7h.01"/></symbol>
      <symbol id="icon-alert-circle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></symbol>
      <symbol id="icon-shield" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></symbol>
      <symbol id="icon-code" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></symbol>
      <symbol id="icon-database" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/></symbol>
      <symbol id="icon-bug" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 2 1.88 1.88"/><path d="M14.12 3.88 16 2"/><path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"/><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"/><path d="M12 20v-9"/><path d="M6.53 9C4.6 8.8 3 7.1 3 5"/><path d="M6 13H2"/><path d="M3 21c0-2.1 1.7-3.9 3.8-4"/><path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"/><path d="M22 13h-4"/><path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"/></symbol>
      <symbol id="icon-arrow-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" x2="5" y1="12" y2="12"/><polyline points="12 19 5 12 12 5"/></symbol>
    </svg>
      <div class="max-w-4xl mx-auto">
        <header class="flex items-center gap-4 mb-10">
          <a href="/" class="p-3 bg-zinc-900 rounded-xl hover:bg-zinc-800 text-zinc-400 transition-all" aria-label="Back to dashboard"><svg class="lucide"><use href="#icon-chevron-left"/></svg></a>
          <h1 class="text-3xl font-bold">Tree<span class="text-blue-500">Bundle</span> – User Manual</h1>
        </header>

        <div class="space-y-8">
          <section class="heroui-card p-8 bg-blue-500/5 border-blue-500/20">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3 text-blue-400"><svg class="lucide"><use href="#icon-target"/></svg> What is TreeBundle?</h2>
            <p class="text-zinc-300 leading-relaxed">
              TreeBundle ingests entire GitHub repositories or local documents (PDF, DOCX, code) and splits them into
              <strong class="text-white">numbered, self‑contained text files</strong>. Each part ends with a 
              <strong class="text-emerald-400">part counter (e.g., 3/12)</strong> and a custom <strong class="text-emerald-400">disclaimer footer</strong>.
              The result is a clean ZIP archive ready for AI analysis, code review, or offline study.
            </p>
          </section>

          <section class="heroui-card p-8">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-3"><svg class="lucide"><use href="#icon-list-checks"/></svg> Step‑by‑Step Workflow</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <div class="flex items-center gap-2 mb-2"><svg class="lucide"><use href="#icon-github"/></svg><h3 class="font-bold text-sm uppercase tracking-wider">1. Ingest Source</h3></div>
                <p class="text-xs text-zinc-400">Paste a GitHub URL or <code>owner/repo</code>. Files are concatenated with <code>FILE: path</code> headers. For private repos, add a <strong>fine‑grained token</strong> in settings.</p>
              </div>
              <div class="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <div class="flex items-center gap-2 mb-2"><svg class="lucide"><use href="#icon-file-up"/></svg><h3 class="font-bold text-sm uppercase tracking-wider">2. Or Upload Local</h3></div>
                <p class="text-xs text-zinc-400">Click the upload area. PDFs are text‑extracted via PDF.js, DOCX via Mammoth. Code files appear verbatim. The content fills the editor.</p>
              </div>
              <div class="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <div class="flex items-center gap-2 mb-2"><svg class="lucide"><use href="#icon-sliders"/></svg><h3 class="font-bold text-sm uppercase tracking-wider">3. Configure Splitting</h3></div>
                <p class="text-xs text-zinc-400">Set <strong>Lines per split</strong> (e.g., 2000). Enable <strong>Wise Header Snap</strong> to never break inside a file header. <strong>Smart Code Awareness</strong> tries to split at blank lines or block ends.</p>
              </div>
              <div class="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                <div class="flex items-center gap-2 mb-2"><svg class="lucide"><use href="#icon-package"/></svg><h3 class="font-bold text-sm uppercase tracking-wider">4. Bundle & Download</h3></div>
                <p class="text-xs text-zinc-400">Click <strong>BUNDLE PROJECT</strong>. A ZIP is generated containing <code>name_part_001.txt</code>, <code>name_part_002.txt</code>, … and a <code>tree.txt</code> index.</p>
              </div>
            </div>
          </section>

          <section class="heroui-card p-8">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-3"><i data-lucide="file-text"></i> What’s Inside Each Split File?</h2>
            <p class="text-sm text-zinc-300 mb-4">Every part file ends with two lines that identify its position and display your custom disclaimer:</p>
            <div class="code-block mb-4">
              <span class="text-zinc-500">... (file content) ...</span><br>
              <span class="text-emerald-400 font-bold">3/12</span><br>
              <span class="text-blue-300">Disclaimer: This is a generated split – more content follows.</span>
            </div>
            <ul class="space-y-3 text-sm text-zinc-300">
              <li class="flex gap-2"><svg class="lucide text-emerald-500 shrink-0 mt-0.5"><use href="#icon-check-circle"/></svg> <span><strong>Part counter</strong> – shows “current part / total parts”. Helps keep track when reading sequentially.</span></li>
              <li class="flex gap-2"><svg class="lucide text-emerald-500 shrink-0 mt-0.5"><use href="#icon-check-circle"/></svg> <span><strong>Disclaimer footer</strong> – you can customise this in the Engine Settings. Use it for copyright notes, usage instructions, or just a reminder that more parts exist.</span></li>
              <li class="flex gap-2"><svg class="lucide text-emerald-500 shrink-0 mt-0.5"><use href="#icon-check-circle"/></svg> <span><strong>FILE: headers</strong> – when ingesting from GitHub, each original file is prefixed with a separator and its path, making navigation easy.</span></li>
            </ul>
            <p class="text-xs text-zinc-500 mt-4 bg-black/30 p-3 rounded-lg">💡 <strong>Pro tip:</strong> If you’re feeding these parts to an AI, the part counter and disclaimer help the model understand the document structure and that it’s part of a larger whole.</p>
          </section>

          <section class="heroui-card p-8">
            <h2 class="text-xl font-bold mb-6 flex items-center gap-3"><svg class="lucide"><use href="#icon-settings-2"/></svg> Engine Settings Explained</h2>
            <div class="space-y-5">
              <div>
                <h3 class="font-bold text-sm flex items-center gap-2"><svg class="lucide"><use href="#icon-grip-horizontal"/></svg> Lines Per Split</h3>
                <p class="text-xs text-zinc-400 ml-6">Target line count for each part. The algorithm may adjust slightly to respect wise boundaries.</p>
              </div>
              <div>
                <h3 class="font-bold text-sm flex items-center gap-2"><svg class="lucide"><use href="#icon-tag"/></svg> Naming Template</h3>
                <p class="text-xs text-zinc-400 ml-6">Use <code>{{name}}</code> for the project name and <code>{{n}}</code> for the zero‑padded part number. Example: <code>{{name}}_part_{{n}}</code> → <code>myrepo_part_003.txt</code>.</p>
              </div>
              <div>
                <h3 class="font-bold text-sm flex items-center gap-2"><svg class="lucide"><use href="#icon-alert-circle"/></svg> Footer Disclaimer</h3>
                <p class="text-xs text-zinc-400 ml-6">Text appended after the part counter. Useful for attribution, legal notices, or AI prompt context.</p>
              </div>
              <div>
                <h3 class="font-bold text-sm flex items-center gap-2"><svg class="lucide"><use href="#icon-shield"/></svg> Wise Header Snap</h3>
                <p class="text-xs text-zinc-400 ml-6">When enabled, the splitter looks ahead for a <code>FILE:</code> header and places the cut <em>before</em> it. This guarantees no file header is split across two parts.</p>
              </div>
              <div>
                <h3 class="font-bold text-sm flex items-center gap-2"><svg class="lucide"><use href="#icon-code"/></svg> Smart Code Awareness</h3>
                <p class="text-xs text-zinc-400 ml-6">If a perfect header break isn’t found, the splitter will try to cut at a blank line, closing brace, or semicolon – keeping code blocks intact.</p>
              </div>
            </div>
          </section>

          <section class="heroui-card p-8">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3"><svg class="lucide"><use href="#icon-database"/></svg> Local Storage & Privacy</h2>
            <p class="text-sm text-zinc-300">
              All settings (including your GitHub token) are stored <strong>only in your browser’s localStorage</strong>. They never leave your device.
              Use the <strong>“Reset Defaults”</strong> button in the settings panel to wipe all saved data.
            </p>
          </section>

          <section class="heroui-card p-8 border-amber-500/20 bg-amber-500/5">
            <h2 class="text-xl font-bold mb-4 flex items-center gap-3 text-amber-400"><svg class="lucide"><use href="#icon-bug"/></svg> Troubleshooting</h2>
            <ul class="list-disc list-inside text-sm text-zinc-300 space-y-2">
              <li><strong>“API rate limit exceeded”</strong> – Add a GitHub personal access token (classic or fine‑grained) in the token field. No scopes are required for public repos.</li>
              <li><strong>Large repository warning</strong> – Repos with >500 text files trigger a confirmation. You can still proceed, but the ingest may be slow.</li>
              <li><strong>PDF text extraction is messy</strong> – PDF.js extracts raw text; complex layouts may lose formatting. For best results, use plain text or DOCX.</li>
              <li><strong>“Nothing to process”</strong> – Ensure the editor has content or a valid file is selected. Click “Ingest Repo” or upload a file first.</li>
            </ul>
          </section>

          <div class="flex justify-center pt-6">
            <a href="/" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-12 rounded-2xl shadow-xl transition-all flex items-center gap-2">
              <svg class="lucide"><use href="#icon-arrow-left"/></svg> Return to Dashboard
            </a>
          </div>
        </div>
      </div>
      <footer class="mt-8 text-center text-[10px] text-zinc-700">
        <a href="https://github.com/pavnxet/TreeBundle" target="_blank" class="hover:text-blue-400 transition-colors inline-flex items-center gap-1">
          <svg class="lucide w-3 h-3 fill-red-500 text-red-500"><use href="#icon-heart"/></svg> Made with love by pavnxet
        </a>
      </footer>
      <script>
        window.addEventListener("DOMContentLoaded", () => {});
        window.addEventListener("load", () => {});
      </script>
    </body>
    </html>
  `;
}