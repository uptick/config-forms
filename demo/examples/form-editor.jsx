import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Editor from 'config-forms-react-editor/editor'
import Palette from 'config-forms-react-editor/palette'
import Renderer from 'config-forms-react/renderer'
import { Button } from 'mireco/inputs'
import { DragDropContext } from 'react-beautiful-dnd'

function DemoFormEditor() {
  const [tab, setTab] = useState('editor')
  // const [config, setConfig] = useState({
  //   fields: {
  //     test_text_1: {
  //       type: 'text',
  //       label: 'The First Text',
  //     },
  //   },
  //   layout: [
  //     {
  //       type: 'container',
  //       style: 'card',
  //       contents: [
  //         {
  //           type: 'container',
  //           style: 'outline',
  //           contents: [],
  //         },
  //         {
  //           type: 'field',
  //           field: 'test_text_1',
  //         },
  //       ],
  //     },
  //   ],
  // })
  const [config, setConfig] = useState({
    layout: [
      {type: 'container', style: 'card', contents: [
        {type: 'text', text: 'hi there'},
      ]},
    ],
  })
  const [demoValue, setDemoValue] = useState({})
  return (
    <>
      <div style={{textAlign: 'center', margin: '2rem 0'}}>
        <Button
          onClick={() => {setTab('editor')}}
          className={tab === 'editor' ? '' : 'content outline'}
        >
          Editor
        </Button>
        {' '}
        <Button
          onClick={() => {setTab('config')}}
          className={tab === 'config' ? '' : 'content outline'}
        >
          Config
        </Button>
        {' '}
        <Button
          onClick={() => {setTab('preview')}}
          className={tab === 'preview' ? '' : 'content outline'}
        >
          Preview
        </Button>
      </div>
      {tab === 'editor' && (
        <DragDropContext>
          <Palette />
          <Editor
            config={config}
            onChange={(newConfig) => {
              setConfig(newConfig)
            }}
          />
        </DragDropContext>
      )}
      {tab === 'config' && (
        <pre>{JSON.stringify(config, null, 2)}</pre>
      )}
      {tab === 'preview' && (
        <Renderer
          config={config}
          value={demoValue}
          onChange={(newValue) => {
            setDemoValue(newValue)
          }}
        />
      )}
    </>
  )
}

const mount = document.querySelector('div.demo-mount-form-editor')
if (mount) {
  ReactDOM.render(<DemoFormEditor />, mount)
}
