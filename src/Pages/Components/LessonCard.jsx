import React from 'react'

import Stars from './Stars'

const LessonCard = ({
  name = 'Без названия',
  description = '',
  stars = 0,
  status = 0, // 0 - не доступен, 1 - доступен, но не начат, 2 - не принят, 3 - на проверке, 4 - выполнен
  avatar = null,
  className = '',
}) => {
  return (
    <li className={'min-w-min' + (className ? ' ' + className : '')}>
      <a href="#" className="block px-5 py-4 bg-white rounded-md shadow">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium leading-snug text-gray-900">
            {name}
          </p>

          <span className="h-6 w-6">
            {avatar && (
              <img className="h-6 w-6 rounded-full" src={avatar} alt="" />
            )}
          </span>
        </div>
        <div className="flex justify-between">
          <p className="text-sm leading-tight text-gray-900 font-light">
            {description}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between flex-wrap">
          <div className="flex items-center my-0.5">
            <div className="text-sm text-gray-600">
              {/* <time datetime="2019-09-14">Sep 14</time> */}
              Сложность
            </div>
            <Stars className="pl-2" stars={stars} />
          </div>
          <div className="flex flex-1 min-w-32 justify-end">
            {/* <svg
              className="h-2 w-2 text-blue-500"
              viewBox="0 0 8 8"
              fill="currentColor"
            >
              <circle cx="4" cy="4" r="3" />
            </svg> */}
            {status === 0 && (
              <span className="px-2 py-0.5 leading-tight inline-flex items-center bg-gray-100 rounded">
                <span className="ml-1 text-sm font-medium text-gray-400">
                  Не доступен
                </span>
              </span>
            )}
            {status === 2 && (
              <span className="px-2 py-0.5 leading-tight inline-flex items-center bg-red-100 rounded">
                <span className="ml-1 text-sm font-medium text-red-700">
                  Не принят
                </span>
              </span>
            )}
            {status === 3 && (
              <span className="px-2 py-0.5 leading-tight inline-flex items-center bg-yellow-100 rounded">
                <span className="ml-1 text-sm font-medium text-yellow-600">
                  На проверке
                </span>
              </span>
            )}
            {status === 4 && (
              <span className="px-2 py-0.5 leading-tight inline-flex items-center bg-green-100 rounded">
                <span className="ml-1 text-sm font-medium text-green-700">
                  Выполнен
                </span>
              </span>
            )}
          </div>
        </div>
      </a>
    </li>
  )
}

export default LessonCard
