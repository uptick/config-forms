import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import WebRenderer from 'config-forms-react'

import SampleForm from '../../docs/sample-form.json'

function DemoSampleForm(props) {
  const [value, setValue] = useState({})
  return (
    <>
      <WebRenderer
        config={SampleForm}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
      />
      <p>Form value: "{JSON.stringify(value)}"</p>
    </>
  )
}

const mount = document.querySelector('div.demo-mount-sample-form')
if (mount) {
  ReactDOM.render(<DemoSampleForm />, mount)
}
