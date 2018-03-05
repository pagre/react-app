import React,{Component} from "react"
import {Header,Content} from "../../components/public"
import rem from "../../components/rem"
import ProductList from "../../components/ProductList"
import {connect} from "react-redux"


class SubHeader extends Component{
  render(){
    const {classData} = this.props
    return (
      <div className="sub-header class-list">
        <ul>
        {
          classData.map((ele,index)=>{
            return <li key={index}>{ele.class_name}</li>
          })
        }
        </ul>
      </div>
    )
  }
}

class ListPage extends Component{
  render(){
    const {listData,classData} = this.props
    return (
      <div id="list-page">
        <Header tit="列表"></Header>
        <SubHeader classData={classData}></SubHeader>
        <Content>
          <ProductList listData={listData}></ProductList>
        </Content>
     </div>
    ) 
  }
  getProductData(classID){
    fetch(`http://localhost:8000/api/product/getListData?classID=${classID}`).then(res=>res.json()).then(data=>{
    //获取到数据后，需要保存在store,派发请求 action 携带数据  
    this.props.dispatch({type:"PRO_LIST_DATA",payload:{listData:data}})
    })
  }
  getClassData(){
    fetch(`http://localhost:8000/api/class/getListData`).then(res=>res.json()).then(data=>{
      this.props.dispatch({type:"CLASS_LIST_DATA",payload:{classData:data}})
    })
  }
  componentDidMount(){
    //获取数据
    this.getProductData()
    this.getClassData()
  }
}
function mapStateToProps(state){
  //state = {listData,classData} store里面的全局状态 (全局状态)
  return {
    listData:state.listData,
    classData:state.classData
  }
}

export default connect(mapStateToProps)(ListPage)