"use client";

import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import Image from "next/image";
import { Check, CheckCircle2, XCircle } from "lucide-react";

import { NSAuthUser } from "@/src/auth/types";
import Container from "@/src/common/components/Container";
import { DUMMY_AVATAR_IMG } from "@/src/auth/utils/constants";
import useUserContext from "@/src/auth/contexts/userContext/useUserContext";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import { db } from "@/src/firebase/firebase";

const RequestsPage = () => {
  const { lsp } = useUserContext();
  const [requests, setRequests] = useState<NSAuthUser.TRequest[]>([]);

  useEffect(() => {
    if (!lsp?.id) return;

    const q = query(
      collection(db, "requests"),
      where("lsp.id", "==", lsp?.id),
      orderBy("createdAt", "desc")
    );
    // This will be called every time a new request is added
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const reqs: NSAuthUser.TRequest[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as NSAuthUser.TRequest;
        // Only want pending requests here
        if (data.status === "PENDING") {
          reqs.push(data);
        }
      });
      setRequests(reqs);
    });

    return () => {
      unsubscribe();
    };
  }, [lsp?.id]);

  return (
    <div className="bg-blue-50">
      <Container className="bg-white py-8 lg:px-4 md:px-4 px-2  min-h-[calc(100vh-60px)]">
        <div className="text-2xl font-bold">Requests</div>
        <div className="flex flex-col gap-6 md:gap-8 mt-6 mb-6 md:mt-10 md:mb-10">
          {requests?.map((request, idx) => (
            <div
              key={idx}
              className="flex flex-row py-2 justify-between md:px-6 px-2  rounded-sm shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
            >
              <div className="w-fit flex items-center justify-center">
                <Image
                  alt="logo"
                  width={51}
                  height={51}
                  src={request.customer?.profilePic || DUMMY_AVATAR_IMG}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col gap-2 md:px-4 w-[55%] md:w-[70%] ">
                <div className="text-lg font-semibold">
                  {request.customer.firstName} {request.customer.lastName}
                </div>
                <div className="text-sm">Subject : {request.subject}...</div>
                <div className="text-sm">
                  Date :{" "}
                  {dayjs(new Date(request?.createdAt)).format("DD/MM/YY h:m a")}
                </div>
              </div>
              <div className="hidden md:block px-4 my-auto">
                <div className="flex flex-row gap-4 items-center">
                  <button className="flex flex-row cursor-pointer font-bold text-gray-600 hover:text-red-400 gap-2">
                    Reject
                  </button>
                  <button className="cursor-pointer border border-blue-500 ronded-full rounded-full px-4 py-1 flex flex-row gap-2 font-bold text-blue-500 hover:bg-blue-50 items-center">
                    {" "}
                    <Check size={20} color="#5773ff" strokeWidth={2} />
                    Accept
                  </button>
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 md:hidden">
                <div className="cursor-pointer">
                  <XCircle size={40} color="#000000" strokeWidth={0.55} />
                </div>
                <div className="cursor-pointer">
                  <CheckCircle2 size={40} strokeWidth={0.55} color="#24bdff" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default RequestsPage;
