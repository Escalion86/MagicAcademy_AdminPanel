import React, { useState } from 'react'

import './Course.css'

import LessonCard from './LessonCard'

const ListArrow = ({ listOpen = false, onClick = () => {} }) => {
  return (
    <div className={'list-btn' + (listOpen ? ' open' : '')} onClick={onClick}>
      <div className="list-btn__arrow" />
    </div>
  )
}

const Course = ({ course }) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }
  console.log('open :>> ', open)
  if (typeof course !== 'object' || !course.name || !course.lessons) return null
  return (
    <div className="flex flex-col p-3 bg-gray-100 rounded-md">
      <div className="flex justify-between items-center">
        <h3 className="flex-1 text-base font-medium text-gray-700">
          {course.name}
        </h3>
        <ListArrow listOpen={open} onClick={toggleOpen} />
      </div>
      <div>
        <ul className={'overflow-hidden'}>
          {course.lessons.map((lesson, index) => {
            return (
              <LessonCard
                key={'lesson' + index}
                name={lesson.name}
                description={lesson.description}
                stars={lesson.stars}
                status={lesson.status}
                avatar={lesson.author.avatar}
                className={'lesson ' + (open ? '' : 'close')}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Course
