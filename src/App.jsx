import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import logo from './logo.svg'

import './App.css'

import Sign from './Pages/Sign'
import Cabinet from './Pages/Cabinet'
import VideoLessons from './Pages/PageContent/VideoLessons'
import Account from './Pages/PageContent/Account'

import Avatar from './img/avatar.jpg'
import { DEFAULT_USER } from './helpers/constants'

const coursesDB = [
  {
    id: 0,
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
        id: 3,
        name: 'Урок №4',
        description: 'Описание четвертого урока',
        stars: 7,
        status: 1,
        author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
      },
      {
        id: 4,
        name: 'Урок №5',
        description: 'Описание пятого урока',
        stars: 8,
        status: 0,
        author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
      },
    ],
  },
  {
    id: 1,
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

function App() {
  const [userState, setUserState] = useState(DEFAULT_USER)
  const [courses, setCourses] = useState(coursesDB)
  const [pageId, setPageId] = useState(0)

  const SignOut = () => {
    setUserState(DEFAULT_USER)
    setPageId(0)
    setCourses(null)
  }

  const pages = [
    {
      id: 0,
      group: 0,
      name: 'Видео уроки',
      header: 'Видео уроки',
      pageContent: VideoLessons,
    }, // 0
    {
      id: 1,
      group: 0,
      name: 'Расписание живых уроков',
      header: 'Расписание живых уроков',
      pageContent: null,
    }, // 1
    {
      id: 2,
      group: 0,
      name: 'Расписание онлайн уроков',
      header: 'Расписание онлайн уроков',
      pageContent: null,
    }, // 2
    {
      id: 3,
      group: null,
      name: 'Параметры',
      header: 'Параметры учетной записи',
      pageContent: Account,
    }, // 3
    // {
    //   id: 4,
    //   group: 1,
    //   name: 'Выход',
    //   header: null,
    //   pageContent: null,
    // },
  ]

  const pagesGroups = [
    { id: 0, name: 'Обучающие материалы' },
    { id: 1, name: 'Учетная запись' },
  ]

  const menuCfg = (pages, pagesGroups) => {
    let result = []
    pagesGroups.forEach((group) => {
      let items = []
      pages.forEach((page) => {
        if (page.group === group.id) items.push(page)
      })
      if (items.length > 0) result.push({ name: group.name, items })
    })
    return result
  }

  // const setActivePageId = (id) => {
  //   for (let i = 0; i < pages.length; i++) {
  //     if (id === pages[i].id) {
  //       setActivePage(pages[i])
  //       break
  //     }
  //   }
  // }

  if (userState?.id > 0)
    return (
      <Cabinet
        page={pages[pageId]}
        setPageId={setPageId}
        courses={courses}
        menuCfg={menuCfg(pages, pagesGroups)}
        user={userState}
        userSetState={setUserState}
        onSignOut={SignOut}
      />
    )
  else return <Sign user={userState} setUserState={setUserState} />
}

export default App
