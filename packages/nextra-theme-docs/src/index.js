import React, {
  useState,
  useEffect,
  useMemo,
  useContext,
  createContext
} from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
import 'focus-visible'
import { SkipNavContent } from '@reach/skip-nav'
import { ThemeProvider } from 'next-themes'
import innerText from 'react-innertext'
import cn from 'classnames'
import Slugger from 'github-slugger'

import flatten from './utils/flatten'
import cleanupAndReorder from './utils/cleanup-and-reorder'

import Search from './search'
import StorkSearch from './stork-search'
import GitHubIcon from './github-icon'
import ThemeSwitch from './theme-switch'
import LocaleSwitch from './locale-switch'
import Footer from './footer'
import renderComponent from './utils/render-component'

import Theme from './misc/theme'
import { ActiveAnchor, useActiveAnchor } from './misc/active-anchor'
import defaultConfig from './misc/default.config'

const TreeState = new Map()
const titleType = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
const MenuContext = createContext(false)

const getFSRoute = (asPath, locale) => {
  if (!locale) return asPath.replace(new RegExp('/index(/|$)'), '$1')

  return asPath
    .replace(new RegExp(`\.${locale}(\/|$)`), '$1')
    .replace(new RegExp('/index(/|$)'), '$1')
}

const ChevronDown = () => (
  <div className={`chevron-down`}>
    <svg
      width="14"
      height="8"
      viewBox="0 0 24 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 2L12 12L22 2"
        stroke="#727D9C"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

const ChevronRight = () => (
  <div className={`chevron-right`}>
    <svg
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13L7 7L1 1"
        stroke="#727D9C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
)

function Folder({ item, anchors }) {
  const { asPath, locale } = useRouter()
  const route = getFSRoute(asPath, locale)
  const active = route.split('/')[1] === item.route.split('/')[1]
  const [isOpen, setOpen] = useState(active)
  const [_, render] = useState(false)

  useEffect(() => {
    if (active) {
      TreeState[item.route] = true
    }
  }, [active])

  return (
    <li className={isOpen ? 'active' : ''}>
      <button
        className={isOpen ? 'bg-gray-100 dark:bg-gray-900' : ''}
        type="button"
        onClick={() => {
          if (active) return
          TreeState[item.route] = !isOpen
          setOpen(!isOpen)
          render(x => !x)
        }}
      >
        <div className="float-left">{item.title}</div>
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </button>
      <div
        style={{
          display: isOpen ? 'initial' : 'none'
        }}
      >
        <Menu dir={item.children} base={item.route} anchors={anchors} />
      </div>
    </li>
  )
}

function File({ item, anchors }) {
  const { setMenu } = useContext(MenuContext)
  const { asPath, locale } = useRouter()
  const route = getFSRoute(asPath, locale)
  const active = route === item.route
  const slugger = new Slugger()
  const activeAnchor = useActiveAnchor()

  const title = item.title
  // if (item.title.startsWith('> ')) {
  // title = title.substr(2)
  if (anchors && anchors.length) {
    if (active) {
      let activeIndex = 0
      const anchorInfo = anchors.map((anchor, i) => {
        const text = innerText(anchor) || ''
        const slug = slugger.slug(text)
        if (activeAnchor[slug]) {
          activeIndex = i
        }
        return { text, slug }
      })

      return (
        <li className={active ? 'active' : ''}>
          <div
            className={`relative ${
              active ? 'bg-gray-100 dark:bg-gray-900' : ''
            }`}
          >
            <Link href={item.route}>
              <a>{title}</a>
            </Link>
            <div className="absolute right-0 top-0 mt-2 mr-2">
              {active ? <ChevronDown /> : <ChevronRight />}
            </div>
          </div>
          <ul>
            {anchors.map((_, i) => {
              const { slug, text } = anchorInfo[i]
              const isActive = i === activeIndex

              return (
                <a
                  href={'#' + slug}
                  key={`a-${slug}`}
                  onClick={() => setMenu(false)}
                  className={isActive ? 'active-anchor' : ''}
                >
                  <span className="flex text-sm">
                    <span className="opacity-25">#</span>
                    <span className="mr-2"></span>
                    <span className="inline-block">{text}</span>
                  </span>
                </a>
              )
            })}
          </ul>
        </li>
      )
    }
  }

  return (
    <li className={active ? 'active' : ''}>
      <div
        className={`relative ${active ? 'bg-gray-100 dark:bg-gray-900' : ''}`}
      >
        <Link href={item.route}>
          <a>{title}</a>
        </Link>
        {item.route === '/' && (
          <div className="absolute right-0 top-0 mt-2 mr-2">
            {active ? <ChevronDown /> : <ChevronRight />}
          </div>
        )}
      </div>
    </li>
  )
}

function Menu({ dir, anchors }) {
  return (
    <ul>
      {dir.map(item => {
        if (item.children) {
          return <Folder key={item.name} item={item} anchors={anchors} />
        }
        return <File key={item.name} item={item} anchors={anchors} />
      })}
    </ul>
  )
}

function Sidebar({ show, directories, anchors }) {
  return (
    <aside
      className={`h-screen bg-white dark:bg-dark flex-shrink-0 w-full md:w-64 md:block fixed md:sticky z-10 ${
        show ? '' : 'hidden'
      }`}
      style={{
        top: '4rem',
        height: 'calc(100vh - 4rem)'
      }}
    >
      <div className="sidebar border-gray-200 dark:border-gray-900 w-full p-4 pb-40 md:pb-16 h-full overflow-y-auto">
        <Menu dir={directories} anchors={anchors} />
      </div>
    </aside>
  )
}

const Layout = ({ filename, config: _config, pageMap, meta, children }) => {
  const [menu, setMenu] = useState(false)
  const router = useRouter()
  const { route, asPath, locale, defaultLocale } = router
  const fsPath = getFSRoute(asPath, locale)

  const directories = useMemo(
    () => cleanupAndReorder(pageMap, locale, defaultLocale),
    [pageMap, locale, defaultLocale]
  )
  const flatDirectories = useMemo(() => flatten(directories), [directories])
  const config = Object.assign({}, defaultConfig, _config)

  const filepath = route.slice(0, route.lastIndexOf('/') + 1)
  const filepathWithName = filepath + filename
  const titles = React.Children.toArray(children).filter(child =>
    titleType.includes(child.props.mdxType)
  )
  const titleEl = titles.find(child => child.props.mdxType === 'h1')
  const title =
    meta.title || (titleEl ? innerText(titleEl.props.children) : 'Untitled')
  const anchors = titles
    .filter(child => child.props.mdxType === 'h2')
    .map(child => child.props.children)

  useEffect(() => {
    if (menu) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [menu])

  const currentIndex = useMemo(
    () => flatDirectories.findIndex(dir => dir.route === fsPath),
    [flatDirectories, fsPath]
  )

  const isRTL = useMemo(() => {
    if (!config.i18n) return config.direction === 'rtl' || null
    const localeConfig = config.i18n.find(l => l.locale === locale)
    return localeConfig && localeConfig.direction === 'rtl'
  }, [config.i18n, locale])

  return (
    <React.Fragment>
      <Head>
        {config.font ? (
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        ) : null}
        <title>
          {title}
          {renderComponent(config.titleSuffix, { locale })}
        </title>
        {config.font ? (
          <style
            dangerouslySetInnerHTML={{
              __html: `html{font-family:Inter,sans-serif}@supports(font-variation-settings:normal){html{font-family:'Inter var',sans-serif}}`
            }}
          />
        ) : null}
        {renderComponent(config.head, { locale })}
      </Head>
      <div
        className={cn('nextra-container main-container flex flex-col', {
          rtl: isRTL
        })}
      >
        <nav className="flex items-center bg-white z-20 fixed top-0 left-0 right-0 h-16 border-b border-gray-200 px-6 dark:bg-dark dark:border-gray-900">
          <div className="hidden md:block w-full flex items-center">
            <Link href="/">
              <a className="no-underline text-current flex items-center hover:opacity-75">
                {renderComponent(config.logo, { locale })}
              </a>
            </Link>
          </div>

          {config.customSearch ||
            (config.search ? (
              config.UNSTABLE_stork ? (
                <StorkSearch />
              ) : (
                <Search directories={flatDirectories} />
              )
            ) : null)}

          <div className="mr-2" />

          {config.darkMode ? <ThemeSwitch /> : null}

          {config.i18n ? (
            <LocaleSwitch options={config.i18n} isRTL={isRTL} />
          ) : null}

          {config.repository ? (
            <a
              className="text-current p-2"
              href={config.repository}
              target="_blank"
            >
              <GitHubIcon height={24} />
            </a>
          ) : null}

          <button
            className="block md:hidden p-2"
            onClick={() => setMenu(!menu)}
          >
            <svg
              fill="none"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="-mr-2" />
        </nav>
        <ActiveAnchor>
          <div className="flex flex-1 h-full">
            <MenuContext.Provider value={{ setMenu }}>
              <Sidebar
                show={menu}
                anchors={anchors}
                directories={directories}
              />
            </MenuContext.Provider>
            <SkipNavContent />
            {meta.full ? (
              <article className="relative pt-16 w-full overflow-x-hidden">
                {children}
              </article>
            ) : (
              <article className="docs-container relative pt-20 pb-16 px-6 md:px-8 w-full max-w-full overflow-x-hidden">
                <main className="max-w-screen-md mx-auto">
                  <Theme>{children}</Theme>
                  <Footer
                    config={config}
                    flatDirectories={flatDirectories}
                    currentIndex={currentIndex}
                    filepathWithName={filepathWithName}
                    isRTL={isRTL}
                  />
                </main>
              </article>
            )}
          </div>
        </ActiveAnchor>
      </div>
    </React.Fragment>
  )
}

export default (opts, config) => props => {
  return (
    <ThemeProvider attribute="class">
      <Layout config={config} {...opts} {...props} />
    </ThemeProvider>
  )
}
