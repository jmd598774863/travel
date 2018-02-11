import st from '../../css/simple.css';
import { DatePicker } from 'antd';
import ReactList from 'react-list';
import { connect } from 'dva';
import { Modal,Icon } from 'antd';
import { routerRedux } from 'dva/router';
import BOrrowList from './BorrowList';
const b = ' ';
function Borrow({dispatch,borrowindexs,BorrowList,borrowrefresh}) {
  const sheight = document.documentElement.clientHeight;
  const swidth = document.documentElement.clientWidth;
  const borrowrenderItem = function borrowrenderItem(index, key) {
    return <BOrrowList key={key} index={index}/>;
  }
  //添加按钮8891000333222
  function borrowAdd(){
    if(BorrowList[BorrowList.length-1].Datvs2 == ''||BorrowList[BorrowList.length-1].Kursv == '' || BorrowList[BorrowList.length-1].Vorsc == ''|| BorrowList[BorrowList.length-1].Waers == ''){
      // Modal.info({
      //   title: '请填写完成再添加',
      // });
      // return false;
    }
    BorrowList.push({
      borrowDate:null, 
      Datvs2:'',//借款日期
      Kursv:'',//汇率
      Vorsc:'',//借款金额
      Waers:'',//货币
      WaersName:'请选择'//货币名称
    });
    dispatch({
      type:'borrow/refresh',
      payload:{borrowrefresh}
    });
  }
  function changeBorrowMoney(money,moneyName){
    BorrowList[borrowindexs].Waers = money;
    BorrowList[borrowindexs].WaersName = moneyName;
    closeDiv();
    dispatch({
      type:'borrow/refresh',
      payload:{borrowrefresh}
    });
  }
  //查询方法
  function selectBorrowMoney(proxy){
    let money = document.getElementsByClassName('money');
    for(let i=0;i<money.length;i++){
      if(money[i].innerHTML.indexOf(proxy.target.value)>-1){
        money[i].style.display = 'block';
      }else{
        type[i].style.display = 'none';
      }
    }
  }
  function closeDiv(){
    document.getElementById('borrowmoney').style.display = 'none';
  }
  
  return (
    <div className={st.wd_full+b+st.bg_white1} style={{fontSize:16,height:sheight}}>
      <div className={st.hg_50}/>
      <ReactList
        itemRenderer={borrowrenderItem}
        length={BorrowList.length}
        type='uniform'
      />
      <div className={st.mg_0_10+b+st.bg_white+b+st.cl_blue1+b+st.ta_center+b+st.pd_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5} style={{fontSize:14}} onClick={borrowAdd}>+添加</div>
      <div className={st.hg_10}/>
      <div id='borrowmoney' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
          <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
          <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-64)}}></span>
          <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>货币</span>
        </div>
        <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectBorrowMoney}/>
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          最近使用          
        </div>
        <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
          {
            BorrowList[borrowindexs]?(BorrowList[borrowindexs].WaersName=='请选择'?'暂无':BorrowList[borrowindexs].WaersName):'暂无'
          }
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          货币
        </div>
        <div className={st.of_hi} style={{height:(sheight-222)}}>
          <div className={st.of_sc} style={{height:(sheight-222)}}>
          {
            window.app?
            window.app.mAggregations.pages["0"].oModels.queryModel.oData.Currencies.results.map((r,i)=>(
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'money'} onClick={changeBorrowMoney.bind(this,r.CurrencyCode,r.Description)}>
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
    borrowindexs:state.borrow.indexs,
    BorrowList:state.borrow.list,
    borrowrefresh:state.borrow.refresh
  };
}
export default connect(mapStateToProps)(Borrow);
