import "./FrameTop.css";

function FrameTop(props) {
  return (
    <div className="FrameTop">
      <div className="img-container">
        <img src='../b_investor_logo2.png' alt='Logo'/>
      </div>
      <h1>{props.title}</h1>
    </div>
  );
}

export default FrameTop;
