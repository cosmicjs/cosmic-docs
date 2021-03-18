import 'nextra-theme-docs/style.css'

export default function Nextra({ Component, pageProps }) {
  if (pageProps.statusCode === 404) {
    return <Error statusCode={404} />
  }
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}