import DefaultBox from './DefaultBox';
import Button from './Button'
import styles from "./FrameLogin.module.css";

function doLogin(e){
e.preventDefault();
console.log(e);
}

function FrameLogin() {
  return (
    <form className={styles.FrameLogin} onSubmit={doLogin}>
      <DefaultBox label ='Username' type='email'>
      </DefaultBox>
      <DefaultBox label ='Password' type='password'>
      </DefaultBox>
      <input className={styles.checkbox} name='checkbox' type='checkbox'/>
      <label className={styles.label} htmlFor='checkbox'>Remember me</label>
      <Button type='submit' caption='Sign In'></Button>
      <p className={styles.p}>Create a free account - <b>Sign Up</b></p>
    </form>
  );
}

export default FrameLogin;
