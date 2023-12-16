"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";

import useUserContext from "@/src/auth/contexts/userContext/useUserContext";
import { routes } from "@/src/common/utils/constants";

const ProfileReview = () => {
  const { lsp } = useUserContext();

  return (
    <div className="h-[calc(100vh-60px)] flex items-center justify-center">
      {lsp?.status === "PENDING" ? (
        <div className="text-center flex flex-col gap-5">
          <div className="font-bold text-4xl text-blue-500">
            Your profile is under review
          </div>
          <div className="w-[93%] md:w-[43%] m-auto">
            You will be notified when your profile is verified. This usually
            takes <span className="font-bold">1-2 working days.</span>{" "}
          </div>
          <div>
            <button className="bg-blue-500 text-white px-14 rounded-full py-3">
              CONTACT SUPPORT
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center flex flex-col gap-5">
          <div className="m-auto">
            <ShieldCheck size={80} color="#00cc4e" />
          </div>
          <div className="font-bold text-4xl text-blue-500">
            Your profile is successfully verified
          </div>
          <div className="font-bold">
            Esteemed [Legal Platform] Member, <br />{" "}
            <span className="text-blue-500 underline">
              {lsp?.firstName} {lsp?.lastName}
            </span>
          </div>
          <div className="w-[93%] md:w-[43%] m-auto">
            We are pleased to inform you that your profile has been successfully
            verified. You are now ready to access and utilize our legal service
            provider platform. Feel free to explore and engage with clients.
          </div>
          <div>
            <Link href={routes.HOME_ROUTE}>
              <button className="bg-blue-500 text-white px-14 rounded-full py-3">
                Go To Home Page
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileReview;
