import { federation } from "@module-federation/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
// import { name } from "./package.json";

export default defineConfig({
  base: "./",
  plugins: [
    react(),
    federation({
      name: "remote-shift",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.tsx",
      },
      shared: {
        react: { singleton: true },
      },
    }),
  ],
  build: {
    target: "chrome89",
  },
});
