import { useRef, useEffect } from 'react'

const docsearch = function () {
  const input = useRef(null)

  useEffect(() => {
    const inputs = ['input', 'select', 'button', 'textarea']

    const down = e => {
      if (
        document.activeElement &&
        inputs.indexOf(document.activeElement.tagName.toLowerCase() !== -1)
      ) {
        if (e.key === '/') {
          e.preventDefault()
          input.current?.focus()
        }
      }
    }

    window.addEventListener('keydown', down)
    return () => window.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (window.docsearch) {
      window.docsearch({
        apiKey: '2cdadd5ab16751ea3a49a13854e5b052',
        indexName: 'cosmicjs',
        inputSelector: 'input#algolia-doc-search',
        algoliaOptions: {
          facetFilters: ['tags:v2']
        }
      })
    }
  }, [])

  return (
    <div className="relative w-full mr-2 docs-search">
      <input
        id="algolia-doc-search"
        className="pl-20 appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
        type="search"
        placeholder="Search"
        ref={input}
      />
      <div className="search-icon">
        <svg
          width="20"
          height="20"
          viewBox="0 0 32 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5 25.0039C20.299 25.0039 25 20.3029 25 14.5039C25 8.70492 20.299 4.00391 14.5 4.00391C8.70101 4.00391 4 8.70492 4 14.5039C4 20.3029 8.70101 25.0039 14.5 25.0039Z"
            stroke="#D4DCF1"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28.0001 28.0039L22.2001 22.2039"
            stroke="#D4DCF1"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="search-slash">
        <svg
          width="10"
          height="12"
          viewBox="0 0 14 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.056 0.151999L4.544 23H0.224L8.736 0.151999H13.056Z"
            fill="#909BBA"
          />
        </svg>
      </div>
    </div>
  )
}

export default docsearch
