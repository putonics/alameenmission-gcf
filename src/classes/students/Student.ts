import { firestore } from 'firebase-admin'
import { bool } from './../Common'
import Parent from "./Parent"
import Address from "./Address"
import BankAccount from "./BankAccount"
import BoardExam from "./BoardExam"
import CasteCertificate from "./CasteCertificate"
import HandicappedCertificate from "./HandicappedCertificate"
import FamilyMemberFromMission from "./FamilyMemberFromMission"
import SiblingStudyingInMission from "./SiblingStudyingInMission"
import Visitor from "./Visitor"
import FeePaidItem from '../fees-received/FeePaidItem'

export default class Student {
    //Necessary details
    regno = ''
    name = ''
    admissionDate = 0
    pclass = ''//present class
    stream = ''
    medium = ''
    sessionFrom = 0
    sessionTo = 0
    fee = 0
    feeStartingMonth = 0
    feesPaid: Array<FeePaidItem>
    mobile = 0
    whatsapp = 0
    email = ''
    status: 'ACTIVE' | 'DROPOUT'
    dropoutRemarks: '' | null
    gender = ''
    //Student's information details
    dob = 0
    aadhar = 0
    caste = ''
    casteCertificate: CasteCertificate | null
    bloodGroup = ''
    handicapped = false
    handicappedCertificate: HandicappedCertificate | null
    orphan = false
    orphanRemarks = ''
    previousBranchName = ''
    banglarsikshaId = ''
    kanyashreeId = ''
    aikyashreeId = ''
    fc = false
    nc = false
    //Previous School Details (for MP/HS passed candidates)
    lastBoardExam: BoardExam | null
    //Address Details
    addressPermanent: Address | null
    addressPresent: Address | null
    //Parents information
    father: Parent | null
    mother: Parent | null
    visitor1: Visitor | null
    visitor2: Visitor | null
    studentLogin = true
    //Bank details
    bankAccount: BankAccount | null
    //Family Members From Mission
    familyMembersFromMissionFlag = false
    familyMembersFromMission: Array<FamilyMemberFromMission>
    //Siblings studyings in Mission
    siblingsStudyingInMissionFlag = false
    siblingsStudyingInMission: Array<SiblingStudyingInMission>
    /////////////////
    createdon = 0
    modifiedon = 0
    subscriberdocid = ''
    appname = ''
    apptype = ''
    docref: { id: string | null }

    constructor(student?: Student) {
        //Necessary details
        this.regno = student && student.regno ? student.regno.toUpperCase() : ''
        this.name = student && student.name ? student.name.toUpperCase() : ''
        this.admissionDate = student && student.admissionDate ? student.admissionDate : 0
        this.pclass = student && student.pclass ? student.pclass.toUpperCase() : '' //present class
        this.stream = student && student.stream ? student.stream.toUpperCase() : ''
        this.medium = student && student.medium ? student.medium.toUpperCase() : ''
        this.sessionFrom = student && student.sessionFrom ? (+student.sessionFrom) : new Date().getFullYear()
        this.sessionTo = student && student.sessionTo ? (+student.sessionTo) : new Date().getFullYear()
        this.fee = student && student.fee ? (+student.fee) : 0
        this.feeStartingMonth = student && student.feeStartingMonth ? (+student.feeStartingMonth) : 0
        this.feesPaid = student && student.feesPaid ? student.feesPaid.map(fp => new FeePaidItem(fp)) : []
        this.mobile = student && student.mobile ? (+student.mobile) : 0
        this.whatsapp = student && student.whatsapp ? (+student.whatsapp) : 0
        this.email = student && student.email ? student.email : ''
        this.status = student && student.status ? student.status : 'ACTIVE'
        this.dropoutRemarks = student && student.dropoutRemarks ? student.dropoutRemarks : null
        this.gender = student && student.gender ? student.gender.toUpperCase() : ''
        //Student's information details
        this.dob = student && student.dob ? student.dob : 0
        this.aadhar = student && student.aadhar ? (+student.aadhar) : 0
        this.caste = student && student.caste ? student.caste.toUpperCase() : 'GENERAL'
        this.casteCertificate = student && student.casteCertificate ? new CasteCertificate(student.casteCertificate) : null
        this.bloodGroup = student && student.bloodGroup ? student.bloodGroup : 'UK'
        this.handicapped = student && student.handicapped ? bool(student.handicapped) : false
        this.handicappedCertificate = student && student.handicappedCertificate ? new HandicappedCertificate(student.handicappedCertificate) : null
        this.orphan = student && student.orphan ? bool(student.orphan) : false
        this.orphanRemarks = student && student.orphanRemarks ? student.orphanRemarks : ''
        this.previousBranchName = student && student.previousBranchName ? student.previousBranchName.toUpperCase() : ''
        this.banglarsikshaId = student && student.banglarsikshaId ? student.banglarsikshaId.toUpperCase() : ''
        this.kanyashreeId = student && student.kanyashreeId ? student.kanyashreeId.toUpperCase() : ''
        this.aikyashreeId = student && student.aikyashreeId ? student.aikyashreeId.toUpperCase() : ''
        this.fc = student && student.fc ? bool(student.fc) : false
        this.nc = student && student.nc ? bool(student.nc) : false
        //Previous School Details (for MP/HS passed candidates)
        this.lastBoardExam = student && student.lastBoardExam ? new BoardExam(student.lastBoardExam) : null
        //Address Details
        this.addressPermanent = student && student.addressPermanent ? new Address(student.addressPermanent) : new Address()
        this.addressPresent = student && student.addressPresent ? new Address(student.addressPresent) : new Address()
        //Parents information
        this.father = student && student.father ? new Parent(student.father) : new Parent()
        this.mother = student && student.mother ? new Parent(student.mother) : new Parent()
        this.visitor1 = student && student.visitor1 ? new Visitor(student.visitor1) : null
        this.visitor2 = student && student.visitor2 ? new Visitor(student.visitor2) : null
        this.studentLogin = student && student.studentLogin ? student.studentLogin : false
        //Bank details
        this.bankAccount = student && student.bankAccount ? new BankAccount(student.bankAccount) : new BankAccount()
        //Family member from mission
        this.familyMembersFromMission = student && student.familyMembersFromMission && student.familyMembersFromMission.length > 0 ? student.familyMembersFromMission.map(m => new FamilyMemberFromMission(m)) : []
        this.familyMembersFromMissionFlag = student && student.familyMembersFromMission && student.familyMembersFromMission.length > 0 ? true : false
        //Sibling studying in mission
        this.siblingsStudyingInMission = student && student.siblingsStudyingInMission && student.siblingsStudyingInMission.length > 0 ? student.siblingsStudyingInMission.map(m => new SiblingStudyingInMission(m)) : []
        this.siblingsStudyingInMissionFlag = student && student.siblingsStudyingInMission && student.siblingsStudyingInMission.length > 0 ? true : false
        //////////////////////////////////////////////////////////////////////////////////////////
        this.createdon = student && student.createdon ? student.createdon : 0
        this.modifiedon = student && student.modifiedon ? student.modifiedon : 0
        this.subscriberdocid = student && student.subscriberdocid ? student.subscriberdocid : ''
        this.appname = student && student.appname ? student.appname : ''
        this.apptype = student && student.apptype ? student.apptype : ''
        this.docref = student && student.docref ? student.docref : { id: null }
    }

    json() {
        if (!this.orphan) this.orphanRemarks = ''
        const { regno, name, admissionDate, pclass, medium, sessionFrom, sessionTo,
            fee, feeStartingMonth, mobile, whatsapp, email, status, gender, dob,
            aadhar, caste, bloodGroup, handicapped, orphan, orphanRemarks, previousBranchName,
            banglarsikshaId, kanyashreeId, aikyashreeId, fc, nc,
            familyMembersFromMissionFlag, siblingsStudyingInMissionFlag, studentLogin,
            createdon, modifiedon, subscriberdocid, appname, apptype, docref,
        } = this
        const feesPaid = this.feesPaid.map(fp => fp.json())
        const visitor1 = (this.visitor1) ? this.visitor1.json() : null
        const visitor2 = (this.visitor2) ? this.visitor2.json() : null
        const stream = ['V', 'VI', 'VII', 'VIII', 'IX', 'X'].includes(pclass) ? null : this.stream
        const addressPermanent = this.addressPermanent ? this.addressPermanent.json() : null
        const addressPresent = this.addressPresent ? this.addressPresent.json() : null
        const father = this.father ? this.father.json() : null
        const mother = this.mother ? this.mother.json() : null
        const bankAccount = this.bankAccount ? this.bankAccount.json() : null
        const dropoutRemarks = this.status === 'DROPOUT' && this.dropoutRemarks ? this.dropoutRemarks : null
        const lastBoardExam = this.lastBoardExam ? this.lastBoardExam.json() : null
        const handicappedCertificate = this.handicappedCertificate ? this.handicappedCertificate.json() : null
        const casteCertificate = this.casteCertificate ? this.casteCertificate.json() : null
        const familyMembersFromMission = this.familyMembersFromMission.map(m => m.json())
        const siblingsStudyingInMission = this.siblingsStudyingInMission.map(m => m.json())
        return ({
            regno, name, admissionDate, pclass, stream, medium, sessionFrom, sessionTo,
            fee, feeStartingMonth, feesPaid, mobile, whatsapp, email, status, dropoutRemarks, gender, dob,
            aadhar, caste, bloodGroup, handicapped, orphan, orphanRemarks, previousBranchName,
            banglarsikshaId, kanyashreeId, aikyashreeId, fc, nc,
            familyMembersFromMissionFlag, siblingsStudyingInMissionFlag, studentLogin,
            addressPermanent, addressPresent, father, mother,
            bankAccount, lastBoardExam, handicappedCertificate, casteCertificate,
            familyMembersFromMission, siblingsStudyingInMission,
            visitor1, visitor2,
            createdon, modifiedon, subscriberdocid, appname, apptype, docref,
        })
    }
}

export const fetchStudent = async (appname: string, regno: string, aadhar: string): Promise<Student | null> => {
    try {
        const snap = await firestore().collection('students')
            .where('appname', '==', appname)
            .where('aadhar', '==', (+aadhar))
            .where('regno', '==', regno)
            .orderBy('createdon', 'desc')
            .limit(1)
            .get()
        if (snap && snap.docs && snap.docs.length > 0) {
            const doc = snap.docs[0]
            return new Student({ ...doc.data(), docref: { id: doc.ref.id } } as Student)
        } else {
            return null
        }
    } catch (ex) {
        return null
    }
}