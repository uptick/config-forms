import React from 'react'

import Card from './card.js'
import CardSection from './card-section.js'
import Outline from './outline.js'

class Container extends React.Component {
  renderByStyle() {
    switch (this.props.style) {
      case 'card':
        return (
          <Card title={this.props.title}>
            <CardSection last>
              {this.props.children}
            </CardSection>
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
