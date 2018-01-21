import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './style.scss'

class LazyImage extends PureComponent {
  static propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    url: PropTypes.string.isRequired,
    circle: PropTypes.bool,
    type: PropTypes.oneOf(['contains', 'cover'])
  }

  static defaultProps = {
    type: 'cover',
    circle: false,
    url: ''
  }

  /**
   *
   * @returns {{backgroundImage: *}}
   */
  get style () {
    return {
      backgroundImage: this.props.url ? `url(${this.props.url})` : undefined
    }
  }

  /**
   *
   * @param props
   */
  constructor (props) {
    super(props)

    this.state = {
      ready: false
    }
  }

  componentDidMount () {
    this.preload(this.props.url)
  }

  componentWillUnmount () {
    if (!this.image) {
      return
    }
    this.image.onload = () => {}
    delete this.image
  }

  /**
   *
   * @param url
   */
  preload (url) {
    if (url) {
      this.image = new Image()
      this.image.onload = this.onLoad
      this.image.onerror = this.onLoad
      this.image.src = url
    }
  }

  /**
   *
   * @param nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (this.props.url !== nextProps.url) {
      this.setState({ready: false},
        () => this.preload(nextProps.url))
    }
  }

  onLoad = () => this.setState({ready: true})

  render () {
    const styleNames = classNames('LazyImage', {circle: this.props.circle})
    return (
      <div
        className={this.props.className}
        styleName={styleNames}>
        <div
          styleName={classNames('background', {loaded: this.state.ready}, this.props.type)}
          style={this.style}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default LazyImage
