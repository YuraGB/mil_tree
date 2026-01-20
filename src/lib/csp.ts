import { isDev } from '@/constants';

export const helmetConfig = {
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: isDev
      ? ["'self'", "'unsafe-inline'", "'unsafe-eval'"]
      : ["'self'"],
    styleSrc: isDev ? ["'self'", "'unsafe-inline'"] : ["'self'"],
    imgSrc: ["'self'", 'data:', 'https:'],
    connectSrc: isDev ? ["'self'", 'ws:', 'https:'] : ["'self'", 'https:'],
  },
  hsts: {
    maxAge: 31_536_000,
    includeSubDomains: true,
    preload: true,
  },
  frameOptions: 'DENY' as const,
  referrerPolicy: 'strict-origin-when-cross-origin' as const,
  permissionsPolicy: {
    camera: ["'none'"],
    microphone: ["'none'"],
  },
};
