import fs from "fs";
import path from "path";

async function enumerate(dir) {
  if (!fs.existsSync(dir)) return [];
  const isFile = await new Promise((resolve, reject) => {
    fs.lstat(dir, (err, stats) => {
        if (err) {
            reject(err);
            return 
        }
        resolve(stats.isFile())
    })
  });
  if (isFile) return [dir]
  const files = await new Promise((resolve, reject) => {
    fs.readdir(dir, { recursive: true }, (err, files) => {
        if (err) {
            reject(err)
            return
        } 
        resolve(files)
    })
  })
}

async function enumerateFiles(dir) {
  return new Promise((resolve, reject) => {});
  if (dir && fs.existsSync(dir)) {
    fs.fstatSync(dir).isDirectory();
  }
}

fs.readdir(path.resolve("./", "src"), { recursive: true }, (error, files) => {
  if (error) {
    console.error(error);
  }
  console.log(files);
});

/** @type {import('esbuild').BuildOptions} */
export default {
  bundle: true,
  entryPoints: ["src/index.ts"],
  outdir: "lib",
  platform: "neutral",
  target: "esnext",
};
