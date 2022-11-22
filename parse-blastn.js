const fs = require("fs")
const path = require("path")
const { outputFile } = require("./libs/file")
const { parseBlastnResult } = require("./libs/parser")

const inputFilePath = process.argv[2]
const outputDirPath = process.argv[3]

const file = fs.readFileSync(path.resolve(__dirname, inputFilePath), { encoding:"utf-8" })
const { meta, alignments } = parseBlastnResult(file)
outputFile(path.resolve(outputDirPath, "meta.txt"), meta)
for(const {id, head, results } of alignments) {
  outputFile(path.resolve(outputDirPath, 'alignments', id, `head.txt`), head)
  for (const index in results) {
    const { head, rows } = results[index]
    outputFile(path.resolve(outputDirPath, 'alignments', id, index, `head.json`), JSON.stringify(head, null, 2))
    outputFile(path.resolve(outputDirPath, 'alignments', id, index, `rows.txt`), rows.join("\n\n"))
  }
}
