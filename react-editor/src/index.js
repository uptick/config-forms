import React from 'react'
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
} from './layout-functions.js'

const fieldRenderers = {
  text: fields.Text,
  textarea: fields.Textarea,
  checkbox: fields.Checkbox,
}
const layoutRenderers = {
  container: layout.Container,
}

export { Palette }

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
  const handleDropExisting = (item, position, relativeTo) => {
    console.log('dropped existing', item, position, relativeTo)
    // let newLayout = placeAdjacentInLayout(
    //   props.config.layout || [],
    //   item,
    //   position,
    //   relativeTo
    // )
    // if (!itemIsInLayout(newLayout, item)) {
    //   // put all unmentioned fields into config
    //   for (var fieldKey in props.config.fields || {}) {
    //     if (!itemIsInLayout(newLayout, {type: 'field', field: fieldKey})) {
    //       newLayout.push({
    //         type: 'field',
    //         field: fieldKey,
    //       })
    //     }
    //   }
    //   // then try the placement again
    //   newLayout = placeAdjacentInLayout(
    //     newLayout,
    //     item,
    //     position,
    //     relativeTo
    //   )
    // }
    // props.onChange({
    //   ...props.config,
    //   layout: newLayout,
    // })
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
    let relativeToPath = relativeTo.path
    if (relativeTo.type === 'field') {
      const layoutFields = getFieldsFromLayoutPath(updatedConfig.layout, '')
      // field is not explicitly in layout
      if (layoutFields.indexOf(relativeTo.field) == -1) {
        updatedConfig.layout = [
          ...updatedConfig.layout,
        ]
        // so cement all current (not including new) field positions with proper layout
        for (var fieldKey in props.config.fields || {}) {
          if (layoutFields.indexOf(fieldKey) === -1) {
            updatedConfig.layout = [
              ...updatedConfig.layout,
              {
                type: 'field',
                field: fieldKey,
              },
            ]
          }
        }
      }
      relativeToPath = getFieldPath(updatedConfig.layout, relativeTo.field)
    }
    if (relativeToPath) {
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
      container={FormContainer}
      fieldRenderers={fieldRenderers}
      layoutRenderers={layoutRenderers}
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

export default WebEditor
