import Express from 'express'
import v1_board from './modules/board/board.js'
import v1_user from './modules/user/user.js'
import v1_account from './modules/account/accounts.js'
import dotenv from 'dotenv'
import requestIp from 'request-ip'

dotenv.config()

const app = Express()
const port = process.env.EXPRESS_PORT

app.use(Express.json())
app.use(requestIp.mw())

app.use('/v1/boards', v1_board)
app.use('/v1/users', v1_user)
app.use('/v1/accounts', v1_account)

app.use((err, req, res, next) => {
  res.status(err.statusCode || res.statusCode)
  console.log(err)
  let HTTPerrorCodeTable = {
    400: 'Bad Request',
    500: 'Internal Server Error',
  }
  res.json({
    HTTPstatusCode: err.statusCode || res.statusCode,
    message: HTTPerrorCodeTable[err.statusCode || res.statusCode] || err.message,
  })
})

app.use((req, res, next) => {
  res.status(404)
  res.send('404 not found')
})

app.listen(port, '0.0.0.0', () => {
  console.log(`http://localhost:${port}`)
})
