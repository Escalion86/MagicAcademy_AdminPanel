import React from 'react'

import CoursesList from '../Components/CoursesList'

const Courses = ({ courses, setPageId }) => {
  return <CoursesList courses={courses} setPageId={setPageId} />
}

export default Courses
