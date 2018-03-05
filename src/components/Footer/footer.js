import React,{Component} from "react";

class Footer extends Component{
    render(){
        return <div className="footer" id="footer">
            <p>
                <a>关于美西</a>
                <a>4000-250-630</a><br/>
                <span className="app"><a>美西APP</a></span>
                <a>电脑版</a><br/>
                 © 2017 MEICI.COM
            </p>
        </div>
    }
}
class Content extends Component{
    render(){
        return <div className="content">
            {this.props.children}
        </div>
    }
}
class Header extends Component {
    render(){
        return <div className="header">
            {this.props.children}
        </div>
    }
}


export {Footer,Content,Header}