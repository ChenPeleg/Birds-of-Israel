
import './App.css';
import BirdCardContainerLayout from './layouts/birrd-card-container-layout';

function App() {
  return (
    <div>
      <div className="app-background">
        <BirdCardContainerLayout />
      </div>
      <div id="copyrights" className="no-overflow">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        &copy;
        כל הזכויות שמורות לחן פלג 2021
        &nbsp;&nbsp;&nbsp;
      </div>
    </div>
  );
}

export default App;
