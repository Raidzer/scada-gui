import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  "./packages/state/vite.config.ts",
  "./packages/viewer/vite.config.ts",
  "./packages/common/vite.config.ts",
  "./packages/app/vite.config.ts",
  "./packages/editor/vite.config.ts",
]);
