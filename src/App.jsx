import React from 'react'
// import logo from './logo.svg'

import './App.css'

import Avatar from './img/avatar.jpg'

import SidePanel from './Pages/Blocks/SidePanel'
import Header from './Pages/Blocks/Header'

const Stars = ({ stars = 0, starstotal = 10, className = '' }) => {
  const Star = ({ filled }) => (
    <svg
      class={'w-4 h-4 text-yellow-500' + (filled ? ' fill-current' : '')}
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
  )
  return (
    <span
      className={
        'inline-flex items-center' + (className ? ' ' + className : '')
      }
    >
      {[...Array(starstotal)].map((e, i) => (
        <Star filled={i < stars}></Star>
      ))}
    </span>
  )
  // const card = _(5).times((idx) => <Star filled={idx < num}></Star>)
  // return <Star filled />
}

const LessonCard = ({ name = 'Без названия', stars = 0, status = 0 }) => {
  return (
    <li className="">
      <a href="#" className="block p-5 bg-white rounded-md shadow">
        <div className="flex justify-between">
          <p className="text-sm font-medium leading-snug text-gray-900">
            {name}
          </p>
          <span>
            <img className="h-6 w-6 rounded-full" src={Avatar} alt="" />
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-sm text-gray-600">
              {/* <time datetime="2019-09-14">Sep 14</time> */}
              Сложность
            </div>
            <Stars className="pl-2" stars={stars} />
          </div>

          {/* <svg
              className="h-2 w-2 text-blue-500"
              viewBox="0 0 8 8"
              fill="currentColor"
            >
              <circle cx="4" cy="4" r="3" />
            </svg> */}
          {status === 0 && (
            <span className="px-2 py-1 leading-tight inline-flex items-center bg-red-100 rounded">
              <span className="ml-1 text-sm font-medium text-red-700">
                Не принят
              </span>
            </span>
          )}
          {status === 1 && (
            <span className="px-2 py-1 leading-tight inline-flex items-center bg-yellow-100 rounded">
              <span className="ml-1 text-sm font-medium text-yellow-600">
                На проверке
              </span>
            </span>
          )}
          {status === 2 && (
            <span className="px-2 py-1 leading-tight inline-flex items-center bg-green-100 rounded">
              <span className="ml-1 text-sm font-medium text-green-700">
                Выполнен
              </span>
            </span>
          )}
        </div>
      </a>
    </li>
  )
}

function App() {
  const menuCfg = [
    {
      name: 'Обучающие материалы',
      items: [
        { name: 'Видео уроки', href: '#', num: null, active: true },
        { name: 'Онлайн уроки', href: '#', num: null, active: false },
      ],
    },
    {
      name: 'Учетная запись',
      items: [
        { name: 'Параметры', href: '#', num: null, active: false },
        { name: 'Выход', href: '#', num: null, active: false },
      ],
    },
  ]

  return (
    <div className="h-screen flex">
      <SidePanel menuCfg={menuCfg} />
      <div className="relative flex-1 min-w-0 bg-white">
        <Header avatar={Avatar} />
        <h2 className="text-2xl font-semibold py-2 px-6 border-b border-gray-200 text-gray-900 leading-tight">
          Видео уроки
        </h2>
        <div className="items-center justify-between">
          <main className="p-3">
            <div className="p-3 bg-gray-100 rounded-md">
              <h3 className="text-base font-medium text-gray-900">Курс №1</h3>
              <ul className="space-y-2 mt-2">
                <LessonCard name="Название фокуса" stars={4} status={0} />
                <LessonCard name="Название фокуса" stars={8} status={1} />
                <LessonCard name="Название фокуса" stars={9} status={2} />
              </ul>
            </div>
            <div className="p-3 bg-gray-100 rounded-md">
              <h3 className="text-base font-medium text-gray-900">Курс №1</h3>
              <ul className="space-y-2 mt-2">
                <LessonCard name="Название фокуса" stars={4} status={0} />
                <LessonCard name="Название фокуса" stars={8} status={1} />
                <LessonCard name="Название фокуса" stars={9} status={2} />
              </ul>
            </div>
          </main>
        </div>
        <div className=""></div>
      </div>
    </div>
  )
}

export default App
