import { routerRedux } from 'dva/router';
import fj from '../assets/飞机.png';
import hc from '../assets/火车.png';
import zc from '../assets/租车.png';
import jd from '../assets/酒店.png';
export default {
  namespace: 'trip',
  state: {
    indexs:0,
    indexs2:0,
    list:[{
      tripDate:null,//显示，出发日期
      WayName:'请选择出行方式',
      LocationBeg:'',//出发地
      LocationEnd:'',//目的地  
      LocationBegName:'请选择出发地',
      LocationEndName:'请选择目的地',
      DatetimeBeg2:'',//出发日期
      Waytype:'',//出行方式
      CountryEnd:'',//协议酒店
      Reason:'',//备注
      img:'',
      imgsrc:fj,
    }],
    list2:[{
      stayStartDate:null,//显示，出发日期
      stayEndDate:null,//显示，出发日期
      LocationBeg:'',//出发地
      LocationEnd:'',//入住城市  
      LocationEndNames:'入住城市',
      DatetimeBeg2:'',//出发日期
      DatetimeBeg3:'',//出发日期
      Waytype:'H',//出行方式
      CountryEnd:'',//协议酒店
      Reason:'',//备注
    }],
    refresh:0,
    
  },
  reducers: {
    new() {
        dispatch(routerRedux.push('/trip'));
    },
    list(state,{payload:{list}}){
      return {...state,list};
    },
    list2(state,{payload:{list2}}){
      return {...state,list2};
    },
    indexs(state,{payload:{indexs}}){
      return {...state,indexs};
    },
    indexs2(state,{payload:{indexs2}}){
      return {...state,indexs2};
    },
    refresh(state,{payload:{refresh}}){
      refresh++;
      return {...state,refresh};
    },
  },
  effects: {
    
  },
  subscriptions: {
    
    
  },
};