import React from 'react';
import { Router, Route } from 'dva/router';

import Travel from "./routes/Travel.js"
import Cost from "./routes/Cost.js"
import Borrow from "./routes/Borrow.js"
import Distri from "./routes/Distri.js"
import Trip from "./routes/Trip.js"
import ReportList from "./routes/ReportList.js"
import ReportInfo from "./routes/ReportInfo.js"
import CostDetail from "./routes/CostDetail.js"
import DistriDetail from "./routes/DistriDetail.js"
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={Travel} />
      <Route path="/trip" component={Trip} />
      <Route path="/cost" component={Cost} />
      <Route path="/borrow" component={Borrow} />
      <Route path="/distri" component={Distri} />
      <Route path="/report/list" component={ReportList} />
      <Route path="/report/info" component={ReportInfo} />
      <Route path="/report/cost" component={CostDetail} />
      <Route path="/report/distri" component={DistriDetail} />
    </Router>
  );
}

export default RouterConfig;
