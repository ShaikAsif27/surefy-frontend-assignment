// app/layout.tsx  (Server Component)
import './globals.css';
import { ReactNode } from "react";
import dynamic from "next/dynamic";

// Dynamically import client-only wrappers so they run only in the browser
const ThemeProviderWrapper = dynamic(() => import('../src/components/ThemeProviderWrapper'), { ssr: false });
const ReduxProvider = dynamic(() => import('../src/components/ReduxProvider'), { ssr: false });

export const metadata = {
  title: 'Dynamic Data Table - Surefy',
  description: 'Frontend Task Demo'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProviderWrapper>
          <ReduxProvider>
            <main style={{ padding: 20, fontFamily: 'Inter, system-ui, sans-serif' }}>
              {children}
            </main>
          </ReduxProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  );
}
