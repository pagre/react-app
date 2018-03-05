import React,{Component} from "react"

//   1导入swiper以及样式
import Swiper from "swiper"
import "swiper/dist/css/swiper.css"


class SwiperComponentSmall extends Component{
    render(){
            return (       
            <div className="swiper-container" ref="swiper-container">
                <div className="swiper-wrapper">
                {
                    this.props.swiperDatas.map((ele,index)=>{
                        return <div className="swiper-slide" key={index}>
                            <img src={ele.url} alt=""/>
                            <p>{ele.p_name}</p>
                            <p>{ele.price}</p>                 
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
        if(this.props.swiperDatas.length){
            //如果没有创建过swiper
            if(!this.mySwiper){
                this.mySwiper = new Swiper(".mzineSlider .swiper-container,.index_product .swiper-container",{
                    slidesPerView: 4,
                    paginationClickable: true,
                    pagination: '.swiper-pagination',
                    centeredSlides: true,
                    spaceBetween: 20
                });
            }
        }
    }   
}
export default SwiperComponentSmall