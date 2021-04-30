import React, { useState } from 'react'

const SearchInput = ({ onPressEnter = () => {} }) => {
  const [state, setState] = useState('')

  const handleKeyDown = (key) => {
    if (key.code === 'Enter') {
      onPressEnter(state)
    }
  }

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-2 flex items-center">
        <svg className="h-6 w-6 text-gray-600" viewBox="0 0 24 24" fill="none">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        className="block w-full rounded-md border border-gray-400 pl-10 pr-4 py-2 -my-1 text-sm text-gray-900 placeholder-gray-500"
        type="text"
        placeholder="Поиск"
        onKeyDown={handleKeyDown}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
    </div>
  )
}

export default SearchInput
