export default class FamilyMemberFromMission {
    relation = ''
    name = ''
    empid = ''
    branch = ''
    dept = ''

    constructor(familyMemberFromMission?: FamilyMemberFromMission) {
        this.relation = familyMemberFromMission && familyMemberFromMission.relation ? familyMemberFromMission.relation.toUpperCase() : ''
        this.name = familyMemberFromMission && familyMemberFromMission.name ? familyMemberFromMission.name.toUpperCase() : ''
        this.empid = familyMemberFromMission && familyMemberFromMission.empid ? familyMemberFromMission.empid.toUpperCase() : ''
        this.branch = familyMemberFromMission && familyMemberFromMission.branch ? familyMemberFromMission.branch.toUpperCase() : ''
        this.dept = familyMemberFromMission && familyMemberFromMission.dept ? familyMemberFromMission.dept.toUpperCase() : ''
    }

    json() {
        const { relation, name, empid, branch, dept } = this
        return ({ relation, name, empid, branch, dept })
    }
}