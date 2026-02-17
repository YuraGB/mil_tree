'use client';
import { BASE_URL } from '@/constants';
import { createAuthClient } from 'better-auth/react';
const authClient = createAuthClient({
  baseURL: BASE_URL,
});

export default authClient;
