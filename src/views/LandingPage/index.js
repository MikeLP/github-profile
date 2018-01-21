import React, {PureComponent} from 'react'

import style from './style.scss'

import Header from 'components/Header'
import Item from 'components/LandingItem'
import {Button} from 'components/UI/Buttons'

import chartIcon from './icons/pie-chart.svg'
import lineGraphIcon from './icons/line-graph.svg'
import presentationIcon from './icons/presentation.svg'

class LandingPage extends PureComponent {
  static get items () {
    return [
      {
        id: 1,
        icon: lineGraphIcon,
        title: 'Analyze Line Graphs',
        description: `A line graph, also known as a line chart, is a type of chart used to visualize the value of 
          something over time. For example, a finance department may plot the change in the amount 
          of cash the company has on hand over time.`
      },
      {
        id: 2,
        icon: chartIcon,
        title: 'Your Piece In Pie Chart',
        description: `A chart, also called a graph, is a graphical representation of data, 
          in which "the data is represented by symbols, such as bars in a bar chart, lines in a line chart,
          or slices in a pie chart". A chart can represent tabular numeric data,
          functions or some kinds of qualitative structure and provides different info.`
      },
      {
        id: 3,
        icon: presentationIcon,
        title: 'Make A Great Presentation',
        description: `A presentation is a means of communication that can be adapted to various speaking situations, 
          such as talking to a group, addressing a meeting or briefing a team. A presentation can also be 
          used as a broad term that encompasses other "speaking engagements"`
      }
    ]
  }

  render () {
    return [
      <Header absolute transparent key='header' />,
      <main key='page' styleName='LandingPage'>
        <div styleName='landing'>
          <div styleName='layer' />
        </div>
        <div className='container' styleName='welcome'>
          <section styleName='section'>
            <h1 styleName='title'>GitHub Analytics Tool</h1>
            <div styleName='items'>
              {LandingPage.items.map(item =>
                <Item
                  key={item.id}
                  icon={item.icon}
                  title={item.title}
                  description={item.description} />)}
            </div>
          </section>
          <section styleName='section'>
            <h1 styleName='title'>Service</h1>
            <Button className={style.btn} to='/profile/me' >Check My GitHub Profile</Button>
          </section>
        </div>
      </main>
    ]
  }
}

LandingPage.propTypes = {}

export default LandingPage
