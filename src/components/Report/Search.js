import st from '../../css/simple.css';
import { connect } from 'dva';
function Search({}) {
  const b = ' ';
  //查询方法
  function selectReport(proxy){
    let report = document.getElementsByClassName('report');
    let item = document.getElementsByClassName('item');
    for(let i=0;i<report.length;i++){
      if(report[i].innerHTML.indexOf(proxy.target.value)>-1){
        item[i].style.display = 'block';
      }else{
        item[i].style.display = 'none';
      }
    }
  }
  return (
    <div className={st.bg_grey3+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b}>
      <input className={st.wd_full+b+st.ta_left+b+st.ip_no_bd+b+st.hg_35+b+st.ti_20} type='text' placeholder='请输入报告标题' onChange={selectReport}/>
    </div>
  );
}
function mapStateToProps(state) {
  return {
  };
}

export default connect(mapStateToProps)(Search);
