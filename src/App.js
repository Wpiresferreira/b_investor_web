import './index.css';
import DefaultBox from './components/DefaultBox';

function App() {
  return (
    <div className="App">
      <DefaultBox label ='Username'>
      </DefaultBox>
      <DefaultBox label ='Password' type='password'>
      </DefaultBox>
      
      <button> teste </button>
    </div>
  );
}



export default App;
