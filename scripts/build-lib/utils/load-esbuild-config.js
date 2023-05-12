import path from "path";

function module() {
  const defaultFile = path.resolve("./", "esbuild.config.js");
  return async function loadESbuildConfigJSFile(file = defaultFile) {
    const { default: data } = await import(file);
    return data;
  };
}

export default module();
