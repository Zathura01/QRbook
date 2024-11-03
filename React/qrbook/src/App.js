import { BrowserRouter as Router, Route , Routes} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Screen from './Components/Screen';
import QR from './Components/QR';
import Scan from './Components/Scan';
import Login from './Components/Login';
import NewLogin from './Components/NewLogin';

function App() {
  return (
   
   <Router>
   <div>
    <Routes>
    <Route path='/Screen' element={<Screen/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Scan' element={<Scan/>}/>
    <Route path='/' element={<NewLogin/>}/>
    </Routes>
    <div>

    </div>
    </div> 
   </Router>
   
  );
}

export default App;
