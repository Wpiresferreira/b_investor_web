import './DefaultBox.css';

function DefaultBox(props){

    const InputId = props.label + '-input'
    const LabelId = props.label + '-label'

const type = props.type === 'password' ? 'password' : 'text'

    const onFocusFunction = () => { 
        let label = document.getElementById(LabelId);
        let inputBox = document.getElementById(InputId);
        
        if(inputBox.value.length !== 0 ){
            label.style.fontSize = 'medium'
        }
        else{
            label.style.animation = 'reSizeFont 1s';
            label.style.fontSize = 'medium'
        }
    }

    const onBlurFunction = () => { 
        let label = document.getElementById(LabelId);
        let inputBox = document.getElementById(InputId);
        
        if(inputBox.value.length !== 0 ){
            label.style.fontSize = 'medium'
        }
        else{
            label.style.animation = 'reSizeFontInvert 1s';
            label.style.fontSize = 'x-large'
           // label.style.animation = 'reSizeFontInvert 3s';
        }
    }


    return(
        <div className="DefaultBox">
            <label for='InputBox' className='Label' id={LabelId}>{props.label}</label>
            <input className='InputBox'  type = {type} id={InputId} name="InputBox" onBlur={onBlurFunction} onFocus={onFocusFunction}/>
        </div>
    )
}

export default DefaultBox