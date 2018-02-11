import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import MyHeader from '../components/Header/MyHeader';
import Blank from '../components/Report/Blank';

function DistriDetail({ location }) {
  const sheight = document.documentElement.clientHeight;
  const swidth = document.documentElement.clientWidth;
  return (
    <div>
      <MyHeader url="/report/info" location={location} text={'成本分配'}/>
      <Blank height={40}/>
      <Blank height={sheight-599} color={'rgb(221,240,244)'}/>
    </div>
  );
}

export default connect()(DistriDetail);
