const mjpage = require('mathjax-node-page').mjpage
const fs = require('fs-extra')

const contentPath = './content/taulukot/'
const buildPath = './content/build/'

const index = 'index.html'
const math = 'tab-math.html'
const chem = 'tab-chemistry.html'
const physics = 'tab-physics.html'
const paths = [index, math, chem, physics]

const pageConfig = {
    format: ["TeX"],
    singleDollars: true,
    output: 'svg',
    MathJax: {
        SVG: {
            font: "STIX-Web",
            undefinedFamily: "STIXGeneral"
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

const readFromPath = (path) => {
    return fs.readFile(contentPath + path)
        .then((file) => {
            return buildStatic(file, path)
        }).then((output) => {
            return fs.writeFile(buildPath + path, output)
        }).then(() => {
            console.log('Done with ' + path)
        })
}

const buildStatic = (input, path) => {
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

const replaceIndexHtml = () => {
    return fs.readFile(index)
        .then(data => {
            var result = data.toString().replace(/taulukot/g, 'build')
            return fs.writeFile(index, result, 'utf8')
        })
}

fs.ensureDir(buildPath)
    .then(replaceIndexHtml)
    .then(() => {
        return Promise.all(paths.map(readFromPath))
    })
    .then(() => {
        console.log('Finished')
    })
    .catch(err => {
        console.error(err)
    })

