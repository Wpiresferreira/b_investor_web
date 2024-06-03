// import "./Button.css";
import styles from "./Button.module.css";

function Button(props) {
  const Caption = props.caption;

  var buttonClick = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <div className={styles.DefaultButton}>
      <button
        type={props.type}
        className={styles.Button}
        name="Button"
        onClick={buttonClick}
        >
        {Caption}
      </button>
    </div>
  );
}

export default Button;
