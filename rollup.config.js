import { babel } from "@rollup/plugin-babel";
import typescript from "@rollup/plugin-typescript";
import cleaner from "rollup-plugin-cleaner";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import image from "@rollup/plugin-image";

const config = {
  input: "src/index.ts",
  external: ["react", "react-dom", "recharts", "moment"],
  output: { dir: "dist", format: "cjs", preserveModules: true, preserveModulesRoot: "src", exports: "named" },
  plugins: [
    cleaner({ targets: ["./dist/"] }),
    image(),
    typescript(),
    nodeResolve(),
    commonjs({ include: [/node_modules/] }),
    babel({ babelHelpers: "runtime", exclude: /node_modules/ }),
  ],
};

export default config;
