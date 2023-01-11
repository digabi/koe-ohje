const mjpage = require('mathjax-node-page').mjpage

const pageConfig = {
  format: ['TeX'],
  singleDollars: true,
  output: 'svg',
  MathJax: {
    SVG: {
      font: 'STIX-Web',
      undefinedFamily: 'STIXGeneral',
      minScaleAdjust: 110,
    },
    imageFont: null,
    CommonHTML: {
      scale: 110,
    },
  },
}

const nodeConfig = {
  svg: true,
  linebreaks: true,
}

const formatLatex = (input) =>
  new Promise((resolve, reject) => {
    mjpage(input, pageConfig, nodeConfig, (output, err) => {
      if (err) {
        reject(err)
      } else {
        resolve(output)
      }
    })
  })

const replaceInPath = (path) => path.replace(/taulukot/g, 'build')

module.exports = {
  formatLatex,
  replaceInPath,
}
