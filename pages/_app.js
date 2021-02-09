import "../styles.css";
import "nextra-theme-docs/style.css";
import TagManager from 'react-gtm-module'
import { useEffect } from 'react'
const tagManagerArgs = {
  gtmId: process.env.NEXT_PUBLIC_GTAG
}
export default function Nextra({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, []);
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
