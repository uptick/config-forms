import React from 'react'
import BaseRenderer from 'config-forms/renderer'

import FormContainer from './form-container.jsx'
import fieldRenderers from './field-renderers'
import layoutRenderers from './layout-renderers'

function Renderer(props) {
  return (
    <BaseRenderer
      {...props}
      container={FormContainer}
      fieldRenderers={fieldRenderers}
      layoutRenderers={layoutRenderers}
      formRenderer={Renderer}
      context={props.context}
    />
  )
}

export default Renderer
