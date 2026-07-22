import { NavbarSection } from './components/NavbarSection/NavbarSection'
import { Home} from './components/Home';
import { useRef } from 'react';
import './App.css'

export default function App() {
  const navRef = useRef()
     
 return(
  
<div className="App">  
  <NavbarSection ref={navRef} />
  <Home navRef={navRef} />   
</div>

 )  
}