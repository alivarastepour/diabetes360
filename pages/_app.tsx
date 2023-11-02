import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="lazyOnload"
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-DWSVN55RGN"
      ></Script>
      <Script id="gtag-config">
        {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-DWSVN55RGN');`}
      </Script>
      <Component {...pageProps} />
    </>
  );
}
