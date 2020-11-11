import React from 'react'
import { BaseRenderer } from 'config-forms'

import FormContainer from './form-container.js'
import Palette from './palette.js'
import * as fields from './fields'
import * as layout from './layout'

const fieldRenderers = {
  text: fields.Text,
  textarea: fields.Textarea,
  checkbox: fields.Checkbox,
}
const layoutRenderers = {
  container: layout.Container,
}

export { Palette }

function layoutItemsMatch(itemOne, itemTwo) {
  if (itemOne.type !== itemTwo.type) {
    return false
  }
  switch (itemOne.type) {
    case 'field':
      return itemOne.field === itemTwo.field
  }
}
function removeItemFromLayout(layout, item) {
  const pruned = []
  layout.map(layoutItem => {
    if (layoutItemsMatch(layoutItem, item)) {
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
  const removed = removeItemFromLayout(layout, item)
  removed.map(layoutItem => {
    if (layoutItemsMatch(layoutItem, relativeTo)) {
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
    if (layoutItemsMatch(layoutItem, item)) {
      found = true
      return
    }
    if (layoutItem.type === 'container') {
      const foundInContainer = itemIsInLayout(layoutItem.contents || [], item)
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
        updatedConfig.layout = removeItemFromLayout(updatedConfig.layout, {
          type: 'field',
          field: key,
        })
        continue
      }
      updatedConfig.fields[key] = {
        ...props.config.fields[key],
        ...updates[key],
      }
    }
    props.onChange(updatedConfig)
  }
  const handleDropExisting = (field, position, relativeTo) => {
    console.log('dropped', field, position, relativeTo)
    let newLayout = placeAdjacentInLayout(
      props.config.layout || [],
      {
        type: 'field',
        field,
      },
      position,
      relativeTo
    )
    if (!itemIsInLayout(newLayout, {type: 'field', field})) {
      // put all unmentioned fields into config
      for (var fieldKey in props.config.fields || {}) {
        if (!itemIsInLayout(newLayout, {type: 'field', field: fieldKey})) {
          newLayout.push({
            type: 'field',
            field: fieldKey,
          })
        }
      }
      // then try the placement again
      newLayout = placeAdjacentInLayout(
        newLayout,
        {
          type: 'field',
          field,
        },
        position,
        relativeTo
      )
    }
    props.onChange({
      ...props.config,
      layout: newLayout,
    })
  }
  const handleDropNew = (fieldType, position, relativeTo) => {
    console.log('dropped new', fieldType, position, relativeTo)
    let newIndex = 1
    const defaultKey = (index) => {
      return `${fieldType}_${index}`
    }
    while (defaultKey(newIndex) in (props.config.fields || {})) {
      newIndex++
    }
    const newFieldKey = defaultKey(newIndex)
    const newFields = {
      ...props.config.fields,
      [newFieldKey]: {
        type: fieldType,
      },
    }
    let newLayout = placeAdjacentInLayout(
      props.config.layout || [],
      {
        type: 'field',
        field: newFieldKey,
      },
      position,
      relativeTo
    )
    if (!itemIsInLayout(newLayout, {type: 'field', field: newFieldKey})) {
      // put all unmentioned fields into config
      for (var fieldKey in props.config.fields || {}) {
        if (!itemIsInLayout(newLayout, {type: 'field', field: fieldKey})) {
          newLayout.push({
            type: 'field',
            field: fieldKey,
          })
        }
      }
      // then try the placement again
      newLayout = placeAdjacentInLayout(
        newLayout,
        {
          type: 'field',
          field: newFieldKey,
        },
        position,
        relativeTo
      )
    }
    props.onChange({
      ...props.config,
      fields: newFields,
      layout: newLayout,
    })
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
      }}
    />
  )
}

export default WebEditor
