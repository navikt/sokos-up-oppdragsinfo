import cors from "cors";
import express from "express";
import expressStaticGzip from "express-static-gzip";
import { resolve } from "path";

const basePath = "/sokos-up-oppdragsinfo";
const buildPath = resolve(__dirname, "../dist");
const server = express();
const corsAllowedOrigin =
  process.env.CORS_ALLOWED_ORIGIN || "http://localhost:5173";

server.use(cors({ origin: corsAllowedOrigin }));

server.use(
  basePath,
  expressStaticGzip(buildPath, {
    enableBrotli: true,
    orderPreference: ["br"],
  }),
);

server.get(
  [`${basePath}/internal/isAlive`, `${basePath}/internal/isReady`],
  (_req, res) => res.sendStatus(200),
);

// eslint-disable-next-line no-console
server.listen(8080, () => console.log("Server listening on port 8080"));
