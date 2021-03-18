import 'nextra-theme-docs/style.css'
import FourOhFour from "./_404"

export default function Nextra({ Component, pageProps }) {
  if (pageProps.statusCode === 404) {
    return <FourOhFour />
  }
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}