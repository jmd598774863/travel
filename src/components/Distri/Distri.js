import st from '../../css/simple.css';
import ReactList from 'react-list';
import { connect } from 'dva';
import { Modal,Icon } from 'antd';
import { routerRedux } from 'dva/router';
import DIstriList from './DistriList';
const b = ' ';
const sheight = document.documentElement.clientHeight;
const swidth = document.documentElement.clientWidth;
function Distri({dispatch,distriindexs,DistriList,distrirefresh,itemList,distriResult}) {
  
  const distrirenderItem = function distrirenderItem(index, key) {
    return <DIstriList key={key} index={index}/>;
  }
  
  function distriAdd(){
    if(DistriList[DistriList.length-1].CostObjectType == ''||DistriList[DistriList.length-1].CostObjectId2 == ''){
      // Modal.info({
      //   title: '请填写完成再添加',
      // });
      // return false;
    }
    DistriList.push({
      CostObjectId2:'',//描述Id
      CostObjectItemId:'',
      CostObjectItemName:'请选择',//类型名称
      CostObjectName:'请选择',//描述
      CostObjectType:'',//类型Id
      Percentage:''//共享
    });
    itemList.push([{
      itemKey:'',
      itemName:'请选择',
    }]);
    dispatch({
      type:'distri/refresh',
      payload:{distrirefresh}
    });
  }
  function changeDistriType(type,typeName){
    DistriList[distriindexs].CostObjectType =type;
    DistriList[distriindexs].CostObjectItemName = typeName;
    DistriList[distriindexs].CostObjectId2 ='';
    DistriList[distriindexs].CostObjectName = '请选择';
    closeDiv();
    // dispatch({
    //   type:'distri/refresh',
    //   payload:{distrirefresh}
    // });
    if(window.app){
      window.app.mAggregations.pages["0"].oController.loadCostData(type);
      let promise = new Promise(
        function(resolve, reject) {
          if(window.app.mAggregations.pages["0"].oController.SorE === 'S'){
           itemList[distriindexs].splice(0,itemList[distriindexs].length);
           window.app.mAggregations.pages["0"].oModels.queryModel.oData.costItemSet.results.forEach((r,i)=>{
             itemList[distriindexs].push({
               itemKey:r.CostObjectID,
               itemName:r.Description,
             });
           });
           dispatch({
             type:'distri/refresh',
             payload:{distrirefresh}
           });
           resolve();
          }else if(window.app.mAggregations.pages["0"].oController.SorE === 'E'){
             reject();
          }
        }, 
        100
      );
    }    
  }
  //验证
  function checkAll(){
    let b = true;
    let count = 0;
    DistriList.map((r,i)=>{
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
  //关闭按钮
  function closeDiv(){
    document.getElementById('distritype').style.display = 'none';
    document.getElementById('distridesc').style.display = 'none';
  }
  //描述
  function changeDesc(key,name){
    DistriList[distriindexs].CostObjectId2 = key;
    DistriList[distriindexs].CostObjectName = name;
    closeDiv();
    dispatch({
      type:'distri/refresh',
      payload:{distrirefresh}
    });
    checkAll();
  }
  //查询方法
  function selectDistriType(proxy){
    let type = document.getElementsByClassName('type');
    for(let i=0;i<type.length;i++){
      if(type[i].innerHTML.indexOf(proxy.target.value)>-1){
        type[i].style.display = 'block';
      }else{
        type[i].style.display = 'none';
      }
    }
  }
  //查询方法
  function selectDistriDesc(proxy){
    let desc = document.getElementsByClassName('desc');
    for(let i=0;i<desc.length;i++){
      if(desc[i].innerHTML.indexOf(proxy.target.value)>-1){
        desc[i].style.display = 'block';
      }else{
        desc[i].style.display = 'none';
      }
    }
  }
  return (
    <div className={st.bg_white1} style={{fontSize:16,height:sheight}}>
      <div className={st.hg_50}/>
      <ReactList
        itemRenderer={distrirenderItem}
        length={DistriList.length}
        type='uniform'
      />
      <div className={st.mg_0_10+b+st.bg_white+b+st.cl_blue1+b+st.ta_center+b+st.pd_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5} style={{fontSize:14}} onClick={distriAdd}>+添加</div>
      <div className={st.hg_10}/>
      <div id='distritype' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
          <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
          <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-82)}}></span>
          <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>成本类型</span>
        </div>
        <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectDistriType}/>
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          最近使用          
        </div>
        <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
          {
            DistriList[distriindexs]?(DistriList[distriindexs].CostObjectItemName=='请选择'?'暂无':DistriList[distriindexs].CostObjectItemName):'暂无'
          }
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
        成本类型
        </div>
        <div className={st.of_hi} style={{height:(sheight-222)}}>
          <div className={st.of_sc} style={{height:(sheight-222)}}>
          {
            window.app?
            window.app.mAggregations.pages["0"].oModels.queryModel.oData.CostObjectTypesSet.results.map((r,i)=>(
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'type'} onClick={changeDistriType.bind(this,r.CostObjectTypeID,r.Description)}>
              {r.Description}
              </div>
            )):''
          }
          </div>
        </div>
      </div>
      <div id='distridesc' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
          <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
          <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-64)}}></span>
          <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>描述</span>
        </div>
        <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectDistriDesc}/>
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          最近使用
        </div>
        <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
          {
            // distriindexs
            DistriList[distriindexs]?(DistriList[distriindexs].CostObjectName=='请选择'?'暂无':DistriList[distriindexs].CostObjectName):'暂无'
          }
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          描述
        </div>
        <div className={st.of_hi} style={{height:(sheight-222)}}>
        <div className={st.of_sc} style={{height:(sheight-222)}}>
        {
          itemList[distriindexs]&&itemList[distriindexs].length>0&&itemList[distriindexs][0].itemName!='请选择'?itemList[distriindexs].map((r,i)=>(
            <div key={i} className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'desc'} onClick={changeDesc.bind(this,r.itemKey,r.itemName)}>
            {r.itemName}
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
    distriindexs:state.distri.indexs,
    DistriList:state.distri.list,
    distrirefresh:state.distri.refresh,
    itemList:state.distri.itemList,
    distriResult:state.distri.distriResult,
  };
}
export default connect(mapStateToProps)(Distri);
