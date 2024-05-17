import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <AppCacheProvider {...pageProps}>
        <Component {...pageProps} />
      </AppCacheProvider>
    </SessionProvider>
  );
}
