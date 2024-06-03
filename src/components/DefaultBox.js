import "./DefaultBox.css";

function DefaultBox(props) {
  const InputId = props.label + "-input";
  const LabelId = props.label + "-label";

  const type = props.type === "" ? "text" : props.type;

  const onFocusFunction = () => {
    let label = document.getElementById(LabelId);
    let inputBox = document.getElementById(InputId);

    if (inputBox.value.length !== 0) {
      label.style.fontSize = "small";
      label.style.margin = "8px";
    } else {
      label.style.animation = "reSizeFont 0.5s";
      label.style.fontSize = "small";
      label.style.margin = "8px";
    }
  };

  const onBlurFunction = () => {
    let label = document.getElementById(LabelId);
    let inputBox = document.getElementById(InputId);

    if (inputBox.value.length !== 0) {
      label.style.fontSize = "small";
      label.style.margin = "8px";
    } else {
      label.style.animation = "reSizeFontInvert 0.5s";
      label.style.fontSize = "x-large";
      label.style.margin = "15px";
      // label.style.animation = 'reSizeFontInvert 3s';
    }
  };

  const onKeyUpFunction = (e) => {
    console.log("function onKey called");
    if(e.key !== 'Enter'){
        return;
    };
    var focussableElements = document.querySelectorAll("input, button");
    console.log(focussableElements);

    var elementIndex = -1;
    for(let i =0; i< focussableElements.length;i++){
      if (document.activeElement === focussableElements[i]) {
        elementIndex = i;
      }
    }
    if (elementIndex >= 0) {
      focussableElements[elementIndex + 1].focus();
    }
  };

  return (
    <div className="DefaultBox">
      <label htmlFor="InputBox" className="Label" id={LabelId}>
        {props.label}
      </label>
      <input
        className="InputBox"
        type={type}
        id={InputId}
        name="InputBox"
        onBlur={onBlurFunction}
        onFocus={onFocusFunction}
        onKeyUp={onKeyUpFunction}
      />
    </div>
  );
}

export default DefaultBox;
