import { firestore } from 'firebase-admin'
////////////////////////////////////////////////////////

export default class Institute {
    branch = ''
    district = ''
    email = ''
    institute = ''
    phone = ''
    place = ''
    subscriberdocid = ''
    title = ''
    docref: { id: string | null }

    constructor(institute?: Institute) {
        this.branch = institute && institute.branch ? institute.branch : 'BRANCH-NAME'
        this.district = institute && institute.district ? institute.district : 'DISTRICT-NAME'
        this.email = institute && institute.email ? institute.email : 'EMAIL-ID'
        this.institute = institute && institute.institute ? institute.institute : 'INSTITUTE-NAME'
        this.phone = institute && institute.phone ? institute.phone : 'PHONE'
        this.place = institute && institute.place ? institute.place : 'PLACE'
        this.subscriberdocid = institute && institute.subscriberdocid ? institute.subscriberdocid : 'SUBSCRIBERDOCID'
        this.title = institute && institute.title ? institute.title : 'TITLE'
        this.docref = institute && institute.docref ? institute.docref : { id: null }
    }

    json() {
        const { branch, district, email, institute, phone, place, subscriberdocid, title, docref } = this
        return ({ branch, district, email, institute, phone, place, subscriberdocid, title, docref })
    }
}

export const fetchInstitute = async (subscriberdocid: string): Promise<Institute | null> => {
    try {
        const snap = await firestore().collection('institutes')
            .where('subscriberdocid', '==', subscriberdocid)
            .limit(1)
            .get()
        if (snap && snap.docs && snap.docs.length > 0) {
            const doc = snap.docs[0]
            return new Institute({ ...doc.data(), docref: { id: doc.ref.id } } as Institute)
        } else {
            return null
        }
    } catch (ex) {
        return null
    }
}