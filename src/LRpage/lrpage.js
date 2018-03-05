import React,{Component} from "react"
import { NavBar, Icon,Button,WingBlank,List,InputItem,WhiteSpace} from 'antd-mobile';


class Lrpage extends Component {
        state = {
          hasError: false,
          value: '',
        }
        onErrorClick = () => {
          if (this.state.hasError) {     
          }
        }
        onChange = (value) => {
          if (value.replace(/\s/g, '').length < 11) {

            this.setState({
              hasError: true,
            });
          } else {
            this.setState({
              hasError: false,
            });
          }
          this.setState({
            value,

          });
        }
    render (){
        return (
          <div>
             <List> 
                <WingBlank>
                    <InputItem
                        placeholder="手机号/邮箱"
                        onChange={this.onChange} 
                        value={this.state.value}
                        ref="user-name"
                    ><em className="iconfont icon-wode1 lrpage-em"></em>
                    </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                <WhiteSpace size="lg" />
                <WingBlank>
                    <InputItem
                        placeholder="请输入密码"
                        ref="user-pass"
                    ><em className="iconfont icon-mima lrpage-em"></em>
                    </InputItem>
                </WingBlank>
                <WhiteSpace size="lg" />
                
              </List>
            
          </div>
        )
      }
}
export default Lrpage