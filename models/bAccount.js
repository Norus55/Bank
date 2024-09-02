import { model, Schema } from "mongoose";


const AccountSchema = new Schema({
    AccountId: {
        type: Number,
        unique: true,
        required: true
    },
    clientDocument: {
        type: String,
        required: true

    },
    openingDate: {
        type: Date,
        required: true
    },
    balance: { 
        type: Number,
        required: true,
        default : 0
    },
    accessKey: {
        type: String,
        required: true,
    },
    
},{
    versionKey: false,
    autoIndex: false
})

AccountSchema.statics.getNextAccountNumber = async function() {
    const maxAccount = await this.findOne({}, {AccountId: 1}, {sort: {AccountId: -1}});
    return maxAccount ? maxAccount.AccountId + 1 : 1;
};

const Account = model('Accounts', AccountSchema, 'Accounts');

AccountSchema.index({ AccountId: 1 }, { unique: true });

Account.createIndexes().catch(error => console.error('Error creating indexes:', error));

export default Account
