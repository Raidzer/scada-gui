import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        coverage: {
            provider: "v8",
            reporter: ["text", "json", "html"],
            exclude: ["node_modules", "build"],
        },
    },
    resolve: {
        alias: {
            "@scada/common": "/packages/common/src",
            "@scada/editor": "/packages/editor/src",
            "@scada/state": "/packages/state/src",
            "@scada/viewer": "/packages/viewer/src",
            "@scada/app": "/packages/app/src",
        },
    },
});
