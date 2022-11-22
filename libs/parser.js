/**
 * @param {string} text
 * @returns {
 *   meta: string
 *   alignments: {
 *     id: string
 *     head: string
 *     results: {
 *       head: Object
 *       rows: string[]
 *     }[]
 *   }[]
 * }
 */
module.exports.parseBlastnResult = function parseBlastnResult(text) {
  const meta = []
  const alignments = []

  const sections = text.split("\n\n\n")
  for (const section of sections) {
    const isAlignment = /^(\>| \w)/.test(section)
    if (isAlignment) {
      const isNewAlignment = section.charAt(0) === ">"

      const alignment = isNewAlignment ? {
        id: "",
        head: "",
        results: []
      } : alignments[alignments.length - 1]

      const rows = section.split("\n\n")
      for (const row of rows) {
        switch (row.charAt(0)) {
          case ">":
            const idMatch = row.match(/\>(.*) /i)
            if (idMatch) alignment.id = idMatch[1].split(" ")[0]
            alignment.head = row
          break
          case "Q":
            alignment.results[alignment.results.length - 1].rows.push(row)
          break
          case ' ': {
            const head = {}

            for (const part of row.split(/,|\n/)) {
              const [key,value] = part.split("=").map(v => v.trim())
              head[key] = value
            }

            alignment.results.push({
              head,
              rows: []
            })
          }

        }
      }
      if (isNewAlignment) alignments.push(alignment)
      continue
    }

    meta.push(section)
  }

  return {
    meta: meta.join("\n\n"),
    alignments
  }
}
