'use client'

import React, { useContext, useState } from 'react';

export const WalletContext = React.createContext();

export function WalletProvider({ children }) {
    const [wallet, setWallet] = useState(null);

    const setWalletInfo = (walletAddress, pemContent) => {
        setWallet({ walletAddress, pemContent });
    }

    return (
        <WalletContext.Provider value={{ wallet, setWalletInfo }}>
            {children}
        </WalletContext.Provider>
    )
}