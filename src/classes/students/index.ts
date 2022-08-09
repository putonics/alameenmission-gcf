import { fetchInstitute } from './../Institutes';
import { firestore } from 'firebase-admin'
import { setCacheAge, setCacheAgeZero } from '../TimeServer'
import { Request, Response } from "firebase-functions"
////////////////////////////////////////////////////////
import Student, { fetchStudent } from './Student'
import { fetchFees } from '../fees/Fees';
import StudentCountReport from '../report/StudentCountReport';
/////////////////////////////////////////////////////////

export const fetchstudents = (request: Request, response: Response) => {
    const { appname, subscriberdocid, sessionFrom, pclass } = request.params
    const students = new Array<Student>()
    firestore().collection('students')
        .where('appname', '==', appname)
        .where('subscriberdocid', '==', subscriberdocid)
        .where('pclass', '==', pclass)
        .where('sessionFrom', '==', (+sessionFrom))
        .orderBy('name', 'asc')
        .get()
        .then(snap => {
            if (snap && snap.docs && snap.docs.length > 0) {
                snap.docs.forEach(doc => {
                    const student = new Student({ ...doc.data(), docref: { id: doc.ref.id } } as Student)
                    students.push(student)
                })
                const scr = new StudentCountReport()
                scr.regenerate(appname, subscriberdocid, sessionFrom, pclass, students)
                    .finally(() => {
                        setCacheAge(response, 'MONTH')
                        response.json({
                            students: students.map(student => student.json()),
                        })
                    })
            } else {
                setCacheAgeZero(response)
                response.json({ students: null })
            }
        })
        .catch(e => {
            setCacheAgeZero(response)
            response.json({ students: null })
        })
}

export const fetchstudent = async (request: Request, response: Response) => {
    const { appname, regno, aadhar } = request.body
    const student = await fetchStudent(appname, regno, aadhar)
    const institute = student ? await fetchInstitute(student.subscriberdocid) : null
    const fees = student ? await fetchFees(appname, student.subscriberdocid, student.sessionFrom) : null
    response.json(
        student ?
            {
                student: student.json(),
                institute: institute ? institute.json() : null,
                fees: fees ? fees.json() : null,
            }
            : null
    )
}