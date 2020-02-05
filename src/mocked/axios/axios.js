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

export const Axios = jest.fn(request => getAxiosResponse(request))

Axios.delete = jest.fn(request => getAxiosResponse(request, 'delete'))
Axios.get = jest.fn(request => getAxiosResponse(request, 'get'))
Axios.patch = jest.fn(request => getAxiosResponse(request, 'patch'))
Axios.post = jest.fn(request => getAxiosResponse(request, 'post'))
Axios.put = jest.fn(request => getAxiosResponse(request, 'put'))
Axios.trace = jest.fn(request => getAxiosResponse(request, 'trace'))
Axios.create = jest.fn(config => axiosConfig = deepMerge(axiosConfig, config))
Axios.getConfig = () => axiosConfig
