import dva from 'dva';
import './index.css';
import createLoading from 'dva-loading';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});
app.use(createLoading()); 

// 3. Model
app.model(require('./models/travel'));

app.model(require("./models/distri"));

app.model(require("./models/borrow"));

app.model(require("./models/cost"));

app.model(require("./models/trip"));

app.model(require("./models/reportlist"));

app.model(require("./models/reportinfo"));

app.model(require("./models/costdetail"));

app.model(require("./models/distridetail"));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
