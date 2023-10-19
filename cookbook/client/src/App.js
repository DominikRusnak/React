import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="basicInfo"> 
        <h1>Hi, this is me attempting a cookbook frontend.</h1>
        <h6>I'm not a very good programmer.</h6>
        <progress id="taskCompletion" value="5" max="100">32%</progress>
        <h6>Task completion progress</h6>
      </div>
    </div>
  );
}

export default App;
