import React from 'react'

import './style.scss'

const Footer = () => {
  return (
    <footer styleName='Footer'>
      <div styleName='title'>Technologies Used</div>
      <div styleName='icons' className='container'>
        <div styleName='item'>
          <div styleName='icon github' />
          <span styleName='label'>GitHub</span>
        </div>
        <div styleName='item'>
          <div styleName='icon graphql' />
          <span styleName='label'>GraphQL</span>
        </div>
        <div styleName='item'>
          <div styleName='icon react' />
          <span styleName='label'>React</span>
        </div>
        <div styleName='item'>
          <div styleName='icon redux' />
          <span styleName='label'>Redux</span>
        </div>
        <div styleName='item'>
          <div styleName='icon webpack' />
          <span styleName='label'>Webpack</span>
        </div>
        <div styleName='item'>
          <div styleName='icon d3' />
          <span styleName='label'>D3</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
