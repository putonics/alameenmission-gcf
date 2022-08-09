export default class CasteCertificate {
    certificateNo = ''
    issuingAuthority = ''
    issuingDate = 0

    constructor(casteCertificate?: CasteCertificate) {
        this.certificateNo = casteCertificate && casteCertificate.certificateNo ? casteCertificate.certificateNo.toUpperCase() : ''
        this.issuingAuthority = casteCertificate && casteCertificate.issuingAuthority ? casteCertificate.issuingAuthority.toUpperCase() : ''
        this.issuingDate = casteCertificate && casteCertificate.issuingDate ? casteCertificate.issuingDate : 0
    }

    json() {
        const { certificateNo, issuingAuthority, issuingDate } = this
        return ({ certificateNo, issuingAuthority, issuingDate })
    }
}