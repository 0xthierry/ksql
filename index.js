const fs = require('fs')
const {v4: uuid} = require('uuid')
const faker = require('faker')

const order = (userId) => ({
  item: faker.name.title(),
  value: faker.finance.amount(),
  order_id: uuid(),
  user_id: userId
})

const user = () => ({
  name: faker.name.firstName(),
  email: faker.internet.email(),
  id: uuid()
})

const run = async () => {
  const users = Array.from({ length: 500}).map(user)
  
  const orders = users.reduce((acc, {id}) => {
    const userOrders = Array.from({length: 10}).map(() => order(id))
    return [
      ...acc,
      ...userOrders
    ]
  }, [])

  const usersRaw = users.map(JSON.stringify).join('\n')
  const ordersRaw = orders.map(JSON.stringify).join('\n')

  await Promise.all([
    fs.promises.writeFile('./users', usersRaw),
    fs.promises.writeFile('./orders', ordersRaw)
  ])
}

run()


