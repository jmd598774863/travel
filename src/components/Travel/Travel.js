import st from '../../css/simple.css';
import { Icon, Select, DatePicker,Modal } from 'antd';
import { connect } from 'dva';
import { Link,routerRedux } from 'dva/router';
import trip from '../../assets/差旅行程.png';
import cost from '../../assets/费用估算.png';
import borrow from '../../assets/借款金额.png';
import distri from '../../assets/成本分配.png';
import lw from '../../assets/例外.png';
import moment from 'moment';
import CostLists from '../../components/Cost/CostList';
import BOrrowList from '../../components/Borrow/BorrowList';
import DIstriList from '../../components/Distri/DistriList';
import TRipList from '../../components/Trip/TripList';
import STayList from '../../components/Trip/StayList';
import fj from '../../assets/飞机.png';
import hc from '../../assets/火车.png';
import zc from '../../assets/租车.png';
import jd from '../../assets/酒店.png';
import ReactList from 'react-list';

const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const sheight = document.documentElement.clientHeight;
const swidth = document.documentElement.clientWidth;
const b = ' ';
function Travel({dispatch,refresh,startDate,endDate,errDetail,
                  Id,Applicant,TripActivity,Purpose,Location,
                  CountryCode,CountryName,RegionCode,RegionName,Departure,
                  Departure2,Arrival,Arrival2,LastChangeDate,Operator,
                  Note, UserAction,TripList, StayList,CostList,
                  BorrowList,DistriList,errList,costResult,borrowResult,distriResult,
                  TripActivityName,LocationName,
                  costindexs,costrefresh,borrowindexs,borrowrefresh,
                  distriindexs,distrirefresh,itemList,
                  tripindexs,stayindexs2,triprefresh
                }) {

  function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
                "SymbianOS", "Windows Phone",
                "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
  }
  const iwd = 105;
  const pflag = IsPC()?35:0;
  
  //成功
  function saveSuccess(travelNum) {
    Modal.success({
      title: 'Success',
      content: '启动工作流,成功生成差旅号'+travelNum,
    });
  }
  //失败
  function saveFail(content) {
    Modal.error({
      title: 'Fail',
      content: content,
    });
  }
  
  //申请人
  function applicantChange(value){
    Applicant = value;
    dispatch({
      type:'travel/applicant',
      payload:{Applicant}
    });
  }
  //申请号
  function idChange(value){
    Id = value;
    dispatch({
      type:'travel/id',
      payload:{Id}
    });
  }
  //差旅类型
  function tripActivityChange(value){
    TripActivity = value;
    dispatch({
      type:'travel/tripActivity',
      payload:{TripActivity}
    });
  }
  
  //通用验证
  function gen(field,remark){
    if(field == null||field == ''){
      errList.push(remark);
      Modal.error({
        title: 'Fail',
        content: remark,
      });
      dispatch({
        type:'travel/refresh',
        payload:{refresh}
      });
      return false;
    }else{
      return true;
    }
  }
  //通用提示
  function genModal(content){
    errList.push(content);
    Modal.error({
      title: 'Fail',
      content: content,
    });
  }
  //验证费用估算
  function checkCost(){
    let b = true;
    if(CostList.length == 1){
      if(CostList[0].EstimatedCostCat==''||CostList[0].EstimatedCostAmount.Value ==''||CostList[0].EstimatedCostAmount.Currency ==''){
        genModal('请至少添加一条费用估算');
        b = false;
      }
    }else{
      CostList.map((r,i)=>{
        if(CostList[i].EstimatedCostCat==''||CostList[i].EstimatedCostAmount.Value ==''||CostList[i].EstimatedCostAmount.Currency ==''){
          b = false;
        }
      });
      if(!b){
        genModal('请补充或长按删除未填写的费用估算');
      }
    }
    dispatch({
      type:'travel/refresh',
      payload:{refresh}
    });
    return b;
  }
  //验证成本分配
  function checkDistri(){
    let b = true;
    if(DistriList.length == 1){
      if(DistriList[0].CostObjectType==''||DistriList[0].CostObjectId2 ==''){
        genModal('请至少添加一条成本分配');
        b = false;
      }else{
        if(DistriList[0].Percentage != 100){
          genModal('成本分配共享需满足总和等于100');
          b = false;
        }
      }
    }else{
      DistriList.map((r,i)=>{
        if(DistriList[i].CostObjectType==''||DistriList[i].CostObjectId2 ==''){
          genModal('请补充或长按删除未填写的成本分配');         
          b = false;
        }
      });
      let count = 0;
      DistriList.map((r,i)=>{
        count += parseInt(r.Percentage);
      });
      if(count!=100){
        genModal('成本分配共享需满足总和等于100');         
        b = false;
      }
    }
    dispatch({
      type:'travel/refresh',
      payload:{refresh}
    });
    return b;
  }
  //全部验证
  function check(){
    if(!gen(TripActivity,'请选择差旅类型')){
      return false;
    }
    if(!gen(Purpose,'请填写出差目的')){
      return false;
    }
    if(!gen(Location,'请选择目的地')){
      return false;
    }
    if(!gen(Departure,'请选择开始日期')){
      return false;
    }
    if(!gen(Arrival,'请选择结束日期')){
      return false;
    }  
    if(!checkCost()){
      return false;
    }
    if(!checkDistri()){
      return false;
    }
    return true;
  }

  function genSaveAndSubmit(){
    let checked = check();
    if(!checked){
      return false;
    }
    if(!window.app){
      return false;
    }
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.Id = Id;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.Applicant = Applicant;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.TripActivity = TripActivity;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.Purpose = Purpose;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.Location = Location;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.CountryCode = CountryCode;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.CountryName = CountryName;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.RegionCode = RegionCode;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.RegionName = RegionName;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.Departure = Departure;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.Departure2 = Departure;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.Arrival = Arrival;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.Arrival2 = Arrival;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.LastChangeDate = Arrival;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.Operator = Operator;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.Note = Note;
    let AirPlanSet = [];
    let TrainSet = [];
    let CarSet = [];
    TripList.map((r,i)=>{ 
      switch(r.Waytype){
        case 'OF': AirPlanSet.push({
          CountryEnd:r.CountryEnd,
          DatetimeBeg2:r.DatetimeBeg2,//到达时间
          LocationBeg:r.LocationBeg,//出发城市,020上海
          LocationEnd:r.LocationEnd,//到达尘世,090黑龙江
          TravelId:'',
          Waytype:r.Waytype//出行方式,飞机OF
        }); break;
        case 'OT': TrainSet.push({
          CountryEnd:r.CountryEnd,
          DatetimeBeg2:r.DatetimeBeg2,//日期
          LocationBeg:r.LocationBeg,//出发城市,270宁夏
          LocationEnd:r.LocationEnd,//到达城市,250陕西
          Reason:r.Reason,//备注
          TravelId:'',
          Waytype:r.Waytype,//出行方式,火车OT
        }); break;
        case 'CE': CarSet.push({
          CountryEnd:r.CountryEnd,
          DatetimeBeg2:r.DatetimeBeg2,//日期
          LocationBeg:r.LocationBeg,//出发城市,270宁夏
          LocationEnd:r.LocationEnd,//到达城市,250陕西
          TravelId:'',
          Waytype:r.Waytype,//出行方式,租车CE
        }); break;
      }
    });
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.DestinationSet[0].AirPlanSet = AirPlanSet;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.DestinationSet[0].TrainSet = TrainSet;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.DestinationSet[0].CarSet = CarSet;
    let HotelSet = [];
    if(StayList.length==1&&StayList[0].LocationEnd=='入住城市'&&StayList[0].DatetimeBeg2==''&&StayList[0].DatetimeBeg3==''&&StayList[0].CountryEnd==''&&StayList[0].Reason==''){
    ////未填写不放入model
    }else{
      StayList.map((r,i)=>{
        HotelSet.push({
          CountryEnd:r.CountryEnd,
          DatetimeBeg2:r.DatetimeBeg2,
          LocationBeg:r.LocationBeg,
          LocationEnd:r.LocationEnd,//入住城市
          Reason:r.Reason,//
          Waytype:r.Waytype,//住宿
        });
      });
    }
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.DestinationSet[0].HotelSet = HotelSet;
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.DestinationSet[0].CountryEnd = '';
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.DestinationSet[0].DatetimeBeg2 = new Date().toLocaleDateString().replace(/\//g,'-')+'T00:00:00';
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.DestinationSet[0].DatetimeEnd2 = new Date().toLocaleDateString().replace(/\//g,'-')+'T00:00:00';
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.DestinationSet[0].LocationEnd = '';
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.DestinationSet[0].Reason = '';
    let EstimatedCosts = [];
    CostList.map((r,i)=>{
      EstimatedCosts.push({
        Description:r.Description,//备注
        EstimatedCostAmount:{
          Currency:r.EstimatedCostAmount.Currency,//货币
          Value:r.Value//金额
        },
        EstimatedCostCat:r.EstimatedCostCat//费用类型
      });
    });
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.EstimatedCosts = EstimatedCosts;
    let AdvanceSet = [];
    if(BorrowList.length==1&&BorrowList[0].Datvs2==''&&BorrowList[0].Kursv==''&&BorrowList[0].Vorsc==''&&BorrowList[0].Waers==''){
     ////未填写不放入model
    }else{
        BorrowList.map((r,i)=>{
          AdvanceSet.push({
            Datvs2:r.Datvs2,//借款日期
            Kursv:r.Kursv,//汇率
            Vorsc:r.Vorsc,//借款金额
            Waers:r.Waers//货币
          });
        });
    }
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.AdvanceSet = AdvanceSet;
    let CostAssignments = [];
    DistriList.map((r,i)=>{
      CostAssignments.push({
        CostObjectId2:r.CostObjectId2,
        CostObjectItemId:r.CostObjectItemId,
        CostObjectItemName:r.CostObjectItemName,//类型
        CostObjectName:r.CostObjectName,//描述
        CostObjectType:r.CostObjectType,
        Percentage:r.Percentage//共享
      });
    });
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.CostAssignments = CostAssignments;
    return true;
  }
  //保存按钮
  function saveBtn(){
    let b = genSaveAndSubmit();
    if(!b){
      return false;
    }
    if(!window.app){
      return false;
    }
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.UserAction = '2';//保存2，提交5
    window.app.mAggregations.pages["0"].oController.saveTravel();
    let promise = new Promise(
      function(resolve, reject) {
        if(window.app.mAggregations.pages["0"].oController.SorE === 'S'){
          Id = window.app.mAggregations.pages["0"].oModels.queryModel.oData.Id;
          saveSuccess(Id);
          resolve(); 
        }else if(window.app.mAggregations.pages["0"].oController.SorE === 'E'){
          let err = window.app.mAggregations.pages["0"].oModels.queryModel.oData.err;
          errList.push(err);
          dispatch({
            type:'travel/refresh',
            payload:{refresh}
          });
          saveFail(err);
          reject();
        }
      }, 
      100
    );
  }
  //提交按钮
  function submitBtn(){
    let b = genSaveAndSubmit();
    if(!b){
      return false;
    }
    if(!window.app){
      return false;
    }
    window.app.mAggregations.pages["0"].oModels.CreateTravelRequestModel.oData.UserAction = '5';//保存2，提交5
    window.app.mAggregations.pages["0"].oController.submitTravel();
    let promise = new Promise(
      function(resolve, reject) {
        if(window.app.mAggregations.pages["0"].oController.SorE === 'S'){
          Id = window.app.mAggregations.pages["0"].oModels.queryModel.oData.Id;
          saveSuccess(Id);
          resolve(); 
        }else if(window.app.mAggregations.pages["0"].oController.SorE === 'E'){
          let err = window.app.mAggregations.pages["0"].oModels.queryModel.oData.err;
          errList.push(err);
          dispatch({
            type:'travel/refresh',
            payload:{refresh}
          });
          saveFail(err);
          reject();
        }
      }, 
      100
    );
  }
  //出差目的
  function purpose(proxy){
    Purpose=proxy.target.value;
    dispatch({
      type:'travel/purpose',
      payload:{Purpose}
    });
  }
  function tripClick(){
    dispatch(routerRedux.push('/trip'));
  }
  function costClick(){
    dispatch(routerRedux.push('/cost'));
  }
  function borrowClick(){
    dispatch(routerRedux.push('/borrow'));
  }
  function distriClick(){
    dispatch(routerRedux.push('/distri'));
  }
  function closeDiv(){
    document.getElementById('info').style.display = 'none';
    document.getElementById('showend').style.display = 'none';
    document.getElementById('type').style.display = 'none';
    document.getElementById('money').style.display = 'none';
    document.getElementById('borrowmoney').style.display = 'none';
    document.getElementById('distritype').style.display = 'none';
    document.getElementById('distridesc').style.display = 'none';
    document.getElementById('way').style.display = 'none';
    document.getElementById('beloc').style.display = 'none';
    document.getElementById('enloc').style.display = 'none';
    document.getElementById('city').style.display = 'none';
  }
  function closeDetail(){ 
    document.getElementById('detail').style.display = 'none';
  }
  function returnInfo(){
    document.getElementById('detail').style.display = 'none';
    document.getElementById('info').style.display = 'inline';
  }
  //显示消息列表
  function showDiv(){
    document.getElementById('info').style.display = 'inline';
  }
  function onStartChange(value, dateString) {
    startDate = value;
    dispatch({
      type:'travel/startDate',
      payload:{startDate}
    });
    Departure = dateString + 'T00:00:00';
    dispatch({
      type:'travel/departure',
      payload:{Departure}
    });
  }

  function onEndChange(value, dateString) {
    endDate = value;
    dispatch({
      type:'travel/endDate',
      payload:{endDate}
    });
    Arrival = dateString + 'T00:00:00';
    dispatch({
      type:'travel/arrival',
      payload:{Arrival}
    });
  }
  function showErrDetail(info){
    errDetail = info;
    dispatch({
      type:'travel/errDetail',
      payload:{errDetail}
    });
    document.getElementById('info').style.display = 'none';
    document.getElementById('detail').style.display = 'inline';
  }
  //显示目的地
  function showEnd(){
    document.getElementById('showend').style.display = 'inline';
  }
  //目的地
  function locationChange(key,value){
    Location = key;
    LocationName = value;
    dispatch({
      type:'travel/location',
      payload:{Location}
    });
    dispatch({
      type:'travel/LocationName',
      payload:{LocationName}
    });
    document.getElementById('showend').style.display = 'none';
  }
  
  //查询方法目的地
  function selectShowEnd(proxy){
    let showend = document.getElementsByClassName('showend');
    for(let i=0;i<showend.length;i++){
      if(showend[i].innerHTML.indexOf(proxy.target.value)>-1){
        showend[i].style.display = 'block';
      }else{
        showend[i].style.display = 'none';
      }
    }
  }

  function changeType(type,typeName){
    CostList[costindexs].EstimatedCostCat = type;
    CostList[costindexs].EstimatedCostCatName = typeName;
    closeDiv();
    dispatch({
      type:'cost/refresh',
      payload:{costrefresh}
    });
  }
    //查询方法
    function selectType(proxy){
      let type = document.getElementsByClassName('type');
      for(let i=0;i<type.length;i++){
        if(type[i].innerHTML.indexOf(proxy.target.value)>-1){
          type[i].style.display = 'block';
        }else{
          type[i].style.display = 'none';
        }
      }
    }
  function changeMoney(money,moneyNamne){
    CostList[costindexs].EstimatedCostAmount.Currency = money;
    CostList[costindexs].EstimatedCostAmount.CurrencyName = moneyNamne;
    closeDiv();
    dispatch({
      type:'cost/refresh',
      payload:{costrefresh}
    });
  }

  //查询方法
  function selectMoney(proxy){
    let money = document.getElementsByClassName('money');
    for(let i=0;i<money.length;i++){
      if(money[i].innerHTML.indexOf(proxy.target.value)>-1){
        money[i].style.display = 'block';
      }else{
        money[i].style.display = 'none';
      }
    }
  }

  const renderItem = function renderItem(index, key) {
    return <CostLists key={key} index={index}/>;
  }
  function costAdd(){
    if(CostList[CostList.length-1].EstimatedCostCat == ''||CostList[CostList.length-1].EstimatedCostAmount.Value == '' || CostList[CostList.length-1].EstimatedCostAmount.Currency == ''){
      // Modal.info({
      //   title: '请填写完成再添加',
      // });
      // return false;
    }
    CostList.push({
      costDate:null,
      EstimatedCostCat:'',//费用类型编号
      EstimatedCostCatName:'请选择',//费用类型名称
      EstimatedCostAmount:{
        Value:'',//金额
        Currency:'',//货币
        CurrencyName:'请选择'//货币名称
      },
      Description:'',//备注
      TradeDate:'',//,
    });
    dispatch({
      type:'cost/refresh',
      payload:{costrefresh}
    });
  }
  function changeShowAndHide(){
    if(document.getElementById('costPanel').style.display==''||document.getElementById('costPanel').style.display == 'none'){
      document.getElementById('costPanel').style.display = 'block';
    }else{
      document.getElementById('costPanel').style.display = 'none';
    }
  }
  function borrowShowAndHide(){
    if(document.getElementById('borrowPanel').style.display==''||document.getElementById('borrowPanel').style.display == 'none'){
      document.getElementById('borrowPanel').style.display = 'block';
    }else{
      document.getElementById('borrowPanel').style.display = 'none';
    }
  }
  
  function tripShowAndHide(){
    if(document.getElementById('tripContent').style.display==''||document.getElementById('tripContent').style.display == 'none'){
      document.getElementById('tripContent').style.display = 'block';
    }else{
      document.getElementById('tripContent').style.display = 'none';
    }
  }
  const borrowrenderItem = function borrowrenderItem(index, key) {
    return <BOrrowList key={key} index={index}/>;
  }
  function borrowAdd(){
    if(BorrowList[BorrowList.length-1].Datvs2 == ''||BorrowList[BorrowList.length-1].Kursv == '' || BorrowList[BorrowList.length-1].Vorsc == ''|| BorrowList[BorrowList.length-1].Waers == ''){
      // Modal.info({
      //   title: '请填写完成再添加',
      // });
      // return false;
    }
    BorrowList.push({
      borrowDate:null, 
      Datvs2:'',//借款日期
      Kursv:'',//汇率
      Vorsc:'',//借款金额
      Waers:'',//货币
      WaersName:'请选择'//货币名称
    });
    dispatch({
      type:'borrow/refresh',
      payload:{borrowrefresh}
    });
  }
  function changeBorrowMoney(money,moneyName){
    BorrowList[borrowindexs].Waers = money;
    BorrowList[borrowindexs].WaersName = moneyName;
    closeDiv();
    dispatch({
      type:'borrow/refresh',
      payload:{borrowrefresh}
    });
  }
  //查询方法
  function selectBorrowMoney(proxy){
    let money = document.getElementsByClassName('money');
    for(let i=0;i<money.length;i++){
      if(money[i].innerHTML.indexOf(proxy.target.value)>-1){
        money[i].style.display = 'block';
      }else{
        type[i].style.display = 'none';
      }
    }
  }
  const distrirenderItem = function distrirenderItem(index, key) {
    return <DIstriList key={key} index={index}/>;
  }
  
  function distriAdd(){
    if(DistriList[DistriList.length-1].CostObjectType == ''||DistriList[DistriList.length-1].CostObjectId2 == ''){
      // Modal.info({
      //   title: '请填写完成再添加',
      // });
      // return false;
    }
    DistriList.push({
      CostObjectId2:'',//描述Id
      CostObjectItemId:'',
      CostObjectItemName:'请选择',//类型名称
      CostObjectName:'请选择',//描述
      CostObjectType:'',//类型Id
      Percentage:''//共享
    });
    itemList.push([{
      itemKey:'',
      itemName:'请选择',
    }]);
    dispatch({
      type:'distri/refresh',
      payload:{distrirefresh}
    });
  }
  function changeDistriType(type,typeName){
    DistriList[distriindexs].CostObjectType =type;
    DistriList[distriindexs].CostObjectItemName = typeName;
    DistriList[distriindexs].CostObjectId2 ='';
    DistriList[distriindexs].CostObjectName = '请选择';
    closeDiv();
    dispatch({
      type:'distri/refresh',
      payload:{distrirefresh}
    });
    if(window.app){
      window.app.mAggregations.pages["0"].oController.loadCostData(type);
      let promise = new Promise(
        function(resolve, reject) {
          if(window.app.mAggregations.pages["0"].oController.SorE === 'S'){
           itemList[distriindexs].splice(0,itemList[distriindexs].length);
           window.app.mAggregations.pages["0"].oModels.queryModel.oData.costItemSet.results.forEach((r,i)=>{
             itemList[distriindexs].push({
               itemKey:r.CostObjectID,
               itemName:r.Description,
             });
           });
           dispatch({
             type:'distri/refresh',
             payload:{distrirefresh}
           });
           resolve();
          }else if(window.app.mAggregations.pages["0"].oController.SorE === 'E'){
             reject();
          }
        }, 
        100
      );
    }    
  }
  //验证
  function checkAll(){
    let b = true;
    let count = 0;
    DistriList.map((r,i)=>{
      if(r.CostObjectType==''||r.CostObjectId2==''){
        b = false;
      }
      count += parseInt(r.Percentage);
    });
    if(b){
      if(count==100){
        distriResult = '已分配';
      }else{
        distriResult = '共享之和需等于100';
      }
    }else{
      distriResult = '未进行成本分配';
    }
    dispatch({
      type:'distri/distriResult',
      payload:{distriResult}
    });
  }

  //描述
  function changeDesc(key,name){
    DistriList[distriindexs].CostObjectId2 = key;
    DistriList[distriindexs].CostObjectName = name;
    closeDiv();
    dispatch({
      type:'distri/refresh',
      payload:{distrirefresh}
    });
    checkAll();
  }
  //查询方法
  function selectDistriType(proxy){
    let type = document.getElementsByClassName('type');
    for(let i=0;i<type.length;i++){
      if(type[i].innerHTML.indexOf(proxy.target.value)>-1){
        type[i].style.display = 'block';
      }else{
        type[i].style.display = 'none';
      }
    }
  }
  //查询方法
  function selectDistriDesc(proxy){
    let desc = document.getElementsByClassName('desc');
    for(let i=0;i<desc.length;i++){
      if(desc[i].innerHTML.indexOf(proxy.target.value)>-1){
        desc[i].style.display = 'block';
      }else{
        desc[i].style.display = 'none';
      }
    }
  }
  
  function distriShowAndHide(){
    if(document.getElementById('distriPanel').style.display==''||document.getElementById('distriPanel').style.display == 'none'){
      document.getElementById('distriPanel').style.display = 'block';
    }else{
      document.getElementById('distriPanel').style.display = 'none';
    }
  }

  //添加按钮，交通
  function tripAdd(){
    if(TripList[TripList.length-1].LocationBeg == ''||TripList[TripList.length-1].LocationEnd == '' || TripList[TripList.length-1].WayName == '请选择出行方式'||TripList[TripList.length-1].DatetimeBeg2== ''){
      // Modal.info({
      //   title: '请填写完成再添加',
      // });
      // return false;
    }
    TripList.push({
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
    });
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //添加按钮，酒店
  function stayAdd(){
    if(StayList[StayList.length-1].LocationEnd == ''||StayList[StayList.length-1].DatetimeBeg2 == '' || StayList[StayList.length-1].DatetimeBeg3 == ''){
      // Modal.info({
      //   title: '请填写完成再添加',
      // });
      // return false;
    }
    StayList.push({
      stayStartDate:null,//显示，出发日期
      stayEndDate:null,//显示，出发日期
      LocationBeg:'',//出发地
      LocationEnd:'',//入住城市  
      LocationEndNames:'入住城市',//入住城市  
      DatetimeBeg2:'',//出发日期
      DatetimeBeg3:'',//出发日期
      Waytype:'H',//出行方式
      CountryEnd:'',//协议酒店
      Reason:'',//备注
    });
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //改变出行方式
  function changeWay(way){
    TripList[tripindexs].Waytype = way;
    switch(way){
      case 'OF': TripList[tripindexs].WayName = '飞机'; TripList[tripindexs].imgsrc = fj; break;
      case 'OT': TripList[tripindexs].WayName = '火车'; TripList[tripindexs].imgsrc = hc; break;
      case 'CE': TripList[tripindexs].WayName = '租车'; TripList[tripindexs].imgsrc = zc; break;
    }
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //改变出发地
  function changeBeginLocation(key,value){
    TripList[tripindexs].LocationBeg = key;
    TripList[tripindexs].LocationBegName = value;
    closeDiv();
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //改变目的地
  function changeEndLocation(key,value){
    TripList[tripindexs].LocationEnd = key;
    TripList[tripindexs].LocationEndName = value;
    closeDiv();
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //改变入住城市
  function changeCity(key,value){
    StayList[stayindexs2].LocationEnd = key;
    StayList[stayindexs2].LocationEndNames = value;
    closeDiv();
    dispatch({
      type:'trip/refresh',
      payload:{triprefresh}
    });
  }
  //查询方法出发地
  function selectBeloc(proxy){
    let beloc = document.getElementsByClassName('beloc');
    for(let i=0;i<beloc.length;i++){
      if(beloc[i].innerHTML.indexOf(proxy.target.value)>-1){
        beloc[i].style.display = 'block';
      }else{
        beloc[i].style.display = 'none';
      }
    }
  }
  //查询方法目的地
  function selectEnloc(proxy){
    let enloc = document.getElementsByClassName('enloc');
    for(let i=0;i<enloc.length;i++){
      if(enloc[i].innerHTML.indexOf(proxy.target.value)>-1){
        enloc[i].style.display = 'block';
      }else{
        enloc[i].style.display = 'none';
      }
    }
  }
  //查询方法
  function selectCity(proxy){
    let city = document.getElementsByClassName('city');
    for(let i=0;i<city.length;i++){
      if(city[i].innerHTML.indexOf(proxy.target.value)>-1){
        city[i].style.display = 'block';
      }else{
        city[i].style.display = 'none';
      }
    }
  }
  const triprenderItem = function triprenderItem(index, key) {
    return <TRipList key={key} index={index}/>;
  }
  const stayrenderItem2 = function stayrenderItem(index, key) {
    return <STayList key={key} index={index}/>;
  }
  return (
    <div className={st.pt_relative+b+st.tp_40} style={{overflow:'scroll'}}>
      <div className={st.bg_blue1} style={{height:((sheight+40)<710?710:(sheight+40))}}>
        <p className={st.pd_10_8_5} style={{fontSize:15}}><b>基本信息</b></p>
        <div className={st.bg_white1+b+st.pd_t_8+b+st.pd_b_10} style={{fontSize:14}}>
          <div className={st.pd_5_7+b+st.hg_42}>
            <span className={st.hg_32+b+st.sp_width+b+st.wd_80+b+st.fl_lt+b+st.pd_4_0+b+st.ta_right}>申请号：</span>
            <input disabled type='text' style={{width:(swidth-iwd-pflag),fontSize:12}} className={st.ti_7+b+st.hg_32+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.fl_rt+b+st.bg_white1} value={Id}/>
          </div>
          <div className={st.pd_5_7+b+st.hg_40}>  
            <span className={st.hg_30+b+st.sp_width+b+st.wd_80+b+st.fl_lt+b+st.pd_4_0+b+st.ta_right}>申请人：</span>
            <Select value={Applicant} style={{width:(swidth-iwd-pflag)}} className={st.fl_rt} size='large' onChange={applicantChange}>
            {
             window.app?
             window.app.mAggregations.pages["0"].oModels.queryModel.oData.UserSet.results.map((r,i)=>(
               <Option value={r.Applicant}>{r.ApplicantName}</Option>               
             )):''
            }
            </Select>
          </div>
          <div className={st.pd_5_7+b+st.hg_40}>
            <span className={st.sp_width+b+st.wd_80+b+st.fl_lt}>
              <span className={st.sp_width+b+st.hg_30+b+st.cl_red+b+st.pd_4_0+b+st.wd_10+b+st.pd_l_2}>*</span>
              <span className={st.sp_width+b+st.hg_30+b+st.pd_4_0+b+st.ta_right+b+st.wd_70}>差旅类型：</span>
            </span>
            <Select value={TripActivity} style={{width:(swidth-iwd-pflag)}} className={st.fl_rt} size='large' onChange={tripActivityChange}>
            {
              window.app?
              window.app.mAggregations.pages["0"].oModels.queryModel.oData.TripActivities.results.map((r,i)=>(
                <Option value={r.ID}>{r.Description}</Option>
              )):''
            }
            </Select>
          </div>
          <div className={st.pd_5_7+b+st.hg_42}>
            <span className={st.sp_width+b+st.wd_80+b+st.fl_lt}>
              <span className={st.sp_width+b+st.hg_32+b+st.cl_red+b+st.pd_4_0+b+st.wd_10+b+st.pd_l_2}>*</span>
              <span className={st.sp_width+b+st.hg_32+b+st.pd_4_0+b+st.ta_right+b+st.wd_70}>出差目的：</span>
            </span>
            <input type='text' style={{width:(swidth-iwd-pflag),fontSize:12}} className={st.ti_7+b+st.hg_32+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.fl_rt+b+st.cl_grey3_65} onChange={purpose} value={Purpose}/>
          </div>
          <div className={st.pd_5_7+b+st.hg_40}>
            <span className={st.sp_width+b+st.wd_80+b+st.fl_lt}>
              <span className={st.sp_width+b+st.hg_30+b+st.cl_red+b+st.pd_4_0+b+st.wd_20+b+st.pd_l_16}>*</span>
              <span className={st.sp_width+b+st.hg_30+b+st.pd_4_0+b+st.ta_right+b+st.wd_60}>目的地：</span>
            </span>
            <span className={st.sp_width+b+st.fl_rt+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1} onClick={showEnd}>
              <span className={st.wd_20+b+st.hg_30+b+st.fl_rt+b+st.bg_white+b+st.pd_6_0} style={{fontSize:12}} >
                <Icon type="right" className={st.cl_grey3} style={{fontSize:12}}/>
              </span>
              <span className={st.ti_7+b+st.sp_width+b+st.fl_rt+b+st.hg_30+b+st.bg_white+b+st.cl_grey3_65+b+st.pd_6_0} style={{width:(swidth-iwd-pflag-22),fontSize:12}} >
                {LocationName}
              </span>
            </span>
          </div>
          <div className={st.pd_5_7+b+st.hg_42}>
            <span className={st.sp_width+b+st.wd_80+b+st.fl_lt}>
              <span className={st.sp_width+b+st.hg_32+b+st.cl_red+b+st.pd_4_0+b+st.wd_10+b+st.pd_l_2}>*</span> 
              <span className={st.sp_width+b+st.hg_32+b+st.pd_4_0+b+st.ta_right}>开始日期：</span>
            </span>
            <DatePicker
              allowClear={false}
              format="YYYY-MM-DD"
              placeholder="YYYY-MM-DD"
              onChange={onStartChange}
              style={{width:(swidth-iwd-pflag)}}
              className={st.fl_rt}
              size='large'
              value={startDate}
            />
          </div>
          <div className={st.pd_5_7+b+st.hg_42}>
            <span className={st.sp_width+b+st.wd_80+b+st.fl_lt}>
              <span className={st.sp_width+b+st.hg_32+b+st.cl_red+b+st.pd_4_0+b+st.wd_10+b+st.pd_l_2}>*</span>
              <span className={st.sp_width+b+st.hg_32+b+st.pd_4_0+b+st.ta_right}>结束日期：</span>
            </span>
            <DatePicker
              allowClear={false}
              format="YYYY-MM-DD"
              placeholder="YYYY-MM-DD"
              onChange={onEndChange}
              style={{width:(swidth-iwd-pflag)}}
              className={st.fl_rt}
              size='large'
              value={endDate}
            />
          </div>
          <div className={st.pd_5_7+b+st.hg_42}>
            <span className={st.hg_32+b+st.sp_width+b+st.wd_80+b+st.fl_lt+b+st.pd_4_0+b+st.ta_right}>经办人：</span>
            <input disabled style={{width:(swidth-iwd-pflag),fontSize:12}} value={window.app?window.app.mAggregations.pages["0"].oModels.queryModel.oData.OperatorName:''} type='text' className={st.ti_7+b+st.hg_32+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.fl_rt+b+st.bg_white1+b+st.cl_grey3_65}/>
          </div>
        </div>
        <div className={st.bg_blue1+b+st.pd_b_10+b+st.cr_both}>
          <div className={st.bg_white+b+st.mg_10+b+st.pt_relative+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5}>
            <img src={trip} onClick={tripShowAndHide} className={st.wd_40+b+st.hg_40+b+st.mg_5}/>
            <span className={st.pt_absolute+b+st.bt_25} style={{fontSize:15}}><b>差旅行程</b></span>
            <span className={st.pt_absolute+b+st.bt_10+b+st.lt_30+b+st.cl_grey2} style={{fontSize:12}}>
              {
                TripList[0].LocationBeg=='出发地'||TripList[0].LocationEnd=='目的地'||TripList[0].DatetimeBeg2==''||TripList[0].WayName=='请选择'?
                '请设置行程':'已设置'
              }
            </span>
            <Icon onClick={tripClick} className={st.pt_absolute+b+st.tp_20+b+st.rt_10+b+st.cl_grey1} style={{fontSize:20}} type="right"/>
          </div>
          <div id='tripContent' className={st.ds_none}>
            <div className={st.wd_full+b+st.bg_blue1} style={{fontSize:16}}>
              <ReactList
                itemRenderer={triprenderItem}
                length={TripList.length}
                type='uniform'
              />
            </div>
            <div className={st.mg_0_10+b+st.bg_white+b+st.cl_blue1+b+st.ta_center+b+st.pd_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5} style={{fontSize:14}} onClick={tripAdd}>+添加</div>
            <div className={st.hg_10}/>
            <div className={st.wd_full+b+st.bg_blue1} style={{fontSize:16}}>
              <ReactList
                itemRenderer={stayrenderItem2}
                length={StayList.length}
                type='uniform'
              />
            </div>
            <div className={st.mg_0_10+b+st.bg_white+b+st.cl_blue1+b+st.ta_center+b+st.pd_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5} style={{fontSize:14}} onClick={stayAdd}>+添加</div>
          </div>
          <div id='way' onClick={closeDiv} className={st.pt_fixed+b+st.bg_op_black+b+st.zi_6+b+st.bg_grey1+b+st.wd_full+b+st.tp__100+b+st.lf_0+b+st.ds_none} style={{height:(sheight+100)}} >
            <div className={st.pt_fixed+b+st.bt_0+b+st.lf_0+b+st.bg_white+b+st.wd_full+b+st.cl_black}>
              <div className={st.hg_50+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1} onClick={changeWay.bind(this,'OF')}>
                <span className={st.sp_width+b+st.wd_half+b+st.ta_right+b+st.hg_50+b+st.pd_2_10_2_0}><img src={fj} className={st.wd_40}/></span>
                <span className={st.sp_width+b+st.wd_half+b+st.ta_left+b+st.hg_50+b+st.fl_rt+b+st.pd_10_0}>飞机</span>
              </div>
              <div className={st.hg_50+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1} onClick={changeWay.bind(this,'OT')}>
                <span className={st.sp_width+b+st.wd_half+b+st.ta_right+b+st.hg_50+b+st.pd_2_10_2_0}><img src={hc} className={st.wd_40}/></span>
                <span className={st.sp_width+b+st.wd_half+b+st.ta_left+b+st.hg_50+b+st.fl_rt+b+st.pd_10_0}>火车</span>
              </div>
              <div className={st.hg_50+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1} onClick={changeWay.bind(this,'CE')}>
                <span className={st.sp_width+b+st.wd_half+b+st.ta_right+b+st.hg_50+b+st.pd_2_10_2_0}><img src={zc} className={st.wd_40}/></span>
                <span className={st.sp_width+b+st.wd_half+b+st.ta_left+b+st.hg_50+b+st.fl_rt+b+st.pd_10_0}>租车</span>
              </div>
            </div>
          </div>
          <div id='beloc' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none+b+st.pt_fixed} style={{height:(sheight)}}>
            <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
              <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
              <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-74)}}></span>
              <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>出发地</span>
            </div>
            <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
              <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectBeloc}/>
            </div>
            <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
              最近使用          
            </div>
            <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
              {
                TripList[tripindexs]?(TripList[tripindexs].LocationBegName=='请选择出发地'?'暂无':TripList[tripindexs].LocationBegName):'暂无'
              }
            </div>
            <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
              出发地
            </div>
            <div className={st.of_hi} style={{height:(sheight-222)}}>
              <div className={st.of_sc} style={{height:(sheight-222)}}>
              {
                window.app?
                    window.app.mAggregations.pages["0"].oModels.queryModel.oData.CountryRegionSet.results.map((r,i)=>(
                        <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'beloc'} onClick={changeBeginLocation.bind(this,r.FullID,r.FullName)}>
                        {r.FullName}
                        </div>
                    )):''
              }
              </div>
            </div>
          </div>
          <div id='enloc' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
            <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
              <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
              <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-74)}}></span>
              <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>目的地</span>
            </div>
            <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
              <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectBeloc}/>
            </div>
            <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
              最近使用          
            </div>
            <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
              {
                TripList[tripindexs]?(TripList[tripindexs].LocationEndName=='请选择目的地'?'暂无':TripList[tripindexs].LocationEndName):'暂无'
              }
            </div>
            <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
              目的地
            </div>
            <div className={st.of_hi} style={{height:(sheight-222)}}>
              <div className={st.of_sc} style={{height:(sheight-222)}}>
              {
                window.app?
                window.app.mAggregations.pages["0"].oModels.queryModel.oData.CountryRegionSet.results.map((r,i)=>(
                  <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'beloc'} onClick={changeEndLocation.bind(this,r.FullID,r.FullName)}>
                    {r.FullName}
                  </div>
                )):''
              }
              </div>
            </div>
          </div>
          <div id='city' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
            <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
              <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
              <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-82)}}></span>
              <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>入住城市</span>
            </div>
            <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
              <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectBeloc}/>
            </div>
            <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
              最近使用
            </div>
            <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
              {
                StayList[stayindexs2]?(StayList[stayindexs2].LocationEndNames=='入住城市'?'暂无':StayList[stayindexs2].LocationEndNames):'暂无'
              }
            </div>
            <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
              入住城市
            </div>
            <div className={st.of_hi} style={{height:(sheight-222)}}>
              <div className={st.of_sc} style={{height:(sheight-222)}}>
              {
                window.app?
                window.app.mAggregations.pages["0"].oModels.queryModel.oData.CountryRegionSet.results.map((r,i)=>(
                  <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'city'} onClick={changeCity.bind(this,r.FullID,r.FullName)}>
                  {r.FullName}
                  </div>
                )):''
              }
              </div>
            </div>
          </div>
          <div className={st.bg_white+b+st.mg_10+b+st.pt_relative+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5}>
            <img onClick={changeShowAndHide} src={cost} className={st.wd_40+b+st.hg_40+b+st.mg_5}/>
            <span className={st.pt_absolute+b+st.bt_25} style={{fontSize:15}}><b>费用估算</b></span>
            <span className={st.pt_absolute+b+st.bt_10+b+st.lt_30+b+st.cl_grey2} style={{fontSize:12}}>
            {
              costResult == 0?'未进行费用估算':('费用总计'+costResult)
            }
            </span>
            <Icon onClick={costClick} className={st.pt_absolute+b+st.tp_20+b+st.rt_10+b+st.cl_grey1} style={{fontSize:20}} type="right"/>
          </div>
          <div id='costPanel' className={st.bg_blue1+b+st.ds_none} style={{fontSize:16}}>
            <ReactList
              itemRenderer={renderItem}
              length={CostList.length}
              type='uniform'
            />
            <div className={st.mg_0_10+b+st.bg_white+b+st.cl_blue1+b+st.ta_center+b+st.pd_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5} style={{fontSize:14}} onClick={costAdd}>+添加</div>
            <div id='type' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
                <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
                <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-82)}}></span>
                <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>费用类型</span>
              </div>
              <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
                <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectType}/>
              </div>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
                最近使用          
              </div>
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
                {
                  CostList[costindexs]?(CostList[costindexs].EstimatedCostCatName=='请选择'?'暂无':CostList[costindexs].EstimatedCostCatName):'暂无'
                }
              </div>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
                费用类型
              </div>
              <div className={st.of_hi} style={{height:(sheight-222)}}>
                <div className={st.of_sc} style={{height:(sheight-222)}}>
                {
                  window.app?
                  window.app.mAggregations.pages["0"].oModels.queryModel.oData.ExpenseTypesSet.results.map((r,i)=>(
                    <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'type'} onClick={changeType.bind(this,r.ExpenseTypeID,r.Description)}>
                    {r.Description}
                    </div>
                  )):''
                }
                </div>
              </div>
            </div>
            <div id='money' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
                <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
                <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-64)}}></span>
                <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>货币</span>
              </div>
              <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
                <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectMoney}/>
              </div>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
                最近使用          
              </div>
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
                {
                  CostList[costindexs]?(CostList[costindexs].EstimatedCostAmount.CurrencyName=='请选择'?'暂无':CostList[costindexs].EstimatedCostAmount.CurrencyName):'暂无'
                }
              </div>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
                货币
              </div>
              <div className={st.of_hi} style={{height:(sheight-222)}}>
                <div className={st.of_sc} style={{height:(sheight-222)}}>
                {
                  window.app?
                  window.app.mAggregations.pages["0"].oModels.queryModel.oData.Currencies.results.map((r,i)=>(
                    <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'money'} onClick={changeMoney.bind(this,r.CurrencyCode,r.Description)}>
                    {r.Description}
                    </div>
                  )):''
                }
                </div>
              </div>
            </div>
          </div>
          <div className={st.bg_white+b+st.mg_10+b+st.pt_relative+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5}>
            <img onClick={borrowShowAndHide} src={borrow} className={st.wd_40+b+st.hg_40+b+st.mg_5}/>
            <span className={st.pt_absolute+b+st.bt_25} style={{fontSize:15}}><b>借款金额</b></span>
            <span className={st.pt_absolute+b+st.bt_10+b+st.lt_30+b+st.cl_grey2} style={{fontSize:12}}>
            {
              borrowResult == 0?'当前无借款':('借款总计'+borrowResult)
            }
            </span>
            <Icon onClick={borrowClick} className={st.pt_absolute+b+st.tp_20+b+st.rt_10+b+st.cl_grey1} style={{fontSize:20}} type="right"/>
          </div>
          <div id='borrowPanel' className={st.bg_blue1+b+st.ds_none} style={{fontSize:16}}>
            <ReactList
              itemRenderer={borrowrenderItem}
              length={BorrowList.length}
              type='uniform'
            />
            <div className={st.mg_0_10+b+st.bg_white+b+st.cl_blue1+b+st.ta_center+b+st.pd_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5} style={{fontSize:14}} onClick={borrowAdd}>+添加</div>
            <div id='borrowmoney' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
                <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
                <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-64)}}></span>
                <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>货币</span>
              </div>
              <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
                <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectBorrowMoney}/>
              </div>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
                最近使用          
              </div>
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
                {
                  BorrowList[borrowindexs]?(BorrowList[borrowindexs].WaersName=='请选择'?'暂无':BorrowList[borrowindexs].WaersName):'暂无'
                }
              </div>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
                货币
              </div>
              <div className={st.of_hi} style={{height:(sheight-222)}}>
                <div className={st.of_sc} style={{height:(sheight-222)}}>
                {
                  window.app?
                  window.app.mAggregations.pages["0"].oModels.queryModel.oData.Currencies.results.map((r,i)=>(
                    <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'money'} onClick={changeBorrowMoney.bind(this,r.CurrencyCode,r.Description)}>
                    {r.Description}
                    </div>
                  )):''
                }
                </div>
              </div>
            </div>
          </div>
          <div className={st.bg_white+b+st.mg_10+b+st.pt_relative+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5}>
            <img onClick={distriShowAndHide} src={distri} className={st.wd_40+b+st.hg_40+b+st.mg_5}/>
            <span className={st.pt_absolute+b+st.bt_25} style={{fontSize:15}}><b>成本分配</b></span>
            <span className={st.pt_absolute+b+st.bt_10+b+st.lt_30+b+st.cl_grey2} style={{fontSize:12}}>{distriResult}</span>
            <Icon onClick={distriClick} className={st.pt_absolute+b+st.tp_20+b+st.rt_10+b+st.cl_grey1} style={{fontSize:20}} type="right"/>
          </div>
          <div id='distriPanel' className={st.bg_blue1+b+st.ds_none} style={{fontSize:16}}>
            <ReactList
              itemRenderer={distrirenderItem}
              length={DistriList.length}
              type='uniform'
            />
            <div className={st.mg_0_10+b+st.bg_white+b+st.cl_blue1+b+st.ta_center+b+st.pd_10+b+st.bd_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.bd_r_5} style={{fontSize:14}} onClick={distriAdd}>+添加</div>
            <div id='distritype' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
                <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
                <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-82)}}></span>
                <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>成本类型</span>
              </div>
              <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
                <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectDistriType}/>
              </div>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
                最近使用          
              </div>
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
                {
                  DistriList[distriindexs]?(DistriList[distriindexs].CostObjectItemName=='请选择'?'暂无':DistriList[distriindexs].CostObjectItemName):'暂无'
                }
              </div>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
              成本类型
              </div>
              <div className={st.of_hi} style={{height:(sheight-222)}}>
                <div className={st.of_sc} style={{height:(sheight-222)}}>
                {
                  window.app?
                  window.app.mAggregations.pages["0"].oModels.queryModel.oData.CostObjectTypesSet.results.map((r,i)=>(
                    <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'type'} onClick={changeDistriType.bind(this,r.CostObjectTypeID,r.Description)}>
                    {r.Description}
                    </div>
                  )):''
                }
                </div>
              </div>
            </div>
            <div id='distridesc' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
                <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
                <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-64)}}></span>
                <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>描述</span>
              </div>
              <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
                <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectDistriDesc}/>
              </div>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
                最近使用
              </div>
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
                {
                  DistriList[distriindexs]?(DistriList[distriindexs].CostObjectName=='请选择'?'暂无':DistriList[distriindexs].CostObjectName):'暂无'
                }
              </div>
              <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
                描述
              </div>
              <div className={st.of_hi} style={{height:(sheight-222)}}>
              <div className={st.of_sc} style={{height:(sheight-222)}}>
              {
                itemList[distriindexs]&&itemList[distriindexs].length>0&&itemList[distriindexs][0].itemName!='请选择'?itemList[distriindexs].map((r,i)=>(
                  <div key={i} className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'desc'} onClick={changeDesc.bind(this,r.itemKey,r.itemName)}>
                  {r.itemName}
                  </div>
                )):''
              }
              </div>
            </div>
          </div>
        </div>
        <div className={st.hg_40}/>
        </div>
      </div>
      <div style={{fontSize:16}} className={st.hg_40+b+st.bg_grey2+b+st.pt_fixed+b+st.wd_full+b+st.zi_1+b+st.pt_relative+b+st.bt_0+b+st.cl_white}>  
        <span className={st.sp_width+b+st.fl_lt} onClick={showDiv}>
          <img src={lw} className={st.wd_50+b+st.hg_40+b+st.pd_5_10+b+st.fl_lt} />
          <span className={st.sp_width+b+st.hg_40+b+st.fl_lt+b+st.pd_7_0} style={{width:(swidth-190)}}>{errList.length==0?'':errList.length}</span>
        </span>
        <span style={{width:70}} className={st.pt_relative+b+st.sp_width+b+st.hg_40+b+st.pd_8_0+b+st.ta_center+b+st.fl_lt} onClick={submitBtn}>提交</span>
        <span style={{width:70}} className={st.pt_relative+b+st.sp_width+b+st.hg_40+b+st.pd_8_0+b+st.ta_center+b+st.fl_lt} onClick={saveBtn}>保存</span>
      </div>
      <div id='info' className={st.pt_fixed+b+st.bt_0+b+st.lf_0+b+st.bt_0+b+st.bg_white+b+st.wd_full+b+st.hg_300+b+st.zi_6+b+st.ds_none}>
        <div className={st.hg_40+b+st.wd_full+b+st.bg_grey2}>
          <span className={st.hg_40+b+st.sp_width+b+st.wd_40+b+st.fl_lt+b+st.pd_10+b+st.cl_white} onClick={returnInfo}>
            <Icon type="bulb" style={{fontSize:18}}/>
          </span>
          <span className={st.ta_left+b+st.cl_white+b+st.pd_7+b+st.fl_lt+b+st.hg_40} style={{fontSize:18}}>错误消息</span>
          <span className={st.hg_40+b+st.sp_width+b+st.wd_40+b+st.fl_rt+b+st.pd_10+b+st.cl_white} onClick={closeDiv}>
            <Icon type="close" style={{fontSize:18}}/>
          </span>
        </div>
        <div className={st.of_sc+b+st.hg_260+b+st.bd_b_s+b+st.bd_w_1}>
        {
          errList.map((r,i)=>(
            <div className={st.hg_40+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1} key={i} onClick={showErrDetail.bind(this,r)}>
              <span className={st.sp_width+b+st.wd_40+b+st.hg_40+b+st.cl_red+b+st.fl_lt+b+st.pd_8}><Icon type="exclamation-circle-o" style={{fontSize:16}} /></span>
              <span className={st.sp_width+b+st.hg_40+b+st.pd_8_0+b+st.txof+b+st.fl_lt} style={{width:(swidth-80),fontSize:16}}>{r}</span>
              <span className={st.sp_width+b+st.wd_40+b+st.fl_lt+b+st.hg_40+b+st.pd_8}><Icon type='right' style={{fontSize:16}}/></span>
            </div>      
          ))
        }
        </div>
      </div>
      <div id='detail' className={st.pt_fixed+b+st.bt_0+b+st.lf_0+b+st.bt_0+b+st.bg_white+b+st.wd_full+b+st.hg_300+b+st.zi_6+b+st.ds_none}>
        <div className={st.hg_40+b+st.wd_full+b+st.bg_grey2}>
          <span className={st.hg_40+b+st.sp_width+b+st.wd_40+b+st.fl_lt+b+st.pd_10+b+st.cl_white} onClick={returnInfo}>
            <Icon type="left" style={{fontSize:18}}/>
          </span>
          <span className={st.ta_left+b+st.cl_white+b+st.pd_7+b+st.fl_lt+b+st.hg_40} style={{fontSize:18}}>消息详情</span>
          <span className={st.hg_40+b+st.sp_width+b+st.wd_40+b+st.fl_rt+b+st.pd_10+b+st.cl_white} onClick={closeDetail}>
            <Icon type="close" style={{fontSize:18}}/>
          </span>
        </div>
        <div className={st.of_sc+b+st.hg_260+b+st.bd_b_s+b+st.bd_w_1+b+st.pd_7+b+st.ti_20} style={{fontSize:16}}>
          {errDetail}
        </div>
      </div>
      <div id='showend' className={st.bg_white+b+st.pt_fixed+b+st.zi_6+b+st.wd_full+b+st.bt_0+b+st.lf_0+b+st.of_sc+b+st.ds_none} style={{height:(sheight)}}>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bg_grey1+b+st.hg_40} style={{fontSize:18}}>
          <span className={st.wd_40+b+st.hg_40+b+st.sp_width+b+st.fl_lt+b+st.pd_6_10+b+st.cl_white} onClick={closeDiv}><Icon type='left'/></span>
          <span className={st.hg_40+b+st.sp_width+b+st.fl_lt} style={{width:((swidth/2)-74)}}></span>
          <span className={st.ta_left+b+st.sp_width+b+st.hg_40+b+st.cl_white+b+st.fl_lt+b+st.pd_6}>目的地</span>
        </div>
        <div className={st.bg_blue2+b+st.pd_8+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1}>
          <input className={st.wd_full+b+st.ta_center+b+st.ip_no_bd+b+st.hg_35+b+st.bd_r_5} type='text' placeholder='搜索' onChange={selectShowEnd}/>
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          最近使用          
        </div>
        <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0} onClick={closeDiv}>
          {LocationName?(LocationName==''?'暂无':LocationName):'暂无'}
        </div>
        <div className={st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ti_15+b+st.bg_blue2+b+st.cl_blue2+b+st.hg_40+b+st.pd_7_0}>
          目的地
        </div>
        <div className={st.of_hi} style={{height:(sheight-222)}}>
          <div className={st.of_sc} style={{height:(sheight-222)}}>
          {
            window.app?
            window.app.mAggregations.pages["0"].oModels.queryModel.oData.CountryRegionSet.results.map((r,i)=>(
              <div className={st.hg_45+b+st.bd_b_s+b+st.bd_w_1+b+st.bd_c_grey1+b+st.ta_center+b+st.pd_10_0+b+'showend'} onClick={locationChange.bind(this,r.FullID,r.FullName)}>
                {r.FullName}
              </div>
            )):''
          }
          </div>
        </div>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    startDate:state.travel.startDate,
    endDate:state.travel.endDate,
    errDetail:state.travel.errDetail,
    errList:state.travel.errList,
    refresh:state.travel.refresh,
    Id:state.travel.Id,//申请号
    Applicant:state.travel.Applicant,//申请人
    TripActivity:state.travel.TripActivity,//F，应该是差旅类型
    TripActivityName:state.travel.TripActivityName,
    Purpose:state.travel.Purpose,//出差目的
    Location:state.travel.Location,//目的地，甘肃260
    LocationName:state.travel.LocationName,
    CountryCode:state.travel.CountryCode,//国家代码
    CountryName:state.travel.CountryName,//国家名称
    RegionCode:state.travel.RegionCode,//地区代码
    RegionName:state.travel.RegionName,//地区名称
    Departure:state.travel.Departure,//开始日期
    Departure2:state.travel.Departure2,//开始日期
    Arrival:state.travel.Arrival,//结束日期
    Arrival2:state.travel.Arrival2,//结束日期
    LastChangeDate:state.travel.LastChangeDate,//结束日期
    Operator:state.travel.Operator,//经办人
    Note:state.travel.Note,
    UserAction:state.travel.UserAction,
    TripList:state.trip.list,
    StayList:state.trip.list2,
    CostList:state.cost.list,
    BorrowList:state.borrow.list,
    DistriList:state.distri.list,
    costResult:state.cost.costResult,
    borrowResult:state.borrow.borrowResult,
    distriResult:state.distri.distriResult,
    costindexs:state.cost.indexs,
    costrefresh:state.cost.refresh,
    borrowindexs:state.borrow.indexs,
    borrowrefresh:state.borrow.refresh,
    distriindexs:state.distri.indexs,
    distrirefresh:state.distri.refresh,
    itemList:state.distri.itemList,
    tripindexs:state.trip.indexs,
    stayindexs2:state.trip.indexs2,
    triprefresh:state.trip.refresh,
  };
}

export default connect(mapStateToProps)(Travel);
