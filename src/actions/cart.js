import qs from "qs"
//创建action
function actionCreator(type,fn){
    return {
      type,
      payload:fn()
    }
  }
  
//获取购物车数据
function CartListDataActionCreater(){
        //actionCreator函数只管生成action
return actionCreator("CART_LIST_DATA",async ()=>{
    //异步需要回调 同步直接等于 
    //es7的异步函数 将fetch获取的内容传给res await:等待完成 (直接.then 若未获取到数据 报错)
    const res = await fetch("http://localhost:8000/api/cart/getListData?uid=1")
    const data = await res.json()
    return {
    cartData:data
    }
})
}

//改变数量
function cartChangeNumActionCreator({cart_id,num,uid}){
    return actionCreator("CART_CHANGE_NUM",async ()=>{
        //异步数据请求
        const res = await fetch("http://localhost:8000/api/cart/changeNumber",{
            //先修改数据库在修改页面
            method:"post",
            headers:{
              "Content-Type":"application/x-www-form-urlencoded",
            },
            body:qs.stringify({
              uid:uid,
              cart_id:cart_id,
              number:num
            })
          })
          const data = await res.json();
          return {
              cart_id,
              num,
              uid
          }
    })
}

//删除购物车中的商品内容
function cartDelActionCreator({cart_id,uid}){
    return actionCreator("CART_DEL",async ()=>{
        const res = await fetch("http://localhost:8000/api/cart/removeItem",{
            method:"post",
            headers:{
              "Content-Type":"application/x-www-form-urlencoded",
            },
            body:qs.stringify({
              uid:uid,
              cart_id:cart_id
            })
          })
          var data = await res.json();
          return{
              cart_id,
              uid
          }
    })
}



  export {CartListDataActionCreater,cartChangeNumActionCreator,cartDelActionCreator}