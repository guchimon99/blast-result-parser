const fs = require("fs")
const path = require("path")

/**
 * @param {string} path
 * @param {any} data
 */
module.exports.outputFile = function outputFile (outputPath, data) {
  const dirname = path.dirname(outputPath)
  if (fs.existsSync(dirname) === false) fs.mkdirSync(dirname, { recursive: true })
  fs.writeFileSync(outputPath, data, { encoding: "utf-8" })
}
