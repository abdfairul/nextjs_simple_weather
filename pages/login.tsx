import { useRouter } from 'next/router';
import { userService } from '../services';
import React, { useState, useEffect } from 'react';

import styles from "../styles/Home.module.css";
import LoginComponent from "../components/login-component"

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
      if (userService.userValue) {
          router.push('/');
      }

  }, []);

  return (
  <div>
    <LoginComponent/>
  </div>
  );
}
