const mjpage = require('mathjax-node-page').mjpage
const fs = require('fs-extra')

const contentPath = './content/taulukot/'
const buildPath = './content/build/'

const indexHtml = 'index.html'

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
            return formatLatex(file, path)
        }).then((output) => {
            return fs.writeFile(buildPath + path, output)
        }).then(() => {
            console.log('Done with ' + path)
        })
}

const formatLatex = (input, path) => {
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

const replaceTaulukkoWithBuild = (file) => {
    return fs.readFile(file)
        .then(data => {
            var result = data.toString().replace(/taulukot/g, 'build')
            return fs.writeFile(file, result, 'utf8')
        })
}

const getFilesFromDir = (path) => {
    return fs.readdir(path)
}

fs.ensureDir(buildPath)
    .then(() => replaceTaulukkoWithBuild(indexHtml))
    .then(() => getFilesFromDir(contentPath))
    .then((files) => {
        return Promise.all(files.map(readFromPath))
    })
    .then(() => {
        console.log('Finished')
    })
    .catch(err => {
        console.error(err)
    })

