import { Inter } from 'next/font/google'
import './globals.css'
import { WalletProvider } from '@/context/WalletContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'NFT Auction Application',
  description: 'An application to auction and buy nfts',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletProvider>
          <div>
            {children}
          </div>
        </WalletProvider>
      </body>
    </html>
  )
}
