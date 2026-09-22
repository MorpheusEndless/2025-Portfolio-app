import React from 'react'
import  "./LoaderSection.css"

export const LoaderSection = () => {
  return (
    <div className="loaderWrapper">
       <div className="loader">
          <div className="loaderHeader">
             <span className="loaderPrompt">$</span>
             <span className="loaderText">Loading portfolio...</span>
          </div>
       <div className="loaderBar">
         <div className="loaderProgress"></div>
       </div>
       <div className="loaderStatus">
         <span className="loaderCursor">▌</span>
         <span className="loaderStatusText">
              Initializing components
             <span className="loaderDots"></span>
         </span>
       </div>
       </div>
   </div>
  )
}

