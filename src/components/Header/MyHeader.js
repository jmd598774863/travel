import st from '../../css/simple.css';
import { Layout, Icon } from 'antd';
import { Link } from 'dva/router';
const { Header } = Layout;
const b = ' ';
function MyHeader({ text, location,url }) {
  return (
      <Header className={st.bg_grey1+b+st.ta_center+b+st.cl_white+b+st.pt_fixed+b+st.wd_full+b+st.zi_1} style={{fontSize:18,height:40}}>
        <Link to={url}><Icon type="left" className={st.cl_white+b+st.pt_absolute+b+st.lf_10+b+st.tp_10}/></Link>
        <span className={st.pt_relative+b+st.tp__12}  style={{fontSize:18}}>{text}</span>
      </Header>
  );
}

export default MyHeader;