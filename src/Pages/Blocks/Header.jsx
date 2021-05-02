import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
// import { Menu } from '@headlessui/react'

import './Header.css'

import SearchInput from '../Components/SearchInput'

const UserMenu = ({ user, setPageId = () => {}, onSignOut = () => {} }) => {
  return (
    <div className="h-11 w-11 -mt-1 -mb-1 ml-5 z-20">
      <Menu as="div" className="relative inline-block text-left h-11 w-11">
        {({ open }) => (
          <>
            <div className="absolute left-0 z-50 h-11 w-11">
              <Menu.Button as="div">
                <img
                  className="h-11 w-11 min-w-9 rounded-full object-cover cursor-pointer"
                  src={'src/img/avatars/' + user.id + '.jpg'}
                  alt="Avatar"
                />
              </Menu.Button>
            </div>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="absolute z-0 -top-2 right-5 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-mdshadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="flex items-center pl-2 pr-6 py-1 min-h-11 text-gray-900">
                  Белинский Алексей Алексеевич
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active ? 'bg-purple-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                        onClick={() => setPageId(3)}
                      >
                        {active ? (
                          <FontAwesomeIcon
                            className="w-5 h-5 mr-2 text-white"
                            icon={faUser}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="w-5 h-5 mr-2 text-purple-500"
                            icon={faUser}
                          />
                        )}
                        Учетная запись
                      </a>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active ? 'bg-purple-500 text-white' : 'text-gray-900'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm cursor-pointer`}
                        onClick={onSignOut}
                      >
                        {active ? (
                          <FontAwesomeIcon
                            className="w-5 h-5 mr-2 text-white"
                            icon={faSignOutAlt}
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="w-5 h-5 mr-2 text-purple-500"
                            icon={faSignOutAlt}
                          />
                        )}
                        Выход
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

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
  user,
  menuOpen = false,
  setPageId = () => {},
  onClickBurger = () => {},
  closeMenu = () => {},
  onSignOut = () => {},
}) => {
  return (
    <div className="sticky top-0 bg-white border-b border-purple-400 z-20">
      <header className="px-6">
        <div className="flex justify-between items-center py-3 border-gray-200">
          <div className="flex flex-1 items-center">
            <Burger
              className="flex lg:hidden z-20"
              menuOpen={menuOpen}
              onClick={onClickBurger}
            />
            <div className="hidden sm:block ml-5 lg:ml-0 w-96">
              <SearchInput onPressEnter={() => {}} />
            </div>
          </div>
          <div className="flex items-center">
            <div className="ml-5 cursor-pointer">
              <svg
                className="h-6 w-6 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="2"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg> */}
            </div>
            {/* <div>
              {userState ? (userState?.name ? userState.name : null) : null}
            </div> */}
            {/* <button className="ml-5">
              <img
                className="h-9 w-9 min-w-9 rounded-full object-cover"
                src={'src/img/avatars/' + user.id + '.jpg'}
                alt="Avatar"
              />
            </button> */}

            <UserMenu user={user} setPageId={setPageId} onSignOut={onSignOut} />
          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
