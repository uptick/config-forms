import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import WebRenderer from 'config-forms-react'

import SampleForm from '../../docs/sample-form.json'

const HOSTED_SAMPLE_FORM_URL = (
  'https://github.com/uptick/config-forms/blob/master/docs/sample-form.json'
)

function DemoSampleForm(props) {
  const [value, setValue] = useState({})
  return (
    <>
      <p><a href={HOSTED_SAMPLE_FORM_URL}>View the contents of the sample form on GitHub</a>.</p>
      <WebRenderer
        config={SampleForm}
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
      />
      <p>Form value:</p>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </>
  )
}

const mount = document.querySelector('div.demo-mount-sample-form')
if (mount) {
  ReactDOM.render(<DemoSampleForm />, mount)
}
