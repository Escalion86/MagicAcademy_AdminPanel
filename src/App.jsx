import React from 'react'
// import logo from './logo.svg'

import './App.css'

import Avatar from './img/avatar.jpg'

import SidePanel from './Pages/Blocks/SidePanel'
import Header from './Pages/Blocks/Header'
import LessonCard from './Pages/Components/LessonCard'

function App() {
  const menuCfg = [
    {
      name: 'Обучающие материалы',
      items: [
        { name: 'Видео уроки', href: '#', num: null, active: true },
        {
          name: 'Расписание живых уроков',
          href: '#',
          num: null,
          active: false,
        },
        {
          name: 'Расписание онлайн уроков',
          href: '#',
          num: null,
          active: false,
        },
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
          <main className="p-3 space-y-3 ">
            <div className="p-3 bg-gray-100 rounded-md">
              <h3 className="text-base font-medium text-gray-900">Курс №1</h3>
              <ul className="space-y-2 mt-2">
                <LessonCard
                  name="Название урока"
                  description="Cillum qui cillum sit fugiat commodo dolore dolore voluptate excepteur velit duis sint labore in. Pariatur id dolor esse velit ipsum tempor. Et reprehenderit nisi dolore ut sint qui elit. Cupidatat cupidatat incididunt esse nisi exercitation proident commodo proident eu tempor. Minim cillum incididunt dolore est minim fugiat pariatur sit aliqua."
                  stars={4}
                  status={0}
                  avatar={Avatar}
                />
                <LessonCard
                  name="Название урока"
                  description="Qui dolor nisi in magna laboris deserunt cillum proident sit tempor aliqua pariatur amet."
                  stars={8}
                  status={1}
                />
                <LessonCard
                  name="Название урока"
                  description="Описание урока"
                  stars={9}
                  status={2}
                />
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
