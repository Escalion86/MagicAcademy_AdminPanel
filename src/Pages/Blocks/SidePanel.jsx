import React from 'react'

import Logo from '../../img/HeadLogo.png'
import Aik1_alt from '../../img/aik1_alt.png'

const MenuItem = ({ item }) => {
  return (
    <div className="mt-2 -mx-3">
      <a
        className="flex justify-between items-center px-3 py-1 bg-gray-200 rounded-lg hover:bg-purple-200"
        href={item.href}
      >
        <span
          className={
            'text-sm font-medium ' +
            (item.active ? 'text-purple-700' : 'text-gray-700')
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

const Menu = ({ menuCfg }) => {
  return (
    <nav className="mt-2">
      {menuCfg &&
        menuCfg.length > 0 &&
        menuCfg.map((item) => (
          <>
            <h3 className="mt-6 text-xs font-semibold text-gray-600 uppercase tracking-wide">
              {item.name}
            </h3>
            {item.items.length > 0 &&
              item.items.map((subitem) => <MenuItem item={subitem} />)}
          </>
        ))}
    </nav>
  )
}

const SidePanel = ({ menuCfg }) => {
  return (
    <div className="w-64">
      <div className="fixed overflow-y-hidden z-1 w-64 h-full px-8 py-4 bg-gray-100 border-r border-purple-500">
        <img className="px-4" src={Logo} alt="logo" />
        <Menu menuCfg={menuCfg} />
        <img className="mt-8" src={Aik1_alt} alt="logo" />
      </div>
    </div>
  )
}

export default SidePanel
