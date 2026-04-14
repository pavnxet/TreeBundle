<div align="center">
  <img src="assets/logo.png" width="256" height="256" />
  <h1>🌳 TreeBundle</h1>
  <p><strong>The AI-Ready Project Bundler.</strong></p>
</div>

TreeBundle is a powerful, client-side web application designed to help developers ingest, bundle, and prepare codebases and documents for AI analysis. Whether you're feeding a project to a Large Language Model (LLM) or conducting a code review, TreeBundle makes it seamless and efficient.

---

## 🚀 Key Features

- **GitHub Ingestion**: Instantly pull files from any public or private repository (via Personal Access Token).
- **Local Document Support**: Seamlessly parse and include **PDF**, **DOCX**, and various code files.
- **Smart Splitting**: Intelligent algorithm that respects code boundaries and file headers to keep related logic together.
- **AI-Optimized Output**: Automatically adds part counters and customizable disclaimer footers to every split file.
- **PWA Ready**: Install TreeBundle as a standalone desktop or mobile application.
- **Privacy First**: Your GitHub tokens and settings are stored locally in your browser. Nothing ever touches our servers.
- **Rich Aesthetics**: A premium dark-mode interface with smooth animations and HeroUI-inspired design.

---

## 🛠️ Tech Stack

- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Logic**: Vanilla JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide Icons](https://lucide.dev/) (via SVG Symbols)
- **File Processing**:
  - [JSZip](https://stuk.github.io/jszip/) for bundling.
  - [PDF.js](https://mozilla.github.io/pdf.js/) for PDF text extraction.
  - [Mammoth.browser.js](https://github.com/mwilliamson/mammoth.js) for DOCX extraction.

---

## 📦 Deployment

TreeBundle is built as a single-file Cloudflare Worker script.

1. Create a new Cloudflare Worker in your dashboard.
2. Paste the contents of `worker.js` into the Worker editor.
3. Save and Deploy.
4. (Optional) Bind a custom domain to your worker.

---

## 📖 Usage Guide

### 1. Ingesting Source
Enter a GitHub URL (e.g., `https://github.com/owner/repo`) or a simple `owner/repo` string. Click **Ingest Repo** to fetch all non-binary text files.
*Note: For private repos or to avoid rate limits, add a GitHub token in the Engine Settings.*

### 2. Uploading Files
Click the **Local Document Ingest** area to upload PDFs, DOCX files, or individual code files. They will be parsed and added to the editor automatically.

### 3. Splitting & Bundling
Configure your **Engine Settings**:
- **Lines Per Split**: Target number of lines for each output file.
- **Wise Header Snap**: Ensures that cuts happen *before* a new file header, keeping files intact across parts.
- **Smart Code Awareness**: Attempts to break at blank lines or closing braces.

Click **BUNDLE PROJECT** to generate a ZIP archive containing your indexed parts and a `tree.txt` manifest.

---

## 🔒 Privacy & Security

TreeBundle is a **zero-trust** tool. 
- **No Database**: We do not store your data.
- **Local Storage**: GitHub tokens and settings are stored only in your browser's `localStorage`.
- **Client-Side Processing**: All file parsing and ZIP generation happen entirely in your browser.

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have ideas for new features or improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

*Made with ❤️ by [pavnxet](https://github.com/pavnxet)*