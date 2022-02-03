import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn('python', ['-m', 'http.server', '-d', 'public'], {
        stdio: ['ignore', 'inherit', 'inherit'],
        shell: true
      });

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    }
  };
}

export default {
  input: "main.ts",
  output: {
    file: "public/bundle.js",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    process.env.ROLLUP_WATCH && serve(),
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ]
};
