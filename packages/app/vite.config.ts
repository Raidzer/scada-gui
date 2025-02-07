/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import fs from "fs";
import module from "module";
import path from "path";
import { defineConfig, type Plugin } from "vite";

export default defineConfig({
    plugins: [
        react({
            babel: {
                parserOpts: {
                    plugins: ["decorators-legacy", "classProperties"],
                },
            },
        }),
        reactVirtualized(),
    ],
    build: {
        emptyOutDir: true,
        outDir: "../../build",
    },
    server: {
        host: true,
        port: 3000,
        watch: {
            followSymlinks: true,
        },
        hmr: {
            overlay: true,
        },
    },
    publicDir: "../../public",
    resolve: {
        alias: {
            "@scada/common": path.resolve(__dirname, "../common/src"),
            "@scada/editor": path.resolve(__dirname, "../editor/src"),
            "@scada/state": path.resolve(__dirname, "../state/src"),
            "@scada/viewer": path.resolve(__dirname, "../viewer/src"),
        },
    },
    test: {
        coverage: {
            provider: "v8",
            exclude: ["**/build/*"],
            reporter: ["text", "json", "html"],
        },
    },
    optimizeDeps: {
        exclude: ["@scada/common", "@scada/editor", "@scada/state", "@scada/viewer"],
    },
});

// Fix react-virtualized dependency from m7-app-constructor
const require = module.createRequire(import.meta.url);
const WRONG_CODE = `import { bpfrpt_proptype_WindowScroller } from "../WindowScroller.js";`;

function reactVirtualized(): Plugin {
    return {
        name: "flat:react-virtualized",
        configResolved() {
            const file = require
                .resolve("react-virtualized")
                .replace(
                    path.join("dist", "commonjs", "index.js"),
                    path.join("dist", "es", "WindowScroller", "utils", "onScroll.js"),
                );
            const code = fs.readFileSync(file, "utf-8");
            const modified = code.replace(WRONG_CODE, "");
            fs.writeFileSync(file, modified);
        },
    };
}
