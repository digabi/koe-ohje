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
      return
    })
}

const replaceTaulukkoWithBuild = (file) => {
  return fs.readFile(file).then((data) => {
    var path = replaceInPath(data.toString())
    return fs.writeFile(file, path, 'utf8')
  })
}

const getFileNamesFromDir = async (path) => {
  const dirents = await fs.readdir(path, { withFileTypes: true })
  return dirents.filter((dirent) => dirent.isFile()).map((dirent) => dirent.name)
}

const build = async () => {
  await fs.ensureDir(buildPath)
  await replaceTaulukkoWithBuild(indexHtml)
  const contentFileNames = await getFileNamesFromDir(contentPath)
  return Promise.all(contentFileNames.map(readFromPath))
}

build()
  .then(() => {
    console.log('Finished')
    return
  })
  .catch((err) => {
    console.error(err)
    return
  })
