import React,{Component} from "react"
import {Footer,Content,Header} from "../components/Footer/footer"


import "./placeOrder.css"



class PlaceTop extends Component {
    render (){
        return <div id="place-box">
                <div id="place-top"> 
                <div className="pace-img">
                    <p>收获信息</p>
                    <p>
                        <em>∟</em>
                    </p>
                </div>
                
            </div>
            {/* 折扣 */}
            <div >

            </div>
            <div className="place-discount">
                <div >
                    <p><span></span></p>
                </div>
            </div>
            {/* 总计 */}
            <div className="place-footer">
                总计：￥<span></span>
            </div>
        </div>
        
    }
}



class PlacePage extends Component {
    render(){
        return <div id="place-order"> 
            <Header></Header>
            <Content>
                <PlaceTop></PlaceTop>
            </Content>
            <Footer></Footer>
        </div>
    }
}

export default PlacePage 




































