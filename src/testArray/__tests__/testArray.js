import { isObj } from 'jsutils'

jest.resetModules()

const { testArray } = require('../testArray')

describe('testArray', () => {

  const tests = [
    {
      name : "test 1",
      args : {
        num : 1,
        result : 2
      }
    },
    {
      name : "test 2",
      args : {
        num : 2,
        result : 4
      }
    }
  ]

  testArray(tests, test => expect(test.num * 2).toBe(test.result))

})