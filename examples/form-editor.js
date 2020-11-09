import React from 'react'
import ReactDOM from 'react-dom'
import WebEditor from 'config-forms-react-editor'

function DemoFormEditor(props) {
  return (
    <>
      <WebEditor
        config={{}}
        value={{}}
      />
    </>
  )
}

const mount = document.querySelector('div.demo-mount-form-editor')
if (mount) {
  ReactDOM.render(<DemoFormEditor />, mount)
}
