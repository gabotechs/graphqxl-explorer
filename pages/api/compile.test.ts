import handler from './compile'
import { createMocks } from 'node-mocks-http'

describe('compile', function () {
  it('should work if valid', async function () {
    const { req, res } = createMocks({
      method: 'GET',
      body: {
        graphqxl: 'type MyType { foo: String }'
      }
    })

    await handler(req, res)

    const response: string = res._getData()
    expect(response.trim()).toEqual(`\
type MyType {
  foo: String
}`)
  })

  it('should work if invalid', async function () {
    const { req, res } = createMocks({
      method: 'GET',
      body: {
        graphqxl: 'type MyType { foo String }'
      }
    })

    await handler(req, res)

    const response: string = res._getData()
    expect(response.trim()).toEqual(`\
Error: Could not parse GraphQXL spec:

 --> 1:19
  |
1 | type MyType { foo String }
  |                   ^---
  |
  = expected arguments`)
  })
})
