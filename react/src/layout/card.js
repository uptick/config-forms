import React from 'react'
import CardSection from './card-section.js'

class Card extends React.Component {
  render() {
    let title
    if (this.props.title) {
      title = (
        <CardSection className="primary title">
          <span className="title">
            {this.props.title}
          </span>
        </CardSection>
      )
    }
    return (
      <div
        className="CONFORM-card"
      >
        {title}
        {this.props.children}
      </div>
    )
  }
}

export default Card
