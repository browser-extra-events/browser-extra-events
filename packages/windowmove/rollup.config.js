import typescript from '@rollup/plugin-typescript';
import pkg from "./package.json";

export default {
  input: "index.ts",
  output: [
    { file: pkg.browser, format: 'iife' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [ typescript({ tsconfig: "./tsconfig.json" }) ]
};
