import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

export default function DocsToggle({ versions }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(!open)
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }
  const wrapperRef = useRef(null)
  useOutsideAlerter(wrapperRef)
  return (
    <div
      ref={wrapperRef}
      className="relative whitespace-nowrap md:text-sm font-semibold mr-1"
      id="docs-toggle"
    >
      <button
        className="docs-toggle flex items-center focus:outline-none bg-gray-200 rounded hover:bg-gray-300 font-semibold dark:bg-gray-900 text-sm"
        onClick={handleOpen}
      >
        {versions[1].title}
        <span className="ml-1 inline-block">
          <svg
            width="10"
            height="6"
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
        </span>
      </button>
      {open ? (
        <div className="absolute w-32 top-11 left-0 border bg-white dark:bg-gray-900 rounded py-2 text-sm">
          {versions.map(docVersion => (
            <Link href={docVersion.url}>
              <a
                className="block no-underline hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-white w-full px-2 py-1"
                key={docVersion.title}
              >
                {docVersion.title}{' '}
                {docVersion.label ? `(${docVersion.label})` : ``}
              </a>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  )
}
