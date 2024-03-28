import { ProductContextProvider } from '@/components/ProductContext'
import Navbar from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'


const inter = Inter({ subsets: ['latin'] })
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700']
 })

export const metadata: Metadata = {
  title: 'PriceTracker',
  description: 'Track Amazon product prices effortlessly and save money.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ProductContextProvider>
            <main className="w-screen mx-auto" >
              <Navbar />
              {children}
            </main>
          </ProductContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
