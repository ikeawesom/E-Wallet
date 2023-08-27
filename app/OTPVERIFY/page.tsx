'use client';
import { userDatabase } from "@/supabase/database";
import { useRef } from 'react';

export default function Page() {
    const OTPRef = useRef('')
    const loginUsername = localStorage.getItem("Login_Username");

    async function onSubmit(event: any) {
        event.preventDefault();

        const isverified = await userDatabase.VerifyOTP(loginUsername, Number(OTPRef.current))
        if (isverified) {
            console.log('balance has been updated!')
            window.location.href = '/'
        } else {
            console.log('Your OTP is wrong!')
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type='text' onChange={(e: any) => {
                    OTPRef.current = e.target.value
                }}/>
                <input type='submit' value='verify OTP' />
            </form>
        </div>
    )
}