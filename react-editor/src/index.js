import React from 'react'
import { BaseRenderer } from 'config-forms'

import FormContainer from './form-container.js'
import Container from './container.js'
import Palette from './palette.js'

const fieldRenderers = {
}
const layoutRenderers = {
  container: Container,
}

export { Palette }

function WebEditor(props) {
  return (
    <BaseRenderer
      {...props}
      container={FormContainer}
      fieldRenderers={fieldRenderers}
      layoutRenderers={layoutRenderers}
      formRenderer={WebEditor}
      context={props.context}
    />
  )
}

export default WebEditor

