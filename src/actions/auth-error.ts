'use server'

import { cookies } from 'next/headers';

export async function setAuthError(error: string) {
    const cookieStore = await cookies();
    cookieStore.set('auth_error', error, { path: '/', httpOnly: true });
}
export async function getAuthError() {
    const cookieStore = await cookies();
    const error = cookieStore.get('auth_error')?.value || null;
    if (error) {
        cookieStore.set('auth_error', '', { path: '/', httpOnly: true, expires: new Date(0) });
    }
    return error;
}
