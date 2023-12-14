import React from "react";

export namespace NSAuthUser {
  export interface IUserContext {
    isLoading?: boolean;
    lsp: TUser | null;
    setLsp: React.Dispatch<React.SetStateAction<TUser | null>>;
  }

  export type role =
    | "DOCUMENT_WRITER"
    | "NOTARY"
    | "MEDIATOR"
    | "ARBITRATOR"
    | "ADVOCATE";

  export type TUser = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    emailVerified?: boolean;
    profilePic?: string | null;
    city?: string;
    role: string;
    state?: string;
    rating?: number;
    casesSolved?: number;
    ratedByCount?: number;
    additionalDetails: TAdditionalDetails;
  };

  export type TAdditionalDetails = {
    summary?: string;
    experience?: string;
    enrollmentId?: string;
    specialities?: string[];
    languages?: string[];
    certificate?: string | null;
    achievements?: {
      description?: string;
      proof?: string | null;
    };
    fees?: string;
  };
}
