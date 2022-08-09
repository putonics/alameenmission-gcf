import { firestore } from 'firebase-admin'
import Fee from './Fee'

export default class Fees {

    sessionFrom = 0
    fees: Array<Fee>
    docref: { id: string | null }

    constructor(fees?: Fees) {
        this.sessionFrom = fees && fees.sessionFrom ? (+fees.sessionFrom) : 0
        this.fees = fees && fees.fees ? fees.fees.map(fee => new Fee(fee)) : []
        this.docref = fees && fees.docref ? fees.docref : { id: null }
    }

    json() {
        const { sessionFrom, docref } = this
        const fees = this.fees.map(fee => fee.json())
        return ({ sessionFrom, fees, docref })
    }
}

export const fetchFees = async (appname: string, subscriberdocid: string, sessionFrom: number): Promise<Fees | null> => {
    try {
        const snap = await firestore().collection('fees')
            .where('appname', '==', appname)
            .where('subscriberdocid', '==', subscriberdocid)
            .where('sessionFrom', '==', (+sessionFrom))
            .limit(1)
            .get()
        if (snap && snap.docs && snap.docs.length > 0) {
            const doc = snap.docs[0]
            return new Fees({ ...doc.data(), docref: { id: doc.ref.id } } as Fees)
        } else {
            return null
        }
    } catch (ex) {
        return null
    }
}