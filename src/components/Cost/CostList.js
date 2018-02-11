import st from '../../css/simple.css';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Select, DatePicker } from 'antd';
import moment from 'moment';

const Option = Select.Option;
const b = ' ';
const sheight = document.documentElement.clientHeight;
const swidth = document.documentElement.clientWidth;
function CostList({dispatch,indexs,list,index,refresh,costResult}) {

  function changeType(){
    //记录索引
    indexs = index;
    dispatch({
      type:'cost/indexs',
      payload:{indexs}
    });
    //，显示蒙版
    document.getElementById('type').style.display = 'inline';
  }
  function changeMoney(){
    //记录索引
    indexs = index;
    dispatch({
      type:'cost/indexs',
      payload:{indexs}
    });
    //，显示蒙版
    document.getElementById('money').style.display = 'inline';
  }
  //删除
  function deletePanel(){
    if(list.length>1){
      document.getElementsByClassName('cdelBtn')[index].style.display = 'none';
      list.splice(index, 1);
      dispatch({
        type:'cost/refresh',
        payload:{refresh}
      });
      document.getElementsByClassName('costlist')[index].style.transform = 'translateX(0px)';
    }
  }

  //金额
  function moneyValue(proxy){
    list[index].EstimatedCostAmount.Value = proxy.target.value;
    dispatch({
      type:'cost/refresh',
      payload:{refresh}
    });
    costResult = 0;
    list.map((r,i)=>{
      costResult += parseInt(list[i].EstimatedCostAmount.Value);
    });
    dispatch({
      type:'cost/costResult',
      payload:{costResult}
    });
  }
  //备注
  function remark(proxy){
    list[index].Description = proxy.target.value;
    dispatch({
      type:'cost/refresh',
      payload:{refresh}
    });
  }
  //出发时间
  function onCostChange(value, dateString) {
    list[index].costDate = value;
    list[index].TradeDate = dateString + 'T00:00:00';
    dispatch({
      type:'cost/refresh',
      payload:{refresh}
    });
  }
  //左滑删除，右划收起
  var x, y, X, Y, swipeX, swipeY;
  function handleTouchStart(event){
    x = event.changedTouches[0].pageX;
    y = event.changedTouches[0].pageY;
    swipeX = true;
    swipeY = true ;
  }
  function handleTouchMove(event){
      X = event.changedTouches[0].pageX;
      Y = event.changedTouches[0].pageY;     
      // 左右滑动
      if(swipeX && Math.abs(X - x) - Math.abs(Y - y) > 0){
          // 阻止事件冒泡
          event.stopPropagation();
          if(X - x > 10){   //右滑
              document.getElementsByClassName('cdelBtn')[index].style.display="none";
              document.getElementsByClassName('costlist')[index].style.transform = 'translateX(0px)';   //右滑收起
          }
          if(x - X > 10){   //左滑
            if(list.length>1){
              document.getElementsByClassName('cdelBtn')[index].style.display="inline";
              document.getElementsByClassName('costlist')[index].style.transform = 'translateX(-70px)'; //左滑展开
            }
          }
          swipeY = false;
      }
      // 上下滑动
      if(swipeY && Math.abs(X - x) - Math.abs(Y - y) < 0) {
          swipeX = false;
      }
  }
  return (
    <div className={st.pd_0_10_10_10+b+st.cl_grey3+b+'costlist'} onTouchStart={handleTouchStart.bind(this)} onTouchMove={handleTouchMove.bind(this)}>
        <div className={st.pt_relative+b+st.bg_white+b+st.pd_0_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5}>
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>费用类型</span>
            <span>
              <span className={st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.cl_black} style={{fontSize:14,width:(swidth-170)}} onClick={changeType}>{list[index].EstimatedCostCatName}</span>
              <span className={st.wd_30+b+st.hg_45+b+st.fl_rt+b+st.pd_t_4} style={{fontSize:22}} onClick={changeType}>
                <Icon type="right" className={st.cl_grey3} style={{fontSize:16}}/>
              </span>
            </span>
        </div>
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>金额</span>
            <span className={st.wd_80+b+st.hg_45+b+st.fl_lt+b+st.ta_left} style={{fontSize:14}}>
            <input className={st.ip_no_bd+b+st.hg_43+b+st.cl_black} type='number' style={{width:(swidth-150)}} placeholder='请输入金额' value={list[index].EstimatedCostAmount.Value} onChange={moneyValue}/>
            </span>
        </div>
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>货币</span>
            <span onClick={changeMoney}>
              <span className={st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.cl_black} style={{fontSize:14,width:(swidth-170)}}>{list[index].EstimatedCostAmount.CurrencyName}</span>
              <span className={st.wd_30+b+st.hg_45+b+st.fl_rt+b+st.pd_t_4} style={{fontSize:22}}>
                <Icon type="right" className={st.cl_grey3} style={{fontSize:16}}/>
              </span>
            </span>
        </div>
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>交易日期</span>
            <span className={st.hg_45+b+st.fl_lt+b+st.pd_6_0+b+st.ta_left}>
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="选择日期"
              onChange={onCostChange}
              style={{width:(swidth-150)}}
              size='large'
              allowClear={false}
              value={list[index].costDate}
            />
            </span>
        </div>
        <div className={st.hg_45+b+st.ta_center}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>备注</span>
            <textarea className={st.hg_43+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.ta_no_bd+b+st.cl_black} style={{fontSize:14,width:(swidth-150)}} placeholder='请输入备注信息' onChange={remark} value={list[index].Description}></textarea>
        </div>
        </div>
        <span style={{display:'none',right:-70,top:0}} className={st.sp_width+b+st.cl_white+b+st.bg_red1+b+st.hg_227+b+st.wd_80+b+st.ta_center+b+st.pd_100_0+b+st.pt_absolute+b+'cdelBtn'} onClick={deletePanel}>
          删除
        </span>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    indexs:state.cost.indexs,
    list:state.cost.list,
    refresh:state.cost.refresh,
    costResult:state.cost.costResult,
  };
}

export default connect(mapStateToProps)(CostList);