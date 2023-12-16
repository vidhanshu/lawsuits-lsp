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

  export type status = "PENDING" | "VERIFIED" | "BLOCKED";

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
    status?: status;
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

  export type TCustomer = {
    id: string;
    profilePic?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    emailVerified?: boolean;
    city?: string;
    state?: string;
    createdAt?: string;
  };

  export type TRequest = {
    id: string;
    lsp: TUser;
    customer: TCustomer;
    status: "PENDING" | "ACCEPTED" | "REJECTED" | "COMPLETED";
    subject: string;
    description: string;
    createdAt: string;
  };
}
