"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_static_gzip_1 = __importDefault(require("express-static-gzip"));
const path_1 = __importDefault(require("path"));
const basePath = "/sokos-up-oppdragsinfo";
const buildPath = path_1.default.resolve(__dirname, "../dist");
const server = (0, express_1.default)();
const corsAllowedOrigin =
  process.env.CORS_ALLOWED_ORIGIN || "http://localhost:5173";
server.use((0, cors_1.default)({ origin: corsAllowedOrigin }));
server.use(
  basePath,
  (0, express_static_gzip_1.default)(buildPath, {
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
