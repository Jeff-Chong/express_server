import makeSignUp from './sign-up'
import makeFakeUser from '../../../__test__/fixtures/user'

describe('sign up controller', () => {
  it('注册成功', async () => {
    const signUp = makeSignUp({ addUser: u => u })
    const user = makeFakeUser()
    const request = {
      headers: {
        body: user
      }
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 201,
      body: { registered: request.body }
    }
    const actual = await signUp(request)
    expect(expected).toEqual(actual)
  })

  it('注册失败', async () => {
    const signUp = makeSignUp({ addUser: () => { throw Error('Pow') } })
    const user = makeFakeUser()
    const request = {
      headers: {
        body: user
      }
    }
    const expected = {
      headers: {
        'Content-Type': 'application/json'
      },
      statusCode: 400,
      body: { error: 'Pow' }
    }
    const actual = await signUp(request)
    expect(expected).toEqual(actual)
  })
})
