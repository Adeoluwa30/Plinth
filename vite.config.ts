import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The Cloud preview host changes when the workspace is restored, so it is
// passed in at start-up (PREVIEW_ALLOWED_HOST) instead of being committed.
const env = (globalThis as { process?: { env?: Record<string, string | undefined> } })
  .process?.env;
const previewHost = env?.PREVIEW_ALLOWED_HOST;

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: previewHost ? [previewHost] : [],
  },
});
