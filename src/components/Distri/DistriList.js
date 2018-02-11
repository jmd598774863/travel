import st from '../../css/simple.css';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Select, DatePicker } from 'antd';
import moment from 'moment';
import ReactList from 'react-list';
const Option = Select.Option;
const b = ' ';
const sheight = document.documentElement.clientHeight;
const swidth = document.documentElement.clientWidth;

function DistriList({dispatch,indexs,list,index,refresh,itemList,distriResult}) {
 
  function changeType(){
    //记录索引
    indexs = index;
    dispatch({
      type:'distri/indexs',
      payload:{indexs}
    });
    //，显示蒙版
    document.getElementById('distritype').style.display = 'inline';
  }
  function changeDesc(){
    //记录索引
    indexs = index;
    dispatch({
      type:'distri/indexs',
      payload:{indexs}
    });
    //，显示蒙版
    document.getElementById('distridesc').style.display = 'inline';
  }
  
  //删除
  function deletePanel(){
    if(list.length>1){
      document.getElementsByClassName('ddelBtn')[index].style.display = 'none';
      list.splice(index, 1);
      itemList.splice(index, 1);
      dispatch({
        type:'distri/refresh',
        payload:{refresh}
      });
      document.getElementsByClassName('dlist')[index].style.transform = 'translateX(0px)';
    }
  }
  
  //共享
  function percentage(proxy){
    list[index].Percentage = proxy.target.value;
    dispatch({
      type:'distri/refresh',
      payload:{refresh}
    });
    checkAll();
  }

  //验证
  function checkAll(){
    let b = true;
    let count = 0;
    list.map((r,i)=>{
      if(r.CostObjectType==''||r.CostObjectId2==''){
        b = false;
      }
      count += parseInt(r.Percentage);
    });
    if(b){
      if(count==100){
        distriResult = '已分配';
      }else{
        distriResult = '共享之和需等于100';
      }
    }else{
      distriResult = '未进行成本分配';
    }
    dispatch({
      type:'distri/distriResult',
      payload:{distriResult}
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
              document.getElementsByClassName('ddelBtn')[index].style.display="none";
              document.getElementsByClassName('dlist')[index].style.transform = 'translateX(0px)';   //右滑收起
          }
          if(x - X > 10){   //左滑
            if(list.length>1){
              document.getElementsByClassName('ddelBtn')[index].style.display="inline";
              document.getElementsByClassName('dlist')[index].style.transform =  'translateX(-70px)'; //左滑展开
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
    <div className={st.pd_0_10_10_10+b+st.cl_grey3+b+'dlist'} onTouchStart={handleTouchStart.bind(this)} onTouchMove={handleTouchMove.bind(this)}>
        <div className={st.pt_relative+b+st.bg_white+b+st.pd_0_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5}>
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>成本类型</span>
            <span>
              <span className={st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.cl_black} style={{fontSize:14,width:(swidth-220)}} onClick={changeType}>{list[index].CostObjectItemName}</span>
              <span className={st.wd_40+b+st.hg_45+b+st.fl_rt+b+st.pd_t_4} style={{fontSize:22}} onClick={changeType}>
                <Icon type="right" className={st.cl_grey3} style={{fontSize:16}}/>
              </span>
            </span>
        </div>
        <div className={st.hg_45+b+st.ta_center+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>描述</span>
            <span>
              <span className={st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left+b+st.cl_black} style={{fontSize:14,width:(swidth-220)}} onClick={changeDesc}>{list[index].CostObjectName}</span>
              <span className={st.wd_40+b+st.hg_45+b+st.fl_rt+b+st.pd_t_4} style={{fontSize:22}} onClick={changeDesc}>
                <Icon type="right" className={st.cl_grey3} style={{fontSize:16}}/>
              </span>
            </span>
        </div>
        <div className={st.hg_45+b+st.ta_center}>
            <span className={st.wd_90+b+st.hg_45+b+st.fl_lt+b+st.pd_15_0+b+st.ta_left} style={{fontSize:12}}>共享</span>
            <span className={st.hg_45+b+st.fl_lt+b+st.ta_left} style={{fontSize:14}}>
              <input className={st.ip_no_bd+b+st.hg_43+b+st.cl_black} type='number' style={{width:(swidth-150)}} placeholder='请输入百分比' value={list[index].Percentage} onChange={percentage}/>
            </span>
        </div>
      </div>
      <span style={{display:'none',right:-70,top:0}} className={st.sp_width+b+st.cl_white+b+st.bg_red1+b+st.hg_137+b+st.wd_80+b+st.ta_center+b+st.pd_55_0+b+st.pt_absolute+b+'ddelBtn'} onClick={deletePanel}>
        删除
      </span>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    indexs:state.distri.indexs,
    list:state.distri.list,
    refresh:state.distri.refresh,
    itemList:state.distri.itemList,
    distriResult:state.distri.distriResult,
  };
}

export default connect(mapStateToProps)(DistriList);