import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const config = {
  input: "src/index.ts",
  external: ["react", "react-dom", "recharts", "whatwg-fetch", "moment", "react-jss"],
  output: { dir: "dist", format: "cjs" },
  plugins: [typescript(), nodeResolve(), commonjs(), babel({ babelHelpers: "runtime" })],
};

export default config;
