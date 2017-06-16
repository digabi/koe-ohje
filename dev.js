const watch = require("node-watch")
const fs = require("fs-extra")
const { formatLatex, replaceInPath } = require("./common")

watch("./content/taulukot/", { recursive: true }, (evt, name) => {
  console.log("%s changed.", name)
  const path = replaceInPath(name)
  if (evt === "update") {
    return fs
      .readFile(name)
      .then(file => {
        return formatLatex(file)
      })
      .then(output => {
        return fs.writeFile(path, output)
      })
      .then(() => {
        console.log("%s updated", path)
      })
      .catch(err => {
        console.error(err)
      })
  }
})
