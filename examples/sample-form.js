import React from 'react'
import ReactDOM from 'react-dom'

function DemoSampleForm(props) {
  return (
    <>
      <p>Demo Sample Form</p>
    </>
  )
}

const mount = document.querySelector('div.demo-mount-sample-form')
if (mount) {
  ReactDOM.render(<DemoSampleForm />, mount)
}
