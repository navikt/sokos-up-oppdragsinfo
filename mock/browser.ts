import { setupWorker } from "msw/browser";
import { handlers } from "../mock/handlers";

// Setup browser service worker using the given handlers
export const worker = setupWorker(...handlers);
