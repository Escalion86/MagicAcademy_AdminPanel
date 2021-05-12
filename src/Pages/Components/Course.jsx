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

const Course = ({ course, setPageId, onLessonClick = () => {} }) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = () => {
    setOpen(!open)
  }

  if (typeof course !== 'object' || !course?.name || !course?.lessons)
    return null
  return (
    <div className="flex flex-col p-3 bg-gray-100 rounded-md border border-gray-200 shadow">
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
                key={'lesson' + lesson.id}
                lesson={lesson}
                course={course}
                className={'lesson ' + (open ? '' : 'close')}
                onClick={() => onLessonClick(lesson)}
              />
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Course
