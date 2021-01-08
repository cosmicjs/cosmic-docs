const Logo = ({ height = 20 }) => (
  <svg height={height} viewBox="0 0 52.6 50.5">
    <g>
      <path
        fill="#29ABE2"
        d="M20.4,17.3c1.3-1.1,2.5-2.2,3.8-3.2c-1-0.7-1.9-1.3-2.8-1.9c-1.1,0.9-2.2,1.9-3.3,2.9
		C19.2,15.5,20,16.3,20.4,17.3z"
      />

      <ellipse
        transform="matrix(1 2.637369e-03 -2.637369e-03 1 4.794111e-02 -4.540240e-02)"
        fill="#29ABE2"
        cx="17.2"
        cy="18.2"
        rx="4.3"
        ry="4.1"
      />
      <path
        fill="#29ABE2"
        d="M21.1,41.2c-5.9,3.2-11,4-13.3,1.8c-3.2-3.1-0.3-11.2,6.7-19.4c-1.1-0.3-2-1.1-2.5-2.1
		C1.8,32.9-2.8,44.4,1.7,48.7c3.7,3.6,12.6,1.2,22.4-5.2C23.1,42.8,22.1,42,21.1,41.2z"
      />
      <path
        fill="#29ABE2"
        d="M28.1,13.9c0.3-1.1,1.1-2,2.1-2.5C18.4,1.7,6.4-2.6,1.9,1.7c-3.7,3.6-1.3,12.1,5.4,21.5
		c0.8-1,1.6-1.9,2.4-2.9C6.4,14.6,5.5,9.7,7.8,7.4C11.1,4.3,19.5,7.2,28.1,13.9z"
      />
      <path
        fill="#29ABE2"
        d="M36.1,16.7c-0.4,1-1.3,1.8-2.3,2.2c1.5,1.5,2.9,2.9,4.1,4.4c0.7-0.9,1.4-1.8,1.9-2.7
		C38.7,19.3,37.4,18,36.1,16.7z"
      />
      <path
        fill="#29ABE2"
        d="M33.7,20.7c2.4,0,4.3-1.8,4.3-4.1c0-2.3-1.9-4.1-4.3-4.1c-2.4,0-4.3,1.8-4.3,4.1
		C29.4,18.8,31.3,20.7,33.7,20.7z"
      />
      <path
        fill="#29ABE2"
        d="M44.8,7.5c3.2,3.1,0.3,11.2-6.7,19.4c1.1,0.3,2,1.1,2.5,2.1c10.1-11.4,14.7-23,10.2-27.3
		C47.1-1.8,38.2,0.6,28.5,7c1,0.7,2,1.5,3,2.3C37.4,6.1,42.5,5.3,44.8,7.5z"
      />
      <path
        fill="#29ABE2"
        d="M32.9,32.5c-1.5,1.4-3.1,2.7-4.6,3.9c1,0.7,1.9,1.3,2.9,1.9c1.4-1.1,2.7-2.3,4.1-3.6
		C34.2,34.3,33.4,33.5,32.9,32.5z"
      />

      <ellipse
        transform="matrix(-1 -2.754597e-03 2.754597e-03 -1 70.5604 64.8494)"
        fill="#29ABE2"
        cx="35.3"
        cy="32.4"
        rx="4.3"
        ry="4.1"
      />
      <path
        fill="#29ABE2"
        d="M18.8,31.7c-1.5-1.5-2.9-2.9-4.1-4.4c-0.7,0.9-1.4,1.8-1.9,2.7c1.2,1.3,2.4,2.6,3.7,3.9
		C16.9,32.9,17.7,32.1,18.8,31.7z"
      />
      <path
        fill="#29ABE2"
        d="M45.3,27.4c-0.8,1-1.6,1.9-2.4,2.9c3.3,5.7,4.2,10.5,1.8,12.8c-3.3,3.1-11.7,0.2-20.3-6.4
		c-0.3,1.1-1.1,2-2.1,2.5c11.9,9.7,23.9,14.1,28.4,9.8C54.4,45.3,52,36.7,45.3,27.4z"
      />

      <ellipse
        transform="matrix(2.622796e-03 -1 1 2.622796e-03 -15.1309 52.7534)"
        fill="#29ABE2"
        cx="18.9"
        cy="34"
        rx="4.1"
        ry="4.3"
      />
    </g>
  </svg>
);

export default {
  repository: "https://github.com/cosmicjs/cosmic-docs",
  docsRepository: "https://github.com/cosmicjs/cosmic-docs",
  titleSuffix: " – Cosmic Docs",
  branch: "main", // branch of docs
  path: "/", // path of docs,
  nextLinks: false,
  prevLinks: false,
  search: false,
  logo: (
    <>
      <Logo height={32} />
      <span className="mx-2 font-extrabold hidden md:inline">Cosmic Docs</span>
    </>
  ),
  head: (
    <>
      {/* Favicons, meta */}
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href="https://cosmicjs.com/images/favicons/apple-touch-icon-57x57.png"
      />
      <link
        rel="icon"
        type="image/x-icon"
        href="https://cosmicjs.com/images/favicons/apple-touch-icon-57x57.png"
      />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content="Cosmic documentation" />
      <meta name="og:description" content="Cosmic documentation" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@cosmic" />
      <meta name="og:title" content="Cosmic Docs" />
      <meta name="og:url" content="https://cosmicjs.com/docs" />
      <meta name="apple-mobile-web-app-title" content="Cosmic Docs" />
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.css"
        media="print"
        onLoad="this.media='all'"
      />
    </>
  ),
  footerText: (
    <a
      href="https://cosmicjs.com/?utm_source=docs"
      target="_blank"
      rel="noopener"
      className="inline-flex items-center no-underline text-current font-semibold"
    >
      <span className="mr-1">Powered by</span>
      <span>
        <Logo />
      </span>
    </a>
  ),
};
