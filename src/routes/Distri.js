import React from 'react';
import { connect } from 'dva';
import DistriComponent from '../components/Distri/Distri';
import MyHeader from '../components/Header/MyHeader';

function Distri({ location }) {
  return (
    <div>
      <MyHeader url="/" location={location} text={'成本分配'}/>
      <DistriComponent />
    </div>
  );
}

export default connect()(Distri);
