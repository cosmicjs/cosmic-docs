import "../styles/global.css";
import "nextra-theme-docs/style.css";
import Custom404 from "../components/custom404";
import { IntercomProvider } from "react-use-intercom";
const INTERCOM_APP_ID = "o4fm83zs";

export default function Nextra({ Component, pageProps }) {
  if (pageProps.statusCode === 404) {
    return <Custom404 />;
  }
  return (
    <>
      <IntercomProvider autoBoot appId={INTERCOM_APP_ID}>
        <Component {...pageProps} />
      </IntercomProvider>
    </>
  );
}
