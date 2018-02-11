import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyHeader from '../components/Header/MyHeader';
import Search from '../components/Report/Search';
import Blank from '../components/Report/Blank';
import ListItem from '../components/Report/ListItem';

function ReportList({ location }) {
  
  return (
    <div>
      <MyHeader url="/" location={location} text={'报告单'}/>
      <Blank height={40}/>
      <Search/>
      {
        window.app ? window.app.mAggregations.pages["0"].oModels.queryModel.oData.tlist.map((r,i)=>(
          <ListItem ids={r.Id} title={r.Purpose} money={'100'} huobi={'CNY'} datetime={'2017.01.11 15:24'} shenpi={'已审批'}/>
        )):''
      }
      <ListItem ids={'333'} title={'出差费'} money={'200'} huobi={'CNY'} datetime={'2017.01.11 15:24'} shenpi={'已审批'}/>
      <ListItem ids={'333'} title={'用餐费'} money={'100'} huobi={'CNY'} datetime={'2017.01.11 15:24'} shenpi={'已审批'}/>
    </div>
  );
}

export default connect()(ReportList);
