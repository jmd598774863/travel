
export default {
  namespace: 'cost',
  state: {
    indexs:0,
    list:[{
      costDate:null,
      EstimatedCostCat:'',//费用类型编号
      EstimatedCostCatName:'请选择',//费用类型名称
      EstimatedCostAmount:{
        Value:'',//金额
        Currency:'',//货币
        CurrencyName:'请选择'//货币名称
      },
      Description:'',//备注
      TradeDate:'',//
    }],
    costResult:0,
    refresh:0
  },
  reducers: {
    list(state,{payload:{list}}){
      return {...state,list};
    },
    indexs(state,{payload:{indexs}}){
      return {...state,indexs};
    },
    costResult(state,{payload:{costResult}}){
      return {...state,costResult};
    },
    refresh(state,{payload:{refresh}}){
      refresh++;
      return {...state,refresh};
    }
  },
  effects: {},
  subscriptions: {},
};
