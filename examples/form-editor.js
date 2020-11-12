import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import WebEditor, { Palette } from 'config-forms-react-editor'
import WebRenderer from 'config-forms-react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function DemoFormEditor(props) {
  const [config, setConfig] = useState({
    fields: {
      test_text_1: {
        type: 'text',
        label: 'The First Text',
      },
    },
    layout: [
      {
        type: 'container',
        style: 'card',
        contents: [
          {
            type: 'container',
            style: 'outline',
            contents: [],
          },
          {
            type: 'field',
            field: 'test_text_1',
          },
        ],
      },
    ],
  })
  const [demoValue, setDemoValue] = useState({})
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Palette />
        <WebEditor
          config={config}
          onChange={(newConfig) => {
            setConfig(newConfig)
          }}
        />
      </DndProvider>
      <hr />
      <pre>{JSON.stringify(config, null, 2)}</pre>
      <hr />
      <WebRenderer
        config={config}
        value={demoValue}
        onChange={(newValue) => {
          setDemoValue(newValue)
        }}
      />
    </>
  )
}

const mount = document.querySelector('div.demo-mount-form-editor')
if (mount) {
  ReactDOM.render(<DemoFormEditor />, mount)
}
