# jestlib
  * Jest testing helper library
  
## Install
  * Add to your package.json
  ```json
    "jestlib": "git+https://github.com/simpleviewinc/jestlib"
  ```

## Use
  * Import or Require the helpers into your jest tests files
  ```js
    // Import the helper methods
    import { testArray } from 'jestlib'
    // Or use require
    const { testArray } = require('jestlib')
  ```

## Functions

  * testArray
    * Same as [mochalib](https://github.com/simpleviewinc/sv-npm-mochalib)
      * See that repos Readme for more information
    * See below example for using testArray
    ```js
    describe('multiply by 2', () => {

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
    ```
  * mockConsole
    * Mocks methods on the global `console` object.
    * Takes an array `console` methods names to be mocked
    * Returns a function that will reset the console methods
    * The below example will mock `console.error` and `console.warn`
    ```js
      // Mock the console methods
      const resetMocks = mockConsole(['error', 'warn])

      // Write tests with mocked console methods

      // After tests, reset the console methods to their original state
      resetMocks()
    ```

