import React from "react"
import {Link} from "react-router"
import "./product-list.css"

const ProductList = (props)=> {
    console.log(props)
  return (<ul className="page" >
               {
                   props.pass.map((ele,index)=>{
                       return <Link key={index} to={"/detail/"+ele.pid} >
                            <img src={ele.img_url} /> 
                       </Link>
                   })
               }
        </ul>
  )
}
export default ProductList