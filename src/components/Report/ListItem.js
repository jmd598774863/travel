import st from '../../css/simple.css';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
function ListItem({dispatch,title,money,huobi,datetime,shenpi,ids}) {
  const b = ' ';
  const sheight = document.documentElement.clientHeight;
  const swidth = document.documentElement.clientWidth;
  function handleClick(){
    dispatch(routerRedux.push('/report/info'));
  }
  return (
    <div onClick={handleClick} className={st.bg_white+b+st.hg_90+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+'item'}>
      <div className={st.hg_50}>
        <span className={st.sp_width+b+st.hg_50+b+st.ti_10} style={{fontSize:18,width:(swidth-80)}}>
          <b className={'report'}>{title}</b>
        </span>
        <span className={st.sp_width+b+st.wd_80+b+st.hg_50}>
          <b>
            <span className={st.sp_width+b+st.wd_80+b+st.hg_30+b+st.ta_right+b+st.pd_r_10+b+st.pd_t_10} style={{fontSize:15}}>
              {money}
            </span>
            <span className={st.sp_width+b+st.wd_80+b+st.hg_20+b+st.ta_right+b+st.pd_r_10} style={{fontSize:12}}>
              {huobi}
            </span>
          </b>
        </span>
      </div>
      <div className={st.hg_40}>
        <span className={st.sp_width+b+st.hg_40+b+st.ti_10+b+st.pd_t_10} style={{width:(swidth-60)}}>
          {datetime}
        </span>
        <span className={st.sp_width+b+st.wd_60+b+st.hg_40+b+st.ta_right+b+st.pd_r_10}>
          {shenpi}
        </span>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
   
  };
}
export default connect(mapStateToProps)(ListItem);
