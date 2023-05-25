import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { SkipNavLink } from "@reach/skip-nav";
const gtmId = process.env.NEXT_PUBLIC_GTAG;
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${gtmId}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gtmId}');`,
            }}
          ></script>
          <meta
            property="og:title"
            content="Cosmic Headless CMS Docs - Content API and developer toolkit."
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://docs-v2.cosmicjs.com" />
          <meta
            property="og:image"
            content="https://cdn.cosmicjs.com/5c20a2d0-1891-11ec-80c4-d562efc15827-cosmic-docs.png"
          />
          <meta property="og:site_name" content="Cosmic Docs" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@cosmicjs" />
          <meta name="twitter:title" content="Cosmic Docs" />
          <meta name="twitter:url" content="https://docs-v2.cosmicjs.com" />
          <meta
            name="twitter:description"
            content="Cosmic Headless CMS Docs - Content API and developer toolkit."
          />
          <meta
            name="twitter:image"
            content="https://cdn.cosmicjs.com/5c20a2d0-1891-11ec-80c4-d562efc15827-cosmic-docs.png"
          />
          <meta
            property="og:image"
            content="https://cdn.cosmicjs.com/5c20a2d0-1891-11ec-80c4-d562efc15827-cosmic-docs.png"
          />
          <meta name="robots" content="noindex">
        </Head>
        <body>
          <SkipNavLink />
          <Main />
          <NextScript />
          <script
            src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
            async
            defer
          />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
