import { build, analyzeMetafile, BuildOptions } from "esbuild";
import { dtsPlugin as dts } from "esbuild-plugin-d.ts";

const watch: boolean = !!process.argv.find(v => v === "--watch");

const common: BuildOptions = {
  entryPoints: [
    "./src/screenchange.js",
    "./src/viewportmove.js",
    "./src/windowmove.js",
    "./src/zoomchange.js",
  ],
  outdir: "./dist/",
  platform: "browser",
  bundle: true,
  watch,
}

build({
  ...common,
  format: "iife",
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
  .then(result => analyzeMetafile(result.metafile))
  .then(text => console.log(text))
