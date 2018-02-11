import st from '../../css/simple.css';
import TRipList from './TripList';
import STayList from './StayList';
import { Modal,Icon } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import fj from '../../assets/飞机.png';
import hc from '../../assets/火车.png';
import zc from '../../assets/租车.png';
import jd from '../../assets/酒店.png';
import ReactList from 'react-list';
const b = ' ';
const sheight = document.documentElement.clientHeight;
const swidth = document.documentElement.clientWidth;
function Trip({dispatch,tripindexs,stayindexs2,TripList,StayList,triprefresh}) {
  
  //切换tab页，酒店
  function stayClick(){
    document.getElementById("trip").style.display="none";
    document.getElementById("stay").style.display="inline";
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //切换tab页，交通
  function tripClick(){
    document.getElementById("stay").style.display="none";
    document.getElementById("trip").style.display="inline";
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }

  //添加按钮，交通
  function tripAdd(){
    if(TripList[TripList.length-1].LocationBeg == ''||TripList[TripList.length-1].LocationEnd == '' || TripList[TripList.length-1].WayName == '请选择出行方式'||TripList[TripList.length-1].DatetimeBeg2== ''){
      // Modal.info({
      //   title: '请填写完成再添加',
      // });
      // return false;
    }
    TripList.push({
      tripDate:null,//显示，出发日期
      WayName:'请选择出行方式',
      LocationBeg:'',//出发地
      LocationEnd:'',//目的地  
      LocationBegName:'请选择出发地',
      LocationEndName:'请选择目的地',
      DatetimeBeg2:'',//出发日期
      Waytype:'',//出行方式
      CountryEnd:'',//协议酒店
      Reason:'',//备注
      img:'',
      imgsrc:fj,
    });
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //添加按钮，酒店
  function stayAdd(){
    if(StayList[StayList.length-1].LocationEnd == ''||StayList[StayList.length-1].DatetimeBeg2 == '' || StayList[StayList.length-1].DatetimeBeg3 == ''){
      // Modal.info({
      //   title: '请填写完成再添加',
      // });
      // return false;
    }
    StayList.push({
      stayStartDate:null,//显示，出发日期
      stayEndDate:null,//显示，出发日期
      LocationBeg:'',//出发地
      LocationEnd:'',//入住城市  
      LocationEndNames:'入住城市',//入住城市  
      DatetimeBeg2:'',//出发日期
      DatetimeBeg3:'',//出发日期
      Waytype:'H',//出行方式
      CountryEnd:'',//协议酒店
      Reason:'',//备注
    });
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //改变出行方式
  function changeWay(way){
    TripList[tripindexs].Waytype = way;
    switch(way){
      case 'OF': TripList[tripindexs].WayName = '飞机'; TripList[tripindexs].imgsrc = fj; break;
      case 'OT': TripList[tripindexs].WayName = '火车'; TripList[tripindexs].imgsrc = hc; break;
      case 'CE': TripList[tripindexs].WayName = '租车'; TripList[tripindexs].imgsrc = zc; break;
    }
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //改变出发地
  function changeBeginLocation(key,value){
    TripList[tripindexs].LocationBeg = key;
    TripList[tripindexs].LocationBegName = value;
    closeDiv();
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //改变目的地
  function changeEndLocation(key,value){
    TripList[tripindexs].LocationEnd = key;
    TripList[tripindexs].LocationEndName = value;
    closeDiv();
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //改变入住城市
  function changeCity(key,value){
    StayList[stayindexs2].LocationEnd = key;
    StayList[stayindexs2].LocationEndNames = value;
    closeDiv();
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //查询方法出发地
  function selectBeloc(proxy){
    let beloc = document.getElementsByClassName('beloc');
    for(let i=0;i<beloc.length;i++){
      if(beloc[i].innerHTML.indexOf(proxy.target.value)>-1){
        beloc[i].style.display = 'block';
      }else{
        beloc[i].style.display = 'none';
      }
    }
  }
  //查询方法目的地
  function selectEnloc(proxy){
    let enloc = document.getElementsByClassName('enloc');
    for(let i=0;i<enloc.length;i++){
      if(enloc[i].innerHTML.indexOf(proxy.target.value)>-1){
        enloc[i].style.display = 'block';
      }else{
        enloc[i].style.display = 'none';
      }
    }
  }
  //查询方法
  function selectCity(proxy){
    let city = document.getElementsByClassName('city');
    for(let i=0;i<city.length;i++){
      if(city[i].innerHTML.indexOf(proxy.target.value)>-1){
        city[i].style.display = 'block';
      }else{
        city[i].style.display = 'none';
      }
    }
  }
  //关闭蒙版
  function closeDiv(){
    document.getElementById('way').style.display = 'none';
    document.getElementById('beloc').style.display = 'none';
    document.getElementById('enloc').style.display = 'none';
    document.getElementById('city').style.display = 'none';
  }
  
  const triprenderItem = function triprenderItem(index, key) {
    return <TRipList key={key} index={index}/>;
  }
  const stayrenderItem2 = function stayrenderItem(index, key) {
    return <STayList key={key} index={index}/>;
  }

  return (
    <div className={st.pt_relative+b+st.tp_40+b+st.wd_full+b+st.bg_white1} style={{fontSize:16,height:(sheight-40)}}>
      <div id='trip'>
        <div className={st.pt_fixed+b+st.tp_40+b+st.wd_full+b+st.zi_5}>
          <span className={st.pt_relative+b+st.zi_5+b+st.bg_white+b+st.hg_40+b+st.sp_width+b+st.wd_half+b+st.ta_center+b+st.pd_10_0+b+st.cl_blue1+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_blue1}>交通</span>
          <span className={st.pt_relative+b+st.zi_5+b+st.bg_white+b+st.hg_40+b+st.sp_width+b+st.wd_half+b+st.ta_center+b+st.pd_10_0+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1} onClick={stayClick}>住宿</span>
        </div>
        <div className={st.hg_50}/>
        <div id='tripContent'>
          <ReactList
            itemRenderer={triprenderItem}
            length={TripList.length}
            type='uniform'
          />
          <div className={st.mg_0_10+b+st.bg_white+b+st.cl_blue1+b+st.ta_center+b+st.pd_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5} style={{fontSize:14}} onClick={tripAdd}>+添加</div>
          <div className={st.hg_10}/>
        </div>
      </div>
      <div id='stay' className={st.ds_none}>
        <div className={st.pt_fixed+b+st.tp_40+b+st.wd_full+b+st.zi_5}>
          <span className={st.bg_white+b+st.hg_40+b+st.sp_width+b+st.wd_half+b+st.ta_center+b+st.pd_10_0+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1} onClick={tripClick}>交通</span>
          <span className={st.bg_white+b+st.hg_40+b+st.sp_width+b+st.wd_half+b+st.ta_center+b+st.pd_10_0+b+st.cl_blue1+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_blue1}>住宿</span>
        </div>
        <div className={st.hg_50}/>
        <div id='StayContent'>
          <ReactList
            itemRenderer={stayrenderItem2}
            length={StayList.length}
            type='uniform'
          />
        </div>
        <div className={st.mg_0_10+b+st.bg_white+b+st.cl_blue1+b+st.ta_center+b+st.pd_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5} style={{fontSize:14}} onClick={stayAdd}>+添加</div>
        <div className={st.hg_10}/>
      </div>
      <div id='way' onClick={closeDiv} className={st.pt_fixed+b+st.bg_op_black+b+st.zi_6+b+st.bg_grey1+b+st.wd_full+b+st.tp__100+b+st.lf_0+b+st.ds_none} style={{height:(sheight+100)}} >
        <div className={st.pt_fixed+b+st.bt_0+b+st.lf_0+b+st.bg_white+b+st.wd_full+b+st.cl_black}>
          <div className={st.hg_50+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1} onClick={changeWay.bind(this,'OF')}>
            <span className={st.sp_width+b+st.wd_half+b+st.ta_right+b+st.hg_50+b+st.pd_2_10_2_0}><img src={fj} className={st.wd_40}/></span>
            <span className={st.sp_width+b+st.wd_half+b+st.ta_left+b+st.hg_50+b+st.fl_rt+b+st.pd_10_0}>飞机</span>
          </div>
          <div className={st.hg_50+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1} onClick={changeWay.bind(this,'OT')}>
            <span className={st.sp_width+b+st.wd_half+b+st.ta_right+b+st.hg_50+b+st.pd_2_10_2_0}><img src={hc} className={st.wd_40}/></span>
            <span className={st.sp_width+b+st.wd_half+b+st.ta_left+b+st.hg_50+b+st.fl_rt+b+st.pd_10_0}>火车</span>
          </div>
          <div className={st.hg_50+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1} onClick={changeWay.bind(this,'CE')}>
            <span className={st.sp_width+b+st.wd_half+b+st.ta_right+b+st.hg_50+b+st.pd_2_10_2_0}><img src={zc} className={st.wd_40}/></span>
            <span className={st.sp_width+b+st.wd_half+b+st.ta_left+b+st.hg_50+b+st.fl_rt+b+st.pd_10_0}>租车</span>
          </div>
        </div>
      </div>
      <div id='beloc' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none+b+st.pt_fixed} style={{height:(sheight)}}>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
          <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
          <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-74)}}></span>
          <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>出发地</span>
        </div>
        <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectBeloc}/>
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          最近使用          
        </div>
        <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
          {
            TripList[tripindexs]?(TripList[tripindexs].LocationBegName=='请选择出发地'?'暂无':TripList[tripindexs].LocationBegName):'暂无'
          }
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          出发地
        </div>
        <div className={st.of_hi} style={{height:(sheight-222)}}>
          <div className={st.of_sc} style={{height:(sheight-222)}}>
          {
            window.app?
                window.app.mAggregations.pages["0"].oModels.queryModel.oData.CountryRegionSet.results.map((r,i)=>(
                    <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'beloc'} onClick={changeBeginLocation.bind(this,r.FullID,r.FullName)}>
                    {r.FullName}
                    </div>
                )):''
          }
          </div>
        </div>
      </div>
      <div id='enloc' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
          <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
          <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-74)}}></span>
          <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>目的地</span>
        </div>
        <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectBeloc}/>
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          最近使用          
        </div>
        <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
          {
            TripList[tripindexs]?(TripList[tripindexs].LocationEndName=='请选择目的地'?'暂无':TripList[tripindexs].LocationEndName):'暂无'
          }
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          目的地
        </div>
        <div className={st.of_hi} style={{height:(sheight-222)}}>
          <div className={st.of_sc} style={{height:(sheight-222)}}>
          {
            window.app?
            window.app.mAggregations.pages["0"].oModels.queryModel.oData.CountryRegionSet.results.map((r,i)=>(
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'beloc'} onClick={changeEndLocation.bind(this,r.FullID,r.FullName)}>
                {r.FullName}
              </div>
            )):''
          }
          </div>
        </div>
      </div>
      
      <div id='city' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
          <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
          <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-82)}}></span>
          <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>入住城市</span>
        </div>
        <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectBeloc}/>
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          最近使用
        </div>
        <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
          {
            StayList[stayindexs2]?(StayList[stayindexs2].LocationEndNames=='入住城市'?'暂无':StayList[stayindexs2].LocationEndNames):'暂无'
          }
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          入住城市
        </div>
        <div className={st.of_hi} style={{height:(sheight-222)}}>
          <div className={st.of_sc} style={{height:(sheight-222)}}>
          {
            window.app?
            window.app.mAggregations.pages["0"].oModels.queryModel.oData.CountryRegionSet.results.map((r,i)=>(
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'city'} onClick={changeCity.bind(this,r.FullID,r.FullName)}>
              {r.FullName}
              </div>
            )):''
          }
          </div>
        </div>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    tripindexs:state.trip.indexs,
    stayindexs2:state.trip.indexs2,
    TripList:state.trip.list,
    StayList:state.trip.list2,
    triprefresh:state.trip.refresh,
  };
}

export default connect(mapStateToProps)(Trip);
