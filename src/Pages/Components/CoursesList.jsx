import React from 'react'

import Avatar from '../../img/avatar.jpg'

import Course from './Course'

const CoursesList = ({ courses }) => {
  return (
    <div className="space-y-3">
      {courses.map((course, index) => (
        <Course course={course} key={'course' + index} />
      ))}
    </div>
  )
}

export default CoursesList
