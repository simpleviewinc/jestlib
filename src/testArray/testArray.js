import validator from 'jsvalidator'
import { isFunc, isNum } from 'jsutils'

/**
 * Makes consistent the process of executing testArrays
 * Allow possibility of easily adding before/after arrays at a later date
 * @param {Array} tests - Group Test params to pass to the test array
 * @param {function} fn - function to run, to actually run the test
 *
 * @returns {void}
 */
export const testArray = (tests, fn) => {
  
  tests.forEach((val, i) => {

    validator.validate(val, {
      type : "object",
      schema : [
        { name : "name", type : "string", required : true },
        { name : "timeout", type : "number" },
        { name : "before", type : "function" },
        { name : "after", type : "function" },
        { name : "only", type : "boolean", default : false },
        { name : "skip", type : "boolean", default : false },
        { name : "args", type : "any", required : true }
      ],
      throwOnInvalid : true
    })
    
    const testAction = val.skip ? it.skip : val.only ? it.only : it

    
    isFunc(testAction) && testAction(val.name, async () => {

      isNum(val.timeout) && timeout(val.timeout)

      const test = isFunc(val.args)
        ? await val.args()
        : val.args

      isFunc(val.before) && await val.before(test)

      await fn(test)

      isFunc(val.after) &&  await val.after(test)

    })

  })

}

