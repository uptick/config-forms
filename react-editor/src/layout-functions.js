export function getFieldPath(layout, fieldKey, currentPath='') {
  let path = undefined
  layout.map((layoutItem, childIndex) => {
    const childPath = `${currentPath ? `${currentPath}.` : ''}${childIndex}`
    if (layoutItem.type === 'field' && layoutItem.field === fieldKey) {
      path = childPath
      return
    }
    if (layoutItem.type === 'container') {
      const contentsPath = getFieldPath(layoutItem.contents || [], fieldKey, childPath)
      if (contentsPath) {
        path = contentsPath
      }
    }
  })
  return path
}

export function insertIntoLayout(layout, item, position, path, currentPath='') {
  const updated = []
  if (position === 'inside' && path === currentPath) {
    updated.push(item)
  }
  layout.map((layoutItem, childIndex) => {
    const childPath = `${currentPath ? `${currentPath}.` : ''}${childIndex}`
    let updatedItem = layoutItem
    if (layoutItem.type === 'container') {
      updatedItem = {
        ...updatedItem,
        contents: insertIntoLayout(layoutItem.contents || [], item, position, path, childPath),
      }
    }
    if (childPath === path) {
      if (position === 'before') {
        updated.push(item)
        updated.push(updatedItem)
      }
      else if (position === 'after') {
        updated.push(updatedItem)
        updated.push(item)
      }
      else {
        updated.push(updatedItem)
      }
    }
    else {
      updated.push(updatedItem)
    }
  })
  return updated
}

export function updateLayoutPath(layout, path, changes, currentPath='') {
  const updated = []
  layout.map((layoutItem, childIndex) => {
    const childPath = `${currentPath ? `${currentPath}.` : ''}${childIndex}`
    let updatedItem = layoutItem
    if (childPath === path) {
      updatedItem = {
        ...updatedItem,
        ...changes,
      }
    }
    if (updatedItem.type === 'container') {
      updatedItem = {
        ...updatedItem,
        children: updateLayoutPath(updatedItem.contents || [], path, changes, childPath),
      }
    }
    updated.push(updatedItem)
  })
  return updated
}

export function getFieldsFromLayoutPath(layout, path, currentPath='') {
  let fields = []
  layout.map((layoutItem, childIndex) => {
    const childPath = `${currentPath ? `${currentPath}.` : ''}${childIndex}`
    if (layoutItem.type === 'field' && childPath.startsWith(path)) {
      fields.push(layoutItem.field)
    }
    if (layoutItem.type === 'container') {
      fields = fields.concat(getFieldsFromLayoutPath(layoutItem.contents || [], path, childPath))
    }
  })
  return fields
}

export function removePathFromLayout(layout, path, currentPath='') {
  const pruned = []
  layout.map((layoutItem, childIndex) => {
    const childPath = `${currentPath ? `${currentPath}.` : ''}${childIndex}`
    if (childPath === path) {
      return
    }
    if (layoutItem.type === 'container') {
      pruned.push({
        ...layoutItem,
        contents: removePathFromLayout(layoutItem.contents || [], path, childPath),
      })
    }
    else {
      pruned.push(layoutItem)
    }
  })
  return pruned
}

export function removeFieldFromLayout(layout, fieldKey) {
  const pruned = []
  layout.map(layoutItem => {
    if (layoutItem.type === 'field' && layoutItem.field === fieldKey) {
      return
    }
    if (layoutItem.type === 'container') {
      pruned.push({
        ...layoutItem,
        contents: removeFieldFromLayout(layoutItem.contents || [], fieldKey),
      })
    }
    else {
      pruned.push(layoutItem)
    }
  })
  return pruned
}

export function fieldIsInLayout(layout, fieldKey) {
  return getFieldsFromLayoutPath(layout, '').indexOf(fieldKey) != -1
}
