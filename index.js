"use strict";

const { promisify } = require("util");
const path = require("path");
const os = require("os");
const fs = require("fs");

const cache = require("@actions/tool-cache");
const core = require("@actions/core");

const chmod = promisify(fs.chmod);

if (require.main === module) {
  main().catch((err) => {
    console.error(err.stack);
    process.exit(1);
  });
}

async function main() {
  try {
    const version = core.getInput("version");
    const platform = os.platform();
    let arch = os.arch();
    if (arch === "x64") {
      arch = "amd64";
    }

    let toolPath = cache.find("agebox", version, arch);
    let downloadUrl = `https://github.com/slok/agebox/releases/download/${version}/agebox-${platform}-${arch}`
    console.log(downloadUrl)

    if (!toolPath) {
      const downloadPath = await cache.downloadTool(downloadUrl);
      toolPath = await cache.cacheFile(downloadPath, "agebox", "agebox", version);
    }

    await chmod(path.join(toolPath, "agebox"), 0o755);
    core.addPath(toolPath);
  } catch (error) {
    core.setFailed(error.message);
  }
}
