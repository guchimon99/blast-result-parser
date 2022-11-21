const fs = require("fs")
const path = require("path")
const { outputFile } = require("./libs/file")

const inputFilePath = process.argv[2]
const outputDirPath = process.argv[3]

function parseBlastnResult(text) {
  const [head, ...body] = text.split(">")

  const alignments = []
  for(const alignment of body) {
    const id = alignment.split(" ")[0].split("|")[0]
    alignments.push({
      id,
      text: `>${alignment}`
    })
  }

  return {
    head,
    alignments
  }
}

const file = fs.readFileSync(path.resolve(__dirname, inputFilePath), { encoding:"utf-8" })
const { head, alignments } = parseBlastnResult(file)
outputFile(path.resolve(outputDirPath, "head.txt"), head)
for(const {id,text} of alignments) {
  outputFile(path.resolve(outputDirPath, 'alignments', `${id}.txt`), text)
}
