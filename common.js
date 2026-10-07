const MathJax = require('mathjax')

const mathjaxInit = MathJax.init({
  loader: {
    load: ['input/tex', 'output/svg', 'input/mml/entities'],
    failed: (err) => {
      throw err
    },
  },
  tex: {
    inlineMath: [
      ['$', '$'],
      ['\\(', '\\)'],
    ],
  },
  output: {
    font: 'mathjax-stix2',
    displayOverflow: 'linebreak',
    linebreaks: { inline: false, width: '100ex' },
  },
  svg: { fontCache: 'none' },
  startup: { typeset: false },
})

const formatLatex = async (input) => {
  await mathjaxInit
  const adaptor = MathJax.startup.adaptor
  const document = MathJax.startup.mathjax.document(input, {
    InputJax: MathJax.startup.getInputJax(),
    OutputJax: MathJax.startup.getOutputJax(),
  })
  await document.renderPromise()

  for (const math of document.math) {
    const container = math.typesetRoot
    const svg = adaptor.tags(container, 'svg')[0]
    if (!svg) continue

    const title = adaptor.node('title', {}, [adaptor.text(math.math)], 'http://www.w3.org/2000/svg')
    adaptor.insert(title, adaptor.firstChild(svg))

    const button = adaptor.node('button', {
      type: 'button',
      class: math.display ? 'mjpage mjpage__block' : 'mjpage',
      role: 'math',
      'aria-label': math.math,
    })
    adaptor.replace(button, container)
    adaptor.append(button, container)
  }

  return adaptor.doctype(document.document) + adaptor.outerHTML(adaptor.root(document.document))
}

const replaceInPath = (path) => path.replace(/taulukot/g, 'build')

const replaceTagRandom = (pageText) => {
  const randomString = Date.now()
  return pageText.replace(/###RANDOM###/g, randomString)
}

module.exports = {
  formatLatex,
  replaceInPath,
  replaceTagRandom,
}
