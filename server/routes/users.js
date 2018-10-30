const router = require('koa-router')()
const Redis = require('koa-redis')
const Person = require('../dbs/models/person')

const Store = new Redis().client 

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/addUser', async function(ctx) {
  const person = new Person({
    name: ctx.request.body.name,
    age: ctx.request.body.age
  })
  let code
  try {
    await person.save()
    code = 0
  } catch (error) {
    code = -1
  }
  ctx.body = {
    code: code
  }
})

router.post('/getUser', async function(ctx) {
  const res = await Person.find({name: ctx.request.body.name})
  ctx.body = {
    code: 0,
    res 
  }
})

router.post('/updateUser', async function(ctx) {
  const res = await Person.where({
    name: ctx.request.body.name
  }).update({
    age: ctx.request.body.age
  })
  ctx.body = {
    code: 0
  }
})

router.post('/delUser', async function(ctx) {
  const res = await Person.where({
    name: ctx.request.body.name
  }).remove()
  
  ctx.body = {
    code: 0
  }
})

router.get('/fix', async function(ctx) {
  const st = await Store.hset('fix', 'name', 666)
  ctx.body = {
    code: 0
  }
})

module.exports = router
