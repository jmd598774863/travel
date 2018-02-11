import st from '../../css/simple.css';
function Blank({height,color}) {
  const b = ' ';
  return (
    <div style={{height:height,backgroundColor:color}}/>
  );
}
export default Blank;
