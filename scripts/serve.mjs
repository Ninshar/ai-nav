/**
 * 零依赖静态开发服务器
 * 用法：npm run dev （默认 http://localhost:5173，可用 PORT 环境变量覆盖）
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, isAbsolute, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const port = Number(process.env.PORT) || 5173;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = decodeURIComponent(url.pathname);
    const relativePath = pathname === "/" ? "/index.html" : pathname;
    const filePath = resolve(root, `.${relativePath}`);
    const rel = relative(root, filePath);

    // 防止路径穿越到项目目录之外
    if (isAbsolute(rel) || rel.startsWith("..")) {
      res.writeHead(403, { "content-type": "text/plain; charset=utf-8" });
      res.end("403 Forbidden");
      return;
    }

    const data = await readFile(filePath);
    res.writeHead(200, { "content-type": MIME_TYPES[extname(filePath)] || "application/octet-stream" });
    res.end(data);
  } catch {
    res.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    res.end("404 Not Found");
  }
});

server.listen(port, () => {
  console.log(`AI Nav 开发服务器已启动：http://localhost:${port}`);
});
