import React from 'react'

import Course from './Course'

const CoursesList = ({ courses, setPageId, onLessonClick = () => {} }) => {
  if (courses && typeof courses === 'object') {
    return (
      <div className="space-y-3">
        {courses.map((course, index) => (
          <Course
            course={course}
            key={'course' + course.id}
            setPageId={setPageId}
            onLessonClick={onLessonClick}
          />
        ))}
      </div>
    )
  } else {
    return (
      <div className="text-gray-700 text-base w-full text-center">
        Нет доступных видео уроков
      </div>
    )
  }
}

export default CoursesList
