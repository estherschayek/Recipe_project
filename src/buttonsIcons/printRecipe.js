import React,{ useRef } from 'react'
import { useReactToPrint } from 'react-to-print';
import ShowSingleRecipe from '../showSingleRecipe'

const PrintRecipe = () => {
    const componentRef = useRef();
  
    const handlePrint = useReactToPrint({
      content: () => componentRef.current
    });

  return (
    <>
  <div>
    <button onClick={handlePrint}>Print Component</button>
    <div css={{ display: 'none', '@media print': { display: 'block' } }} ref={componentRef}>
           <ShowSingleRecipe/>
    </div>
  </div>
    </>
  )
}

export default PrintRecipe
