import React from 'react';
import { connect } from 'dva';
import BorrowComponent from '../components/Borrow/Borrow';
import MyHeader from '../components/Header/MyHeader';

function Borrow({ location }) {
  return (
    <div>
      <MyHeader url="/" location={location} text={'借款'}/>
      <BorrowComponent />
    </div>
  );
}

export default connect()(Borrow);
