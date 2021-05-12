import React, { useState, useEffect } from 'react'
import axios from 'axios'
// import logo from './logo.svg'

import './App.css'

import Sign from './Pages/Sign'
import Cabinet from './Pages/Cabinet'
import Courses from './Pages/PageContent/Courses'
import Account from './Pages/PageContent/Account'
import Lesson from './Pages/PageContent/Lesson'

import Avatar from './img/avatar.jpg'
import { DEFAULT_USER } from './helpers/constants'

const coursesDB = [
  {
    id: 0,
    name: 'Курс №1',
  },
  {
    id: 1,
    name: 'Курс №2',
  },
]

const lessonsDB = [
  {
    id: 0,
    courseId: 0,
    name: 'Урок №1',
    description: 'Описание первого урока',
    stars: 2,
    status: 4,
    author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
  },
  {
    id: 1,
    courseId: 0,
    name: 'Урок №2',
    description: 'Описание второго урока',
    stars: 3,
    status: 3,
    author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
  },
  {
    id: 2,
    courseId: 0,
    name: 'Урок №3',
    description: 'Описание третьего урока',
    stars: 5,
    status: 2,
    author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
  },
  {
    id: 3,
    courseId: 0,
    name: 'Урок №4',
    description: 'Описание четвертого урока',
    stars: 7,
    status: 1,
    author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
  },
  {
    id: 4,
    courseId: 0,
    name: 'Урок №5',
    description: 'Описание пятого урока',
    stars: 8,
    status: 0,
    author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
  },
  {
    id: 5,
    courseId: 1,
    name: 'Урок №1',
    description: 'Описание первого урока',
    stars: 2,
    status: 4,
    author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
  },
  {
    id: 6,
    courseId: 1,
    name: 'Урок №2',
    description: 'Описание второго урока',
    stars: 3,
    status: 3,
    author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
  },
  {
    id: 7,
    courseId: 1,
    name: 'Урок №3',
    description: 'Описание третьего урока',
    stars: 5,
    status: 2,
    author: { id: 1, name: 'Алексей Белинский', avatar: Avatar },
  },
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

const courseCfg = (courses, lessons) => {
  let result = []
  courses.forEach((course) => {
    let items = []
    lessons.forEach((lesson) => {
      if (lesson.courseId === course.id) items.push(lesson)
    })
    if (items.length > 0) result.push({ ...course, lessons: items })
  })
  return result
}

function App() {
  const [userState, setUserState] = useState(DEFAULT_USER)
  const [courses, setCourses] = useState(null)
  const [page, setPage] = useState({
    id: 0,
    group: 0,
    name: 'Видео уроки',
    header: 'Видео уроки',
    pageContent: Courses,
  })

  console.log('page :>> ', page)

  useEffect(() => {
    setCourses(courseCfg(coursesDB, lessonsDB))
  }, [])

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
      pageContent: Courses,
      backToPageId: null,
    }, // 0
    {
      id: 1,
      group: 0,
      name: 'Расписание живых уроков',
      header: 'Расписание живых уроков',
      pageContent: null,
      backToPageId: null,
    }, // 1
    {
      id: 2,
      group: 0,
      name: 'Расписание онлайн уроков',
      header: 'Расписание онлайн уроков',
      pageContent: null,
      backToPageId: null,
    }, // 2
    {
      id: 3,
      group: null,
      name: 'Параметры',
      header: 'Параметры учетной записи',
      pageContent: Account,
      backToPageId: null,
    }, // 3
    {
      id: 4,
      group: null,
      name: 'Урок',
      header: 'Урок',
      pageContent: Lesson,
      backToPageId: 0,
    },
  ]

  const pagesGroups = [
    { id: 0, name: 'Обучающие материалы' },
    { id: 1, name: 'Учетная запись' },
  ]

  const setPageId = (id, props = {}) => {
    pages.some((page) => {
      if (page.id === id) {
        setPage({ ...page, ...props })
        return true
      }
    })
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
        page={page}
        setPageId={setPageId}
        courses={courses}
        menuCfg={menuCfg(pages, pagesGroups)}
        user={userState}
        setUser={setUserState}
        onSignOut={SignOut}
      />
    )
  else return <Sign user={userState} setUserState={setUserState} />
}

export default App
