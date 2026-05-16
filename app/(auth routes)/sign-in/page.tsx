'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '@/lib/api';
import { AxiosError } from 'axios';

import css from './SignInPage.module.css';

const SignIn = () => {
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (formData: FormData) => {
    try {
      const formValues = Object.fromEntries(formData) as LoginRequest;
      const res = await login(formValues);
      if (res) {
        router.push('/profile');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      const err = error as AxiosError<{ error?: string }>;

      setError(
        err.response?.data?.error ?? err.message ?? 'Oops... some error'
      );
    }
  };

  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>

          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>
        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
          {error && <p>{error}</p>}
        </div>
      </form>
    </main>
  );
};

export default SignIn;
