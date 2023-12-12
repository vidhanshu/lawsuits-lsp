import React from 'react';

export namespace NSAuthUser {
  export interface IUserContext {
    isLoggedIn?: boolean;
    lsp: ILspState | null;
    setLsp: React.Dispatch<React.SetStateAction<ILspState | null>>;
  }

  export interface ILspState {
    id: string | null;
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
    profilePic?: string | null;
    city?: string;
    role: string
    state?: string;
    additionalDetails: TAdditionalDetails;
  };

  export type TAdditionalDetails = {
    summary?: string;
    experience?: string;
    enrollmentId?: string;
    specialities?: string
    languages?: string;
    certificate?: string | null;
    achievements?: {
      description?: string;
      proof?: string | null;
    };
    fees?: string;
  };

}


