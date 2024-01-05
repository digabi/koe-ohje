import * as MathJaxNode from 'mathjax-node'

const fixSvgAttributes = (svg: string): string => svg.replace(/aria-labelledby=".+"/, 'aria-hidden="true"')

const fixMathMLAttributes = (mml: string): string => mml.replace(/display="block"/, 'class="screenreader-only"')

const getButtonHTML = (latex: string, svg: string, mathml: string, buttonClass: string): string =>
  `<button class="${buttonClass}" data-latexformula="${latex}">
  ${fixSvgAttributes(svg)}
  ${fixMathMLAttributes(mathml)}
  </button>`

const formatLatexWorker = async (
  htmlPage: string,
  formulaRe: RegExp,
  formulaTemplate: string,
  buttonClass: string,
): Promise<string> => {
  const latexFormulas = Array.from(htmlPage.matchAll(formulaRe), (m) => m[1])

  let formattedHtmlPage = htmlPage

  for (const latexFormula of latexFormulas) {
    let svg: MathJaxNode.MathjaxNodeTypesetResponse = {}
    try {
      svg = await MathJaxNode.typeset({
        math: latexFormula,
        format: 'TeX',
        linebreaks: true,
        width: 100,
        svg: true,
      })
    } catch (e) {
      console.error(`Error while processing ${latexFormula}`, e)
      svg.svg = 'ERROR'
    }

    let mathml: MathJaxNode.MathjaxNodeTypesetResponse = {}
    try {
      mathml = await MathJaxNode.typeset({
        math: latexFormula,
        format: 'TeX',
        mml: true,
      })
    } catch (e) {
      console.error(`Error while processing ${latexFormula}`, e)
      mathml.mml = 'ERROR'
    }

    const buttonHtml = getButtonHTML(latexFormula, svg['svg'], mathml['mml'], buttonClass)
    const searchTerm = formulaTemplate.replace('#', latexFormula)

    formattedHtmlPage = formattedHtmlPage.replace(searchTerm, buttonHtml)
  }

  return formattedHtmlPage
}

export const formatLatex = async (htmlPage: string) => {
  MathJaxNode.config({
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
  })

  const inlineFormulaeFormattedHtml = await formatLatexWorker(htmlPage, /\\\((.+?)\\\)/g, `\\(#\\)`, 'mjpage')
  const centeredFormlulaeFormattedHtml = await formatLatexWorker(
    inlineFormulaeFormattedHtml,
    /\\\[(.+?)\\\]/g,
    `\\[#\\]`,
    'mjpage mjpage__block',
  )

  return centeredFormlulaeFormattedHtml
}

export const replaceInPath = (path: string) => path.replace(/taulukot/g, 'build')

export const replaceTagRandom = (pageText: string) => {
  const randomNumber = Date.now()
  return pageText.replace(/###RANDOM###/g, randomNumber.toString())
}
