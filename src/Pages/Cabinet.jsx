import React, { useState } from 'react'
import axios from 'axios'
// import logo from './logo.svg'

import SidePanel from './Blocks/SidePanel'
import Header from './Blocks/Header'

function Cabinet({ page, setPageId, courses, menuCfg, user, userSetState }) {
  const [menuOpen, setMenuOpen] = useState(false)
  // const [splashShow, setSplashShow] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const closeMenu = () => {
    setMenuOpen(false)
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
          onClick={toggleMenu}
          closeMenu={closeMenu}
        />
        <h2 className="text-2xl font-semibold py-2 px-6 border-b border-gray-200 text-gray-900 leading-tight">
          {page.header}
        </h2>
        <main className="p-3">
          {typeof page?.pageContent === 'function' ? (
            page.pageContent({ courses })
          ) : (
            <div className="text-gray-700 text-base w-full text-center">
              Страница в разработке
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default Cabinet
