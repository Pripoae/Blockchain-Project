'use client'

import React, { useEffect, useState, useContext } from 'react';
import styles from './page.module.css'
import { WalletContext } from '@/context/WalletContext';
import { useRouter } from 'next/navigation';
import NftComponent from '@/components/nft_component';

export default function Dashboard() {

    const router = useRouter();
    const { wallet, _ } = useContext(WalletContext);
    const [nfts, setNfts] = useState([]); // [{ id, name, description, nft_address, price }

    const handleRequest = async () => {
        console.log("Request made with wallet address and PEM content");
        const body = {
            user_address: wallet?.walletAddress,
            pem_content: wallet?.pemContent,
            address: "asdas",
            price: 123
        };

        const request = await fetch('http://localhost:8080/api/v1/nft_auction', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await request.json();
        console.log("Response:", response);
    };

    useEffect(() => {

        if (wallet == null) {
            router.push('/');
        }
        const fetchNfts = async () => {
            // Simple fetch GET request to localhost:8080/api/v1/nft_auction
            const request = await fetch('http://localhost:8080/api/v1/nft_auction', { method: 'GET' });
            const response = await request.json()
            console.log("Response:", response)

            setNfts(response);
        }
        fetchNfts();
    }, []);

    return (
        <div className={styles.dashboardContainer}>
            <h1>Dashboard</h1>
            <div className={styles.dashboardContent}>
                <div className={styles.info}>
                    <h2>Wallet Information</h2>
                    <p>Wallet Address: {wallet?.walletAddress}</p>
                </div>

                <button className={styles.requestButton} onClick={handleRequest}>
                    Make Request
                </button>
            </div>
            <div className={styles.nftsContainer}>
                {nfts.map((nft) => {
                    console.log(nft)
                    return (
                        <div key={nft.id} className={styles.container}>
                            <h1 className={styles.title}>{nft.name}</h1>
                            <p className={styles.description}>{nft.description}</p>
                            <p className={styles.address}>{nft.nft_address}</p>
                            <p className={styles.price}>{nft.price}</p>

                        </div>
                    )
                })}
            </div>
        </div>
    );
}
