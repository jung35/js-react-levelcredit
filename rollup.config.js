import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import cleaner from "rollup-plugin-cleaner";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";
import copy from "rollup-plugin-copy";

const config = {
  input: "src/index.ts",
  external: ["react", "react-dom", "recharts"],
  output: { dir: "dist", format: "cjs", exports: "named" },
  plugins: [
    cleaner({ targets: ["./dist/"] }),
    copy({ targets: [{ src: ["package.json", "README.md"], dest: "dist/" }] }),
    image(),
    typescript(),
    nodeResolve(),
    commonjs({ include: [/node_modules/, /js-lib-api/] }),
    babel({ babelHelpers: "runtime", exclude: /node_modules/ }),
  ],
};

export default config;
