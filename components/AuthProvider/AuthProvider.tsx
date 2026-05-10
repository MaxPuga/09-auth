'use client';

import { useEffect, useState } from 'react';
import { checkSession } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, clearAuth } = useAuthStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const user = await checkSession();

        if (user && !('success' in user)) {
          setUser(user);
        } else {
          clearAuth();
        }
      } catch {
        clearAuth();
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [setUser, clearAuth]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <>{children}</>;
}
