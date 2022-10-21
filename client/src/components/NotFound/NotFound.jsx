import React from 'react'
import "./NotFound.css"

const NotFound = () => {
    
  return (
    <div className='page'>
        <div className="container">
            <div className="row">
              <div id="countUp">
                <div className="number">404</div>
                <div className="text">Page not found</div>
                <div className="text">This may not mean anything.</div>
                <div className="text">I'm probably working on something that has blown up.</div>
              </div>
            </div>
          </div>            
    </div>
  )
}

export default NotFound