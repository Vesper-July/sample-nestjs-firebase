import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase/app'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

@Injectable()
export class FirebaseService {
    public app: firebase.FirebaseApp

    constructor() {
        let config = {
            apiKey: "",
            authDomain: "",
            projectId: "",
            storageBucket: "",
            messagingSenderId: "",
            appId: ""
        };
        this.app = firebase.initializeApp(config)
        console.log(`DATABASE LAUNCHED ...`)
    }

    getFirestore() {
        return getFirestore(this.app)
    }

    getAuth() {
        return getAuth(this.app)
    }

    getStorage() {
        return getStorage(this.app)
    }
}
