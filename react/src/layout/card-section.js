import React from 'react'
import classNames from 'classnames'

class CardSection extends React.Component {
  static defaultProps = {
    background: 'none',
  }
  render() {
    return (
      <div className={classNames('CONFORM-card-section', this.props.className)}>
        {this.props.children}
      </div>
    )
  }
}

export default CardSection
