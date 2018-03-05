import React,{Component} from "react"
import {Link} from "react-router"
import {Footer,Content} from "../components/Footer/footer"
import {Header} from "../components/public"
import ProductList from "../components/ProductList/index"
import { PullToRefresh, ListView, Button } from 'antd-mobile';
import {connect} from "react-redux"



import "./list.css"
import qs from "qs"
class NavPage extends Component {
    getListData(index){
        this.props.getProductData(index)
    }
    render(){
        return <div id="nav-page">
                {
                    this.props.listData.map((ele,index)=>{
                        return <li className="list-nav" key={index} onClick={()=>this.getListData(index)}>{ele}</li>
                    })
                } 
        </div>
    }
}
// 返回顶部
class  BackTop extends Component {
    
    render(){
        return <div id="back-top" href="#">
            <div className="iconfont icon-fanhuidingbu top" >
            </div>
        </div>
    }
}


class ListPage extends Component {
    constructor(props){
        super(props)
        this.getProductData=this.getProductData.bind(this)
        this.getClassData=this.getClassData.bind(this)
        this.getProductPid=this.getProductPid.bind(this)
        const ds = new ListView.DataSource({
            rowHasChanged:(row1,row2)=>row1!==row2,
        });
        this.state = {
            height:document.documentElement.height+"px",
            isLoading:true,
            dataSource:ds.cloneWithRows([]),
            PageIndex:1
        }
    } 
    render(){
        const {listData,pass,classData} =this.props
        console.log(this.props.listData)
        const dataSource = this.state.dataSource.cloneWithRows(pass)
        console.log(dataSource)
        return <div id="list-page">
            <Header></Header>
            <NavPage 
            getProductData={this.getProductData}
            listData={listData}
            ></NavPage>
            <Content>
                
            <ListView
                className="list-wrap"
                dataSource={dataSource}
                renderRow={(rowData,sIndex,rowIndex)=><div className="indexSecondList "
                >
                <ul >
                    <Link to={"/detail/"+rowData.pid}> 
                        <li key={rowIndex}>
                            <Link><img src={rowData.img_url} /></Link>
                            <p>{rowData.p_name}</p>
                            <p>￥{rowData.price}</p>
                        </li>
                    </Link>
                </ul>
            </div>}
                className="am-list"
                /* pageSize={4} */
                useBodyScroll
                /* onScroll={() => { console.log('scroll'); }} */
                scrollRenderAheadDistance={800}
                onEndReachedThreshold={10}
                onEndReached={()=>this.loadMore()}
                horizontal={true}
            > 
            </ListView>
            </Content>
            <BackTop></BackTop>
            <Footer></Footer>
        </div>
    }
    loadMore(){
        console.log("到底了")
        // this.getClassData(true)
    }

    getProductData(id){
        console.log(id)
        fetch("http://localhost:8000/api/product/getListData?pageSize=10?classID="+id).then(res=>res.json()).then(data=>{
            console.log(data);
            this.props.dispatch({type:"CLASS_DATA",payload:{classData:data}})
            console.log(this.state)
        })
    }
    getClassData(more){
        if(more){
            this.state.PageIndex++ //改变state页面不会更新
          }else{
            this.state.PageIndex = 1
          }
        fetch("http://localhost:8000/api/product/getListData?pageSize=10").then(res=>res.json()).then(data=>{
            console.log(data);
            this.props.dispatch({type:"PA_SS",payload:{pass:data,more}})
            // this.setState({
            //     pass:data
            // })
        })
    }
    getProductPid(pid){
        console.log(pid)
        fetch("http://localhost:8000/api/product/getListData?pageSize=10?pid="+pid).then(res=>res.json()).then(data=>{
            console.log(data);
            this.props.dispatch({type:"P_I_D",payload:{pid:data}})
            // this.setState({
            //     pid:data
            // })
        })
    }
    componentDidMount(){
        //  获取数据
         this.getProductData(0);
         this.getClassData()
         this.getProductPid(1)
     }

    
} 
function mapStateToProps(state){
         return{
             listData:state.listData,
             classData:state.classData,
             pass:state.pass,
             pid:state.pid
         }
     }

export default connect(mapStateToProps)(ListPage)






























