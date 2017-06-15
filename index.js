const mjpage = require('mathjax-node-page').mjpage
const fs = require('fs-extra')

const contentPath = './content/taulukot/'
const buildPath = './content/build/'

const math = 'tab-math.html'
const chem = 'tab-chemistry.html'
const physics = 'tab-physics.html'
const paths = [math, chem, physics]

const pageConfig = {
    format: ["TeX"],
    singleDollars: true
}
const nodeConfig = {
    svg: true,
    linebreaks: true,
    MathJax: {
        imageFont: null,
	    CommonHTML: {
		    scale: 90
	    }
    }
}

const mapPaths = () => {
    return paths.map(path => {
        return fs.readFile(contentPath + path)
            .then((file) => {
                return buildStatic(file, path)
            })
    })
}

const buildStatic = (input, path) => {
    return mjpage(input, pageConfig, nodeConfig, (output) => {
        return fs.writeFile(buildPath + path, output, (err) => {
            if (err) {
                console.error(err)
            }
            console.log('done with ' + path)
        })
    })
}

fs.ensureDir(buildPath)
    .then(mapPaths)
    .catch(err => {
        console.error(err)
    })
