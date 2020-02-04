/** @module helpers */
'use strict'

/**
 * @function
 * Creates a jest mock function if the jest global exists, or the default mockFunct
 * @returns - a jest mock function
 */
let mockFunc = (data) => { return data  }
try { mockFunc = jest.fn }
catch(e){}

export {
  mockFunc
}
