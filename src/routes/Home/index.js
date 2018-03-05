import React,{Component} from "react"
import {Link} from "react-router"
import {connect} from "react-redux"
import {Header,Content} from "../../components/public"
import "./home.css"
import rem from "../../components/rem"
//导入轮播图
import SwiperComponent from "../../components/swiper/swiper" 
import SwiperComponentSmall from "../../components/swiper/swiperl" 


//------------------------------页面组件-------------------------------------------------------------
//导航栏
class SubHeader extends Component{
    state={
        classData:["男士","女士","LifeStyle"]
    }
    //点击获取分类
    handleClick(id){
        this.props.getProductData(id);
    }
    render(){    
            return (
            <div className="sub-header class-list">
                <ul>
                    {
                        this.state.classData.map((ele,index)=>{
                            return <li key={index} onClick={()=>this.handleClick(index)}><span>{ele}</span></li>
                        })
                    }
                    </ul>
                </div>
        )
    }
}
//轮播图下面的导航栏
class Nav extends Component{
    state = {
        navData:[{"a":"新品","s":"News"},
                {"a":"服装","s":"Clothes"},
                {"a":"鞋履","s":"Shoes"},
                {"a":"包袋","s":"Bags"},
                {"a":"配饰","s":"Accessories"}]
    }
    render(){
        return (
            <div className="nav">
                <ul>
                    {
                        this.state.navData.map((ele,index)=>{
                            return <li key={index}><a href="###">{ele.a}</a><span>{ele.s}</span></li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
//推荐广告组件
class IndexPubtit extends Component{
        render(){
            const {pubTit1,pubTit2} = this.props
            return (
                <div className="index_pubTit">
                    <p>{pubTit1}</p>
                    <p>{pubTit2}</p>
                </div>
            )
        }
}

//特别推荐板块
class IndexCustom extends Component{
    //图片未获取
    render(){
        return (
            <div className="index_custom">
                <IndexPubtit pubTit1="特别推荐" pubTit2="Special Offer"/>
                <ul className="index_custom_m">
                    {
                        this.props.specialofferData.map((ele,index)=>{
                            return (
                                    <li key={index}><a href="##"><img src={ele} alt="" /></a></li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}
//单品推荐板块(轮播图)
class IndexProduct extends Component{
    render(){
        console.log(this.props.mswiperData1)
        return (
            <div className="index_product">
                <IndexPubtit pubTit1="单品推荐" pubTit2="Goods Select" />
                <SwiperComponentSmall swiperDatas={this.props.mswiperData1} />
            </div>
        )
    }
}
//精选专题
class IndexBanner extends Component{
    render(){
        const imgurl = this.props.mtrendsData
            return (
                <div className="index_banner">
                     <IndexPubtit pubTit1="精选专题" pubTit2="M Trends" />
                     <div className="index_bannerimg">
                        <img src={imgurl} alt="" />
                     </div>
                </div>
            )
    }
}
//主页的一级列表
class IndexFirstList extends Component{
    render(){
        return (
                <div className="indexFirstList clearfix">
                    <ul>
                        {
                            this.props.mtrendsBottomData.map((ele,index)=>{
                               return ( 
                                <li key={index}>
                                    <a href="##"><img src={ele.url} /></a>
                                    <p>{ele.desc_1}</p>
                                    <p>{ele.desc_2}</p>
                                </li>
                               )
                            })
                        }
                    </ul>
                </div>
        )
        
    }
}

//主页的第二级列表
class IndexSecondList extends Component{
    render(){
        console.log(this.props.recommendData)
        return (
            <div className="indexSecondList clearfix">
                <ul>
                    {
                        this.props.recommendData.map((ele,index)=>{
                           return ( 
                            <li key={index}>
                                <a href="#"><img src={ele.url} /></a>
                                <p>{ele.desc_1}</p>
                                <p>{ele.desc_2}</p>
                            </li>
                           )
                        })
                    }
                </ul>
            </div>
    )
    }
}
//----------------------------------------------------------主页面-----------------------------------------
class HomePage extends Component{
    //绑定this
    constructor(props){
        super(props)
        this.getProductData = this.getProductData.bind(this);
    }
    render(){
        console.log(this.props);
        const {swiperData,specialofferData,mswiperData1,mtrendsData,mtrendsBottomData,recommendData,mswiperData2} = this.props
        return (
            <div id="home-page">
                <Header tit="美西"></Header>
                <Content>
                
                    <SubHeader getProductData = {this.getProductData}/>
                    <Link to = "/detail">
                    <div className="index_mainswiper">
                        <SwiperComponent swiperData={swiperData} />
                    </div>
                    <Nav />
                    
                        <IndexCustom specialofferData={specialofferData} />
                    
                    <IndexProduct mswiperData1={mswiperData1} />
                    <IndexBanner mtrendsData={mtrendsData}/>
                    <div className = "mzineSlider">
                        <SwiperComponentSmall swiperDatas={mswiperData2}/>
                    </div>
                    <IndexFirstList mtrendsBottomData={mtrendsBottomData} />
                    <div className="indexRecommend">
                        <IndexPubtit pubTit1="相关推荐" pubTit2="recommend" />
                        <IndexSecondList recommendData={recommendData}/>
                    </div>
                </Link>
                </Content> 
             </div>
        )
    }
    getProductData(index_id){
        fetch(`http://localhost:8000/api/home/getHomeData?index_id=${index_id}`).then(res=>res.json()).then(data=>{
        //获取到数据后，需要保存在store,派发请求 action 携带数据  
        // this.props.dispatch({type:"PRO_LIST_DATA",payload:{listData:data}})
        console.log(data);
        this.props.dispatch({type:"INDEX_SWIPER",payload:{swiperData:data[0].indexswiper_img}})
        this.props.dispatch({type:"SPECIAL_OFFER",payload:{specialofferData:data[0].specila_img}})
        this.props.dispatch({type:"MSWIPER_DATA1",payload:{mswiperData1:data[0].swiper1_desc}})
        this.props.dispatch({type:"MSWIPER_DATA2",payload:{mswiperData2:data[0].swiper2_desc}})
        this.props.dispatch({type:"MTRENDS_MAIN",payload:{mtrendsData:data[0].mtrends_main}})
        this.props.dispatch({type:"MTRENDS_BOTTOM",payload:{mtrendsBottomData:data[0].mtrends_bottom}})
        this.props.dispatch({type:"RECOMMEND",payload:{recommendData:data[0].recommend}})
        })
    }
    componentDidMount(){
        this.getProductData(0)
    }
}
//---------------------------------------------转换函数----------------------------------------------
function mapStateToProps(state){
    //获取state 将state通过connect与该函数连接并将数据传递给props
    console.log(state)
    return {
      swiperData : state.swiperData,
      specialofferData : state.specialofferData,
      mswiperData1:state.mswiperData1,
      mswiperData2:state.mswiperData2,
      mtrendsData:state.mtrendsData,
      mtrendsBottomData:state.mtrendsBottomData,
      recommendData:state.recommendData
    }
  }
export default connect(mapStateToProps)(HomePage)
