const { Axios } = require('../axios')

const verbs = [ 'get', 'post', 'put', 'patch', 'trace', 'delete' ]
const testUrl = 'http://www.google.com'

describe('Axios', () => {
  
  describe('Http Verb Mocks', () => {
    it('should mock the axios function', () => {

      expect(Axios.name).toBe('mockConstructor')
      expect(Axios._isMockFunction).toBe(true)

    })

    it('should return a promise for the axios function', () => {
      expect(Axios(testUrl).toString()).toBe('[object Promise]')
    })

    it('should mock the http verbs on the axios object', () => {

      verbs.map(verb => {
        expect(Axios[verb].name).toBe('mockConstructor')
        expect(Axios[verb]._isMockFunction).toBe(true)
      })

    })

    it('should return a promise for each httpd verb', () => {
      verbs.map(verb => expect(Axios[verb](testUrl).toString()).toBe('[object Promise]'))
    })

  })

  describe('create Mock', () => {

    it('should update the axios config with the passed in config', () => {

      Axios.create({ baseUrl: testUrl })

      expect(Axios.getConfig().baseUrl).toBe(testUrl)

    })
  })

})
