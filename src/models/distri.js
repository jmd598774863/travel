
export default {
  namespace: 'distri',
  state: {
    indexs:0,
    list:[{
      CostObjectId2:'',//描述id
      CostObjectItemId:'',
      CostObjectItemName:'请选择',//类型名称
      CostObjectName:'请选择',//描述名称
      CostObjectType:'',//类型Id
      Percentage:'100'//共享
    }],
    itemList:[[
      {
        itemKey:'',
        itemName:'请选择',
      }
    ]],
    distriResult:'未进行成本分配',
    refresh:0
  },
  reducers: {
    list(state,{payload:{list}}){
      return {...state,list};
    },
    indexs(state,{payload:{indexs}}){
      return {...state,indexs};
    },
    distriResult(state,{payload:{distriResult}}){
      return {...state,distriResult};
    },
    refresh(state,{payload:{refresh}}){
      refresh++;
      return {...state,refresh};
    },
    itemList(state,{payload:{itemList}}){
      return {...state,itemList};
    }
  },
  effects: {},
  subscriptions: {},
};
