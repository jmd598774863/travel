export default {
  namespace: 'travel',
  state: {
    startDate: null,
    endDate: null,
    errDetail:'',
    errList: [],
    refresh:0,
    Id:'',//申请号
    Applicant:window.app?window.app.mAggregations.pages["0"].oModels.queryModel.oData.Applicant:'',//申请人
    TripActivity:null,//F，应该是差旅类型
    TripActivityName:'',
    Purpose:'',//出差目的
    Location:null,//目的地，甘肃260
    LocationName:'',
    CountryCode:'CN',//国家代码
    CountryName:'zhongguo',//国家名称
    RegionCode:'',//地区代码
    RegionName:'bj',//地区名称
    Departure:null,//new Date().toLocaleDateString().replace(/\//g,'-')+'T00:00:00',//开始日期
    Departure2:'',//new Date().toLocaleDateString().replace(/\//g,'-')+'T00:00:00',//开始日期
    Arrival:null,//new Date().toLocaleDateString().replace(/\//g,'-')+'T00:00:00',//结束日期
    Arrival2:'',//new Date().toLocaleDateString().replace(/\//g,'-')+'T00:00:00',//结束日期
    LastChangeDate:'',//new Date().toLocaleDateString().replace(/\//g,'-')+'T00:00:00',//结束日期
    Operator:window.app?window.app.mAggregations.pages["0"].oModels.queryModel.oData.Operator:'',//经办人
    Note:'',
    UserAction:'',
  },
  reducers: {
    errList(state,{payload:{errList}}){
      return {...state,errList};
    },
    applicant(state,{payload:{Applicant}}){
      return {...state,Applicant};
    },
    id(state,{payload:{Id}}){
      return {...state,Id};
    },
    tripActivity(state,{payload:{TripActivity}}){
      return {...state,TripActivity};
    },
    purpose(state,{payload:{Purpose}}){
      return {...state,Purpose};
    },
    location(state,{payload:{Location}}){
      return {...state,Location};
    },
    LocationName(state,{payload:{LocationName}}){
      return {...state,LocationName};
    },
    departure(state,{payload:{Departure}}){
      return {...state,Departure};
    },
    arrival(state,{payload:{Arrival}}){
      return {...state,Arrival};
    },
    startDate(state,{payload:{startDate}}){
      return {...state,startDate};
    },
    endDate(state,{payload:{endDate}}){
      return {...state,endDate};
    },
    errDetail(state,{payload:{errDetail}}){
      return {...state,errDetail};
    },
    refresh(state,{payload:{refresh}}){
      refresh++;
      return {...state,refresh};
    },
    save(state, { payload: { data: list, total, page } }) {
      return { ...state, list, total, page };
    },
    submit(state,{payload: {target}}){
      return {...state, target}
    },
  },
  effects: {
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/users') {
          dispatch({ type: 'fetch', payload: query });
        }
      });
    },
  },
};