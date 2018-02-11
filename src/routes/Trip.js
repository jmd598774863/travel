import React from 'react';
import { connect } from 'dva';
import TripComponent from '../components/Trip/Trip';
import MyHeader from '../components/Header/MyHeader';

function Trip({ location }) {
  return (
    <div>
      <MyHeader url="/" location={location} text={'行程详情'}/>
      <TripComponent />
    </div>
    
  );
}

export default connect()(Trip);
