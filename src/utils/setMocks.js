const path = require('path')
const fs = require('fs')
const { isObj, mapObj } = require('jsutils')
const resetMocks = path.join('./reset_mocks')
const rootDir = require('app-root-path').path
const KEG_PATH = path.join(rootDir, 'node_modules/sv-keg')
const BASE_PATH = path.join(KEG_PATH, '/core/base')
const TESTS_FOLDER = '/__tests__/'


/**
 * Wraps require in a try catch, and tries to load a file
 *
 * @returns {module.exports} - Whatever is exported from the required file
 */
const loadFile = () => {
  try {
    return fs.existsSync(toLoad)
      ? require(toLoad)
      : false
  }
  catch(e){
    return false
  }
}

/**
 * Get all node modules keys as an array from the root project, and keg project if it exists
 * When a key is passed in that matches a node_module
 * DON'T update the path
 * 
 * @returns {Array} - An array of node_modules names that should not have their paths updated when mocked
 */
const buildNoUpdatePaths = () => {
  const rootPackageConf = loadFile(path.resolve(rootDir, './package.json')) || {}
  const kegPackageConf = loadFile(path.resolve(KEG_PATH, './package.json')) || {}

  return Object.keys(rootPackageConf.dependencies)
    .concat(Object.keys(rootPackageConf.devDependencies))
    .concat(Object.keys(kegPackageConf.dependencies))
    .concat(Object.keys(kegPackageConf.devDependencies))
}
const noPathUpdate = buildNoUpdatePaths()

/**
 * Finds the parent test module that called the setMocks method
 * Use the test modules path as a relative path to find the correct file to be mocked
 * @param {Object} parentMod - module object of the a file
 *
 * @returns {string} - path to the test file that called setMock
 */
const findTestFile = parentMod => {
  return parentMod.filename.indexOf(TESTS_FOLDER) !== -1
    ? parentMod.filename
    : findTestFile(parentMod.parent)
}

/**
 * Gets the path to the module to be mocked based on the passed in file path
 * Defaults to <root_dir>/core/base
 * @param {string} filePath - initial path to the file to be mocked
 *
 * @returns {string} - path to the module to be mocked
 */
const getPath = filePath => {
  const parentPath = findTestFile(module.parent)
  const split = parentPath.split('/')
  split.pop()

  return path.resolve(split.join('/'), filePath)
}

/**
 * Returns the relative path or path from the <root_dir>/core/base
 * @param {string} filePath - initial path to the file to be mocked
 *
 * @returns {string} - path to the module to be mocked
 */
const getMockPath = filePath => {
  // If in the noPathUpdate array, just return the original value
  return noPathUpdate.indexOf(filePath) !== -1
    ? filePath
    : filePath.indexOf('../') !== 0
    ? path.join(BASE_PATH, filePath)
    : getPath(filePath)
}

/**
 * Uses jest to mock the passed in module
 * Resets all current mocks, when second argument is true
 * @param {*} toMock
 * @param {*} reset
 */
export const setMocks = (toMock, reset) => {
  reset && resetMocks()
  isObj(toMock) &&
    mapObj(toMock, (key, value) => {
      jest.setMock(getMockPath(key), value)
    })
}
