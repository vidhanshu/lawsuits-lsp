'use client'
// Import necessary dependencies

import React, { useCallback, useState } from 'react';
import { Button } from '@/components/ui/button';
import { NSAuthUser } from '@/src/auth/types';
import { DUMMY_AVATAR_IMG } from '@/src/auth/utils/constants';
import Image from 'next/image';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import Select from 'react-select'
import { useDropzone } from 'react-dropzone'



const OnboardingForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<Omit<NSAuthUser.TUser, 'id'>>();

    const [selectedCertificate, setSelectedCertificate] = useState<File | null>(null);

    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length) {
            setSelectedCertificate(acceptedFiles[0])
        }

    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const Specialities = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const langauges = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    const roles = [
        { value: 'DOCUMENT_WRITER', label: 'Document Writer' },
        { value: 'NOTARY', label: 'Notary' },
        { value: 'MEDIATOR', label: 'Mediator' },
        { value: 'ARBITRATOR', label: 'Arbitrator' },
        { value: 'ADVOCATE', label: 'Advocate' },
    ]

    const onSubmit: SubmitHandler<Omit<NSAuthUser.TUser, 'id'>> = (data) => {
        console.log('Form Data:', data);
    };

    return (
        <div className='container min-h-fit py-20 px-36'>
            <div className='font-bold text-2xl mb-8'>Profile Details</div>
            <div className='mb-6 w-fit'>
                <label className='cursor-pointer' htmlFor='profilePic'>
                    <Image
                        src={selectedImage || DUMMY_AVATAR_IMG}
                        alt=''
                        width={80}
                        height={80}
                        className='rounded-full col-span-3 object-cover h-20 w-20'
                    />
                    <div />
                </label>
                <input
                    id='profilePic'
                    type='file'
                    className='hidden'
                    onChange={handleImageChange}
                />
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-[100%] gap-4'>
                <div className='flex flex-row gap-4 w-full justify-around'>
                    <div className='flex flex-col gap-2 w-1/2'>
                        <label className='font-bold'>First Name*</label>
                        <input
                            className='border border-gray-400 px-2 py-1 rounded-sm'
                            placeholder='Enter Your First Name'
                            {...register('firstName', { required: 'First Name is required' })}
                        />
                        {errors.firstName && (
                            <span className='text-red-500'>{errors.firstName.message}</span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 w-1/2'>
                        <label className='font-bold'>Last Name*</label>
                        <input
                            className='border border-gray-400 px-2 py-1 rounded-sm'
                            placeholder='Enter Your Last Name'
                            {...register('lastName', { required: 'Last Name is required' })}
                        />
                        {errors.lastName && (
                            <span className='text-red-500'>{errors.lastName.message}</span>
                        )}
                    </div>
                </div>
                <div className='flex flex-row w-full gap-4 '>
                    <div className='flex flex-col gap-2 w-1/2'>
                        <label className='font-bold'>State*</label>
                        <input
                            className='border border-gray-400 px-2 py-1 rounded-sm'
                            placeholder='Enter Your State'
                            {...register('state', { required: 'State is required' })}
                        />
                        {errors.state && (
                            <span className='text-red-500'>{errors.state.message}</span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 w-1/2'>
                        <label className='font-bold'>City*</label>
                        <input
                            className='border border-gray-400 px-2 py-1 rounded-sm'
                            placeholder='Enter Your City'
                            {...register('city', { required: 'City is required' })}
                        />
                        {errors.city && (
                            <span className='text-red-500'>{errors.city.message}</span>
                        )}
                    </div>
                </div>
                <div className='mb-10 flex flex-row gap-4'>
                    <div className='flex flex-col gap-2 w-[49%] '>
                        <label className='font-bold'>E-mail*</label>
                        <input
                            className='border border-gray-400 px-2 py-1 rounded-sm'
                            placeholder='Enter Your E-mail'
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: 'Invalid email address',
                                },
                            })}
                        />
                        {errors.email && (
                            <span className='text-red-500'>{errors.email.message}</span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2 w-[49%]'>
                        <label className='font-bold'>Role*</label>
                        <Controller
                            name='role' // Specify the name for the field // Pass the control prop from useForm
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={roles}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className='border-t border-gray-300'>
                    <div className='font-bold text-2xl mb-8 mt-8'>Additional Details</div>
                </div>
                <div className='flex flex-col gap-2 w-full'>
                    <label className='font-bold'>Summary*</label>
                    <textarea
                        className='border border-gray-400 px-2 h-28 py-1 rounded-sm'
                        placeholder='Enter Your Summary'
                        {...register('additionalDetails.summary', { required: 'Summary is required' })}
                    />
                    {errors.additionalDetails?.summary && (
                        <span className='text-red-500'>{errors.additionalDetails?.summary.message}</span>
                    )}
                </div>
                <div className='flex flex-row w-full gap-4'>
                    <div className='flex flex-col gap-2 w-[49%]'>
                        <label className='font-bold'>Experience (in years)*</label>
                        <input
                            type='number'
                            className='border border-gray-400 px-2 py-1 rounded-sm'
                            placeholder='Enter Your Experience'
                            {...register('additionalDetails.experience', { required: 'Experience is required' })}
                        />
                        {errors.additionalDetails?.experience && (
                            <span className='text-red-500'>{errors.additionalDetails?.experience.message}</span>
                        )}
                    </div>

                    <div className='flex flex-col gap-2 w-[49%]'>
                        <label className='font-bold'>Enrollment ID*</label>
                        <input
                            className='border border-gray-400 px-2 py-1 rounded-sm'
                            placeholder='Enter Your Enrollment ID'
                            {...register('additionalDetails.enrollmentId', { required: 'Enrollment ID is required' })}
                        />
                        {errors.additionalDetails?.enrollmentId && (
                            <span className='text-red-500'>{errors.additionalDetails?.enrollmentId.message}</span>
                        )}
                    </div>
                </div>

                <div className='flex flex-col md:flex-row w-full gap-4'>
                    <div className='flex flex-col gap-2 w-[49%]'>
                        <label className='font-bold'>Specialities*</label>
                        <Controller
                            name='additionalDetails.specialities' // Specify the name for the field // Pass the control prop from useForm
                            defaultValue={[]} // Set the default value
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={Specialities}
                                    isMulti
                                />
                            )}
                        />
                    </div>

                    <div className='flex flex-col gap-2 w-[49%]'>
                        <label className='font-bold'>Langauges*</label>
                        <Controller
                            name='additionalDetails.langauges' // Specify the name for the field // Pass the control prop from useForm
                            defaultValue={[]} // Set the default value
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={langauges}
                                    isMulti
                                />
                            )}
                        />
                    </div>
                </div>
                <div className='flex flex-col gap-2 w-full md:w-[49%]'>
                    <label className='font-bold'>Fees / hr*</label>
                    <input
                        className='border border-gray-400 px-2 py-1 rounded-sm'
                        placeholder='Enter Your Fees'
                        {...register('additionalDetails.fees', { required: 'fees is required' })}
                    />
                    {errors.additionalDetails?.fees && (
                        <span className='text-red-500'>{errors.additionalDetails?.fees.message}</span>
                    )}
                </div>
                <div>
                    <label className='font-bold' htmlFor="">
                        Certificate*
                    </label>
                    <div className='flex flex-col mb-6 w-[400px] gap-2 mt-2 border-dashed border-2 rounded-sm border-gray-300 px-10 py-8'>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />

                            {selectedCertificate ?
                                selectedCertificate?.name :
                                <p>Drag drop some files here, or click to select files</p>
                            }
                        </div>
                    </div>
                </div>

                <div className='font-bold text-2xl border-t py-8'>Achievements</div>
                <div className='flex flex-col md:flex-row w-full gap-4'>
                    <div className='flex flex-col gap-2 w-full'>
                        <label className='font-bold'>Description</label>
                        <textarea
                            className='border border-gray-400 px-2 h-18 py-1 rounded-sm'
                            placeholder='Description is required'
                            {...register('additionalDetails.achievements.description', { required: 'Description is required' })}
                        />
                        {errors.additionalDetails?.achievements?.description && (
                            <span className='text-red-500'>{errors.additionalDetails?.achievements.description.message}</span>
                        )}
                    </div>

                    <div>
                        <label className='font-bold' htmlFor="">
                            Proof*
                        </label>
                        <div className='flex flex-col mb-6 w-[400px] gap-2 mt-2 border-dashed border-2 rounded-sm border-gray-300 px-10 h-18 py-1'>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />

                                {selectedCertificate ?
                                    selectedCertificate?.name :
                                    <p className='flex flex-col mb-6 w-[400px] gap-2 mt-2 border-dashed border-2 rounded-sm border-gray-300 px-10 h-18 py-1'>Drag drop some files here, or click to select files</p>
                                }
                            </div>
                        </div>
                    </div>

                </div>
                <Button type='submit' className='w-[20%] rounded-full text-base mt-5 h-10'>
                    Submit
                </Button>
            </form>
        </div>
    );
};


export default OnboardingForm;
