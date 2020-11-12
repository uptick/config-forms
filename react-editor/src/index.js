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
    // const newFields = {
    //   ...props.config.fields,
    // }
    // let layoutItem = item
    // if (item.type === 'field') {
    //   let newIndex = 1
    //   const defaultKey = (index) => {
    //     return `${item.fieldType}_${index}`
    //   }
    //   while (defaultKey(newIndex) in (props.config.fields || {})) {
    //     newIndex++
    //   }
    //   const newFieldKey = defaultKey(newIndex)
    //   newFields[newFieldKey] = {
    //     ...item,
    //     type: item.fieldType,
    //   }
    //   if ('fieldType' in newFields[newFieldKey]) {
    //     delete newFields[newFieldKey].fieldType
    //   }
    //   layoutItem = {
    //     type: 'field',
    //     field: newFieldKey,
    //   }
    // }
    // let newLayout = placeAdjacentInLayout(
    //   props.config.layout || [],
    //   layoutItem,
    //   position,
    //   relativeTo
    // )
    // if (!itemIsInLayout(newLayout, layoutItem)) {
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
    //     layoutItem,
    //     position,
    //     relativeTo
    //   )
    // }
    // props.onChange({
    //   ...props.config,
    //   fields: newFields,
    //   layout: newLayout,
    // })
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
