import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  preview: {
    port: 3000,
  },
  plugins: [
    react(),
    federation({
      name: "host-admin",
      remotes: {
        "remote-shift": {
          type: "module",
          name: "remote-shift",
          entry: "http://localhost:9000/remoteEntry.js",
          entryGlobalName: "remote",
          shareScope: "default",
        },
        "remote-hrm": {
          type: "module",
          name: "remote-hrm",
          entry: "http://localhost:9001/remoteEntry.js",
          entryGlobalName: "remote",
          shareScope: "default",
        },
      },
      filename: "remoteEntry.js",
      shared: {
        react: { singleton: true },
      },
    }),
  ],
  build: {
    target: "chrome89",
  },
});
