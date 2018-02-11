import React from 'react';
import { connect } from 'dva';
import TravelComponent from '../components/Travel/Travel';
import MyHeader from '../components/Header/MyHeader';

function Travel({ location }) {
  return (
    <div>
      <MyHeader url="/report/list" location={location} text={'创建申请单'}/>
      <TravelComponent />
    </div>
  );
}

export default connect()(Travel);
