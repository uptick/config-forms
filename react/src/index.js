import React from 'react'
import { BaseRenderer } from 'config-forms'

import FormContainer from './form-container.js'
import * as fields from './fields'
import * as layout from './layout'

const fieldRenderers = {
  text: fields.Text,
  textarea: fields.Textarea,
  checkbox: fields.Checkbox,
}
const layoutRenderers = {
  text: layout.Text,
  container: layout.Container,
  button: layout.Button,
  controllable: layout.Controllable,
}
export { FormContainer, fieldRenderers, layoutRenderers }

export default class WebRenderer extends React.Component {
  render() {
    return (
      <BaseRenderer
        {...this.props}
        container={FormContainer}
        fieldRenderers={fieldRenderers}
        layoutRenderers={layoutRenderers}
        formRenderer={WebRenderer}
        context={this.props.context}
      />
    )
  }
}
