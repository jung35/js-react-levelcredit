import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import cleaner from "rollup-plugin-cleaner";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const config = {
  input: "src/index.ts",
  external: ["react", "react-dom", "recharts", "moment", "react-jss"],
  output: { dir: "dist", format: "cjs" },
  plugins: [
    cleaner({ targets: ["./dist/"] }),
    typescript(),
    nodeResolve(),
    commonjs({ include: [/node_modules/] }),
    babel({ babelHelpers: "runtime" }),
  ],
};

export default config;
