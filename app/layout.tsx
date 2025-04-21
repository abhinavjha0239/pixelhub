import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import '@/app/globals.css';
import { ThemeProvider } from '@/app/components/theme-provider';
import { GameProvider } from '@/context/game-context';
import { UserProvider } from '@/context/user-context';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PixelVerse - Digital Gaming Metaverse',
  description: 'Explore a world of pixel games, digital collectibles, and community in the PixelVerse metaverse.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <GameProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-grow">
                  {children}
                </main>
                <Footer />
              </div>
            </GameProvider>
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}