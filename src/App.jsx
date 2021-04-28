import React, { useState } from 'react'
// import logo from './logo.svg'

import './App.css'

import Avatar from './img/avatar.jpg'

import SidePanel from './Pages/Blocks/SidePanel'
import Header from './Pages/Blocks/Header'
import CourseCards from './Pages/Components/CourseCards'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  // const [splashShow, setSplashShow] = useState(false)
  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }
  const closeMenu = () => {
    setMenuOpen(false)
  }

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

  const courses = [
    {
      name: 'Курс №1',
      lessons: [
        {
          id: 0,
          name: 'Урок №1',
          description: 'Описание первого урока',
          stars: 2,
          status: 4,
          author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
        },
        {
          id: 1,
          name: 'Урок №2',
          description: 'Описание второго урока',
          stars: 3,
          status: 3,
          author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
        },
        {
          id: 2,
          name: 'Урок №3',
          description: 'Описание третьего урока',
          stars: 5,
          status: 2,
          author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
        },
        {
          id: 2,
          name: 'Урок №4',
          description: 'Описание четвертого урока',
          stars: 7,
          status: 1,
          author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
        },
        {
          id: 2,
          name: 'Урок №5',
          description: 'Описание пятого урока',
          stars: 8,
          status: 0,
          author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
        },
      ],
    },
  ]

  return (
    <div className="h-screen flex">
      <SidePanel menuCfg={menuCfg} menuOpen={menuOpen} />
      <div className="relative flex-1 min-w-0 bg-white">
        <Header
          avatar={Avatar}
          menuOpen={menuOpen}
          onClick={() => toggleMenu()}
          closeMenu={() => closeMenu()}
        />
        <h2 className="text-2xl font-semibold py-2 px-6 border-b border-gray-200 text-gray-900 leading-tight">
          Видео уроки
        </h2>
        <div className="items-center justify-between">
          <main className="p-3">
            <div className="space-y-3">
              <CourseCards course={courses[0]} />
            </div>
          </main>
        </div>
        <div className=""></div>
      </div>
    </div>
  )
}

export default App
