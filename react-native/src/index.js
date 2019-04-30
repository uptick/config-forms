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
const InfoLabel = fields.InfoLabel
export {
  FormContainer,
  fieldRenderers,
  layoutRenderers,
  InfoLabel,
}

export default class NativeRenderer extends React.PureComponent {
  render() {
    return (
      <BaseRenderer
        {...this.props}
        container={FormContainer}
        fieldRenderers={fieldRenderers}
        layoutRenderers={layoutRenderers}
        formRenderer={NativeRenderer}
        context={this.props.context}
      />
    )
  }
}
