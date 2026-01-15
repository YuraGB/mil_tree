'use client';
import { Button } from '@/components/ui/button';
import { api } from '@/elysia/eden';
import { useState } from 'react';

export const HomePageComponent = () => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn2 = async () => {
    await api.test1.get();
  };

  return (
    <>
      <Button onClick={handleSignIn}>
        {loading ? 'Loading...' : 'Sign In'}
      </Button>
      <Button onClick={handleSignIn2}>dddddd</Button>
    </>
  );
};
