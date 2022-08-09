export default class HandicappedCertificate {
    bodyPartsName = ''
    percentage = 0
    certificateNo = ''
    issuingAuthority = ''
    issuingDate = 0

    constructor(handicappedCertificate?: HandicappedCertificate) {
        this.bodyPartsName = handicappedCertificate && handicappedCertificate.bodyPartsName ? handicappedCertificate.bodyPartsName.toUpperCase() : ''
        this.percentage = handicappedCertificate && handicappedCertificate.percentage ? (+ handicappedCertificate.percentage) : 0
        this.certificateNo = handicappedCertificate && handicappedCertificate.certificateNo ? handicappedCertificate.certificateNo.toUpperCase() : ''
        this.issuingAuthority = handicappedCertificate && handicappedCertificate.issuingAuthority ? handicappedCertificate.issuingAuthority.toUpperCase() : ''
        this.issuingDate = handicappedCertificate && handicappedCertificate.issuingDate ? handicappedCertificate.issuingDate : 0
    }

    json() {
        const { bodyPartsName, percentage, certificateNo, issuingAuthority, issuingDate } = this
        return ({ bodyPartsName, percentage, certificateNo, issuingAuthority, issuingDate })
    }
}