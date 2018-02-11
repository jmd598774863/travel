import st from '../../css/simple.css';
import cost from '../../assets/费用估算.png';
import borrow from '../../assets/借款金额.png';
import distri from '../../assets/成本分配.png';
import { Icon } from 'antd';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
function CostPanel({dispatch,title,detail,costshow}) {
    const b = ' ';
    const sheight = document.documentElement.clientHeight;
    const swidth = document.documentElement.clientWidth;
    function costClick(){
        costshow = !costshow;
        dispatch({
            type:'reportinfo/costshow',
            payload:{costshow}
        });
    }
    return (
        <div className={st.bg_blue1+b+st.pd_5_10}>
            <div className={st.bg_white+b+st.pt_relative+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5}>
                <img onClick={costClick} src={cost} className={st.wd_40+b+st.hg_40+b+st.mg_5}/>
                <span className={st.pt_absolute+b+st.bt_25} style={{fontSize:15}}><b>{title}</b></span>
                <span className={st.pt_absolute+b+st.bt_10+b+st.lt_30+b+st.cl_grey2} style={{fontSize:12}}>
                    {detail}
                </span>
                <Icon className={st.pt_absolute+b+st.tp_20+b+st.rt_10+b+st.cl_grey1} style={{fontSize:20}} type="right"/>
            </div>
        </div>
    );
}
function mapStateToProps(state) {
    return {
     costshow:state.reportinfo.costshow
    };
  }
export default connect(mapStateToProps)(CostPanel);
