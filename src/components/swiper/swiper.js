import React,{Component} from "react"

//   1导入swiper以及样式
import Swiper from "swiper"
import "swiper/dist/css/swiper.css"


//轮播图组件
class SwiperComponent extends Component{
    render(){
        return (       
        <div className="swiper-container" ref="swiper-container">
            <div className="swiper-wrapper">
            {
                this.props.swiperData.map((ele,index)=>{
                    return <div className="swiper-slide"
                     key={index}>
                     <img src={ele} alt=""/>
                     </div>
                })
            }
            </div>
            <div className="swiper-pagination"></div>
        </div>
        )
    }
    componentDidUpdate(){
        //如果有轮播数据
        if(this.props.swiperData.length){
            //如果没有创建过swiper
            if(!this.mySwiper){
                this.mySwiper = new Swiper(".prodetail .swiper-container,.index_mainswiper .swiper-container",{
                    autoplay:1000,
                    loop:true,
                    pagination:{
                        el:".swiper-pagination"
                    }
                });
            }
        }
    }   
}

export default SwiperComponent