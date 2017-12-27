const mjpage = require("mathjax-node-page").mjpage

const pageConfig = {
  format: ["TeX"],
  singleDollars: true,
  output: "svg",
  MathJax: {
    SVG: {
      font: "Asana-Math",
      undefinedFamily: "STIXGeneral"
    },
    imageFont: null,
    CommonHTML: {
      scale: 100
	  minScaleAdjust: 100
    }
  }
}

const nodeConfig = {
  svg: true,
  linebreaks: true
}

const formatLatex = input => {
  return new Promise((resolve, reject) => {
    mjpage(input, pageConfig, nodeConfig, (output, err) => {
      if (err) {
        reject(err)
      } else {
        resolve(output)
      }
    })
  })
}

const replaceInPath = path => {
  return path.replace(/taulukot/g, "build")
}

module.exports = {
  formatLatex,
  replaceInPath
}
