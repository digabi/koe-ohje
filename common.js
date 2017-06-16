const mjpage = require('mathjax-node-page').mjpage

const pageConfig = {
    format: ['TeX'],
    singleDollars: true,
    output: 'svg',
    MathJax: {
        SVG: {
            font: 'STIX-Web',
            undefinedFamily: 'STIXGeneral'
        },
        imageFont: null,
        CommonHTML: {
            scale: 90
        }
    }
}

const nodeConfig = {
    svg: true,
    linebreaks: true
}

const formatLatex = (input) => {
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

const replaceInPath = (path) => {
    return path.replace(/taulukot/g, 'build')
}

module.exports = {
    formatLatex,
    replaceInPath
}
