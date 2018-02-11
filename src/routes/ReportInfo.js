import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyHeader from '../components/Header/MyHeader';
import Blank from '../components/Report/Blank';
import Base from '../components/Report/Base';
import Info from '../components/Report/Info';
import CostPanel from '../components/Report/CostPanel';
import DistriPanel from '../components/Report/DistriPanel';
import Footer from '../components/Report/Footer';
import Panel from '../components/Report/Panel';
function ReportInfo({ location,costshow,distrishow }) {
  const sheight = document.documentElement.clientHeight;
  const swidth = document.documentElement.clientWidth;
  const lists = [{names:'名称',values:'值'},{names:'名称',values:'值'},{names:'名称',values:'值'},{names:'名称',values:'值'}];

  return (
    <div>
      <MyHeader url="/report/list" location={location} text={'报告单详情'}/>
      <Blank height={40}/>
      <Base/>
      <Info names={'费用报告标题:'} values={'12月1日出差航班费'}/>
      <Info names={'费用报告日期:'} values={'2017.12.05'}/>
      <Info names={'申请人:'} values={'张三'}/>
      <Info names={'报告单号:'} values={'00000000001'}/>
      <Info names={'经办人:'} values={'李四'}/>
      <Info names={'报告状态:'} values={'已审批-可以打印'}/>
      <Info names={'备注:'} values={'费用包括航班、租车费'}/>
      <Blank height={5} color={'rgb(221,240,244)'}/>
      <CostPanel title={'费用明细'} detail={'航班3000'}/>
      {
        costshow?(
          <div>
              <Panel list={[{names:'名称',values:'值值值值值值值值值'},{names:'名称',values:'值'},{names:'名称',values:'值'},{names:'名称',values:'值'}]}/>
              <Panel list={[{names:'名称',values:'值值值值值值值值值'},{names:'名称',values:'值'},{names:'名称',values:'值'},{names:'名称',values:'值'}]}/>
          </div>)
        :''
      }
      
      <DistriPanel title={'成本分配'} detail={'销售中心50'}/>
      {
        distrishow?(
          <div>
              <Panel list={[{names:'名称',values:'值值值值值值值值值'},{names:'名称',values:'值'},{names:'名称',values:'值'},{names:'名称',values:'值'}]}/>
              <Panel list={[{names:'名称',values:'值值值值值值值值值'},{names:'名称',values:'值'},{names:'名称',values:'值'},{names:'名称',values:'值'}]}/>
          </div>)
        :''
      }
      <Blank height={(sheight-599)>40?(sheight-599):40} color={'rgb(221,240,244)'}/>
      <Footer/>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    costshow:state.reportinfo.costshow,
    distrishow:state.reportinfo.distrishow
  };
}

export default connect(mapStateToProps)(ReportInfo);
