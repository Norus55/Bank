import Account from "../models/bAccount.js";
import bcrypt from 'bcrypt';


// Función para listar los detalles de una cuenta
export async function getAccountDetails(req, res) {
  try {
    const account = await Account.find({ AccountId: req.params.AccountId });
    res.json(account);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}
  
  // Función para consignar dinero en una cuenta
  export async function depositIntoAccount(req, res) {
    try {
      const { AccountId } = req.params;
      const { amount } = req.body;
      if (amount <= 0) {
        return res.status(400).json({ message: 'Invalid deposit amount' });
      }
      const account = await Account.findOne({ AccountId: AccountId });
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
      account.balance += amount;
      await account.save();
      res.json({ message: 'Deposit successful', account });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  // Función para retirar dinero de una cuenta
  export async function withdrawFromAccount(req, res) {
    try {
      const { AccountId } = req.params;
      const { amount } = req.body;
      if (amount <= 0) {
        return res.status(400).json({ message: 'Invalid withdrawal amount' });
      }
      const account = await Account.findOne({AccountId:AccountId});
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
      if (account.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
      account.balance -= amount;
      await account.save();
      res.json({ message: 'Withdrawal successful', account });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
  // Función para eliminar una cuenta
  export async function deleteAccount(req, res) {
    try {
      const { AccountId } = req.params;
      const account = await Account.findOne({AccountId:AccountId});
      if (!account) {
        return res.status(404).json({ message: 'Account not found' });
      }
      if (account.balance !== 0) {
        return res.status(400).json({ message: 'Account cannot be deleted with a non-zero balance' });
      }
      await account.deleteOne();
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
 
  //función para crear la cuenta
  export async function createAccount(req, res) {
    try {
      const AccountId = await Account.getNextAccountNumber();
      const salt = await bcrypt.genSalt(10);
      const accessKey = req.body.accessKey;
      if (typeof accessKey !== 'string') {
        throw new Error('accessKey must be a string');
      }
      if (!req.body.clientDocument) {
        throw new Error('clientDocument is required');
      }
      const hashedAccessKey = await bcrypt.hash(accessKey, salt);
      const newAccount = new Account({
        AccountId,
        clientDocument: req.body.clientDocument,
        openingDate: new Date(),
        balance: 0,
        accessKey: hashedAccessKey,
      });
      await newAccount.save();
      res.status(201).json({ msg: 'Account created successfully', newAccount });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  }

