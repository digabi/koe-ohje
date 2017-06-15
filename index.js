const mjpage = require('mathjax-node-page').mjpage;
const fs = require('fs-extra');
const input = fs.readFileSync('./content/taulukot/tab-math.html');

const buildFolder = 'build/'
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

fs.ensureDir(buildFolder)
    .then(() => {
        mjpage(input, pageConfig, nodeConfig, function (output) {

            fs.writeFile(buildFolder + "hontsa.html", output, function (err) {
                if (err) {
                    console.error(err)
                }
                console.log('done')
            })
        })
    })
    .catch(err => {
        console.error(err)
    })