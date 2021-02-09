import "../styles.css";
import "nextra-theme-docs/style.css";
import TagManager from 'react-gtm-module'
export default function Nextra({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
