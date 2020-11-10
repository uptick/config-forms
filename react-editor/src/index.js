import React from 'react'
import { BaseRenderer } from 'config-forms'

import FormContainer from './form-container.js'
import Palette from './palette.js'
import * as fields from './fields'
import * as layout from './layout'

const fieldRenderers = {
  text: fields.Text,
}
const layoutRenderers = {
  container: layout.Container,
}

export { Palette }

function WebEditor(props) {
  const handleChange = (updates) => {
    const mergedConfig = {
      ...props.config,
      fields: {
        ...props.config.fields,
      },
    }
    for (var key in updates) {
      if (updates[key] === null) {
        if (key in mergedConfig.fields) {
          delete mergedConfig.fields[key]
        }
        continue
      }
      mergedConfig.fields[key] = {
        ...props.config.fields[key],
        ...updates[key],
      }
    }
    props.onChange(mergedConfig)
  }
  return (
    <BaseRenderer
      {...props}
      value={{}}
      onChange={handleChange}
      container={FormContainer}
      fieldRenderers={fieldRenderers}
      layoutRenderers={layoutRenderers}
      formRenderer={WebEditor}
      context={props.context}
    />
  )
}

export default WebEditor
