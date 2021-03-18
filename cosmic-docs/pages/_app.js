import '../styles/global.css'
import 'nextra-theme-docs/style.css'
import Custom404 from '../components/custom404'

export default function Nextra({ Component, pageProps }) {
  if (pageProps.statusCode === 404) {
    return <Custom404 />
  }
  return (
    <>
      <Component {...pageProps} />
    </>
  )
}
