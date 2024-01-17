'use client'

import styles from './page.module.css'
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/navigation'
import { WalletContext } from '@/context/WalletContext'

export default function Login() {
  const router = useRouter()

  const [pemFile, setPemFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Context
  const { wallet, setWalletInfo } = useContext(WalletContext);

  const handleFileChange = (event) => {
    console.log("Selecting file...")
    setPemFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Process the .pem file here. For example, read its content.
    if (pemFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        let fileContent = e.target.result;
        // Send walletAddress and fileContent to your backend
        const regex = /-----BEGIN PRIVATE KEY for (.{62})-----\s*([\s\S]*?)\s*-----END PRIVATE KEY for \1-----/;
        const match = fileContent.match(regex);
        console.log("Match:", match)
        if (match && match[1] && match[2]) {

          setWalletInfo(match[1], match[2]);
          router.push('/dashboard');
        }
        setIsLoading(false);
      };
      reader.readAsText(pemFile);

    } else {
      // Handle case where no file is selected
      console.log("No PEM file selected");
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.loginContainer}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>PEM File:</label>
            <input
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <button className={styles.loginButton} type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}