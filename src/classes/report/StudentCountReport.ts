import { firestore } from 'firebase-admin'
import Student from "../students/Student"
import ClassWiseStudents from "./ClassWiseStudents"

const COLLECTION = 'student-count-reports'
export default class StudentCountReport {
    private appname: string
    private subscriberdocid: string
    private sessionFrom: number = 0
    private classWiseStudents: Array<ClassWiseStudents>
    private docref: firestore.DocumentReference | null

    constructor(scr?: StudentCountReport) {
        this.appname = scr && scr.appname ? scr.appname : ''
        this.subscriberdocid = scr && scr.subscriberdocid ? scr.subscriberdocid : ''
        this.sessionFrom = scr && scr.sessionFrom ? scr.sessionFrom : 0
        this.classWiseStudents = scr && scr.classWiseStudents ? scr.classWiseStudents.map((cws: ClassWiseStudents) => new ClassWiseStudents(cws)) : []
        this.docref = scr && scr.docref ? scr.docref : null
    }

    private set(scr: StudentCountReport | any) {
        this.appname = scr && scr.appname ? scr.appname : ''
        this.subscriberdocid = scr && scr.subscriberdocid ? scr.subscriberdocid : ''
        this.sessionFrom = scr && scr.sessionFrom ? scr.sessionFrom : 0
        this.classWiseStudents = scr && scr.classWiseStudents ? scr.classWiseStudents.map((cws: ClassWiseStudents) => new ClassWiseStudents(cws)) : []
    }

    private json() {
        const { appname, subscriberdocid, sessionFrom } = this
        const classWiseStudents = this.classWiseStudents.map((cws: ClassWiseStudents) => cws.json())
        return ({ appname, subscriberdocid, sessionFrom, classWiseStudents })
    }

    private deleteCount(studentOld?: Student) {
        if (studentOld) {
            const cws = this.classWiseStudents.find((c: ClassWiseStudents) => c.pclass === studentOld.pclass)
            if (cws) {
                cws.removeCount(studentOld)
            }
        }
    }

    private evaluate(studentNew: Student, studentOld?: Student) {
        this.deleteCount(studentOld)
        const cws2 = this.classWiseStudents.find((c: ClassWiseStudents) => c.pclass === studentNew.pclass)
        if (cws2) {
            cws2.addCount(studentNew)
        } else {
            const newCws = new ClassWiseStudents()
            newCws.addCount(studentNew)
            this.classWiseStudents.push(newCws)
        }
    }

    private async load(student?: Student) {
        try {
            const snap = await firestore().collection(COLLECTION)
                .where('appname', '==', student ? student.appname : this.appname)
                .where('subscriberdocid', '==', student ? student.subscriberdocid : this.subscriberdocid)
                .where('sessionFrom', '==', student ? student.sessionFrom : this.sessionFrom)
                .limit(1)
                .get()
            if (snap && snap.docs && snap.docs.length > 0) {
                this.set(snap.docs[0].data())
                this.docref = snap.docs[0].ref
            }
        } catch (ex) {
            //do-nothing
        }
    }

    async update(studentNew: Student, studentOld?: Student) {
        if (studentNew.appname && studentNew.subscriberdocid && studentNew.sessionFrom) {
            this.appname = studentNew.appname
            this.subscriberdocid = studentNew.subscriberdocid
            this.sessionFrom = studentNew.sessionFrom
            await this.load(studentNew)
            if (this.docref) {
                this.evaluate(studentNew, studentOld)
                await this.docref.update(this.json())
            } else {
                const students = await getStudents(studentNew.appname, studentNew.subscriberdocid, studentNew.sessionFrom)
                // console.log(studentNew.appname + ', ' + studentNew.subscriberdocid + ', ' + studentNew.sessionFrom + ' >>>>> Total students: ' + students.length)
                students.forEach(s => this.evaluate(s))
                await firestore().collection(COLLECTION).add(this.json())
            }
        }
    }

    async delete(studentOld: Student) {
        if (studentOld.appname && studentOld.subscriberdocid && studentOld.sessionFrom) {
            this.appname = studentOld.appname
            this.subscriberdocid = studentOld.subscriberdocid
            this.sessionFrom = studentOld.sessionFrom
            await this.load(studentOld)
            if (this.docref) {
                this.deleteCount(studentOld)
                await this.docref.update(this.json())
            }
        }
    }

    //Regenerateds the student count report whenever there is mismatch
    async regenerate(appname: string, subscriberdocid: string, sessionFrom: string, pclass: string, students: Array<Student>) {
        if (appname && subscriberdocid && sessionFrom) {
            this.appname = appname
            this.subscriberdocid = subscriberdocid
            this.sessionFrom = (+sessionFrom)
            await this.load()
            const cws = this.classWiseStudents.find(c => c.pclass === pclass)
            if (cws) {
                const totalStudents = cws.getTotalCount()
                if (totalStudents !== students.length) {
                    this.classWiseStudents = this.classWiseStudents.filter(c => c.pclass !== pclass)
                    if (this.docref) {
                        students.forEach(s => this.evaluate(s))
                        console.log('StudentCountReport.regenerate()', subscriberdocid, sessionFrom, pclass)
                        await firestore().collection(COLLECTION).doc(this.docref.id).set(this.json())
                    }
                }
            }
        }
    }
}

const getStudents = async (appname: string, subscriberdocid: string, sessionFrom: number, pclass?: string) => {
    const students = new Array<Student>()
    // console.log('92')
    try {
        const snap = pclass
            ? await firestore().collection('students')
                .where('appname', '==', appname)
                .where('subscriberdocid', '==', subscriberdocid)
                .where('sessionFrom', '==', (+sessionFrom))
                .where('pclass', '==', pclass)
                .get()
            : await firestore().collection('students')
                .where('appname', '==', appname)
                .where('subscriberdocid', '==', subscriberdocid)
                .where('sessionFrom', '==', (+sessionFrom))
                .orderBy('pclass', 'asc')
                .get()
        // console.log('100')
        if (snap && snap.docs && snap.docs.length > 0) {
            // console.log('102')
            snap.docs.forEach(doc => {
                const student = new Student(doc.data() as Student)
                student.docref = doc.ref
                students.push(student)
            })
        }
        // console.log('109')
    } catch (ex) {
        // console.log(ex)
    }
    return students
}