// src/routes/authRoute.ts
import { Context } from 'elysia';
import { auth } from '@/utils/auth';

// Improved authentication handler
export const betterAuthView = (context: Context) => {
  if (!context.request) {
    return new Response('Bad Request', { status: 400 });
  }

  const BETTER_AUTH_ACCEPT_METHODS = ['POST', 'GET'];
  if (!BETTER_AUTH_ACCEPT_METHODS.includes(context.request.method)) {
    return new Response('Method Not Allowed', { status: 405 });
  }

  return auth.handler(context.request);
};
