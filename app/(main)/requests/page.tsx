'use client'

import useUserContext from '@/src/auth/contexts/userContext/useUserContext'
import { DUMMY_AVATAR_IMG } from '@/src/auth/utils/constants'
import Container from '@/src/common/components/Container'
import { db } from '@/src/firebase/firebase'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore'
import { Check, CheckCircle2, X, XCircle } from 'lucide-react'
import Image, { ImageProps } from "next/image";
import React, { useEffect, useState } from 'react'

const RequestsPage = () => {
    const { lsp } = useUserContext();
    const [requests, setRequests] = useState<any[]>([]);

    const fetchData = async () => {
        const q = query(collection(db, 'requests'),
            where('lsp.firstName', '==', lsp?.firstName),
            orderBy('createdAt', 'desc')
        );
        const snapshot = await getDocs(q);
        const requestsData = snapshot.docs.map((doc) => ({
            ...doc.data()
        }));
        setRequests(requestsData);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className='bg-blue-50 h-[calc(100vh-60px)]'>
            <div className='h-full md:h-fit border border-transparent md:max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto lg:px-0 bg-white'>
                <div className='text-2xl font-bold mt-6 mx-4 md:mt-10 md:mx-8'>Requests</div>
                <div className='flex flex-col gap-6 md:gap-8 mt-6 mb-6 md:mt-10 md:px-4 px-2 md:mb-10'>
                    {
                        requests.map((request, idx) => (
                            <div key={request.id} className=' flex flex-row gap- py-2 justify-between md:px-6 px-2  rounded-sm shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]'>
                                <div className='w-fit flex items-center justify-center'>
                                    <Image
                                        alt={"logo"}
                                        src={DUMMY_AVATAR_IMG || request.customer.profilePic}
                                        width={51}
                                        height={51}
                                        className='rounded-full'
                                    />
                                </div>
                                <div className='flex flex-col md:px-4 w-[55%] md:w-[70%] '>
                                    <div className='text-lg font-semibold'>{request.customer.firstName}  {request.customer.lastName}</div>
                                    <div className='text-sm'>Subject : {request.subject}...</div>
                                    <div className='text-sm'>Date : 12 july </div>
                                </div>
                                <div className='hidden md:block px-4 my-auto'>
                                    <div className='flex flex-row gap-4 items-center'>
                                        <div className='flex flex-row cursor-pointer font-bold text-gray-600 hover:text-red-400 gap-2'>Reject</div>
                                        <div className='cursor-pointer border border-blue-500 ronded-full rounded-full px-4 py-1 flex flex-row gap-2 font-bold text-blue-500 hover:bg-blue-50 items-center'> <Check size={20} color="#5773ff" strokeWidth={2} />Accept</div>
                                    </div>
                                </div>
                                <div className='flex flex-row items-center gap-2 md:hidden'>
                                    <div className='cursor-pointer'><XCircle size={40} color="#000000" strokeWidth={0.55} /></div>
                                    <div className='cursor-pointer'><CheckCircle2 size={40} strokeWidth={0.55} color="#24bdff" /></div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>

    );
};

export default RequestsPage;