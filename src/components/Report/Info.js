import st from '../../css/simple.css';
function Info({names,values}) {
  const b = ' ';
  const sheight = document.documentElement.clientHeight;
  const swidth = document.documentElement.clientWidth;

  return (
    <div className={st.hg_50+b+st.bg_white1}>
        <span className={st.sp_width+b+st.hg_50+b+st.wd_100+b+st.ta_right+b+st.pd_r_10+b+st.pd_t_10}>{names}</span>
        <span className={st.sp_width+b+st.hg_50+b+st.pd_t_10+b+st.ti_7} style={{width:(swidth-100)}}>{values}</span>
    </div>
  );
}

export default (Info);
