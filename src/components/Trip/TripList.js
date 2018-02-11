import st from '../../css/simple.css';
import fj from '../../assets/飞机.png';
import hc from '../../assets/火车.png';
import zc from '../../assets/租车.png';
import jd from '../../assets/酒店.png';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Select, DatePicker } from 'antd';
import moment from 'moment';
const sheight = document.documentElement.clientHeight;
const swidth = document.documentElement.clientWidth;
const Option = Select.Option;
const b = ' ';
function TripList({dispatch,indexs,list,index,refresh,imgsrc}) {

  //目的地
  function endHandleChange(value) {
    list[index].LocationEnd = value;
    dispatch({
      type:'trip/refresh',
      payload:{refresh}
    });
  }
  //出发地
  function recordBegin(){
    //记录索引
    indexs = index;
    dispatch({
      type:'trip/indexs',
      payload:{indexs}
    });
    //，显示蒙版
    document.getElementById('beloc').style.display = 'inline';
  }
  //目的地
  function recordEnd(){
    //记录索引
    indexs = index;
    dispatch({
      type:'trip/indexs',
      payload:{indexs}
    });
    //，显示蒙版
    document.getElementById('enloc').style.display = 'inline';
  }
  //出行方式
  function changeWay(){
    //记录索引
    indexs = index;
    dispatch({
      type:'trip/indexs',
      payload:{indexs}
    });
    //，显示蒙版
    document.getElementById('way').style.display = 'inline';
  }

  //删除
  function deletePanel(){
    if(list.length>1){
      document.getElementsByClassName('delBtn')[index].style.display = 'none';
      list.splice(index, 1);
      dispatch({
        type:'trip/refresh',
        payload:{refresh}
      });
      document.getElementsByClassName('triplist')[index].style.transform = 'translateX(0px)';
    }
  }
  
  //出发时间
  function onTripChange(value, dateString) {
    list[index].tripDate = value;
    list[index].DatetimeBeg2 = dateString + 'T00:00:00';
    dispatch({
      type:'trip/refresh',
      payload:{refresh}
    });
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
              document.getElementsByClassName('delBtn')[index].style.display="none";
              document.getElementsByClassName('triplist')[index].style.transform = 'translateX(0px)';
          }
          if(x - X > 10){   //左滑
            if(list.length>1){
              document.getElementsByClassName('delBtn')[index].style.display="inline";
              document.getElementsByClassName('triplist')[index].style.transform = 'translateX(-70px)';
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
    <div className={st.pd_0_10_10_10+b+st.cl_grey3+b+'triplist'} onTouchStart={handleTouchStart.bind(this)} onTouchMove={handleTouchMove.bind(this)}>
      <div className={st.pt_relative+b+st.wd_full+b+st.bg_white+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5+b+st.pd_0_10}>
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_5_0+b+st.ta_left} style={{fontSize:12}}>
            <img src={list[index].imgsrc} className={st.wd_30+b+st.fl_lt}/>
          </span>
          <span onClick={changeWay.bind(this)}>
            <span className={st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.cl_grey3_65} style={{fontSize:14,width:(swidth-170)}} >{list[index].WayName}</span>
            <span className={st.wd_30+b+st.hg_45+b+st.fl_rt+b+st.pd_t_4} style={{fontSize:22}} >
              <Icon type="right" className={st.cl_grey3} style={{fontSize:16}}/>
            </span>
          </span>
        </div> 
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>出发地</span>
          <span onClick={recordBegin}>
            <span className={st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.cl_grey3_65} style={{fontSize:14,width:(swidth-170)}} >{list[index].LocationBegName}</span>
            <span className={st.wd_30+b+st.hg_45+b+st.fl_rt+b+st.pd_t_4} style={{fontSize:22}} >
              <Icon type="right" className={st.cl_grey3} style={{fontSize:16}}/>
            </span>
          </span>
        </div> 
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>目的地</span>
          <span onClick={recordEnd}>
            <span className={st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.cl_grey3_65} style={{fontSize:14,width:(swidth-170)}} >{list[index].LocationEndName}</span>
            <span className={st.wd_30+b+st.hg_45+b+st.fl_rt+b+st.pd_t_4} style={{fontSize:22}} >
              <Icon type="right" className={st.cl_grey3} style={{fontSize:16}}/>
            </span>
          </span>
        </div> 
        <div className={st.hg_45+b+st.ta_center}>
          <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>出发日期</span>
          <span className={st.hg_45+b+st.fl_lt+b+st.pd_6_0} style={{fontSize:14}}>
            <DatePicker
              format="YYYY-MM-DD"
              placeholder="选择日期"
              onChange={onTripChange}
              style={{width:(swidth-140)}}
              size='large'
              allowClear={false}
              value={list[index].tripDate}
            />
          </span>
        </div>
      </div>
      <span style={{display:'none',right:-70,top:0}} className={st.sp_width+b+st.cl_white+b+st.bg_red1+b+st.hg_182+b+st.wd_80+b+st.ta_center+b+st.pd_80_0+b+st.pt_absolute+b+'delBtn'} onClick={deletePanel}>
        删除
      </span>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    indexs:state.trip.indexs,
    list:state.trip.list,
    refresh:state.trip.refresh,
  };
}

export default connect(mapStateToProps)(TripList);