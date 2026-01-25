"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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

  return (
    <>
      <Button onClick={handleSignIn}>
        {loading ? "Loading..." : "Sign In"}
      </Button>
    </>
  );
};
