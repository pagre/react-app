import React,{Component} from "react"
import {Link} from "react-router"
import {connect} from "react-redux"
import {Header,Content} from "../components/public"
import rem from "../components/rem"
import {Modal,Toast} from "antd-mobile"
import "./detail.css"
//导入轮播图
import SwiperComponent from "../../components/swiper/swiper" 
//----------------------------------页面组件-------------------------------------
//商品规格简介
class ProdetailInfo extends Component{
    render(){
        return (
            <div className="prodetailInfo">
                {
                    this.props.detailInfoData.map((ele,index)=>{
                        return (
                            <div key={index}>
                                <div className = "prodetailName">
                                    <p><span>{ele.typ}</span><span>{ele.brand}</span></p>
                                    <p><span>{ele.category}</span></p>
                                </div>
                                <div className="prodetailPrice c_purple relative">
                                    <span>{ele.price}</span>
                                    <span>
                                        <i className="iconfont icon-xiai"></i>
                                        <i>{ele.collect}</i>
                                    </span>
                                </div>
                            </div>
                        )        
                })
            }
            </div> 
        )
    }
}
//商品的颜色和尺码
class ProColorSize extends Component{
    state = {
        active : 0
    }
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(index){
        this.setState({
            active:index
        })
        console.log(this.state.active)
    }
    handleClicks(index){
        this.setState({
            actives:index
        })
    }
    render(){
        const {active,actives} = this.state
        return (
            <div className = "proColorSize">
                    <ul className = "proColor">
                        <li className="proColorName">颜色： </li>
                        <li className="proColorValue">
                            {
                            this.props.detailColorSizeData.map((ele,index)=>{
                                return (
                                    ele.color.map((eleC,indexC)=>{
                                        return (
                                            <span className={"spanbtn" + (active == indexC ? 'active' : "")} onClick={()=>this.handleClick(indexC)} key={indexC}>{eleC}</span>
                                        )
                                    })
                                )
                            })
                        }
                        </li>
                    </ul>
                    <ul className = "proSize">
                        <li className="proSizeName">尺码： </li>
                        <li className="proSizeValue">
                            {
                            this.props.detailColorSizeData.map((ele,index)=>{
                                return (
                                    ele.size.map((eleS,indexS)=>{
                                        return (
                                            <span className={"spanbtn" + (actives == indexS ? 'active' : "")} onClick={()=>this.handleClicks(indexS)} key={indexS}>{eleS}</span>
                                        )
                                    })
                                )
                            })
                        }
                    </li>
                    </ul>                    
            </div>
        )
    }
}
//标题
class ProinfoTit extends Component{
    render(){
         return (
            <div className="proinfotit">
                {this.props.tit}
            </div>
        )
    }
}
//商品规格展示区域
class ProInfo extends Component{
    render(){
        return (
            <ul className="proinfoData">
                {
                    this.props.detailListData.map((ele,index)=>{
                        return (
                        <li key={index}>{ele}</li>
                        )
                    })
                }
            </ul>
        )
    }
}
//商品详情展示
class ProIntro extends Component{
    render(){
        return (
            <div className="intro-img">
                {
                    this.props.detailimgListData.map((ele,index)=>{
                        return <img key={index} src={ele} alt="" /> 
                    })
                }
            </div>
        )
    }
}
//商品推广区域
class ProBrand extends Component{
    render(){
        return (
             <div className="probrand">
                <img src={this.props.detailLogoData.logoImg} alt="" />
                <p>{this.props.detailLogoData.logoSize}</p>
            </div>
        )
    }
}
//详情页底部购买区域
class DetailFooter extends Component{
    render(){
        var uid = 1;
        var pid = 6;
        return(
            <div className="detailFooter">
                <div className="detailfooter-left">
                    <div>
                    <i className="iconfont icon-rentou"></i>
                    </div>
                    <div>
                    <i className="iconfont icon-rentou"></i>
                    </div>
                    <div>
                    <i className="iconfont icon-rentou"></i>
                    </div>
                </div>
                <div className="detailfooter-right">
                    <button onClick={()=>this.addCart(uid,pid)} className="addcart" >加入购物袋</button>
                    <button className="rightbuy" >立即购买</button>
                </div>
            </div>
        )
    }
    addCart(uid,pid){
        fetch(`http://localhost:8000/api/cart/add?uid=${uid}&pid=${pid}`).then(res=>res.json()).then(data=>{
            console.log(data);
        })
        Modal.alert("提示","",[
            {
              text:"添加成功"
            }
          ])
    }
}


//--------------------------------------主页面--------------------------------------------
class DetailPage extends Component{
    render(){
        const {detailSwiperData,detailimgListData,detailLogoData,detailInfoData,detailColorSizeData,detailListData} = this.props
        return (
            <div id = "detail-page">
                <Header tit="美西" />
                <Content>
                    <div className = "prodetail">
                        <SwiperComponent swiperData={detailSwiperData} />
                    </div>
                    <ProdetailInfo detailInfoData={detailInfoData}/>
                    <ProColorSize detailColorSizeData={detailColorSizeData}/>
                    <div className="detail-info">
                        <ProinfoTit tit="商品尺码 SIZE"/>
                        <ProInfo  detailListData={detailListData}/>
                    </div>
                    <div className="detail-prointro">
                        <ProinfoTit tit="商品介绍 INTRO"/>
                        <ProIntro detailimgListData={detailimgListData}/>
                    </div>
                    <div className="detail-probrand">
                        <ProinfoTit tit="Prada 普拉达"/>
                        <ProBrand detailLogoData={detailLogoData}/>
                    </div>
                    <DetailFooter />
                </Content>
            </div>
        )
    }
    getDetailData(){
        fetch(`http://localhost:8000/api/product/getDetailData?pid=1`).then(res=>res.json()).then(data=>{
            var desc = JSON.parse(data.desc)
            //派发轮播图action
            this.props.dispatch({type:"DETAIL_INFODATA",payload:{detailInfoData:desc[0].name}})
            //派发size和color
            this.props.dispatch({type:"DETAIL_COLORSIZEDATA",payload:{detailColorSizeData:desc[1].poroColorSizeData}})
            //商品的价格规格简介
            this.props.dispatch({type:"DETAIL_SWIPERDATA",payload:{detailSwiperData:data.img_list}})
            //商品的具体详情
            this.props.dispatch({type:"DETAIL_LISTDATA",payload:{detailListData:desc[2].listName}})
            //派发详情图片
            this.props.dispatch({type:"DETAIL_IMGLIST",payload:{detailimgListData:desc[3].img}})
            //派发品牌介绍
             this.props.dispatch({type:"DETAIL_LOGO",payload:{detailLogoData:desc[4].logo}})
        })
    }
    componentDidMount(){
        //获取商品的数据详情
        var pid = this.props.params.id;
         this.getDetailData()
    }
}
function mapStateToProps(state){
    return{
        detailSwiperData:state.detailSwiperData || [],
        detailimgListData:state.detailimgListData || [],
        detailLogoData:state.detailLogoData || [],
        detailInfoData:state.detailInfoData || [],
        detailColorSizeData:state.detailColorSizeData || [],
        detailListData:state.detailListData || []
    }
}
export default connect(mapStateToProps)(DetailPage)





