'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { logout } from '@/lib/api/clientApi';

import css from './AuthNavigation.module.css';

type Props = {
  isAuth: boolean;
  email?: string;
};

export default function AuthNavigation({ isAuth, email }: Props) {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();

    router.push('/sign-in');
    router.refresh();
  };

  return (
    <>
      {isAuth ? (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{email}</p>

            <button onClick={handleLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      ) : (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}
