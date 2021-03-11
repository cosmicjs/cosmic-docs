import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { SkipNavLink } from '@reach/skip-nav'
const gtmId = process.env.NEXT_PUBLIC_GTAG
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
          gtag('config', '${gtmId}');`
            }}
          ></script>
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
    )
  }
}

export default MyDocument
