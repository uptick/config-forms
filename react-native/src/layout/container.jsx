import React from 'react'

import Card from './card.jsx'
import Outline from './outline.jsx'

class Container extends React.PureComponent {
  renderByStyle() {
    switch (this.props.style) {
      case 'card':
        return (
          <Card title={this.props.title}>
            {this.props.children}
          </Card>
        )
      case 'outline':
        return (
          <Outline>
            {this.props.children}
          </Outline>
        )
      default:
        return this.props.children
    }
  }
  render() {
    return this.renderByStyle()
  }
}

export default Container
