import React from 'react';

export namespace NSAuthUser {
  export interface IUserContext {
    isLoggedIn?: boolean;
    user: IUserState | null;
    setUser: React.Dispatch<React.SetStateAction<IUserState>>;
    // ...rest other fields we will add here
  }

  export interface IUserState {
    email: string | null;
    // ...rest other fields we will add here
  }

  export type TUser = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    emailVerified?: boolean;
    profilePic?: string;
    city?: string;
    state?: string;
    additionalDetails: TAdditionalDetails;
    // ..rest other required details
  };

  export type TAdditionalDetails = {
    summary?: string;
    experience?: string;
    enrollmentId?: string;
    specialities?: string[];
    langauges?: string[];
    achievements?: {
      description?: string;
    }
    fees?: string;
  }
}


