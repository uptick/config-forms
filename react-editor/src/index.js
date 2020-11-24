import React from 'react'
import PropTypes from 'prop-types'
import { BaseRenderer } from 'config-forms'

import FormContainer from './form-container.js'
import Palette from './palette.js'
import * as fields from './fields'
import * as layout from './layout'
import {
  removeFieldFromLayout,
  removePathFromLayout,
  getFieldsFromLayoutPath,
  updateLayoutPath,
  getFieldPath,
  insertIntoLayout,
  getLayoutAtPath,
  pathPlus,
  cleanLayoutNulls,
} from './layout-functions.js'

export { FormContainer, Palette }

const fieldRenderers = {
  text: fields.Text,
  textarea: fields.Textarea,
  checkbox: fields.Checkbox,
}
const layoutRenderers = {
  container: layout.Container,
  text: layout.Text,
}

export { fieldRenderers, layoutRenderers }

function WebEditor(props) {
  const handleChange = (updates) => {
    console.log('change of', updates)
    const updatedConfig = {
      ...props.config,
      fields: {
        ...props.config.fields,
      },
      layout: [
        ...props.config.layout || [],
      ],
    }
    for (var key in updates) {
      if (updates[key] === null) {
        if (key in updatedConfig.fields) {
          delete updatedConfig.fields[key]
        }
        updatedConfig.layout = removeFieldFromLayout(updatedConfig.layout, key)
        continue
      }
      updatedConfig.fields[key] = {
        ...props.config.fields[key],
        ...updates[key],
      }
    }
    props.onChange(updatedConfig)
  }
  const handleLayoutChange = (layoutPath, changes) => {
    console.log('layout change', layoutPath, changes)
    if (changes === null) {
      const updatedConfig = {
        ...props.config,
      }
      const removingFields = getFieldsFromLayoutPath(updatedConfig.layout || [], layoutPath)
      if (removingFields.length > 0) {
        updatedConfig.fields = {
          ...updatedConfig.fields,
        }
        removingFields.map(field => {
          if (field in updatedConfig.fields) {
            delete updatedConfig.fields[field]
          }
        })
      }
      updatedConfig.layout = removePathFromLayout(updatedConfig.layout || [], layoutPath)
      props.onChange(updatedConfig)
    }
    else {
      const updatedConfig = {
        ...props.config,
      }
      updatedConfig.layout = updateLayoutPath(updatedConfig.layout, layoutPath, changes)
      props.onChange(updatedConfig)
    }
  }
  const ensureRelativeToPath = (layout, relativeTo) => {
    let updatedLayout = layout
    let relativeToPath = relativeTo.path
    if (relativeTo.type === 'field') {
      const layoutFields = getFieldsFromLayoutPath(updatedLayout, '')
      // field is not explicitly in layout
      if (layoutFields.indexOf(relativeTo.field) == -1) {
        updatedLayout = [
          ...updatedLayout,
        ]
        // so cement all current (not including new) field positions with proper layout
        for (var fieldKey in props.config.fields || {}) {
          if (layoutFields.indexOf(fieldKey) === -1) {
            updatedLayout.push({
              type: 'field',
              field: fieldKey,
            })
          }
        }
      }
      relativeToPath = getFieldPath(updatedLayout, relativeTo.field)
    }
    return [updatedLayout, relativeToPath]
  }
  const handleDropExisting = (item, position, relativeTo) => {
    console.log('dropped existing', item, position, relativeTo)

    const updatedConfig = {
      ...props.config,
    }
    const [updatedLayout, relativeToPath] = ensureRelativeToPath(
      updatedConfig.layout || [],
      relativeTo
    )
    if (item.type === 'layout' && relativeToPath.startsWith(item.path)) {
      // can't drop a layout item inside of itself
      return
    }
    updatedConfig.layout = updatedLayout
    let movingLayout = null
    if (item.type === 'layout') {
      movingLayout = getLayoutAtPath(updatedConfig.layout, item.path)
      updatedConfig.layout = updateLayoutPath(updatedConfig.layout, item.path, null)
    }
    else if (item.type === 'field') {
      movingLayout = item
      const existingFieldPath = getFieldPath(updatedConfig.layout, item.field)
      if (existingFieldPath) {
        updatedConfig.layout = updateLayoutPath(updatedConfig.layout, existingFieldPath, null)
      }
    }
    updatedConfig.layout = insertIntoLayout(
      updatedConfig.layout,
      movingLayout,
      position,
      relativeToPath
    )
    updatedConfig.layout = cleanLayoutNulls(updatedConfig.layout)
    props.onChange(updatedConfig)
  }
  const handleDropNew = (item, position, relativeTo) => {
    console.log('dropped new', item, position, relativeTo)

    const updatedConfig = {
      ...props.config,
    }
    let layoutItem = item
    if (item.type === 'field') {
      let newIndex = 1
      const defaultKey = (index) => {
        return `${item.fieldType}_${index}`
      }
      while (defaultKey(newIndex) in (props.config.fields || {})) {
        newIndex++
      }
      const newFieldKey = defaultKey(newIndex)
      updatedConfig.fields = {
        ...updatedConfig.fields,
        [newFieldKey]: {
          ...item,
          type: item.fieldType,
        }
      }
      if ('fieldType' in updatedConfig.fields[newFieldKey]) {
        delete updatedConfig.fields[newFieldKey].fieldType
      }
      layoutItem = {
        type: 'field',
        field: newFieldKey,
      }
    }
    const [updatedLayout, relativeToPath] = ensureRelativeToPath(
      updatedConfig.layout || [],
      relativeTo
    )
    updatedConfig.layout = updatedLayout
    if (typeof relativeToPath === 'string') {
      updatedConfig.layout = insertIntoLayout(
        updatedConfig.layout,
        layoutItem,
        position,
        relativeToPath
      )
    }
    props.onChange(updatedConfig)
  }
  return (
    <BaseRenderer
      {...props}
      value={{}}
      onChange={handleChange}
      container={props.formContainer}
      formRenderer={WebEditor}
      context={{
        ...props.context,
        onDropNew: handleDropNew,
        onDropExisting: handleDropExisting,
        onLayoutChange: handleLayoutChange,
      }}
    />
  )
}
WebEditor.propTypes = {
  fieldRenderers: PropTypes.object,
  layoutRenderers: PropTypes.object,
  formContainer: PropTypes.any,
}
WebEditor.defaultProps = {
  fieldRenderers: fieldRenderers,
  layoutRenderers: layoutRenderers,
  formContainer: FormContainer,
}

export default WebEditor
