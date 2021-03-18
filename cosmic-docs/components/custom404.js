import Link from 'next/link'
import { Logo } from '../theme.config.js'
import DocSearch from '../components/docsearch'

export default function Custom404() {
  return (
    <>
      <div className="text-center mt-5">
        <Link href="/">
          <a>
            <Logo height={60} classes="block mx-auto my-0 mb-8" />
          </a>
        </Link>
        <h1 className="mb-8">404 - Page Not Found</h1>
        <div className="mb-8">
          Looking for something specific? Try searching below:
        </div>
        <div className="w-1/6 block mx-auto my-0 mb-8">
          <DocSearch />
        </div>
        <div className="mb-8">
          <Link href="/">
            <a>← Go back home</a>
          </Link>
        </div>
      </div>
    </>
  )
}
