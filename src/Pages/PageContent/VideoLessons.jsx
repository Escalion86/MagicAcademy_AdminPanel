import React from 'react'

import CoursesList from '../Components/CoursesList'

const VideoLessons = ({ courses }) => {
  return (
    <div className="items-center justify-between">
      <main className="p-3">
        <CoursesList courses={courses} />
      </main>
    </div>
  )
}

export default VideoLessons
