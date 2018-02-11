
export default {
  namespace: 'borrow',
  state: {
    indexs:0,
    list:[{
      borrowDate:null,
      Datvs2:'',//借款日期
      Kursv:'',//汇率
      Vorsc:'',//借款金额
      Waers:'',//货币
      WaersName:'请选择'//货币名称
    }],
    borrowResult:0,
    refresh:0
  },
  reducers: {
    list(state,{payload:{list}}){
      return {...state,list};
    },
    indexs(state,{payload:{indexs}}){
      return {...state,indexs};
    },
    borrowResult(state,{payload:{borrowResult}}){
      return {...state,borrowResult};
    },
    refresh(state,{payload:{refresh}}){
      refresh++;
      return {...state,refresh};
    }
  },
  effects: {},
  subscriptions: {},
};
