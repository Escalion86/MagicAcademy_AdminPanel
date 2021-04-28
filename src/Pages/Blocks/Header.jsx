import React from 'react'

import './Header.css'

const Burger = ({
  menuOpen = () => {},
  onClick = () => {},
  className = '',
}) => {
  return (
    <div
      className={
        'menu-btn' +
        (menuOpen ? ' open' : '') +
        (className ? ' ' + className : '')
      }
      onClick={onClick}
    >
      <div className="menu-btn__burger" />
    </div>
  )
}

const Header = ({
  avatar,
  menuOpen = false,
  onClick = () => {},
  closeMenu = () => {},
}) => {
  return (
    <div className="sticky top-0 bg-white border-b border-purple-400">
      <header className="px-6">
        <div className="flex justify-between items-center py-3 border-gray-200">
          <div className="flex items-center">
            <Burger
              className="flex lg:hidden z-20"
              menuOpen={menuOpen}
              onClick={onClick}
            />
            <div className="ml-5 lg:ml-0">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
                  <svg
                    className="h-6 w-6 text-gray-600"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </span>
                <input
                  className="block w-full rounded-md border border-gray-400 pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500"
                  type="text"
                  placeholder="Поиск"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <button className="ml-5">
              <svg
                class="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>

              {/* <svg
                    class="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    ></path>
                  </svg>
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg> */}
            </button>
            <button className="ml-5">
              <img
                className="h-9 w-9 min-w-9 rounded-full object-cover"
                src={avatar}
                alt="Avatar"
              />
            </button>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
