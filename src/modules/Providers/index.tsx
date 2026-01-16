'use client';

import { FC, PropsWithChildren } from 'react';
import { QueryProvider } from './QueryProvider';

export const Providers: FC<PropsWithChildren> = ({ children }) => (
  <QueryProvider>{children}</QueryProvider>
);
