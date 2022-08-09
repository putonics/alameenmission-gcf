import FeeItem from './FeeItem'

export default class Fee {
    pclass = ''
    oneTimeFees: Array<FeeItem>
    monthlyFees: Array<FeeItem>
    yearlyFees: Array<FeeItem>

    constructor(fee?: Fee) {
        this.pclass = fee && fee.pclass ? fee.pclass : ''
        this.oneTimeFees = fee && fee.oneTimeFees
            ? fee.oneTimeFees.map(otf => new FeeItem(otf)).sort((a, b) => a.index - b.index)
            : []
        this.monthlyFees = fee && fee.monthlyFees
            ? fee.monthlyFees.map(mf => new FeeItem(mf)).sort((a, b) => a.index - b.index)
            : []
        this.yearlyFees = fee && fee.yearlyFees
            ? fee.yearlyFees.map(yf => new FeeItem(yf)).sort((a, b) => a.index - b.index)
            : []
    }

    json() {
        const pclass = this.pclass
        const oneTimeFees = this.oneTimeFees.map(otf => otf.json())
        const monthlyFees = this.monthlyFees.map(mf => mf.json())
        const yearlyFees = this.yearlyFees.map(yf => yf.json())
        return ({ pclass, oneTimeFees, monthlyFees, yearlyFees })
    }
}