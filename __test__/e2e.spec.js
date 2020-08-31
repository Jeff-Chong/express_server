import axios from 'axios'
import usersDb from '../src/auth/data-access'
import itemsDb from '../src/item/data-access'
import makeFakeUser from './fixtures/user'
import makeFakeItem from './fixtures/item'
import { SERVER_BASE_URL, JWT_ADMIN_NAME } from '../src/_helpers'

describe('express server', () => {
  beforeAll(() => {
    axios.defaults.baseURL = SERVER_BASE_URL
    axios.defaults.headers.common['Content-Type'] = 'application/json'
    axios.defaults.validateStatus = function (status) {
      // Throw only if the status code is greater than or equal to 500
      return status < 500
    }
  })

  describe('Auth API', () => {
    describe('账户注册', () => {
      it('保存用户到数据库', async () => {
        const response = await axios.post(
          '/sign-up',
          makeFakeUser({
            id: undefined
          })
        )
        expect(response.status).toBe(201)

        const { registered } = response.data
        const doc = await usersDb.findByName(registered)
        expect(doc).toEqual(registered)
        return usersDb.remove(registered)
      })

      it('保存用户到数据库', async () => {
        const user = makeFakeUser({
          id: undefined
        })
        let response = await axios.post(
          '/sign-up',
          user
        )
        expect(response.status).toBe(201)

        const { registered } = response.data
        const doc = await usersDb.findByName(registered)
        expect(doc).toEqual(registered)

        response = await axios.post(
          '/sign-up',
          user
        )
        expect(response.status).toBe(400)
        return usersDb.remove(registered)
      })

      it('数据不完整', async () => {
        let response
        response = await axios.post(
          '/sign-up',
          makeFakeUser({
            id: undefined,
            username: undefined
          })
        )
        expect(response.status).toBe(400)

        response = await axios.post(
          '/sign-up',
          makeFakeUser({
            id: undefined,
            password: undefined
          })
        )
        expect(response.status).toBe(400)
      })
    })

    describe('账户登录', () => {
      let user
      beforeAll(async () => {
        user = makeFakeUser({ id: undefined })
        return await axios.post(
          '/sign-up',
          user
        )
      })
      afterAll(() => {
        return usersDb.remove(user)
      })

      it('正确登录', async () => {
        const response = await axios.post(
          '/sign-in',
          user
        )
        expect(response.status).toBe(200)
        const { token } = response.data
        console.log('正确登录返回 token:', token)
        expect(token).not.toBeUndefined()
      })

      it('密码不正确', async () => {
        const response = await axios.post(
          '/sign-in',
          {
            username: user.username,
            password: 'error'
          }
        )
        expect(response.status).toBe(400)
        const { error } = response.data
        console.log('密码不正确 error:', error)
        expect(error).not.toBeUndefined()
      })

      it('用户名错误，无此用户', async () => {
        const response = await axios.post(
          '/sign-in',
          {
            username: 'error',
            password: user.password
          }
        )
        expect(response.status).toBe(400)
        const { error } = response.data
        console.log('查无用户 error:', error)
        expect(error).not.toBeUndefined()
      })

      it('非完整信息', async () => {
        const response = await axios.post(
          '/sign-in',
          {
            username: '',
            password: ''
          }
        )
        expect(response.status).toBe(400)
        const { error } = response.data
        console.log('未填信息 error:', error)
        expect(error).not.toBeUndefined()
      })
    })
  })

  describe('Items API', () => {
    let visitor
    let admin
    let visitorToken
    let adminToken
    async function makeVisitor () {
      visitor = makeFakeUser({ id: undefined })
      await axios.post(
        '/sign-up',
        visitor
      )
      const response = await axios.post(
        'sign-in',
        visitor
      )
      const { token } = response.data
      visitorToken = `Bearer ${token}`
    }
    async function makeAdmin () {
      admin = makeFakeUser({ id: undefined, username: JWT_ADMIN_NAME })
      await axios.post(
        '/sign-up',
        admin
      )
      const response = await axios.post(
        'sign-in',
        admin
      )
      const { token } = response.data
      adminToken = `Bearer ${token}`
    }
    beforeAll(async () => {
      await makeVisitor()
      await makeAdmin()
    })

    afterAll(async () => {
      await usersDb.remove(admin)
      return usersDb.remove(visitor)
    })

    describe('添加物品', () => {
      it('admin 添加物品到数据库', async () => {
        const response = await axios.post(
          '/items',
          makeFakeItem({
            id: undefined
          }), {
            headers: {
              Authorization: adminToken
            }
          }
        )
        expect(response.status).toBe(201)
        const { posted } = response.data
        const doc = await itemsDb.findById(posted)
        expect(doc).toEqual(posted)
        return itemsDb.remove(posted)
      })

      it('visitor 添加物品到数据库，将会报错', async () => {
        const response = await axios.post(
          '/items',
          makeFakeItem({
            id: undefined
          }), {
            headers: {
              Authorization: visitorToken
            }
          }
        )
        expect(response.status).toBe(400)
        const { error } = response.data
        console.log('visitor 添加物品到数据库 error:', error)
        expect(error).not.toBeUndefined()
      })
    })

    describe('查询物品', () => {
      let posted
      beforeAll(async () => {
        const response = await axios.post(
          '/items',
          makeFakeItem({
            id: undefined
          }), {
            headers: {
              Authorization: adminToken
            }
          }
        )
        ;({ posted } = response.data)
      })
      afterAll(async () => {
        return itemsDb.remove(posted)
      })

      it('查询全部物品', async () => {
        const response = await axios.get(
          '/items'
        )
        expect(response.status).toBe(200)
        const allItem = response.data
        expect(allItem).toContainEqual(posted)
      })
    })
  })
})
