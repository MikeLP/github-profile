import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import {select, scaleLinear, scaleBand, max, axisLeft} from 'd3'
import debounce from 'lodash.debounce'

import style from './style.scss'

class Chart extends PureComponent {
  static propTypes = {
    data: PropTypes.array
  }

  static defaultProps = {
    data: []
  }

  /**
   *
   * @returns {number}
   */
  get width () {
    const minWidth = 320
    return this.refs.chart.offsetWidth || this.refs.chart.clientWidth || minWidth
  }

  componentDidMount () {
    this.window = select(window)
    this.display(this.props.data)
    this.window.on('resize', debounce(this.resize, 150))
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.data !== nextProps.data) {
      this.display(nextProps.data)
    }
  }

  componentWillUnmount () {
    // Remove resize callback by d3.js docs
    this.window.on('resize', null)
  }

  display (data) {
    const barHeight = 40
    const marginLeft = 180
    const marginBetween = 15
    const labelWidth = 30
    const height = data.length * barHeight + data.length * marginBetween

    const svg = select('#rChart').html(null)
      .append('svg')
      .attr('width', this.width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${marginLeft}, 0)`)

    const x = scaleLinear()
      .range([0, this.width - marginLeft - labelWidth])
      .domain([0, max(data, item => item.value)])

    const y = scaleBand()
      .domain(data.map(item => item.label))
      .rangeRound([0, height])
      .padding(0.25)

    svg.append('g')
      .attr('class', style.label)
      .call(axisLeft(y))

    const bars = svg.selectAll('.bar')
      .data(data)
      .enter()
      .append('g')

    bars.append('rect')
      .attr('class', `bar ${style.item}`)
      .attr('x', 0)
      .attr('y', item => y(item.label))
      .attr('height', barHeight)
      .attr('width', item => x(item.value))

    bars.append('text')
      .attr('class', style.label)
      // y position of the label is halfway down the bar
      .attr('y', item => y(item.label) + y.bandwidth() / 2 + 4)
      // x position is 3 pixels to the right of the bar
      .attr('x', item => x(item.value) + 3)
      .text(item => item.value)
  }

  resize = () => this.display(this.props.data)

  render () {
    return <div id='rChart' ref='chart' className={style.Chart} />
  }
}

export default Chart
