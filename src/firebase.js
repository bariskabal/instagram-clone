import {getAuth, signOut ,signInWithEmailAndPassword,updateProfile,createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth"
import { initializeApp } from "firebase/app";
import { toast } from "react-hot-toast";
import { userHandle } from "./utils"; 
import {getFirestore, doc, setDoc, getDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxLmjgFGQf8Pkz0mvOJWwxdYoVzR9ZtFU",
  authDomain: "instagram-clone-ce043.firebaseapp.com",
  projectId: "instagram-clone-ce043",
  storageBucket: "instagram-clone-ce043.appspot.com",
  messagingSenderId: "310706177661",
  appId: "1:310706177661:web:740b2416fc4672d3a39314"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)


onAuthStateChanged(auth, async user => {
    if(user){
        const dbUser = await getDoc(doc(db,'users', user.uid))
        let data = {
            uid: user.uid,
            fullName: user.displayName,
            email: user.email,
            emailVerified: user.emailVerified,
            ...dbUser.data()
        }
        userHandle(data)
    }else {
        userHandle(false)
    }
})

export const getUserInfo = async uname => {
    const username = await getDoc(doc(db, "usernames", uname))
    if (username.exists()) {
        return (await getDoc(doc(db, "users", username.data().user_id))).data()
    } else {
        throw new Error("Kullanıcı bulunamadı!")
    }
}

export const register = async ({email, password,full_name,username}) => {
    try {
        const user = await getDoc(doc(db,'usernames',username))
            if(user.exists()){
                toast.error(`${username} kullanıcı adı kullanılıyor`)
            }
            else{
                const response = await createUserWithEmailAndPassword(auth,email,password)

                if(response.user){

                    await setDoc(doc(db,'usernames',username),{
                        user_id: response.user.uid
                    })

                    await setDoc(doc(db, 'users',response.user.uid), {
                        fullName: full_name,
                        username: username,
                        followers:[],
                        following:[],
                        notification:[],
                        website: '',
                        bio: '',
                        phoneNumber: '',
                        gender: '',
                        posts: 0
                    })

                    await updateProfile(auth.currentUser, {
                        displayName: full_name
                    })
                    return response.user
                }
            }
    } catch(err) {
        toast.error(err.code)
    }
    
}

export const login = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email,password)
        console.log(response)
        return response
    } catch(err) {
        toast.error(err.code)
    }
    
}

export const logout = async () => {
    try {
        await signOut(auth)
    } catch (err) {
        toast.error(err.code)
    }

}