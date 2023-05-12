/** @type {import('esbuild').BuildOptions} */
export default {
    bundle: false,
    entryPoints: [
        "src/index.ts"
    ],
    outbase: "./",
    outdir: "lib",
    platform: "neutral",
    target: 'esnext'
}