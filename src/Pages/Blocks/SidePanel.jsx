import React from 'react'

import Logo from '../../img/HeadLogo.png'
import Aik1_alt from '../../img/aik1_alt.png'

const MenuItem = ({ item, onClick = () => {}, active = false }) => {
  return (
    <div className="mt-2 -mx-3">
      <a
        className="flex justify-between items-center px-3 py-1 bg-gray-200 rounded-lg hover:bg-purple-200"
        onClick={() => onClick(item.id)}
      >
        <span
          className={
            'text-sm font-medium ' +
            (active ? 'text-purple-700' : 'text-gray-700')
          }
        >
          {item.name}
        </span>
        {item.num !== null && (
          <span className="text-xs font-semibold text-gray-700">
            {item.num}
          </span>
        )}
      </a>
    </div>
  )
}

const Menu = ({ menuCfg, setPageId, activePageId }) => {
  return (
    <nav className="mt-2">
      {menuCfg &&
        menuCfg.length > 0 &&
        menuCfg.map((item, index) => (
          <div key={'groupMenu' + index}>
            <h3 className="mt-6 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              {item.name}
            </h3>
            {item.items.length > 0 &&
              item.items.map((subitem, index) => (
                <MenuItem
                  key={'menu' + subitem.id}
                  item={subitem}
                  onClick={setPageId}
                  active={activePageId === subitem.id}
                />
              ))}
          </div>
        ))}
    </nav>
  )
}

const SidePanel = ({ menuCfg, menuOpen = false, setPageId, activePageId }) => {
  return (
    <div
      className={
        'fixed lg:static w-64 h-screen max-h-screen left-0 top-menu lg:top-0 z-10 transform duration-200 lg:transform-none lg:duration-0 border-t border-purple-400 lg:border-t-0' +
        (!menuOpen
          ? ' scale-x-0 -translate-x-32 lg:scale-x-100 lg:translate-x-0'
          : '')
      }
    >
      <div className="lg:block h-full">
        <div className="lg:fixed flex flex-col overflow-y-hidden z-1 w-64 h-full px-8 py-4 bg-gray-100 border-r border-purple-400">
          <div className="z-10">
            <img className="px-4" src={Logo} alt="logo" />
            <Menu
              menuCfg={menuCfg}
              setPageId={setPageId}
              activePageId={activePageId}
            />
          </div>
          <img
            className="hidden lg:block w-full m-auto flex-1 mt-6 px-2 opacity-100 z-0 object-contain"
            src={Aik1_alt}
            alt="logo"
          />
        </div>
      </div>
    </div>
  )
}

export default SidePanel
