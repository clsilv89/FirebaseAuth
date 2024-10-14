import firebase from '@react-native-firebase/app'
import '@react-native-firebase/auth'
import '@react-native-firebase/database'

const firebaseConfig = {
    clientId: 'tdspk-4dc44',
    appId: 'tdspk-4dc44',
    apiKey: 'AIzaSyB9ewU_MusAc_5kWsrnwa4TKJ8MsR1KWAU',
    databaseURL: 'https://tdspk-4dc44-default-rtdb.firebaseio.com/',
    storageBucket: 'tdspk-4dc44.appspot.com',
    messagingSenderId: '',
    projectId: 'tdspk-4dc44'
}

firebase.initializeApp(firebaseConfig)

const apps = firebase.apps

apps.forEach(app => console.log(app.name))

const auth = firebase.app().auth()
const database = firebase.app().database()
export { firebase, auth, database }