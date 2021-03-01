function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var router = require('next/router');
var Head = _interopDefault(require('next/head'));
var Link = _interopDefault(require('next/link'));
require('focus-visible');
var skipNav = require('@reach/skip-nav');
var nextThemes = require('next-themes');
var innerText = _interopDefault(require('react-innertext'));
var cn = _interopDefault(require('classnames'));
var Slugger = _interopDefault(require('github-slugger'));
var getTitle = _interopDefault(require('title'));
var matchSorter = _interopDefault(require('match-sorter'));
var react = require('@mdx-js/react');
var Highlight = require('prism-react-renderer');
var Highlight__default = _interopDefault(Highlight);
require('intersection-observer');
var Observer = _interopDefault(require('@researchgate/react-intersection-observer'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function flatten(list) {
  return list.reduce((flat, toFlatten) => {
    return flat.concat(toFlatten.children ? flatten(toFlatten.children) : toFlatten);
  }, []);
}

function cleanupAndReorder(list, locale, defaultLocale) {
  let meta;

  for (let item of list) {
    if (item.name === 'meta.json' && locale === item.locale) {
      meta = item;
      break;
    } // fallback


    if (!meta && item.name === 'meta') {
      meta = item;
    }
  }

  if (!meta) {
    meta = {};
  } else {
    meta = meta.meta;
  }

  const metaKeys = Object.keys(meta);
  const hasLocale = new Map();

  if (locale) {
    list.forEach(a => a.locale === locale ? hasLocale.set(a.name, true) : null);
  }

  return list.filter(a => // not meta
  a.name !== 'meta.json' && // not hidden routes
  !a.name.startsWith('_') && ( // locale matches, or fallback to default locale
  a.locale === locale || (a.locale === defaultLocale || !a.locale) && !hasLocale.get(a.name))).sort((a, b) => {
    const indexA = metaKeys.indexOf(a.name);
    const indexB = metaKeys.indexOf(b.name);
    if (indexA === -1 && indexB === -1) return a.name < b.name ? -1 : 1;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  }).map(a => {
    return _extends({}, a, {
      children: a.children ? cleanupAndReorder(a.children, locale, defaultLocale) : undefined,
      title: meta[a.name] || getTitle(a.name)
    });
  });
}

const Item = ({
  title,
  active,
  href,
  onMouseOver,
  search
}) => {
  const highlight = title.toLowerCase().indexOf(search.toLowerCase());
  return /*#__PURE__*/React__default.createElement(Link, {
    href: href
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "block no-underline",
    onMouseOver: onMouseOver
  }, /*#__PURE__*/React__default.createElement("li", {
    className: cn('p-2', {
      active
    })
  }, title.substring(0, highlight), /*#__PURE__*/React__default.createElement("span", {
    className: "highlight"
  }, title.substring(highlight, highlight + search.length)), title.substring(highlight + search.length))));
};

const Search = ({
  directories
}) => {
  const router$1 = router.useRouter();
  const [show, setShow] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [active, setActive] = React.useState(0);
  const input = React.useRef(null);
  const results = React.useMemo(() => {
    if (!search) return []; // Will need to scrape all the headers from each page and search through them here
    // (similar to what we already do to render the hash links in sidebar)
    // We could also try to search the entire string text from each page

    return matchSorter(directories, search, {
      keys: ['title']
    });
  }, [search]);
  const handleKeyDown = React.useCallback(e => {
    switch (e.key) {
      case 'ArrowDown':
        {
          e.preventDefault();

          if (active + 1 < results.length) {
            setActive(active + 1);
          }

          break;
        }

      case 'ArrowUp':
        {
          e.preventDefault();

          if (active - 1 >= 0) {
            setActive(active - 1);
          }

          break;
        }

      case 'Enter':
        {
          router$1.push(results[active].route);
          break;
        }
    }
  }, [active, results, router$1]);
  React.useEffect(() => {
    setActive(0);
  }, [search]);
  React.useEffect(() => {
    const inputs = ['input', 'select', 'button', 'textarea'];

    const down = e => {
      if (document.activeElement && inputs.indexOf(document.activeElement.tagName.toLowerCase() !== -1)) {
        if (e.key === '/') {
          e.preventDefault();
          input.current.focus();
        } else if (e.key === 'Escape') {
          setShow(false);
        }
      }
    };

    window.addEventListener('keydown', down);
    return () => window.removeEventListener('keydown', down);
  }, []);
  const renderList = show && results.length > 0;
  return /*#__PURE__*/React__default.createElement("div", {
    className: "nextra-search relative w-full md:w-64"
  }, renderList && /*#__PURE__*/React__default.createElement("div", {
    className: "search-overlay z-1",
    onClick: () => setShow(false)
  }), /*#__PURE__*/React__default.createElement("input", {
    onChange: e => {
      setSearch(e.target.value);
      setShow(true);
    },
    className: "appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:ring w-full",
    type: "search",
    placeholder: "Search (\"/\" to focus)",
    onKeyDown: handleKeyDown,
    onFocus: () => setShow(true),
    ref: input
  }), renderList && /*#__PURE__*/React__default.createElement("ul", {
    className: "shadow-md list-none p-0 m-0 absolute left-0 md:right-0 rounded mt-1 border top-100 divide-y z-2"
  }, results.map((res, i) => {
    return /*#__PURE__*/React__default.createElement(Item, {
      key: `search-item-${i}`,
      title: res.title,
      href: res.route,
      active: i === active,
      search: search,
      onMouseOver: () => setActive(i)
    });
  })));
};

var GitHubIcon = (({
  height = 40
}) => {
  return /*#__PURE__*/React__default.createElement("svg", {
    height: height,
    viewBox: "2 2 20 20",
    fill: "none"
  }, /*#__PURE__*/React__default.createElement("path", {
    fillRule: "evenodd",
    clipRule: "evenodd",
    d: "M12 3C7.0275 3 3 7.12937 3 12.2276C3 16.3109 5.57625 19.7597 9.15374 20.9824C9.60374 21.0631 9.77249 20.7863 9.77249 20.5441C9.77249 20.3249 9.76125 19.5982 9.76125 18.8254C7.5 19.2522 6.915 18.2602 6.735 17.7412C6.63375 17.4759 6.19499 16.6569 5.8125 16.4378C5.4975 16.2647 5.0475 15.838 5.80124 15.8264C6.51 15.8149 7.01625 16.4954 7.18499 16.7723C7.99499 18.1679 9.28875 17.7758 9.80625 17.5335C9.885 16.9337 10.1212 16.53 10.38 16.2993C8.3775 16.0687 6.285 15.2728 6.285 11.7432C6.285 10.7397 6.63375 9.9092 7.20749 9.26326C7.1175 9.03257 6.8025 8.08674 7.2975 6.81794C7.2975 6.81794 8.05125 6.57571 9.77249 7.76377C10.4925 7.55615 11.2575 7.45234 12.0225 7.45234C12.7875 7.45234 13.5525 7.55615 14.2725 7.76377C15.9937 6.56418 16.7475 6.81794 16.7475 6.81794C17.2424 8.08674 16.9275 9.03257 16.8375 9.26326C17.4113 9.9092 17.76 10.7281 17.76 11.7432C17.76 15.2843 15.6563 16.0687 13.6537 16.2993C13.98 16.5877 14.2613 17.1414 14.2613 18.0065C14.2613 19.2407 14.25 20.2326 14.25 20.5441C14.25 20.7863 14.4188 21.0746 14.8688 20.9824C16.6554 20.364 18.2079 19.1866 19.3078 17.6162C20.4077 16.0457 20.9995 14.1611 21 12.2276C21 7.12937 16.9725 3 12 3Z",
    fill: "currentColor"
  }));
});

var useMounted = (() => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
});

function ThemeSwitch() {
  const {
    theme,
    setTheme
  } = nextThemes.useTheme();
  const mounted = useMounted(); // @TODO: system theme

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return /*#__PURE__*/React__default.createElement("a", {
    className: "text-current p-2 cursor-pointer",
    tabIndex: "0",
    onClick: toggleTheme,
    onKeyDown: e => {
      if (e.key === 'Enter') toggleTheme();
    }
  }, mounted && theme === 'dark' ? /*#__PURE__*/React__default.createElement("svg", {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor"
  }, /*#__PURE__*/React__default.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
  })) : mounted && theme === 'light' ? /*#__PURE__*/React__default.createElement("svg", {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor"
  }, /*#__PURE__*/React__default.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
  })) : /*#__PURE__*/React__default.createElement("svg", {
    key: "undefined",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    fill: "none",
    shapeRendering: "geometricPrecision"
  }));
}

function LocaleSwitch({
  options,
  isRTL
}) {
  const {
    locale,
    asPath
  } = router.useRouter();
  const mounted = useMounted();
  return /*#__PURE__*/React__default.createElement("details", {
    className: "locale-switch relative"
  }, /*#__PURE__*/React__default.createElement("summary", {
    className: "text-current p-2 cursor-pointer outline-none",
    tabIndex: "0"
  }, /*#__PURE__*/React__default.createElement("svg", {
    fill: "none",
    viewBox: "0 0 24 24",
    width: "24",
    height: "24",
    stroke: "currentColor"
  }, /*#__PURE__*/React__default.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
  }))), mounted ? /*#__PURE__*/React__default.createElement("ul", {
    className: cn('locale-dropdown absolute block bg-white dark:bg-dark dark:border-gray-700 py-1 rounded border', {
      'right-0': !isRTL,
      'left-0': isRTL
    })
  }, options.map(l => /*#__PURE__*/React__default.createElement(Link, {
    key: l.locale,
    href: asPath,
    locale: l.locale
  }, /*#__PURE__*/React__default.createElement("a", {
    className: cn('block no-underline text-current py-2 px-4 hover:bg-gray-200 dark:hover:bg-gray-800 whitespace-nowrap', {
      'font-semibold': locale === l.locale,
      'bg-gray-100 dark:bg-gray-900': locale === l.locale
    })
  }, l.text)))) : null);
}

var ArrowRight = ((_ref) => {
  let {
    height = 24
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["height"]);

  return /*#__PURE__*/React__default.createElement("svg", _extends({
    height: height,
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, props), /*#__PURE__*/React__default.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M9 5l7 7-7 7"
  }));
});

const renderComponent = (ComponentOrNode, props) => {
  if (!ComponentOrNode) return null;

  if (typeof ComponentOrNode === 'function') {
    return /*#__PURE__*/React__default.createElement(ComponentOrNode, props);
  }

  return ComponentOrNode;
};

const NextLink = ({
  route,
  title,
  isRTL
}) => {
  return /*#__PURE__*/React__default.createElement(Link, {
    href: route
  }, /*#__PURE__*/React__default.createElement("a", {
    className: cn('text-lg font-medium p-4 -m-4 no-underline text-gray-600 hover:text-blue-600 flex items-center', {
      'ml-2': !isRTL,
      'mr-2': isRTL
    }),
    title: title
  }, title, /*#__PURE__*/React__default.createElement(ArrowRight, {
    className: cn('transform inline flex-shrink-0', {
      'rotate-180 mr-1': isRTL,
      'ml-1': !isRTL
    })
  })));
};

const PrevLink = ({
  route,
  title,
  isRTL
}) => {
  return /*#__PURE__*/React__default.createElement(Link, {
    href: route
  }, /*#__PURE__*/React__default.createElement("a", {
    className: cn('text-lg font-medium p-4 -m-4 no-underline text-gray-600 hover:text-blue-600 flex items-center', {
      'mr-2': !isRTL,
      'ml-2': isRTL
    }),
    title: title
  }, /*#__PURE__*/React__default.createElement(ArrowRight, {
    className: cn('transform inline flex-shrink-0', {
      'rotate-180 mr-1': !isRTL,
      'ml-1': isRTL
    })
  }), title));
}; // Make sure path is a valid url path,
// adding / in front or in the back if missing


const fixPath = path => {
  const pathWithFrontSlash = path.startsWith('/') ? path : `/${path}`;
  const pathWithBackSlash = pathWithFrontSlash.endsWith('/') ? pathWithFrontSlash : `${pathWithFrontSlash}/`;
  return pathWithBackSlash;
};

const createEditUrl = (repository, branch, path, filepathWithName) => {
  const normalizedPath = fixPath(path);
  return `${repository}/tree/${branch}${normalizedPath}pages${filepathWithName}`;
};

const EditOnGithubLink = ({
  repository,
  branch,
  path,
  footerEditOnGitHubText,
  filepathWithName
}) => {
  const href = createEditUrl(repository, branch, path, filepathWithName);
  const {
    locale
  } = router.useRouter();
  return /*#__PURE__*/React__default.createElement("a", {
    className: "text-sm",
    href: href,
    target: "_blank"
  }, footerEditOnGitHubText ? renderComponent(footerEditOnGitHubText, {
    locale
  }) : 'Edit this page on GitHub');
};

const Footer = ({
  config,
  flatDirectories,
  currentIndex,
  filepathWithName,
  isRTL
}) => {
  let prev = flatDirectories[currentIndex - 1];
  let next = flatDirectories[currentIndex + 1];
  const {
    locale
  } = router.useRouter();
  return /*#__PURE__*/React__default.createElement("footer", {
    className: "mt-24"
  }, /*#__PURE__*/React__default.createElement("nav", {
    className: "flex flex-row items-center justify-between"
  }, /*#__PURE__*/React__default.createElement("div", null, prev && config.prevLinks ? /*#__PURE__*/React__default.createElement(PrevLink, {
    route: prev.route,
    title: prev.title,
    isRTL: isRTL
  }) : null), /*#__PURE__*/React__default.createElement("div", null, config.nextLinks && next ? /*#__PURE__*/React__default.createElement(NextLink, {
    route: next.route,
    title: next.title,
    isRTL: isRTL
  }) : null)), /*#__PURE__*/React__default.createElement("hr", null), config.footer ? /*#__PURE__*/React__default.createElement("div", {
    className: "mt-24 flex justify-between flex-col-reverse md:flex-row items-center md:items-end"
  }, /*#__PURE__*/React__default.createElement("span", {
    className: "text-gray-600"
  }, renderComponent(config.footerText, {
    locale
  })), /*#__PURE__*/React__default.createElement("div", {
    className: "mt-6"
  }), config.footerEditOnGitHubLink ? /*#__PURE__*/React__default.createElement(EditOnGithubLink, {
    repository: config.docsRepository || config.repository,
    branch: config.branch,
    path: config.path,
    footerEditOnGitHubText: config.footerEditOnGitHubText,
    filepathWithName: filepathWithName
  }) : null) : null);
};

const ActiveAnchorContext = React.createContext();
const ActiveAnchorSetterContext = React.createContext(); // Separate the state as 2 contexts here to avoid
// re-renders of the content triggered by the state update.

const useActiveAnchor = () => React.useContext(ActiveAnchorContext);
const useActiveAnchorSet = () => React.useContext(ActiveAnchorSetterContext);
const ActiveAnchor = ({
  children
}) => {
  const state = React.useState({});
  return /*#__PURE__*/React__default.createElement(ActiveAnchorContext.Provider, {
    value: state[0]
  }, /*#__PURE__*/React__default.createElement(ActiveAnchorSetterContext.Provider, {
    value: state[1]
  }, children));
};

const THEME = {
  plain: {
    backgroundColor: 'transparent'
  },
  styles: [{
    types: ['keyword', 'builtin'],
    style: {
      color: '#ff0078',
      fontWeight: 'bold'
    }
  }, {
    types: ['comment'],
    style: {
      color: '#999',
      fontStyle: 'italic'
    }
  }, {
    types: ['variable', 'language-javascript'],
    style: {
      color: '#0076ff'
    }
  }, {
    types: ['attr-name'],
    style: {
      color: '#d9931e',
      fontStyle: 'normal'
    }
  }, {
    types: ['boolean', 'regex'],
    style: {
      color: '#d9931e'
    }
  }]
}; // Anchor links

const HeaderLink = (_ref) => {
  let {
    tag: Tag,
    children,
    slugger,
    withObserver
  } = _ref,
      props = _objectWithoutPropertiesLoose(_ref, ["tag", "children", "slugger", "withObserver"]);

  const setActiveAnchor = useActiveAnchorSet();
  const slug = slugger.slug(innerText(children) || '');
  const anchor = /*#__PURE__*/React__default.createElement("span", {
    className: "subheading-anchor",
    id: slug
  });
  const anchorWithObserver = withObserver ? /*#__PURE__*/React__default.createElement(Observer, {
    onChange: e => {
      // if the element is above the 70% of height of the viewport
      // we don't use e.isIntersecting
      const isAboveViewport = e.boundingClientRect.y + e.boundingClientRect.height <= e.rootBounds.y + e.rootBounds.height;
      setActiveAnchor(f => _extends({}, f, {
        [slug]: isAboveViewport
      }));
    },
    rootMargin: "1000% 0% -70%",
    threshold: [0, 1],
    children: anchor
  }) : anchor;
  return /*#__PURE__*/React__default.createElement(Tag, props, anchorWithObserver, /*#__PURE__*/React__default.createElement("a", {
    href: '#' + slug,
    className: "text-current no-underline no-outline"
  }, children, /*#__PURE__*/React__default.createElement("span", {
    className: "anchor-icon",
    "aria-hidden": true
  }, "#")));
};

const H2 = ({
  slugger
}) => (_ref2) => {
  let {
    children
  } = _ref2,
      props = _objectWithoutPropertiesLoose(_ref2, ["children"]);

  return /*#__PURE__*/React__default.createElement(HeaderLink, _extends({
    tag: "h2",
    slugger: slugger,
    withObserver: true
  }, props), children);
};

const H3 = ({
  slugger
}) => (_ref3) => {
  let {
    children
  } = _ref3,
      props = _objectWithoutPropertiesLoose(_ref3, ["children"]);

  return /*#__PURE__*/React__default.createElement(HeaderLink, _extends({
    tag: "h3",
    slugger: slugger
  }, props), children);
};

const H4 = ({
  slugger
}) => (_ref4) => {
  let {
    children
  } = _ref4,
      props = _objectWithoutPropertiesLoose(_ref4, ["children"]);

  return /*#__PURE__*/React__default.createElement(HeaderLink, _extends({
    tag: "h4",
    slugger: slugger
  }, props), children);
};

const H5 = ({
  slugger
}) => (_ref5) => {
  let {
    children
  } = _ref5,
      props = _objectWithoutPropertiesLoose(_ref5, ["children"]);

  return /*#__PURE__*/React__default.createElement(HeaderLink, _extends({
    tag: "h5",
    slugger: slugger
  }, props), children);
};

const H6 = ({
  slugger
}) => (_ref6) => {
  let {
    children
  } = _ref6,
      props = _objectWithoutPropertiesLoose(_ref6, ["children"]);

  return /*#__PURE__*/React__default.createElement(HeaderLink, _extends({
    tag: "h6",
    slugger: slugger
  }, props), children);
};

const A = (_ref7) => {
  let {
    children
  } = _ref7,
      props = _objectWithoutPropertiesLoose(_ref7, ["children"]);

  const isExternal = props.href && props.href.startsWith('https://');

  if (isExternal) {
    return /*#__PURE__*/React__default.createElement("a", _extends({
      target: "_blank"
    }, props), children);
  }

  return /*#__PURE__*/React__default.createElement(Link, {
    href: props.href
  }, /*#__PURE__*/React__default.createElement("a", props, children));
};

const Code = (_ref8) => {
  let {
    children,
    className,
    highlight
  } = _ref8,
      props = _objectWithoutPropertiesLoose(_ref8, ["children", "className", "highlight"]);

  if (!className) return /*#__PURE__*/React__default.createElement("code", props, children);
  const highlightedLines = highlight ? highlight.split(',').map(Number) : []; // https://mdxjs.com/guides/syntax-highlighting#all-together

  const language = className.replace(/language-/, '');
  return /*#__PURE__*/React__default.createElement(Highlight__default, _extends({}, Highlight.defaultProps, {
    code: children.trim(),
    language: language,
    theme: THEME
  }), ({
    className,
    style,
    tokens,
    getLineProps,
    getTokenProps
  }) => /*#__PURE__*/React__default.createElement("code", {
    className: className,
    style: _extends({}, style)
  }, tokens.map((line, i) => /*#__PURE__*/React__default.createElement("div", _extends({
    key: i
  }, getLineProps({
    line,
    key: i
  }), {
    style: highlightedLines.includes(i + 1) ? {
      background: 'var(--c-highlight)',
      margin: '0 -1rem',
      padding: '0 1rem'
    } : null
  }), line.map((token, key) => /*#__PURE__*/React__default.createElement("span", _extends({
    key: key
  }, getTokenProps({
    token,
    key
  }))))))));
};

const getComponents = args => ({
  h2: H2(args),
  h3: H3(args),
  h4: H4(args),
  h5: H5(args),
  h6: H6(args),
  a: A,
  code: Code
});

var Theme = (({
  children
}) => {
  const slugger = new Slugger();
  return /*#__PURE__*/React__default.createElement(react.MDXProvider, {
    components: getComponents({
      slugger
    })
  }, children);
});

var defaultConfig = {
  repository: 'https://github.com/shuding/nextra',
  docsRepository: 'https://github.com/shuding/nextra',
  branch: 'master',
  path: '/',
  titleSuffix: ' – Nextra',
  nextLinks: true,
  prevLinks: true,
  search: true,
  darkMode: true,
  font: true,
  footer: true,
  footerText: 'MIT 2020 © Nextra.',
  footerEditOnGitHubLink: true,
  logo: /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("span", {
    className: "mr-2 font-extrabold hidden md:inline"
  }, "Nextra"), /*#__PURE__*/React__default.createElement("span", {
    className: "text-gray-600 font-normal hidden md:inline"
  }, "The Next Docs Builder")),
  head: /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement("meta", {
    name: "msapplication-TileColor",
    content: "#ffffff"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "theme-color",
    content: "#ffffff"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1.0"
  }), /*#__PURE__*/React__default.createElement("meta", {
    httpEquiv: "Content-Language",
    content: "en"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "description",
    content: "Nextra: the next docs builder"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "twitter:card",
    content: "summary_large_image"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "twitter:site",
    content: "@shuding_"
  }), /*#__PURE__*/React__default.createElement("meta", {
    property: "og:title",
    content: "Nextra: the next docs builder"
  }), /*#__PURE__*/React__default.createElement("meta", {
    property: "og:description",
    content: "Nextra: the next docs builder"
  }), /*#__PURE__*/React__default.createElement("meta", {
    name: "apple-mobile-web-app-title",
    content: "Nextra"
  })) // direction: 'ltr',
  // i18n: [{ locale: 'en-US', text: 'English', direction: 'ltr' }],

};

const TreeState = new Map();
const titleType = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const MenuContext = React.createContext(false);

const getFSRoute = (asPath, locale) => {
  if (!locale) return asPath.replace(new RegExp('\/index(\/|$)'), '$1');
  return asPath.replace(new RegExp(`\.${locale}(\/|$)`), '$1').replace(new RegExp('\/index(\/|$)'), '$1');
};

const ChevronDown = () => /*#__PURE__*/React__default.createElement("div", {
  className: `float-right relative mt-2 mr-1`
}, /*#__PURE__*/React__default.createElement("svg", {
  width: "14",
  height: "8",
  viewBox: "0 0 24 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React__default.createElement("path", {
  d: "M2 2L12 12L22 2",
  stroke: "#727D9C",
  strokeWidth: "4",
  strokeLinecap: "round",
  strokeLinejoin: "round"
})));

const ChevronRight = () => /*#__PURE__*/React__default.createElement("div", {
  className: `float-right relative mt-1 mr-1`
}, /*#__PURE__*/React__default.createElement("svg", {
  width: "8",
  height: "14",
  viewBox: "0 0 8 14",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg"
}, /*#__PURE__*/React__default.createElement("path", {
  d: "M1 13L7 7L1 1",
  stroke: "#727D9C",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round"
})));

function Folder({
  item,
  anchors
}) {
  var _TreeState$item$route;

  const {
    asPath,
    locale
  } = router.useRouter();
  const route = getFSRoute(asPath, locale) + '/';
  const active = route === item.route + '/';
  const open = (_TreeState$item$route = TreeState[item.route]) != null ? _TreeState$item$route : true;
  const [_, render] = React.useState(false);
  React.useEffect(() => {
    if (active) {
      TreeState[item.route] = true;
    }
  }, [active]);
  return /*#__PURE__*/React__default.createElement("li", {
    className: open ? 'active' : ''
  }, /*#__PURE__*/React__default.createElement("button", {
    onClick: () => {
      if (active) return;
      TreeState[item.route] = !open;
      render(x => !x);
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "float-left"
  }, item.title), open ? /*#__PURE__*/React__default.createElement(ChevronDown, null) : /*#__PURE__*/React__default.createElement(ChevronRight, null)), /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: open ? 'initial' : 'none'
    }
  }, /*#__PURE__*/React__default.createElement(Menu, {
    dir: item.children,
    base: item.route,
    anchors: anchors
  })));
}

function File({
  item,
  anchors
}) {
  const {
    setMenu
  } = React.useContext(MenuContext);
  const {
    asPath,
    locale
  } = router.useRouter();
  const route = getFSRoute(asPath, locale) + '/';
  const active = route === item.route + '/';
  const slugger = new Slugger();
  const activeAnchor = useActiveAnchor();
  const title = item.title; // if (item.title.startsWith('> ')) {
  // title = title.substr(2)

  if (anchors && anchors.length) {
    if (active) {
      let activeIndex = 0;
      const anchorInfo = anchors.map((anchor, i) => {
        const text = innerText(anchor) || '';
        const slug = slugger.slug(text);

        if (activeAnchor[slug]) {
          activeIndex = i;
        }

        return {
          text,
          slug
        };
      });
      return /*#__PURE__*/React__default.createElement("li", {
        className: active ? 'active' : ''
      }, /*#__PURE__*/React__default.createElement("div", {
        className: "relative"
      }, /*#__PURE__*/React__default.createElement(Link, {
        href: item.route
      }, /*#__PURE__*/React__default.createElement("a", null, title)), /*#__PURE__*/React__default.createElement("div", {
        className: "absolute right-0 top-0 mt-2 mr-2"
      }, active ? /*#__PURE__*/React__default.createElement(ChevronDown, null) : /*#__PURE__*/React__default.createElement(ChevronRight, null))), /*#__PURE__*/React__default.createElement("ul", null, anchors.map((_, i) => {
        const {
          slug,
          text
        } = anchorInfo[i];
        const isActive = i === activeIndex;
        return /*#__PURE__*/React__default.createElement("a", {
          href: '#' + slug,
          key: `a-${slug}`,
          onClick: () => setMenu(false),
          className: isActive ? 'active-anchor' : ''
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "flex text-sm"
        }, /*#__PURE__*/React__default.createElement("span", {
          className: "opacity-25"
        }, "#"), /*#__PURE__*/React__default.createElement("span", {
          className: "mr-2"
        }), /*#__PURE__*/React__default.createElement("span", {
          className: "inline-block"
        }, text)));
      })));
    }
  }

  return /*#__PURE__*/React__default.createElement("li", {
    className: active ? 'active' : ''
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React__default.createElement(Link, {
    href: item.route
  }, /*#__PURE__*/React__default.createElement("a", {
    onClick: () => setMenu(false)
  }, title)), item.route === '/' && /*#__PURE__*/React__default.createElement("div", {
    className: "absolute right-0 top-0 mt-2 mr-2"
  }, active ? /*#__PURE__*/React__default.createElement(ChevronDown, null) : /*#__PURE__*/React__default.createElement(ChevronRight, null))));
}

function Menu({
  dir,
  anchors
}) {
  return /*#__PURE__*/React__default.createElement("ul", null, dir.map(item => {
    if (item.children) {
      return /*#__PURE__*/React__default.createElement(Folder, {
        key: item.name,
        item: item,
        anchors: anchors
      });
    }

    return /*#__PURE__*/React__default.createElement(File, {
      key: item.name,
      item: item,
      anchors: anchors
    });
  }));
}

function Sidebar({
  show,
  directories,
  anchors
}) {
  return /*#__PURE__*/React__default.createElement("aside", {
    className: `h-screen bg-white dark:bg-dark flex-shrink-0 w-full md:w-64 md:block fixed md:sticky z-10 ${show ? '' : 'hidden'}`,
    style: {
      top: '4rem',
      height: 'calc(100vh - 4rem)'
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "sidebar border-gray-200 dark:border-gray-900 w-full p-4 pb-40 md:pb-16 h-full overflow-y-auto"
  }, /*#__PURE__*/React__default.createElement(Menu, {
    dir: directories,
    anchors: anchors
  })));
}

const Layout = ({
  filename,
  config: _config,
  pageMap,
  meta,
  children
}) => {
  const [menu, setMenu] = React.useState(false);
  const router$1 = router.useRouter();
  const {
    route,
    asPath,
    locale,
    defaultLocale
  } = router$1;
  const fsPath = getFSRoute(asPath, locale);
  const directories = React.useMemo(() => cleanupAndReorder(pageMap, locale, defaultLocale), [pageMap, locale, defaultLocale]);
  const flatDirectories = React.useMemo(() => flatten(directories), [directories]);
  const config = Object.assign({}, defaultConfig, _config);
  const filepath = route.slice(0, route.lastIndexOf('/') + 1);
  const filepathWithName = filepath + filename;
  const titles = React__default.Children.toArray(children).filter(child => titleType.includes(child.props.mdxType));
  const titleEl = titles.find(child => child.props.mdxType === 'h1');
  const title = meta.title || (titleEl ? innerText(titleEl.props.children) : 'Untitled');
  const anchors = titles.filter(child => child.props.mdxType === 'h2').map(child => child.props.children);
  React.useEffect(() => {
    if (menu) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [menu]);
  const currentIndex = React.useMemo(() => flatDirectories.findIndex(dir => dir.route === fsPath), [flatDirectories, fsPath]);
  const isRTL = React.useMemo(() => {
    if (!config.i18n) return config.direction === 'rtl' || null;
    const localeConfig = config.i18n.find(l => l.locale === locale);
    return localeConfig && localeConfig.direction === 'rtl';
  }, [config.i18n, locale]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Head, null, config.font ? /*#__PURE__*/React__default.createElement("link", {
    rel: "stylesheet",
    href: "https://rsms.me/inter/inter.css"
  }) : null, /*#__PURE__*/React__default.createElement("title", null, title, renderComponent(config.titleSuffix, {
    locale
  })), config.font ? /*#__PURE__*/React__default.createElement("style", {
    dangerouslySetInnerHTML: {
      __html: `html{font-family:Inter,sans-serif}@supports(font-variation-settings:normal){html{font-family:'Inter var',sans-serif}}`
    }
  }) : null, renderComponent(config.head, {
    locale
  })), /*#__PURE__*/React__default.createElement("div", {
    className: cn('nextra-container main-container flex flex-col', {
      rtl: isRTL
    })
  }, /*#__PURE__*/React__default.createElement("nav", {
    className: "flex items-center bg-white z-20 fixed top-0 left-0 right-0 h-16 border-b border-gray-200 px-6 dark:bg-dark dark:border-gray-900"
  }, /*#__PURE__*/React__default.createElement("div", {
    className: "hidden md:block w-full flex items-center"
  }, /*#__PURE__*/React__default.createElement(Link, {
    href: "/"
  }, /*#__PURE__*/React__default.createElement("a", {
    className: "no-underline text-current flex items-center hover:opacity-75"
  }, renderComponent(config.logo, {
    locale
  })))), config.customSearch || (config.search ? /*#__PURE__*/React__default.createElement(Search, {
    directories: flatDirectories
  }) : null), /*#__PURE__*/React__default.createElement("div", {
    className: "mr-2"
  }), config.darkMode ? /*#__PURE__*/React__default.createElement(ThemeSwitch, null) : null, config.i18n ? /*#__PURE__*/React__default.createElement(LocaleSwitch, {
    options: config.i18n,
    isRTL: isRTL
  }) : null, config.repository ? /*#__PURE__*/React__default.createElement("a", {
    className: "text-current p-2",
    href: config.repository,
    target: "_blank"
  }, /*#__PURE__*/React__default.createElement(GitHubIcon, {
    height: 24
  })) : null, /*#__PURE__*/React__default.createElement("button", {
    className: "block md:hidden p-2",
    onClick: () => setMenu(!menu)
  }, /*#__PURE__*/React__default.createElement("svg", {
    fill: "none",
    width: "24",
    height: "24",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /*#__PURE__*/React__default.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: 2,
    d: "M4 6h16M4 12h16M4 18h16"
  }))), /*#__PURE__*/React__default.createElement("div", {
    className: "-mr-2"
  })), /*#__PURE__*/React__default.createElement(ActiveAnchor, null, /*#__PURE__*/React__default.createElement("div", {
    className: "flex flex-1 h-full"
  }, /*#__PURE__*/React__default.createElement(MenuContext.Provider, {
    value: {
      setMenu
    }
  }, /*#__PURE__*/React__default.createElement(Sidebar, {
    show: menu,
    anchors: anchors,
    directories: directories
  })), /*#__PURE__*/React__default.createElement(skipNav.SkipNavContent, null), meta.full ? /*#__PURE__*/React__default.createElement("article", {
    className: "relative pt-16 w-full overflow-x-hidden"
  }, children) : /*#__PURE__*/React__default.createElement("article", {
    className: "docs-container relative pt-20 pb-16 px-6 md:px-8 w-full max-w-full overflow-x-hidden"
  }, /*#__PURE__*/React__default.createElement("main", {
    className: "max-w-screen-md mx-auto"
  }, /*#__PURE__*/React__default.createElement(Theme, null, children), /*#__PURE__*/React__default.createElement(Footer, {
    config: config,
    flatDirectories: flatDirectories,
    currentIndex: currentIndex,
    filepathWithName: filepathWithName,
    isRTL: isRTL
  })))))));
};

var index = ((opts, config) => props => {
  return /*#__PURE__*/React__default.createElement(nextThemes.ThemeProvider, {
    attribute: "class"
  }, /*#__PURE__*/React__default.createElement(Layout, _extends({
    config: config
  }, opts, props)));
});

module.exports = index;
