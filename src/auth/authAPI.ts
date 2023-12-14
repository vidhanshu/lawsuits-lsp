import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  getDoc,
} from "firebase/firestore";

import {
  APIResponse,
  convertCommaSeparatedStringToArray,
} from "@/src/common/utils/helpers";
import { auth, db, storage } from "@/src/firebase/firebase";
import { DUMMY_AVATAR_IMG } from "./utils/constants";
import { NSAuthUser } from "./types";
import {
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

type TUpdateProfilePayload = {
  profilePic: File;
  firstName: string;
  lastName: string;
  city: string;
  state: string;
  profession:
    | "ARBITRATOR"
    | "MEDIATOR"
    | "DOCUMENTATION_WRITER"
    | "LAWYER"
    | "ADVOCATE"
    | "OTHER";
  additionalDetails: {
    summary: string;
    experience: string;
    enrollmentId: string;
    proof: File;
    specialities: string;
    languages: string;
    fees: string;
    achivements?: {
      description: string;
      proof: File;
    };
  };
};

export const AuthAPI = {
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
        firstName: "",
        lastName: "",
        phoneNumber: "",
        profilePic: DUMMY_AVATAR_IMG,
        role: "",
        city: "",
        state: "",
        additionalDetails: {
          fees: "",
          summary: "",
          experience: "",
          enrollmentId: "",
          certificate: "",
          languages: [],
          specialities: [],
          achievements: {
            proof: "",
            description: "",
          },
        },
      };

      await setDoc(doc(db, "lsp", data.uid), lsp);

      return APIResponse(false, "Successfully Signed Up", data);
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

      return APIResponse(false, "Successfully Signed In", data);
    } catch (err: any) {
      return APIResponse(true, err.message, null);
    }
  },

  signOut: async () => {
    try {
      await auth.signOut();
      return APIResponse(false, "Successfully Signed Out", null);
    } catch (err: any) {
      return APIResponse(true, err.message, null);
    }
  },
  UpdateLsp: async (
    id: string,
    data: TUpdateProfilePayload,
    currentLsp: NSAuthUser.TUser
  ) => {
    // to delete previous files if exists
    try {
      if (currentLsp?.profilePic && data.profilePic) {
        await deleteObject(ref(storage, `files/${currentLsp?.profilePic}`));
      }
      if (
        currentLsp?.additionalDetails?.certificate &&
        data.additionalDetails?.proof
      ) {
        await deleteObject(
          ref(storage, `files/${currentLsp?.additionalDetails?.certificate}`)
        );
      }
      if (
        currentLsp?.additionalDetails?.achievements?.proof &&
        data.additionalDetails?.achivements?.proof
      ) {
        await deleteObject(
          ref(
            storage,
            `files/${currentLsp?.additionalDetails?.achievements?.proof}`
          )
        );
      }
    } catch (error: any) {
      console.log("[FILE_DELETION_ERROR]", error.message);
    }

    try {
      const { data: profilePic } = await AuthAPI.uploadFile(data.profilePic);
      const { data: certificate } = await AuthAPI.uploadFile(
        data.additionalDetails.proof
      );
      let proof: string | null = "";
      if (data.additionalDetails.achivements?.proof) {
        const { data: achProof } = await AuthAPI.uploadFile(
          data.additionalDetails.achivements?.proof
        );
        proof = achProof;
      }

      const updatedData: NSAuthUser.TUser = {
        id: id,
        email: currentLsp.email,
        emailVerified: currentLsp.emailVerified,
        profilePic,
        city: data.city,
        state: data.state,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.profession,
        additionalDetails: {
          summary: data.additionalDetails.summary,
          experience: data.additionalDetails.experience,
          enrollmentId: data.additionalDetails.enrollmentId,
          specialities: convertCommaSeparatedStringToArray(
            data.additionalDetails.specialities
          ),
          languages: convertCommaSeparatedStringToArray(
            data.additionalDetails.languages
          ),
          certificate,
          fees: data.additionalDetails.fees,
        },
      };

      if (data.additionalDetails.achivements?.description) {
        updatedData.additionalDetails.achievements = {
          description: data.additionalDetails.achivements?.description,
          proof: proof || "",
        };
      }
      await setDoc(doc(db, "lsp", id), updatedData);
      return APIResponse(false, "Successfully Updated", updatedData);
    } catch (err: any) {
      console.log(err);
      return APIResponse(true, err.message, null);
    }
  },

  async uploadFile(file: File) {
    try {
      const storageRef = ref(storage, `files/${file?.name}`);
      const uploadTask = uploadBytes(storageRef, file);
      const snapshot = await uploadTask;
      const url = await getDownloadURL(snapshot.ref);
      return APIResponse(false, "File Uploaded", url);
    } catch (error: any) {
      return APIResponse(true, error.message, null);
    }
  },

  async deleteFile(name: string) {
    try {
      const storageRef = ref(storage, `files/${name}`);
      await deleteObject(storageRef);
      return APIResponse(false, "File Deleted", null);
    } catch (error: any) {
      return APIResponse(true, error.message, null);
    }
  },

  forgetPassword: async (email: string) => {
    try {
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push(doc.data());
      });

      if (docs.length === 0) return APIResponse(true, "User not found", null);

      await sendPasswordResetEmail(auth, email);
      return APIResponse(false, "Password Reset Email Sent", null);
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
      const docRef = doc(db, "lsp", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return APIResponse(
          false,
          "User found",
          docSnap.data() as NSAuthUser.TUser
        );
      } else {
        return APIResponse(true, "User not found", null);
      }
    } catch (error: any) {
      return APIResponse(true, error.message, null);
    }
  },
};

export default AuthAPI;
