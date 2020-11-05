import React from 'react'
import ReactDOM from 'react-dom'

function DemoFormEditor(props) {
  return (
    <>
      <p>Demo Form Editor</p>
    </>
  )
}

const mount = document.querySelector('div.demo-mount-form-editor')
if (mount) {
  ReactDOM.render(<DemoFormEditor />, mount)
}
