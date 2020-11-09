import React from 'react'

function FormContainer(props) {
  let contents = props.children
  if (!Array.isArray(contents)) {
    contents = [contents]
  }
  if (!props.subform && props.showValue) {
    contents.push(<p key="stringified">{JSON.stringify(props.value)}</p>)
  }
  if (!props.subform) {
    contents = (
      <div className="CONFORM-form">
        {contents}
      </div>
    )
  }
  return contents
}
FormContainer.defaultProps = {
  showValue: false,
}

export default FormContainer
