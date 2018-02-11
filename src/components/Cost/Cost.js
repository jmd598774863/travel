import st from '../../css/simple.css';
import { DatePicker } from 'antd';
import ReactList from 'react-list';
import { connect } from 'dva';
import { Modal,Icon } from 'antd';
import { routerRedux } from 'dva/router';
import CostLists from './CostList';
const b = ' ';
const sheight = document.documentElement.clientHeight;
const swidth = document.documentElement.clientWidth;
function Cost({dispatch,costindexs,CostList,costrefresh}) {
 
  function changeType(type,typeName){
    CostList[costindexs].EstimatedCostCat = type;
    CostList[costindexs].EstimatedCostCatName = typeName;
    closeDiv();
    dispatch({
      type:'cost/refresh',
      payload:{costrefresh}
    });
  }
  //查询方法
  function selectType(proxy){
    let type = document.getElementsByClassName('type');
    for(let i=0;i<type.length;i++){
      if(type[i].innerHTML.indexOf(proxy.target.value)>-1){
        type[i].style.display = 'block';
      }else{
        type[i].style.display = 'none';
      }
    }
  }
  function changeMoney(money,moneyNamne){
    CostList[costindexs].EstimatedCostAmount.Currency = money;
    CostList[costindexs].EstimatedCostAmount.CurrencyName = moneyNamne;
    closeDiv();
    dispatch({
      type:'cost/refresh',
      payload:{costrefresh}
    });
  }
    //查询方法
    function selectMoney(proxy){
      let money = document.getElementsByClassName('money');
      for(let i=0;i<money.length;i++){
        if(money[i].innerHTML.indexOf(proxy.target.value)>-1){
          money[i].style.display = 'block';
        }else{
          money[i].style.display = 'none';
        }
      }
    }
  function closeDiv(){
    document.getElementById('type').style.display = 'none';
    document.getElementById('money').style.display = 'none';
  }
  const renderItem = function renderItem(index, key) {
    return <CostLists key={key} index={index}/>;
  }
  function costAdd(){
    if(CostList[CostList.length-1].EstimatedCostCat == ''||CostList[CostList.length-1].EstimatedCostAmount.Value == '' || CostList[CostList.length-1].EstimatedCostAmount.Currency == ''){
      // Modal.info({
      //   title: '请填写完成再添加',
      // });
      // return false;
    }
    CostList.push({
      costDate:null,
      EstimatedCostCat:'',//费用类型编号
      EstimatedCostCatName:'请选择',//费用类型名称
      EstimatedCostAmount:{
        Value:'',//金额
        Currency:'',//货币
        CurrencyName:'请选择'//货币名称
      },
      Description:'',//备注
      TradeDate:'',//,
    });
    dispatch({
      type:'cost/refresh',
      payload:{costrefresh}
    });
  }
  return (
    <div className={st.bg_white1} style={{fontSize:16,height:sheight}}>
      <div className={st.hg_50}/>
      <ReactList
        itemRenderer={renderItem}
        length={CostList.length}
        type='uniform'
      />
      <div className={st.mg_0_10+b+st.bg_white+b+st.cl_blue1+b+st.ta_center+b+st.pd_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5} style={{fontSize:14}} onClick={costAdd}>+添加</div>
      <div className={st.hg_10}/>
      <div id='type' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
          <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
          <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-82)}}></span>
          <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>费用类型</span>
        </div>
        <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectType}/>
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          最近使用          
        </div>
        <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
          {
            CostList[costindexs]?(CostList[costindexs].EstimatedCostCatName=='请选择'?'暂无':CostList[costindexs].EstimatedCostCatName):'暂无'
          }
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          费用类型
        </div>
        <div className={st.of_hi} style={{height:(sheight-222)}}>
          <div className={st.of_sc} style={{height:(sheight-222)}}>
          {
            window.app?
            window.app.mAggregations.pages["0"].oModels.queryModel.oData.ExpenseTypesSet.results.map((r,i)=>(
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'type'} onClick={changeType.bind(this,r.ExpenseTypeID,r.Description)}>
              {r.Description}
              </div>
            )):''
          }
          </div>
        </div>
      </div>
      <div id='money' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
          <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
          <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-64)}}></span>
          <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>货币</span>
        </div>
        <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectMoney}/>
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          最近使用          
        </div>
        <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
          {CostList[costindexs].EstimatedCostAmount.CurrencyName=='请选择'?'暂无':CostList[costindexs].EstimatedCostAmount.CurrencyName}
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          货币
        </div>
        <div className={st.of_hi} style={{height:(sheight-222)}}>
          <div className={st.of_sc} style={{height:(sheight-222)}}>
          {
            window.app?
            window.app.mAggregations.pages["0"].oModels.queryModel.oData.Currencies.results.map((r,i)=>(
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'money'} onClick={changeMoney.bind(this,r.CurrencyCode,r.Description)}>
              {r.Description}
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
    costindexs:state.cost.indexs,
    CostList:state.cost.list,
    costrefresh:state.cost.refresh
  };
}
export default connect(mapStateToProps)(Cost);
