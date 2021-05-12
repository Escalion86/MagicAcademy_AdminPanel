import React from 'react'

const Title = ({ text = '', btnOnClick = null }) => {
  return (
    <div className="flex mb-2 items-center border-b border-gray-200 ">
      {btnOnClick !== null && btnOnClick !== undefined && (
        <div className="">
          <a
            className="flex cursor-pointer justify-between items-center px-2 py-1 bg-gray-200 rounded-lg hover:bg-purple-200 border border-purple-200"
            onClick={btnOnClick}
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
        {text}
      </h2>
    </div>
  )
}

export default Title
