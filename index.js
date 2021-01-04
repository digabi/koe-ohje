const fs = require('fs-extra')
const { formatLatex, replaceInPath } = require('./common')

const contentPath = './content/'
const buildPath = './build/'

const indexHtml = 'index.html'

const readFromPath = (path) => {
  return fs
    .readFile(contentPath + path)
    .then((file) => {
      return formatLatex(file.toString())
    })
    .then((output) => {
      return fs.writeFile(buildPath + path, output)
    })
    .then(() => {
      console.log('Done with ' + path)
    })
}

const replaceTaulukkoWithBuild = (file) => {
  return fs.readFile(file).then((data) => {
    var path = replaceInPath(data.toString())
    return fs.writeFile(file, path, 'utf8')
  })
}

const getFilesFromDir = (path) => {
  return fs.readdir(path)
}

const build = () => {
  return fs
    .ensureDir(buildPath)
    .then(() => replaceTaulukkoWithBuild(indexHtml))
    .then(() => getFilesFromDir(contentPath))
    .then((files) => {
      return Promise.all(files.map(readFromPath))
    })
}

build()
  .then(() => {
    console.log('Finished')
  })
  .catch((err) => {
    console.error(err)
  })
