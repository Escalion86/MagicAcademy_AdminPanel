import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import logo from './logo.svg'

import './App.css'

import Sign from './Pages/Sign'
import Cabinet from './Pages/Cabinet'
import VideoLessons from './Pages/PageContent/VideoLessons'

import Avatar from './img/avatar.jpg'

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
  {
    name: 'Курс №2',
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
    ],
  },
]

const pages = [
  { id: 0, name: 'Видео уроки', pageContent: VideoLessons }, // 0
  { id: 1, name: 'Расписание живых уроков', pageContent: null }, // 1
  { id: 2, name: 'Расписание онлайн уроков', pageContent: null }, // 2
  { id: 3, name: 'Параметры', pageContent: null }, // 3
  { id: 4, name: 'Выход', pageContent: null },
]

const menuCfg = [
  {
    name: 'Обучающие материалы',
    items: [pages[0], pages[1], pages[2]],
  },
  {
    name: 'Учетная запись',
    items: [pages[3], pages[4]],
  },
]

function App() {
  const [userState, setUserState] = useState(null)
  const [coursesState, setCoursesState] = useState(courses)
  const [activePage, setActivePage] = useState(pages[0])

  const setActivePageId = (id) => {
    for (let i = 0; i < pages.length; i++) {
      if (id === pages[i].id) {
        setActivePage(pages[i])
        break
      }
    }
  }

  if (userState)
    return (
      <Cabinet
        page={activePage}
        setPageId={setActivePageId}
        courses={coursesState}
        menuCfg={menuCfg}
        user={userState}
        userSetState={setUserState}
      />
    )
  else return <Sign user={userState} setUserState={setUserState} />
}

export default App
