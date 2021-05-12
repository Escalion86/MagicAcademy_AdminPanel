import React, { useState } from 'react'
import axios from 'axios'
// import logo from './logo.svg'

import SidePanel from './Blocks/SidePanel'
import Header from './Blocks/Header'
import { DEFAULT_USER } from '../helpers/constants'
import Account from './PageContent/Account'

function Cabinet({
  page,
  setPageId,
  courses,
  menuCfg,
  user = DEFAULT_USER,
  setUser,
  onSignOut,
}) {
  const [menuOpen, setMenuOpen] = useState(false)
  // const [splashShow, setSplashShow] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }

  const PageContent = (props) => {
    if (typeof page?.pageContent === 'function') {
      return page.pageContent(props)
    } else
      return (
        <div className="text-gray-700 text-base w-full text-center">
          Страница в разработке
        </div>
      )
  }

  return (
    <div className="h-screen flex">
      <SidePanel
        menuCfg={menuCfg}
        menuOpen={menuOpen}
        setPageId={setPageId}
        activePageId={page.id}
        closeMenu={closeMenu}
      />
      <div className="relative flex-1 min-w-0 bg-white">
        <Header
          user={user}
          menuOpen={menuOpen}
          setPageId={setPageId}
          onClickBurger={toggleMenu}
          closeMenu={closeMenu}
          onSignOut={onSignOut}
        />
        <div className="mx-3 flex items-center border-b border-gray-200 ">
          {page.backToPageId !== null && page.backToPageId !== undefined && (
            <div className="">
              <a
                className="flex cursor-pointer justify-between items-center px-2 py-1 bg-gray-200 rounded-lg hover:bg-purple-200 border border-purple-200"
                onClick={() => {
                  setPageId(page.backToPageId)
                }}
              >
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    d="M19 13H6.75L12 18.25l-.664.75l-6.5-6.5l6.5-6.5l.664.75L6.75 12H19v1z"
                  />
                </svg>
                {/* <span className="text-sm font-medium text-gray-600">Назад</span> */}
              </a>
            </div>
          )}
          <h2 className="text-2xl font-semibold py-2 px-2 text-gray-900 leading-tight">
            {page.header}
          </h2>
        </div>
        <main className="p-3">
          <PageContent
            courses={courses}
            user={user}
            setUser={setUser}
            setPageId={setPageId}
            page={page}
          />
        </main>
      </div>
    </div>
  )
}

export default Cabinet
