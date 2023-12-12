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
  getDoc,
} from 'firebase/firestore';

import { APIResponse } from '@/src/common/utils/helpers';
import { auth, db, storage } from '@/src/firebase/firebase';
import { DUMMY_AVATAR_IMG } from './utils/constants';
import { NSAuthUser } from './types';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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

      const lsp: NSAuthUser.TUser = {
        id: data.uid,
        email: data.email!,
        emailVerified: data.emailVerified,
        phoneNumber: '',
        profilePic: null,
        city: null || '',
        state: null || '',
        role: '',
        additionalDetails: {
          summary: '',
          experience: '',
          enrollmentId: '',
          specialities: '',
          languages: '',
          certificate: null,
          achievements: {
            description: '',
            proof: null,
          },
          fees: '',
        }
      };

      await setDoc(doc(db, 'lsp', data.uid), lsp);

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

  signOut: async () => {
    try {
      await auth.signOut();
      return APIResponse(false, 'Successfully Signed Out', null);
    } catch (err: any) {
      return APIResponse(true, err.message, null);
    }
  },

  UpdateLsp: async (id: string, data: any, profilePic: File | null, proof: File | null, certificate: File | null) => {
    const { data: certificate1 } = await AuthAPI.uploadFile(certificate!)
    const { data: profilePic1 } = await AuthAPI.uploadFile(profilePic!)
    const { data: proof1 } = await AuthAPI.uploadFile(proof!)
    console.log('we are in the auth api')
    console.log(data, 'data')
    console.log(certificate1, 'certificate')
    console.log(proof1, "proof1")
    console.log(id);
    console.log(profilePic1, 'profilepic1')
    try {

      const updatedData: Omit<NSAuthUser.TUser, 'email' | 'id'> = {
        // phoneNumber: data.phoneNumber,
        profilePic: profilePic1,
        city: data.city,
        state: data.state,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        additionalDetails: {
          summary: data.additionalDetails.summary,
          experience: data.additionalDetails.experience,
          enrollmentId: data.additionalDetails.enrollmentId,
          specialities: data.additionalDetails.specialities,
          languages: data.additionalDetails.languages,
          certificate: certificate1,
          achievements: {
            // description: data.additionalDetails.description,
            proof: proof1,
          },
          fees: data.additionalDetails.fees,
        }
      };

      await setDoc(doc(db, 'lsp', id), updatedData);
    } catch (err: any) {
      console.log(err)
      return APIResponse(true, err.message, null);
    }
  },

  async uploadFile(file: File) {
    try {
      const storageRef = ref(storage, `files/${file?.name}`);
      const uploadTask = uploadBytes(storageRef, file);
      const snapshot = await uploadTask;
      const url = await getDownloadURL(snapshot.ref);
      return APIResponse(false, 'File Uploaded', url);
    } catch (error: any) {
      return APIResponse(true, error.message, null);
    }
  },

  forgetPassword: async (email: string) => {
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


  getUserById: async (
    id: string
  ): Promise<{
    error: boolean;
    message: string;
    data: NSAuthUser.TUser | null;
  }> => {
    try {
      const docRef = doc(db, 'lsp', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return APIResponse(
          false,
          'User found',
          docSnap.data() as NSAuthUser.TUser
        );
      } else {
        return APIResponse(true, 'User not found', null);
      }
    } catch (error: any) {
      return APIResponse(true, error.message, null);
    }
  },
}

export default AuthAPI;