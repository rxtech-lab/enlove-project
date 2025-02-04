import * as path from "path";
import { defineConfig } from "@rspack/cli";
import rspack from "@rspack/core";

export default defineConfig({
  mode: "production",
  entry: {
    main: "./src/index.ts",
  },
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    library: {
      type: "module",
    },
    globalObject: "this",
    clean: true,
  },
  target: ["web", "es2015"],
  resolve: {
    extensions: [".ts", ".js", ".json", ".tsx"],
  },
  experiments: {
    css: true,
    outputModule: true,
  },
  externals: [
    // Add React as external to avoid bundling it
    "react",
    "react-dom",
  ],
  plugins: [
    new rspack.ProvidePlugin({
      React: "react",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["postcss-loader"],
        type: "css",
      },
      {
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  jsx: true,
                },
                target: "es2015",
              },
              // Modify typescript options
              typescript: {
                enabled: true,
                declaration: true,
                declarationDir: "./dist/types",
                // Add module resolution
                module: {
                  type: "es6",
                },
              },
            },
          },
        ],
      },
    ],
  },
});
