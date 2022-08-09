import { storage } from "firebase-admin"
import { Request, Response } from "firebase-functions"
/////////////////////////////////////////////////////////////
// import { rotatebackward, rotateforward } from './CryptoServer'
import { setCacheAge, setCacheAgeZero } from './TimeServer'
/////////////////////////////////////////////////////////////

/*
RESPONSE Image: [successfully tested]
1. For remote URL:
app.get('/logo', (request, response) => {
    const https = require('https')
    const fileUrl = 'https://images-na.ssl-images-amazon.com/images/I/71INGYhIf0L._SX569_.jpg'
    https.get(fileUrl, (res: any) => res.pipe(response))
}

2. For firebase storage:
app.get('/logo', (request, response) => {
    storage().bucket('ecomputonics.appspot.com').file('logo/pariseva.png').createReadStream().pipe(response)
}
*/

export const logo = (request: Request, response: Response) => {
    setCacheAge(response, 'MONTH')
    const readstream = storage().bucket('alameen-mission.appspot.com').file(`logo/logo.png`).createReadStream()
    readstream.on('error', err => {
        storage().bucket('alameen-mission.appspot.com').file(`logo/logo.png`).createReadStream().pipe(response)
    })
    readstream.pipe(response)
}

// export const avatarsUrl = (appname: string, servicedocid: string, categoryid: string): string =>
//     `https://alameen-mission.appspot.com/avatars/${appname}/${rotateforward(servicedocid)}/${categoryid}`
export const avatars = (request: Request, response: Response) => {
    const { imagename } = request.params
    setCacheAge(response, 'WEEK')
    const readstream = storage().bucket('alameen-mission.appspot.com')
        .file(`avatars/${imagename}`)
        .createReadStream()
    readstream.on('error', err => {
        setCacheAgeZero(response)
        response.status(404).json(null)
        // storage().bucket('alameen-mission.appspot.com')
        //     .file(`logo/logo64.png`)
        //     .createReadStream()
        //     .pipe(response)
    })
    readstream.pipe(response)
}

export const documents = (request: Request, response: Response) => {
    const { imagename } = request.params
    setCacheAge(response, 'DAY')
    const readstream = storage().bucket('alameen-mission.appspot.com')
        .file(`documents/${imagename}`)
        .createReadStream()
    readstream.on('error', err => {
        setCacheAgeZero(response)
        response.status(404).json(null)
        // storage().bucket('alameen-mission.appspot.com')
        //     .file(`logo/logo64.png`)
        //     .createReadStream()
        //     .pipe(response)
    })
    readstream.pipe(response)
}