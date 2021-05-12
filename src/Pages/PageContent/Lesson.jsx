import React from 'react'

const Lesson = ({ page }) => {
  const { lesson } = page
  return <div>{lesson.description}</div>
}

export default Lesson
