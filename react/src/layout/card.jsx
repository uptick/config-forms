import React from 'react'
import CardSection from './card-section.jsx'

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
        <div>
          {title}
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Card
