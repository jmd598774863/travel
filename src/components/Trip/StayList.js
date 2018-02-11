import st from '../../css/simple.css';
import fj from '../../assets/飞机.png';
import hc from '../../assets/火车.png';
import zc from '../../assets/租车.png';
import jd from '../../assets/酒店.png';
import { Icon, Select, DatePicker } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import moment from 'moment';
const { RangePicker } = DatePicker;
const Option = Select.Option;
const b = ' ';
const sheight = document.documentElement.clientHeight;
const swidth = document.documentElement.clientWidth;
function StayList({dispatch,indexs2,list2,index,refresh}) {
  
  function onStayStartChange(value, dateString) {
    list2[index].stayStartDate = value;
    list2[index].DatetimeBeg2 = dateString + 'T00:00:00';
    dispatch({
      type:'trip/refresh',
      payload:{refresh}
    });
  }

  function onStayEndChange(value, dateString) {
    list2[index].stayEndDate = value;
    list2[index].DatetimeBeg3 = dateString + 'T00:00:00';
    dispatch({
      type:'trip/refresh',
      payload:{refresh}
    });
  }

  //删除相关
  function deletePanel(){
    if(list2.length>1){
      document.getElementsByClassName('del2Btn')[index].style.display = 'none';
      list2.splice(index, 1);
      dispatch({
        type:'trip/refresh',
        payload:{refresh}
      });
      document.getElementsByClassName('staylist')[index].style.transform = 'translateX(0px)';
    }
  }
  
  //协议酒店
  function hotel(proxy){
    list2[index].CountryEnd = proxy.target.value;
    dispatch({
      type:'trip/refresh',
      payload:{refresh}
    });
  }
  //备注
  function remark(proxy){
    list2[index].Reason = proxy.target.value;
    dispatch({
      type:'trip/refresh',
      payload:{refresh}
    });
  }
  //入住城市
  function hotelCity(){
      //记录索引
    indexs2 = index;
    dispatch({
      type:'trip/indexs2',
      payload:{indexs2}
    });
    //，显示蒙版
    document.getElementById('city').style.display = 'inline';
  }
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
          if(X - x > 10){   //右滑
              document.getElementsByClassName('del2Btn')[index].style.display="none";
              document.getElementsByClassName('staylist')[index].style.transform = 'translateX(0px)';   //右滑收起
          }
          if(x - X > 10){   //左滑
            if(list2.length>1){
              document.getElementsByClassName('del2Btn')[index].style.display="inline";
              document.getElementsByClassName('staylist')[index].style.transform = 'translateX(-70px)'; //左滑展开
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
      <div className={st.pd_0_10_10_10+b+st.cl_grey3+b+'staylist'} onTouchStart={handleTouchStart.bind(this)} onTouchMove={handleTouchMove.bind(this)}>
        <div className={st.pt_relative+b+st.bg_white+b+st.pd_0_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5}>
          <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_5_0+b+st.ta_left} style={{fontSize:12}}>
              <img src={jd} className={st.wd_30+b+st.fl_lt}/>
            </span>
            <span onClick={hotelCity}>
              <span className={st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.cl_grey3_65} style={{fontSize:14,width:(swidth-170)}} >{list2[index].LocationEndNames}</span>
              <span className={st.wd_30+b+st.hg_45+b+st.fl_rt+b+st.pd_t_4} style={{fontSize:22}} >
                <Icon type="right" className={st.cl_grey3} style={{fontSize:16}}/>
              </span>
            </span>
          </div>
          <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>开始日期</span>
            <span className={st.hg_45+b+st.fl_lt+b+st.pd_6_0} style={{fontSize:14}}>
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="选择日期"
                onChange={onStayStartChange}
                style={{width:(swidth-140)}}
                size='large'
                allowClear={false}
                value={list2[index].stayStartDate}
              />
            </span>
          </div>
          <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>结束日期</span>
            <span className={st.hg_45+b+st.fl_lt+b+st.pd_6_0} style={{fontSize:14}}>
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="选择日期"
                onChange={onStayEndChange}
                style={{width:(swidth-140)}}
                size='large'
                allowClear={false}
                value={list2[index].stayEndDate}
              />
            </span>
          </div>
          <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>公司协议酒店</span>
            <input className={st.ip_no_bd+b+st.hg_43+b+st.fl_lt+b+st.cl_black} type='text' style={{width:(swidth-150),fontSize:14}} placeholder='( 选填 ) 请输入酒店' value={list2[index].CountryEnd} onChange={hotel}/>
          </div>
          <div className={st.hg_45+b+st.ta_center}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>备注</span>
            <span>
            <textarea className={st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.ta_no_bd+b+st.cl_black} style={{width:(swidth-150),fontSize:14}} placeholder='( 选填 ) 400字以内' value={list2[index].Reason} onChange={remark}></textarea>
            </span>
          </div>
        </div>
        <span style={{display:'none',right:-70,top:0}} className={st.sp_width+b+st.cl_white+b+st.bg_red1+b+st.hg_227+b+st.wd_80+b+st.ta_center+b+st.pd_100_0+b+st.pt_absolute+b+'del2Btn'} onClick={deletePanel}>
          删除
        </span>
      </div>
  );
}
function mapStateToProps(state) {
  return {
    indexs2:state.trip.indexs2,
    list2:state.trip.list2,
    refresh:state.trip.refresh,
  };
}

export default connect(mapStateToProps)(StayList);
