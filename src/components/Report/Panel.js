import st from '../../css/simple.css';

function Panel({list,clazz}) {
    const b = ' ';
    const sheight = document.documentElement.clientHeight;
    const swidth = document.documentElement.clientWidth;
    return (
        <div className={st.bg_blue1+b+st.pd_5_10+b+clazz}>
            <div className={st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5}>
            {
            list.map((r,i)=>(
                <div key={i} className={st.bg_white+b+st.hg_50+b+st.bd_w_1+b+st.bd_c_grey1+b+((i==(list.length-1))?'':st.bd_b_s)}>
                    <span className={st.sp_width+b+st.hg_50+b+st.wd_80+b+st.pd_15}>{r.names}</span>
                    <span className={st.sp_width+b+st.hg_50+b+st.pd_15} style={{width:(swidth-102)}}>{r.values}</span>
                </div>
            ))
            }
            </div>
        </div>
    );
}

export default Panel;
