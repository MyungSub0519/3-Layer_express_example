import Express from 'express'

import DB from '../../database/MySQL_database_connect.js'
import AccountModel from './model/model_account.js'
import AccountService from './service/service_account.js'
import AccountController from './controller/controller_accounts.js'

const router = Express.Router()

const dataBase = DB
const accountModel = new AccountModel(dataBase)
const accountService = new AccountService(accountModel)
const accountController = new AccountController(accountService)

router.get('/', accountController.getAccounts.bind(accountController))
router.get('/:userCode', accountController.getAccountById.bind(accountController))
router.put('/:userCode', accountController.putAccount.bind(accountController))
router.post('/:userCode/login', accountController.postLoginAccount.bind(accountController))
router.post('/:userCode/logout', accountController.postLogoutAccount.bind(accountController))

export default router
