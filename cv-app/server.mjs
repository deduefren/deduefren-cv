import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import express from 'express';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolvePath = (...segments) => path.resolve(__dirname, ...segments);

const isProduction = process.argv.includes('--prod');
const port = Number(process.env.PORT || 5173);

async function createServer() {
  const app = express();
  let vite;

  if (!isProduction) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
  } else {
    app.use('/assets', express.static(resolvePath('dist/client/assets'), { index: false, maxAge: '1y' }));
    app.use(express.static(resolvePath('dist/client'), { index: false }));
  }

  app.use('*', async (req, res) => {
    const url = req.originalUrl;

    try {
      let template;
      let render;
      let detectLanguage;

      if (!isProduction) {
        template = await fs.readFile(resolvePath('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const entry = await vite.ssrLoadModule('/src/entry-server.tsx');
        render = entry.render;
        detectLanguage = entry.detectLanguage;
      } else {
        template = await fs.readFile(resolvePath('dist/client/index.html'), 'utf-8');
        const entryServerUrl = pathToFileURL(resolvePath('dist/server/entry-server.mjs')).href;
        const entry = await import(entryServerUrl);
        render = entry.render;
        detectLanguage = entry.detectLanguage;
      }

      const language = detectLanguage(req.headers['accept-language']);
      const appHtml = render(language);

      const html = template
        .replace('<!--app-html-->', appHtml)
        .replace('__INITIAL_LANGUAGE__', language);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(error);
      }

      console.error(error);
      res.status(500).end('Internal Server Error');
    }
  });

  app.listen(port, () => {
    const mode = isProduction ? 'production SSR' : 'development SSR';
    console.log(`Server running in ${mode} mode at http://localhost:${port}`);
  });
}

createServer();
