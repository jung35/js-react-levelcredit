import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
// import cleaner from "rollup-plugin-cleaner";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const config = {
  input: "src/index.ts",
  external: ["react", "react-dom", "recharts", "whatwg-fetch", "moment", "react-jss"],
  output: { dir: "dist", format: "cjs" },
  plugins: [
    /*cleaner({ targets: ["./dist/"] }), */ typescript(),
    resolve(),
    babel({ babelHelpers: "runtime" }),
    commonjs(),
  ],
};

export default config;
