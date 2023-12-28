import * as Mjpage from 'mathjax-node-page'

interface PageConfig {
  format: [string],
  singleDollars: boolean,
  output: string,
  MathJax: {
    SVG: {
      font: string,
      undefinedFamily: string,
      minScaleAdjust: number
    },
    imageFont: string|null,
    CommonHTML: {
      scale: number,
    }
  }

}
const pageConfig: PageConfig = {
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

export const formatLatex = (input: string): Promise<string> =>
  new Promise((resolve, reject) => {
    Mjpage.mjpage(input, pageConfig, nodeConfig, (output: string, err: string) => {
      if (err) {
        reject(err)
      } else {
        resolve(output)
      }
    })
  })

export const replaceFormulaSpansWithButtons = (pageText: string) => {
  const inlineFormulasReplacedPageText = pageText.replace(
    /<span class="mjpage">(.*?aria-labelledby="(.*?)">.*?)<\/span>/gs,
    '<button class="mjpage" role="math" aria-labelledby="$2">$1</button>',
  )
  const blockFormulasReplacedPageText = inlineFormulasReplacedPageText.replace(
    /<span class="mjpage mjpage__block">(.*?aria-labelledby="(.*?)">.*?)<\/span>/gs,
    '<button class="mjpage mjpage__block" role="math" aria-labelledby="$2">$1</button>',
  )
  return blockFormulasReplacedPageText
}

export const replaceInPath = (path: string) => path.replace(/taulukot/g, 'build')

export const replaceTagRandom = (pageText: string) => {
  const randomNumber = Date.now()
  return pageText.replace(/###RANDOM###/g, randomNumber.toString())
}
