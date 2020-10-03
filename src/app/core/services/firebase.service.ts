import "firebase/firestore"

import { initializeApp } from "firebase/app"

import { Environment } from "@app/environments"

const {
    AppID,
    AuthDomain,
    DatabaseURL,
    FirebaseAPIKey,
    MessagingSenderID,
    ProjectID,
    StorageBucket
} = Environment

const firebaseApp = initializeApp ({
    apiKey : FirebaseAPIKey,
    appId : AppID,
    authDomain : AuthDomain,
    databaseURL : DatabaseURL,
    messagingSenderId : MessagingSenderID,
    projectId : ProjectID,
    storageBucket : StorageBucket
})

const FirebaseService =
{
    database : () => firebaseApp.firestore (),
    storage : () => firebaseApp.storage ()
}

export { FirebaseService }