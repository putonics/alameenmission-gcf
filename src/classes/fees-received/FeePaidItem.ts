export default class FeePaidItem {
    /**
     * @type {'ONETIME'|'YEARLY'|'MONTHLY'}
     */
    group = 'ONETIME'
    head = ''//for which fee is needed
    amount = 0
    paidon = 0
    month = -1//JAN: 0, DEC: 11, NoMonth: -1
    year = 0

    constructor(feePaidItem?: FeePaidItem) {
        this.group = feePaidItem && feePaidItem.group ? feePaidItem.group : 'MONTHLY'
        this.head = feePaidItem && feePaidItem.head ? feePaidItem.head : ''
        this.amount = feePaidItem && (+feePaidItem.amount) >= 0 ? (+feePaidItem.amount) : 0
        this.paidon = feePaidItem && feePaidItem.paidon ? feePaidItem.paidon : 0
        this.month = feePaidItem && feePaidItem.month ? (+feePaidItem.month) : 0
        this.year = feePaidItem && feePaidItem.year ? feePaidItem.year : 0
    }

    json() {
        const { group, head, amount, paidon, month, year } = this
        return ({ group, head, amount, paidon, month, year })
    }
}