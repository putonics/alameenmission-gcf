export default class SiblingStudyingInMission {
    regno = ''
    name = ''
    branch = ''
    fee = 0

    constructor(siblingStudyingInMission?: SiblingStudyingInMission) {
        this.regno = siblingStudyingInMission && siblingStudyingInMission.regno ? siblingStudyingInMission.regno.toUpperCase() : ''
        this.name = siblingStudyingInMission && siblingStudyingInMission.name ? siblingStudyingInMission.name.toUpperCase() : ''
        this.branch = siblingStudyingInMission && siblingStudyingInMission.branch ? siblingStudyingInMission.branch.toUpperCase() : ''
        this.fee = siblingStudyingInMission && siblingStudyingInMission.fee ? (+siblingStudyingInMission.fee) : 0
    }

    json() {
        const { regno, name, branch, fee } = this
        return ({ regno, name, branch, fee })
    }
}