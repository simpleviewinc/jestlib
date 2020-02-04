import { isObj, isStr, get, deepMerge } from 'jsutils'

const responseModel = {
  data: {},
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {},
  request: {} 
}

let axiosConfig = {}

const getResponse = type => (
  type && get(global, `testMocks.axios.${type}.response`) || get(global, `testMocks.axios.response`, responseModel)
)

const getAxiosResponse = (request, type) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {

      const url = isStr(request)
        ? request
        : isObj(request) && request.url

      const testRes = getResponse(type)

      url ? resolve(testRes) : reject(testRes)

    }, 1)
  })
}

export const axios = jest.fn(request => getAxiosResponse(request))

axios.delete = jest.fn(request => getAxiosResponse(request, 'delete'))
axios.get = jest.fn(request => getAxiosResponse(request, 'get'))
axios.patch = jest.fn(request => getAxiosResponse(request, 'patch'))
axios.post = jest.fn(request => getAxiosResponse(request, 'post'))
axios.put = jest.fn(request => getAxiosResponse(request, 'put'))
axios.trace = jest.fn(request => getAxiosResponse(request, 'trace'))
axios.create = jest.fn(config => axiosConfig = deepMerge(axiosConfig, config))
axios.getConfig = () => axiosConfig
