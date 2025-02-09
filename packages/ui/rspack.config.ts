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
    path: path.resolve(__dirname, "dist", "lib"),
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
    outputModule: true,
  },
  externals: [
    // Add React as external to avoid bundling it
    "react",
    "react-dom",
    // Add framer-motion to externals
    "framer-motion",
    /^framer-motion\/.*/,
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
        use: ["style-loader", "css-loader", "postcss-loader"],
        type: "javascript/auto",
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
            },
          },
        ],
      },
    ],
  },
});
