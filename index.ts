import fs from 'fs-extra'
import { formatLatex, replaceInPath, replaceTagRandom } from './common'

const contentPath = './content/'
const buildPath = './build/'

const indexHtml = 'index.html'

const readFromPath = async (path: string) => {
  console.log(`Working with ${path}...`)
  const file = await fs.readFile(contentPath + path)
  const formattedOutput = await formatLatex(file.toString())
  const outputWithRandomTags = replaceTagRandom(formattedOutput)
  await fs.writeFile(buildPath + path, outputWithRandomTags)
  console.log(`...done with ${path}`)
}

const replaceTaulukkoWithBuild = async (file: string) => {
  const data = await fs.readFile(file)
  const path = replaceInPath(data.toString())
  return fs.writeFile(file, path, 'utf8')
}

const getFileNamesFromDir = async (path: string) => {
  const dirents = await fs.readdir(path, { withFileTypes: true })
  return dirents.filter((dirent) => dirent.isFile()).map((dirent) => dirent.name)
}

const build = async () => {
  await fs.ensureDir(buildPath)
  await replaceTaulukkoWithBuild(indexHtml)
  const contentFileNames = await getFileNamesFromDir(contentPath)

  for (const filename of contentFileNames) {
    await readFromPath(filename)
  }
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
