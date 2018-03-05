import {createStore,applyMiddleware} from "redux";
import reduxPromise from "redux-promise"
import {createStore,applyMiddleware} from "redux"
import reduxPromise from "redux-promise"
const reducer =(state={
    listData:[
        "新品",
        "热门",
        "价格",
        "筛选"
    ],
    classData:[1,2,3],
    pass:[1,2,3] ,
    pid:[1,2,3,4]
},action)=>{
    switch(action.type){
        case "CLASS_DATA":
        var newState = JSON.parse(JSON.stringify(state))
        newState.classData =action.payload.classData
        return newState;
        case "PA_SS":
        var newState = JSON.parse(JSON.stringify(state))
        if(action.payload.more){
            newState.pass = newState.pass.concat(newState.pass)
        }else{
            newState.pass = action.payload.pass
        }
       
        return newState
        case "P_I_D":
        var newState = JSON.parse(JSON.stringify(state))
        newState.pid = action.payload.pid
        return newState
        default:
        return state
        

    }
}
const store = createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),applyMiddleware(reduxPromise))
export default store