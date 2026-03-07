import { ErrorContext } from 'better-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export const useAuthRequestConfig = (errorTitle: string) => {
  const router = useRouter();
  const [loading, setIsLoading] = useState(false);

  return {
    loading,
    onRequest() {
      setIsLoading(true);
    },
    onError(context: ErrorContext) {
      toast.error(errorTitle, {
        description: context.error.message,
      });
    },
    onSuccess() {
      router.push('/overview');
    },
    onResponse() {
      toast.success('Success!');
      setIsLoading(false);
    },
  };
};
