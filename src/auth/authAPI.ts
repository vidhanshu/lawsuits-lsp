import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

import { APIResponse } from '@/src/common/utils/helpers';
import { auth, db } from '@/src/firebase/firebase';
import { DUMMY_AVATAR_IMG } from './utils/constants';
import { NSAuthUser } from './types';

export const AuthAPI = 
  {
    signUp: async (email: string, password: string) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const data = userCredential.user;
  
        const user: NSAuthUser.TUser = {
          id: data.uid,
          email: data.email!,
          emailVerified: data.emailVerified,
          phoneNumber: data.phoneNumber || '',
          profilePic: data.photoURL || DUMMY_AVATAR_IMG,
          city: null || '',
          state: null || '',
        };
  
        await setDoc(doc(db, 'users', data.uid), user);
  
        return APIResponse(false, 'Successfully Signed Up', data);
      } catch (err: any) {
        return APIResponse(true, err.message, null);
      }
    },
  
    signIn: async (email: string, password: string) => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const data = userCredential.user;
  
        return APIResponse(false, 'Successfully Signed In', data);
      } catch (err: any) {
        return APIResponse(true, err.message, null);
      }
    },
  
    signOut :async () => {
      try {
        await auth.signOut();
        return APIResponse(false, 'Successfully Signed Out', null);
      } catch (err: any) {
        return APIResponse(true, err.message, null);
      }
    },
  
    forgetPassword :async (email: string) => {
      try {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push(doc.data());
        });
  
        if (docs.length === 0) return APIResponse(true, 'User not found', null);
  
        await sendPasswordResetEmail(auth, email);
        return APIResponse(false, 'Password Reset Email Sent', null);
      } catch (error: any) {
        return APIResponse(true, error.message, null);
      }
    },
    getUserById : async (id: string) => {},
  }

  export default AuthAPI;