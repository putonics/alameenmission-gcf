export default class BankAccount {
    accountNo = ''
    bankName = ''
    branchName = ''
    ifsc = ''
    branchAddress = ''

    constructor(bankAccount?: BankAccount) {
        this.accountNo = bankAccount && bankAccount.accountNo ? bankAccount.accountNo : ''
        this.bankName = bankAccount && bankAccount.bankName ? bankAccount.bankName.toUpperCase() : ''
        this.branchName = bankAccount && bankAccount.branchName ? bankAccount.branchName.toUpperCase() : ''
        this.ifsc = bankAccount && bankAccount.ifsc ? bankAccount.ifsc.toUpperCase() : ''
        this.branchAddress = bankAccount && bankAccount.branchAddress ? bankAccount.branchAddress : ''
    }

    json() {
        const { accountNo, bankName, branchName, ifsc, branchAddress } = this
        return ({ accountNo, bankName, branchName, ifsc, branchAddress })
    }
}