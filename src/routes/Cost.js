import React from 'react';
import { connect } from 'dva';
import CostComponent from '../components/Cost/Cost';
import MyHeader from '../components/Header/MyHeader';

function Cost({ location }) {
  return (
    <div>
      <MyHeader url="/" location={location} text={'费用估算'}/>
      <CostComponent />
    </div>
  );
}

export default connect()(Cost);
