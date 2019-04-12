import React from 'react'

import { Card, CardSection, Outline } from './layout'

class FormContainer extends React.Component {
  static defaultProps = {
    showValue: false,
  }
  render() {
    let contents = this.props.children
    if (!Array.isArray(contents)) {
      contents = [contents]
    }
    if (!this.props.subform && this.props.showValue) {
      contents.push(<p key="stringified">{JSON.stringify(this.props.value)}</p>)
    }
    if (!this.props.subform) {
      contents = (
        <div className="CONFORM-form">
          {contents}
        </div>
      )
    }
    return contents
  }
}

export default FormContainer
