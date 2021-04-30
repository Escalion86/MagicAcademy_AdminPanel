import React from 'react'

import LessonCard from './LessonCard'

const Course = ({ course }) => {
  if (typeof course !== 'object' || !course.name || !course.lessons) return null
  return (
    <div className="p-3 bg-gray-100 rounded-md">
      <h3 className="text-base font-medium text-gray-700">{course.name}</h3>
      <ul className="space-y-2 mt-2">
        {course.lessons.map((lesson, index) => {
          return (
            <LessonCard
              key={'lesson' + index}
              name={lesson.name}
              description={lesson.description}
              stars={lesson.stars}
              status={lesson.status}
              avatar={lesson.author.avatar}
            />
          )
        })}
      </ul>
    </div>
  )
}

export default Course
