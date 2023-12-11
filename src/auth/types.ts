import React from 'react';

export namespace NSAuthUser {
  export interface IUserContext {
    isLoggedIn?: boolean;
    user: IUserState | null;
    setUser: React.Dispatch<React.SetStateAction<IUserState>>;
  }

  export interface IUserState {
    email: string | null;
  }

  export type role = 'DOCUMENT_WRITER' | 'NOTARY' | 'MEDIATOR' | 'ARBITRATOR' | 'ADVOCATE';

  export type TUser = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    emailVerified?: boolean;
    profilePic?: string;
    city?: string;
    role: { value: string; label: string; }
    state?: string;
    additionalDetails: TAdditionalDetails;
  };

  export type TAdditionalDetails = {
    summary?: string;
    experience?: string;
    enrollmentId?: string;
    specialities?: { value: string; label: string; }[]
    langauges?: { value: string; label: string; }[]
    certificate?: string;
    achievements?: {
      description?: string;
      proof?: string
    }
    fees?: string;
  }
}


