import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,hashHistory} from "react-router"
import fetchJsonp from "fetch-jsonp"
import {Provider} from "react-redux"
import store from "./store/store"




import HomePage from "./routes/Home"
import DetailPage from "./routes/Detail"
// import CartPage from "./routes/Cart"



import ListPage from "./List/list"
import MyPage from "./My/my"
import PlacePage from "./placeOrder/placeOrder"
import "./components/iconfont/iconfont.css"


import "./components/Footer/footer.css"
import "./LRpage/font_huz51z53l8cwhfr/iconfont.css"


ReactDOM.render(<Provider store={store}>
  <Router history={hashHistory}>
    <Route path="/List/list" component={ListPage}></Route>
    <Route path="/My/my" component={MyPage}></Route>
    <Route path="/placeOrder/placeOrder" component={PlacePage}></Route>
    <Route path="/" component={HomePage} />
    <Route path="/detail(/:id)" component={DetailPage} />
    {/* <Route path = "/cart" component = {CartPage} /> */}
  </Router>
  </Provider>,document.getElementById("root"))