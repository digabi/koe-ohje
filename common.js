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

const replaceFormulaSpansWithButtons = (pageText) => {
  const inlineFormulasReplacedPageText = pageText.replace(
    /<span class="mjpage">(.*?aria-labelledby="(.*?)">.*?)<\/span>/gs,
    '<button class="mjpage" role="math" aria-labelledby="$2">$1</button>'
  )
  const blockFormulasReplacedPageText = inlineFormulasReplacedPageText.replace(
    /<span class="mjpage mjpage__block">(.*?aria-labelledby="(.*?)">.*?)<\/span>/gs,
    '<button class="mjpage mjpage__block" role="math" aria-labelledby="$2">$1</button>'
  )
  return blockFormulasReplacedPageText
}

const replaceInPath = (path) => path.replace(/taulukot/g, 'build')

const replaceTagRandom = (pageText) => {
  const randomString = Date.now()
  return pageText.replace(/###RANDOM###/g, randomString)
}

module.exports = {
  formatLatex,
  replaceFormulaSpansWithButtons,
  replaceInPath,
  replaceTagRandom,
}
