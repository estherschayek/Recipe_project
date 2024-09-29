
import React,{useState,useEffect,Fragment} from 'react'
import {useSelector,useDispatch} from 'react-redux'

import {AllBayByUser} from '../store/actions/actionBay'
import DeleteFromBay from './deleteFromBay'
import  './show.css'



const Bay = (funShow) => {

  const dispatch=useDispatch();
  const currentUserId=useSelector((state)=>state.user.user.Id)
   const bayList=useSelector((state)=>state.bayUser.bayUser)

  useEffect(() => {
    dispatch(AllBayByUser(currentUserId));
  }, [funShow]);

  const shopList=useSelector((state)=>state.bayUser.bayUser)
  


  return (
    <>
      
      {shopList?
      <Fragment>
        <table class="shopping-table">
          <thead>
            <tr>
              <th>מחיקת המוצר</th>
              <th>כמות רצויה</th>
              <th>שם המוצר</th>
            </tr>
          </thead>
          <tbody>
            {shopList.map((item)=><tr>
              <td><DeleteFromBay item={item.Id} itemName={item.Name}/></td>
              <td>{item.Count}</td>
              <td>{item.Name}</td>
            </tr>)}
          </tbody>
        </table>
        </Fragment>:<Fragment>
        </Fragment>}
    </>
  )
}

export default Bay