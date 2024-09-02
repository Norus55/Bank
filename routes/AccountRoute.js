import { Router } from 'express';
import * as bAccountController from '../controller/AccountController.js';

const AccountRoute = Router()

AccountRoute.get('/:AccountId', bAccountController.getAccountDetails)
AccountRoute.post('/deposit/', bAccountController.depositIntoAccount)
AccountRoute.post('/withdraw/:AccountId', bAccountController.withdrawFromAccount)
AccountRoute.delete('/:AccountId', bAccountController.deleteAccount)
AccountRoute.post('/create', bAccountController.createAccount)

export default AccountRoute