import { treaty } from '@elysiajs/eden';
import { BASE_URL } from '@/constants';
import { App } from '@/app/api/[[...slugs]]/route';

// .api to enter /api prefix
export const api = treaty<App>(BASE_URL).api;
