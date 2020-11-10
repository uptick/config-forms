import React from 'react'
import ReactDOM from 'react-dom'
import WebEditor, { Palette } from 'config-forms-react-editor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function DemoFormEditor(props) {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Palette />
        <WebEditor
          config={{}}
          value={{}}
        />
      </DndProvider>
    </>
  )
}

const mount = document.querySelector('div.demo-mount-form-editor')
if (mount) {
  ReactDOM.render(<DemoFormEditor />, mount)
}
