// export function layoutItemsMatch(itemOne, itemTwo) {
//   if (itemOne.type !== itemTwo.type) {
//     return false
//   }
//   switch (itemOne.type) {
//     case 'field':
//       return itemOne.field === itemTwo.field
//   }
// }
// 
// export function placeAdjacentInLayout(layout, item, position, relativeTo) {
//   const updated = []
//   const removed = removeItemFromLayout(layout, item)
//   removed.map(layoutItem => {
//     if (layoutItemsMatch(layoutItem, relativeTo)) {
//       if (position === 'before') {
//         updated.push(item)
//         updated.push(layoutItem)
//       }
//       else {
//         updated.push(layoutItem)
//         updated.push(item)
//       }
//     }
//     else {
//       if (layoutItem.type === 'container') {
//         updated.push({
//           ...layoutItem,
//           contents: placeAdjacentInLayout(layoutItem.contents || [], item, position, relativeTo),
//         })
//       }
//       else {
//         updated.push(layoutItem)
//       }
//     }
//   })
//   return updated
// }

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
  let found = false
  layout.map(layoutItem => {
    if (layoutItem.type === 'field' && layoutItem.field === fieldKey) {
      found = true
      return
    }
    if (layoutItem.type === 'container') {
      const foundInContainer = fieldIsInLayout(layoutItem.contents || [], fieldKey)
      if (foundInContainer) {
        found = true
        return
      }
    }
  })
  return found
}
