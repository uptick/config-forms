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

function removeItemFromLayout(layout, item) {
  const pruned = []
  layout.map(layoutItem => {
    if (layoutItem.type === 'field' && layoutItem.field === item) {
      return
    }
    if (layoutItem.type === 'container') {
      pruned.push({
        ...layoutItem,
        contents: removeItemFromLayout(layoutItem.contents || [], item),
      })
    }
    else {
      pruned.push(layoutItem)
    }
  })
  return pruned
}
function placeAdjacentInLayout(layout, item, position, relativeTo) {
  const updated = []
  layout.map(layoutItem => {
    if (layoutItem.type === 'field' && layoutItem.field === relativeTo) {
      if (position === 'before') {
        updated.push(item)
        updated.push(layoutItem)
      }
      else {
        updated.push(layoutItem)
        updated.push(item)
      }
    }
    else {
      if (layoutItem.type === 'container') {
        updated.push({
          ...layoutItem,
          contents: placeAdjacentInLayout(layoutItem.contents || [], item, position, relativeTo),
        })
      }
      else {
        updated.push(layoutItem)
      }
    }
  })
  return updated
}
function itemIsInLayout(layout, item) {
  let found = false
  layout.map(layoutItem => {
    if (layoutItem.type === 'field' && layoutItem.field === item) {
      found = true
      return
    }
    if (layoutItem.type === 'container') {
      const foundInContainer = itemIsInLayout(layoutItem.contents || [])
      if (foundInContainer) {
        found = true
        return
      }
    }
  })
  return found
}

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
  const handleDrop = (field, position, relativeTo) => {
    console.log('dropped', field, position, relativeTo)
    const placeRelative = (layout, field, position, relativeTo) => {
      let updatedLayout = removeItemFromLayout(layout, field)
      updatedLayout = placeAdjacentInLayout(
        updatedLayout,
        {
          type: 'field',
          field,
        },
        position,
        relativeTo
      )
      return updatedLayout
    }
    let newLayout = placeRelative(props.config.layout || [], field, position, relativeTo)
    if (!itemIsInLayout(newLayout, field)) {
      console.log('we were not able to place it relative!!')
      // put all unmentioned fields into config
      for (var fieldKey in props.config.fields || {}) {
        if (!itemIsInLayout(newLayout, fieldKey)) {
          console.log('setting default for field', fieldKey)
          newLayout.push({
            type: 'field',
            field: fieldKey,
          })
        }
      }
      // then try the placement again
      newLayout = placeRelative(newLayout || [], field, position, relativeTo)
    }
    const updatedConfig = {
      ...props.config,
      layout: newLayout,
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
        onDrop: handleDrop,
      }}
    />
  )
}

export default WebEditor
