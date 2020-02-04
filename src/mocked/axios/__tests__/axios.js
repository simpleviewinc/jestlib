const { axios } = require('../axios')

const verbs = [ 'get', 'post', 'put', 'patch', 'trace', 'delete' ]
const testUrl = 'http://www.google.com'

describe('axios', () => {
  
  describe('Http Verb Mocks', () => {
    it('should mock the axios function', () => {

      expect(axios.name).toBe('mockConstructor')
      expect(axios._isMockFunction).toBe(true)

    })

    it('should return a promise for the axios function', () => {
      expect(axios(testUrl).toString()).toBe('[object Promise]')
    })

    it('should mock the http verbs on the axios object', () => {

      verbs.map(verb => {
        expect(axios[verb].name).toBe('mockConstructor')
        expect(axios[verb]._isMockFunction).toBe(true)
      })

    })

    it('should return a promise for each httpd verb', () => {
      verbs.map(verb => expect(axios[verb](testUrl).toString()).toBe('[object Promise]'))
    })

  })

  describe('create Mock', () => {

    it('should update the axios config with the passed in config', () => {

      axios.create({ baseUrl: testUrl })

      expect(axios.getConfig().baseUrl).toBe(testUrl)

    })
  })

})
