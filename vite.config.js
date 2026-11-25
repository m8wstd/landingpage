import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function saveDbPlugin() {
  return {
    name: 'save-db-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method === 'POST' && req.url?.endsWith('/__save-db')) {
          let body = '';
          req.on('data', (chunk) => { body += chunk; });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              if (data.projects) {
                const projectsPath = path.resolve(process.cwd(), 'src/data/projectsData.js');
                fs.writeFileSync(
                  projectsPath,
                  `export const initialProjects = ${JSON.stringify(data.projects, null, 2)};\n`,
                  'utf8'
                );
              }
              if (data.siteConfig) {
                const configPath = path.resolve(process.cwd(), 'src/data/siteConfigData.js');
                fs.writeFileSync(
                  configPath,
                  `// Default master site content configuration\nexport const defaultSiteConfig = ${JSON.stringify(data.siteConfig, null, 2)};\n`,
                  'utf8'
                );
              }
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: true }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ok: false, error: err.message }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), saveDbPlugin()],
  base: '/landingpage/',
})
