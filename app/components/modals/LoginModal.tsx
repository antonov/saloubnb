'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import {signIn} from "next-auth/react";
import {callback} from "next-auth/core/routes";
import {useRouter} from "next/navigation";


const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);
    const { 
        register,
        handleSubmit,
        formState: {
            errors,
        } 
    } = useForm<FieldValues>({defaultValues: {
        email: '',
        password: '',
    }});

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {...data, redirect: false})
          .then((callback) => {
            setIsLoading(false);
            if(callback?.ok) {
              toast.success('Logged in!')
              router.refresh();
              loginModal.onClose();
            }
            if(callback?.error) {
              toast.error('Something is wrong!')
            }
          });
    }
    

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading title='Welcome back!' subtitle='Login into your account!'/>
            <Input id="email"
                   label="Email"
                   disabled={isLoading}
                   register={register}
                   errors={errors}
                   required
            />
            <Input id="password"
                   label="Password"
                   disabled={isLoading}
                   register={register}
                   errors={errors}
                   required
                   type="password"
            />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
          <Button outline  label="Continue with Google" onClick={() => {}} icon={FcGoogle} />
          <Button outline  label="Continue with Github" onClick={() => {}} icon={AiFillGithub} />
          <div className="text-neutral-500 font-light mt-4">
            <div className="justify-center  flex flex-row gap-2 items-center">
              <div>
                Already have an account?
              </div>
              <div className="text-neutral-800 cursor-pointer hover:underline">Login</div>
            </div>
          </div>
        </div>
    );

    return (
    <Modal
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title="Login"
    actionLabel='Continue'
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
        );
}
 
export default LoginModal;