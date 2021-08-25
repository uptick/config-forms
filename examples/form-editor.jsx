import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import Editor from 'config-forms-react-editor/editor'
import Palette from 'config-forms-react-editor/palette'
import Renderer from 'config-forms-react/renderer'
import { Button } from 'mireco/inputs'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function DemoFormEditor() {
  const [tab, setTab] = useState('editor')
  const [config, setConfig] = useState({
    "fields": {
      "vanilla_text": {"type": "text"},
      "vanilla_textarea": {"type": "textarea"},
      "vanilla_checkbox": {"type": "checkbox"},
      "vanilla_number": {"type": "number"},

      "annotated_text": {
        "type": "text",
        "label": "What is your name?",
        "placeholder": "Your name",
        "description": "More information is available here in a large piece of descriptive copy."
      },
      "annotated_textarea": {
        "type": "textarea",
        "label": "How did you find this NPM package?",
        "placeholder": "Write a short description",
        "description": "More information is available here in a large piece of descriptive copy."
      },
      "annotated_checkbox": {
        "type": "checkbox",
        "label": "Yes I want to receive spam email",
        "description": "More information is available here in a large piece of descriptive copy."
      },
      "annotated_number": {
        "type": "number",
        "label": "Please enter your age",
        "placeholder": "Your age in years",
        "description": "More information is available here in a large piece of descriptive copy."
      },

      "outline_example": {
        "type": "text",
        "label": "Example of a text box inside an outline"
      }
    },
    "layout": [
      {
        "type": "container",
        "style": "card",
        "title": "Base Fields (Vanilla)",
        "contents": [
          {"type": "field", "field": "vanilla_text"},
          {"type": "field", "field": "vanilla_textarea"},
          {"type": "field", "field": "vanilla_checkbox"},
          {"type": "field", "field": "vanilla_number"}
        ]
      },
      {
        "type": "container",
        "style": "card",
        "title": "Base Fields (Annotated)",
        "contents": [
          {"type": "field", "field": "annotated_text"},
          {"type": "field", "field": "annotated_textarea"},
          {"type": "field", "field": "annotated_checkbox"},
          {"type": "field", "field": "annotated_number"}
        ]
      }
    ]
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
        <DndProvider backend={HTML5Backend}>
          <Palette />
          <Editor
            config={config}
            onChange={(newConfig) => {
              setConfig(newConfig)
            }}
          />
        </DndProvider>
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
