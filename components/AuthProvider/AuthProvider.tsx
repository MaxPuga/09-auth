'use client';

import { useEffect } from 'react';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore(state => state.setUser);
  const clearUser = useAuthStore(state => state.clearUser);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await checkSession();

        if (session) {
          const user = await getMe();

          setUser(user);
        } else {
          clearUser();
        }
      } catch {
        clearUser();
      }
    };

    fetchUser();
  }, [setUser, clearUser]);

  return <>{children}</>;
}
