import React, { useState } from 'react'

import CoursesList from '../Components/CoursesList'
import Title from '../Components/Title'
import Lesson from '../Components/Lesson'

const Courses = ({ page, courses, setPageId }) => {
  const [lesson, setLesson] = useState(null)
  return (
    <>
      {lesson && (
        <div>
          <Title
            text={lesson?.name}
            btnOnClick={() => {
              setLesson(null)
            }}
          />
          <Lesson lesson={lesson} />
        </div>
      )}
      <div className={lesson && 'h-0 max-h-0 overflow-hidden'}>
        <Title text="Видео уроки" />
        <CoursesList
          courses={courses}
          setPageId={setPageId}
          onLessonClick={setLesson}
        />
      </div>
    </>
  )
}

export default Courses
