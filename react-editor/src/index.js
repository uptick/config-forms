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
  const handleDropExisting = (item, position, relativeTo) => {
    console.log('dropped existing', item, position, relativeTo)
    let newLayout = placeAdjacentInLayout(
      props.config.layout || [],
      item,
      position,
      relativeTo
    )
    if (!itemIsInLayout(newLayout, item)) {
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
        item,
        position,
        relativeTo
      )
    }
    props.onChange({
      ...props.config,
      layout: newLayout,
    })
  }
  const handleDropNew = (item, position, relativeTo) => {
    console.log('dropped new', item, position, relativeTo)
    const newFields = {
      ...props.config.fields,
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
      newFields[newFieldKey] = {
        ...item,
        type: item.fieldType,
      }
      if ('fieldType' in newFields[newFieldKey]) {
        delete newFields[newFieldKey].fieldType
      }
      layoutItem = {
        type: 'field',
        field: newFieldKey,
      }
    }
    let newLayout = placeAdjacentInLayout(
      props.config.layout || [],
      layoutItem,
      position,
      relativeTo
    )
    if (!itemIsInLayout(newLayout, layoutItem)) {
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
        layoutItem,
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
