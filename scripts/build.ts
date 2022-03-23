import { build, BuildConfig, dirname } from "estrella";
import { dtsPlugin as dts } from "esbuild-plugin-d.ts";

const common: BuildConfig = {
  entry: [
    "./src/screenchange.js",
    "./src/viewportmove.js",
    "./src/windowmove.js",
    "./src/zoomchange.js",
  ],
  outdir: "./dist/",
  platform: "browser",
  bundle: true,
  cwd: dirname(__dirname),
}

build({
  ...common,
  format: "iife",
  // @ts-ignore
  plugins: [ dts() ]
})

build({
  ...common,
  outExtension: {
    ".js": ".min.js"
  },
  format: "iife",
  minify: true,
  sourcemap: "external",
  metafile: true,
})