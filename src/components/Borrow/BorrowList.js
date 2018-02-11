import st from '../../css/simple.css';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Select, DatePicker } from 'antd';
import moment from 'moment';

const Option = Select.Option;
const b = ' ';
const sheight = document.documentElement.clientHeight;
const swidth = document.documentElement.clientWidth;
function BorrowList({dispatch,indexs,list,index,refresh,borrowResult}) {


  function changeMoney(type){
    //记录索引
    indexs = index;
    dispatch({
      type:'borrow/indexs',
      payload:{indexs}
    });
    //，显示蒙版
    document.getElementById('borrowmoney').style.display = 'inline';
  }

  //删除
  function deletePanel(){
    if(list.length>1){
      document.getElementsByClassName('bdelBtn')[index].style.display = 'none';
      list.splice(index, 1);
      dispatch({
        type:'borrow/refresh',
        payload:{refresh}
      });
      document.getElementsByClassName('blist')[index].style.transform = 'translateX(0px)';
    }
  }
  

//借款金额
function moneyValue(proxy){
  list[index].Vorsc = proxy.target.value;
  dispatch({
    type:'borrow/refresh',
    payload:{refresh}
  });
  borrowResult = 0;
  list.map((r,i)=>{
    borrowResult += parseInt(list[i].Vorsc);
  });
  dispatch({
    type:'borrow/borrowResult',
    payload:{borrowResult}
  });
}
//汇率
function kursv(proxy){
  list[index].Kursv = proxy.target.value;
  dispatch({
    type:'borrow/refresh',
    payload:{refresh}
  });
}
//出发时间
function onBorrowChange(value, dateString) {
  list[index].borrowDate = value;
  list[index].Datvs2 = dateString + 'T00:00:00';
  dispatch({
    type:'borrow/refresh',
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
            document.getElementsByClassName('bdelBtn')[index].style.display="none";
            document.getElementsByClassName('blist')[index].style.transform = 'translateX(0px)';   //右滑收起
        }
        if(x - X > 10){   //左滑
          if(list.length>1){
            document.getElementsByClassName('bdelBtn')[index].style.display="inline";
            document.getElementsByClassName('blist')[index].style.transform = 'translateX(-70px)'; //左滑展开
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
    <div className={st.pd_0_10_10_10+b+st.cl_grey3+b+'blist'} onTouchStart={handleTouchStart.bind(this)} onTouchMove={handleTouchMove.bind(this)}>
      <div className={st.pt_relative+b+st.bg_white+b+st.pd_0_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5}>
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>借款金额</span>
          <span className={st.wd_80+b+st.hg_45+b+st.fl_lt+b+st.ta_left} style={{fontSize:14}}>
            <input className={st.wd_150+b+st.ip_no_bd+b+st.hg_43+b+st.cl_black} type='number' style={{width:(swidth-180)}} placeholder='请输入金额' value={list[index].Vorsc} onChange={moneyValue}/>
          </span>
          <span className={st.wd_30+b+st.hg_45+b+st.fl_rt+b+st.pd_15_0+b+st.cl_red+b+st.ta_right+b+st.ds_none+b+'delBtn'} style={{fontSize:12}} onClick={deletePanel}>删除</span>
        </div>
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>货币</span>
          <span onClick={changeMoney}>
            <span className={st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.cl_black} style={{fontSize:14,width:(swidth-190)}}>{list[index].WaersName}</span>
            <span className={st.wd_40+b+st.hg_45+b+st.fl_rt+b+st.pd_t_4} style={{fontSize:22}}>
              <Icon type="right" className={st.cl_grey3} style={{fontSize:16}}/>
            </span>
          </span>
        </div>
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>借款日期</span>
          <span className={st.hg_45+b+st.fl_lt+b+st.pd_6_0+b+st.ta_left}>
          <DatePicker
            format="YYYY-MM-DD"
            placeholder="选择日期"
            onChange={onBorrowChange}
            style={{width:(swidth-150)}}
            size='large'
            allowClear={false}
            value={list[index].borrowDate}
          />
          </span>
        </div>
        <div className={st.hg_45+b+st.ta_center}>
          <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>汇率</span>
          <span className={st.wd_80+b+st.hg_45+b+st.fl_lt+b+st.ta_left} style={{fontSize:14}}>
            <input className={st.ip_no_bd+b+st.hg_43+b+st.cl_black} type='number' style={{width:(swidth-150)}} placeholder='请输入汇率' value={list[index].Kursv} onChange={kursv} />
          </span>
        </div>
      </div>
      <span style={{display:'none',right:-70,top:0}} className={st.sp_width+b+st.cl_white+b+st.bg_red1+b+st.hg_182+b+st.wd_80+b+st.ta_center+b+st.pd_80_0+b+st.pt_absolute+b+'bdelBtn'} onClick={deletePanel}>
        删除
      </span>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    indexs:state.borrow.indexs,
    list:state.borrow.list,
    refresh:state.borrow.refresh,
    borrowResult:state.borrow.borrowResult,
  };
}

export default connect(mapStateToProps)(BorrowList);