import React from 'react'

import Card from './card.jsx'
import CardSection from './card-section.jsx'
import Outline from './outline.jsx'

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
