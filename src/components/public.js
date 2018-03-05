import React,{Component} from "react"
import {Link} from "react-router"
import "./public.css"
import "./iconfont/iconfont.css"
import "./rem"

class Header extends Component {
    render(){
        const {hasBack,tit,rightBtn} = this.props;
        return <div className="header">
            <ul>
                <li className="header-btn">
                   <i className="iconfont icon-caidan"></i>              
                </li>
                <li className="header-tit">{tit}</li>
                <li className="header-btn">
                    <Link to = "/cart">
                        <i className="iconfont icon-iconset0316"></i>
                    </Link>
                    <i className="iconfont icon-rentou"></i>  
                </li>
            </ul>
        </div>
    }
}

class Content extends Component {
    render(){
        return <div className="content clearfix">{this.props.children}</div>
    }
}
//暴露多个组件
export {Header,Content}