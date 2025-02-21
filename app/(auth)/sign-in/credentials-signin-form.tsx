'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { signInWithCredentials } from '@/lib/actions/user.actions';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

import { useSearchParams } from 'next/navigation';

const CredentialsSignInForm = () => {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: ''
    });

    const SignInButton = () => {
        const { pending } = useFormStatus();

        return (
            <Button disabled={pending}  className='w-full' variant='default'>
                { pending ? 'Signing in...' : 'Sign In'}
            </Button>
        );
    }

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className='space-y-6'>
                <div>
                    <Label htmlFor='email'>Email</Label>
                    <Input 
                        id='email'
                        name='email'
                        type="email"
                        required
                        autoComplete='email'
                        defaultValue={''}
                    />
                </div>
                <div>
                    <Label htmlFor='password'>Password</Label>
                    <Input 
                        id='password'
                        name='password'
                        type="password"
                        required
                        autoComplete='password'
                        defaultValue={''}
                    />
                </div>
                <div>
                    <SignInButton />
                </div>
                { data && !data.success && (
                    <div className="text-center text-destructive">
                        {data.message}
                    </div>
                )}
            </div>
        </form>
    );
}

export default CredentialsSignInForm;