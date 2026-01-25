"use client";
import { FC, PropsWithChildren } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const QueryProvider: FC<PropsWithChildren> = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export const HydratedQueryProvider: FC<PropsWithChildren> = ({ children }) => (
  <HydrationBoundary state={dehydrate(queryClient)}>
    {children}
  </HydrationBoundary>
);
