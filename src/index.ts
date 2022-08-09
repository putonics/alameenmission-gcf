import * as functions from 'firebase-functions'
import * as firebase from 'firebase-admin'
import * as express from 'express'
import { fetchstudent, fetchstudents } from './classes/students'
import { avatars, documents, logo } from './classes/ImageServer'
import Student from './classes/students/Student'
import StudentCountReport from './classes/report/StudentCountReport'
const cors = require('cors')
///////////////////////////////////////////////////////////////////////////////
const app = express()
app.use(cors({
    origin: "*",
}))
firebase.initializeApp()

//-------------------IMAGE SECTION--------------------------------------------------------------------
app.get('/logo', logo)
app.get('/avatars/:imagename', avatars)
app.get('/documents/:imagename', documents)

//-------------------Students SECTION-------------------------------------------------------------------
app.get('/students/:appname/:subscriberdocid/:sessionFrom/:pclass/:modifiedon', fetchstudents)
// app.get('/student/:appname/:regno/:aadhar', fetchstudent)
app.post('/student', fetchstudent)

exports.app = functions.https.onRequest(app)

exports.createStudent = functions.firestore.document('students/{studentdocid}')
    .onCreate(async (snap, context) => {
        const newStudent = new Student(snap.data() as Student)
        console.log('Creating: ' + newStudent.name)
        newStudent.docref = snap.ref
        const scr = new StudentCountReport()
        await scr.update(newStudent)
    })

exports.updateStudent = functions.firestore.document('students/{studentdocid}')
    .onUpdate(async (change, context) => {
        const newStudent = new Student(change.after.data() as Student)
        console.log('Updating: ' + newStudent.name)
        newStudent.docref = change.after.ref
        const oldStudent = new Student(change.before.data() as Student)
        oldStudent.docref = change.before.ref
        if (newStudent.subscriberdocid === oldStudent.subscriberdocid) {
            const scr = new StudentCountReport()
            await scr.update(newStudent, oldStudent)
        } else {
            const scr1 = new StudentCountReport()
            await scr1.delete(oldStudent)
            const scr2 = new StudentCountReport()
            await scr2.update(newStudent)
        }
    })

exports.deleteStudent = functions.firestore.document('students/{studentdocid}')
    .onDelete(async (snap, context) => {
        const oldStudent = new Student(snap.data() as Student)
        console.log('Deleting: ' + oldStudent.name)
        oldStudent.docref = snap.ref
        const scr = new StudentCountReport()
        await scr.delete(oldStudent)
    })
