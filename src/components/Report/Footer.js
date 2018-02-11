import lw from '../../assets/例外.png';
import st from '../../css/simple.css';
function Footer({names,values}) {
  const b = ' ';
  const sheight = document.documentElement.clientHeight;
  const swidth = document.documentElement.clientWidth;
    function submitBtn(){

    }
    function saveBtn(){
        
    }
    function showDiv(){
        
    }
  return (
    <div style={{fontSize:16}} className={st.hg_40+b+st.bg_grey2+b+st.pt_fixed+b+st.wd_full+b+st.zi_1+b+st.pt_relative+b+st.bt_0+b+st.cl_white}>  
        <span className={st.sp_width+b+st.fl_lt} onClick={showDiv}>
        <img src={lw} className={st.wd_50+b+st.hg_40+b+st.pd_5_10+b+st.fl_lt} />
        <span className={st.sp_width+b+st.hg_40+b+st.fl_lt+b+st.pd_7_0} style={{width:(swidth-190)}}>
        {
            //errList.length==0?'':errList.length
        }
        </span>
        </span>
        <span style={{width:70}} className={st.pt_relative+b+st.sp_width+b+st.hg_40+b+st.pd_8_0+b+st.ta_center+b+st.fl_lt} onClick={submitBtn}>提交</span>
        <span style={{width:70}} className={st.pt_relative+b+st.sp_width+b+st.hg_40+b+st.pd_8_0+b+st.ta_center+b+st.fl_lt} onClick={saveBtn}>编辑</span>
    </div>
  );
}

export default (Footer);
