module.exports = {
  preset: 'jest-puppeteer',
  transform: { '\\.ts$': ['ts-jest'] },
  setupFilesAfterEnv: ['expect-puppeteer'],
  testTimeout: 10000,
}
