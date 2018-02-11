
export default {
    namespace: 'reportinfo',
    state: {
      costshow:true,
      distrishow:true,
      costshow:true,
      costshow:true,
    },
    reducers: {
      costshow(state,{payload:{costshow}}){
        return {...state,costshow};
      },
      distrishow(state,{payload:{distrishow}}){
        return {...state,distrishow};
      },
    },
    effects: {},
    subscriptions: {},
  };
  