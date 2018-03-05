import React,{Component} from "react";

import {Header,Footer,Content} from "../components/Footer/footer"
import {Link} from "react-router"
import "./my.css"





class MyImg extends Component {
    state={

    }
    render(){
        return<div id="my-box">
            <div className="my-img ">
                <div className="acc-user">
                    <img src="https://m.meici.com/static/img/acc_user.gif"/>
                </div>
                <div className="acc_info">
                    <p>1231233</p>
                    <p>欢迎您，美西普通会员</p>
                </div>
                <div className="acc_bg_mask"></div>
            </div>
            <div className="accList clearfix">
                <ul className="clearfix">
                    <li className="accList_txt">
                        <Link to={"/List/list"} className="my-link">
                           <em></em>
                            <div>
                                我的账户<br/>
                                <span>ACCOUNT</span>
                            </div>
                        </Link>
                    </li>
                    <li className="accList_order">
                        <Link to={"/List/list"} className="my-link">
                           <em></em>
                            <div>
                                我的订单<br/>
                                <span>ORDER</span>
                            </div>
                        </Link>
                    </li>
                    <li className="accList_fav">
                        <Link to={"/List/list"} className="my-link">
                           <em></em>
                            <div>
                                我的收藏<br/>
                                <span>FAVORITE</span>
                            </div>
                        </Link>
                    </li>
                    <li className="accList_coupon">
                        <Link to={"/List/list"} className="my-link">
                           <em></em>
                            <div>
                                我的优惠券<br/>
                                <span>COUPON</span>
                            </div>
                        </Link>
                    </li>
                    <li className="accList_address">
                        <Link to={"/List/list"} className="my-link">
                           <em></em>
                            <div>
                                我的地址<br/>
                                <span>ADDRESS</span>
                            </div>
                        </Link>
                    </li>
                    <li className="accList_about">
                        <Link to={"/List/list"} className="my-link">
                           <em></em>
                            <div>
                                关于美西<br/>
                                <span>ABOUT</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            <p className="my-footer clearfix">
                客服人热线：
                <img src="https://m.meici.com/static/img/phone.png"/>
                4000-250-630
            </p>
        </div>
    }
}








class MyPage extends Component {
    render(){
        return <div id="my-page">
            <Header></Header>
            <Content>
                <MyImg></MyImg>
            </Content>
            <Footer></Footer>
        </div>
    }
}

export default MyPage






