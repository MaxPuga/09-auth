import Link from 'next/link';
import AuthNavigation from '../AuthNavigation/AuthNavigation';

import css from './Header.module.css';

type Props = {
  isAuth: boolean;
  email?: string;
};

export default function Header({ isAuth, email }: Props) {
  return (
    <header className={css.header}>
      <nav>
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link href="/" className={css.navigationLink}>
              Home
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link href="/notes" className={css.navigationLink}>
              Notes
            </Link>
          </li>

          <AuthNavigation isAuth={isAuth} email={email} />
        </ul>
      </nav>
    </header>
  );
}
