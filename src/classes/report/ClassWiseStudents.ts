import Student from "../students/Student"
import CategoryCounter from "./CategoryCounter"

export default class ClassWiseStudents {
    pclass: string = ''
    private totalCount: CategoryCounter
    private handicappedCount: CategoryCounter
    private orphanCount: CategoryCounter

    private mediumCount: Array<CategoryCounter>
    private streamCount: Array<CategoryCounter>
    private statusCount: Array<CategoryCounter>
    private bloodGroupCount: Array<CategoryCounter>
    private casteCount: Array<CategoryCounter>
    private feeCount: Array<CategoryCounter>

    private modifiedon: number = 0

    constructor(cws?: ClassWiseStudents) {
        this.pclass = cws && cws.pclass ? cws.pclass : ''
        this.totalCount = cws && cws.totalCount ? new CategoryCounter(cws.totalCount) : new CategoryCounter()
        this.totalCount.category = 'TOTAL'
        this.handicappedCount = cws && cws.handicappedCount ? new CategoryCounter(cws.handicappedCount) : new CategoryCounter()
        this.handicappedCount.category = 'HANDICAPPED'
        this.orphanCount = cws && cws.orphanCount ? new CategoryCounter(cws.orphanCount) : new CategoryCounter()
        this.orphanCount.category = 'ORPHAN'
        this.mediumCount = cws && cws.mediumCount ? cws.mediumCount.map((c: CategoryCounter) => new CategoryCounter(c)) : new Array<CategoryCounter>()
        this.streamCount = cws && cws.streamCount ? cws.streamCount.map((c: CategoryCounter) => new CategoryCounter(c)) : new Array<CategoryCounter>()
        this.statusCount = cws && cws.statusCount ? cws.statusCount.map((c: CategoryCounter) => new CategoryCounter(c)) : new Array<CategoryCounter>()
        this.bloodGroupCount = cws && cws.bloodGroupCount ? cws.bloodGroupCount.map((c: CategoryCounter) => new CategoryCounter(c)) : new Array<CategoryCounter>()
        this.casteCount = cws && cws.casteCount ? cws.casteCount.map((c: CategoryCounter) => new CategoryCounter(c)) : new Array<CategoryCounter>()
        this.feeCount = cws && cws.feeCount ? cws.feeCount.map((c: CategoryCounter) => new CategoryCounter(c)) : new Array<CategoryCounter>()
        this.modifiedon = cws && cws.modifiedon ? cws.modifiedon : 0
    }

    json() {
        const { pclass, modifiedon } = this
        const totalCount = this.totalCount.json()
        const handicappedCount = this.handicappedCount.json()
        const orphanCount = this.orphanCount.json()
        const mediumCount = this.mediumCount.map((c: CategoryCounter) => c.json())
        const streamCount = this.streamCount.map((c: CategoryCounter) => c.json())
        const statusCount = this.statusCount.map((c: CategoryCounter) => c.json())
        const bloodGroupCount = this.bloodGroupCount.map((c: CategoryCounter) => c.json())
        const casteCount = this.casteCount.map((c: CategoryCounter) => c.json())
        const feeCount = this.feeCount.map((c: CategoryCounter) => c.json())
        return ({
            pclass, modifiedon,
            totalCount, handicappedCount, orphanCount,
            mediumCount, streamCount, statusCount, bloodGroupCount, casteCount, feeCount,
        })
    }

    private removeCounter(counters: Array<CategoryCounter>, category: string, gender: string): Array<CategoryCounter> {
        const counter = counters.find((c: CategoryCounter) => c.category === category)
        if (counter) {
            counter.remove(gender)
        }
        return counters.filter((c: CategoryCounter) => c.total())
    }

    removeCount(student: Student) {
        this.totalCount.remove(student.gender)
        if (student.handicapped) this.handicappedCount.remove(student.gender)
        if (student.orphan) this.orphanCount.remove(student.gender)
        this.mediumCount = this.removeCounter(this.mediumCount, student.medium, student.gender)
        this.streamCount = this.removeCounter(this.streamCount, student.stream, student.gender)
        this.statusCount = this.removeCounter(this.statusCount, student.status, student.gender)
        this.bloodGroupCount = this.removeCounter(this.bloodGroupCount, student.bloodGroup, student.gender)
        this.casteCount = this.removeCounter(this.casteCount, student.caste, student.gender)
        this.feeCount = this.removeCounter(this.feeCount, `${student.fee}`, student.gender)
    }

    private addCounter(counters: Array<CategoryCounter>, category: string, gender: string) {
        const counter = counters.find((c: CategoryCounter) => c.category === category)
        if (counter) {
            counter.add(gender)
        } else {
            const newCounter = new CategoryCounter()
            newCounter.category = category
            newCounter.add(gender)
            counters.push(newCounter)
        }
    }

    addCount(student: Student) {
        this.pclass = student.pclass
        this.totalCount.add(student.gender)
        if (student.handicapped) this.handicappedCount.add(student.gender)
        if (student.orphan) this.orphanCount.add(student.gender)
        this.addCounter(this.mediumCount, student.medium, student.gender)
        this.addCounter(this.streamCount, student.stream, student.gender)
        this.addCounter(this.statusCount, student.status, student.gender)
        this.addCounter(this.bloodGroupCount, student.bloodGroup, student.gender)
        this.addCounter(this.casteCount, student.caste, student.gender)
        this.addCounter(this.feeCount, `${student.fee}`, student.gender)
        this.modifiedon = this.modifiedon < student.modifiedon ? student.modifiedon : this.modifiedon
    }

    getTotalCount() {
        const { male = 0, female = 0, other = 0 } = this.totalCount
        return (male + female + other)
    }
}