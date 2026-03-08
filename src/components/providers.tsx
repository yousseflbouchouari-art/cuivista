"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/contexts/LanguageContext";

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <SessionProvider>
      <LanguageProvider>
        <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange {...props}>
          {children}
        </NextThemesProvider>
      </LanguageProvider>
    </SessionProvider>
  );
}
