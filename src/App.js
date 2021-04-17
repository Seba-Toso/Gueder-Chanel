import { useState } from 'react'
import Drawer from './components/drawer'
import MainView from './components/mainView'
import ContentView from './components/contentView'
import './App.css';


const App = () => {

  const corsEnablingApiURL = 'https://cors-anywhere.herokuapp.com/';
  const [ currentLocationData, setCurrentLocationData ] = useState(null)
  const handleLocationData = (woeid) => {
      console.log('locationWoeid', woeid);
      fetch(`${corsEnablingApiURL}https://www.metaweather.com/api/location/${woeid}/`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json'
      }
  })
      .then(response => response.json())
      .then(data => setCurrentLocationData(data))
      .catch(error => console.log(error))
      console.log('location data, ', currentLocationData);
  }
  
  return (
    <div className="App App-header">
      <Drawer corsEnablingApiURL={corsEnablingApiURL} handleLocationData={handleLocationData} />
      <div className='pagesContainer'>
        <MainView currentLocationData={currentLocationData} corsEnablingApiURL={corsEnablingApiURL}/>
        <ContentView currentLocationData={currentLocationData} />
      </div>
      <small className='footer'>Developed by Sebastian Toso (Don Toxo)</small>
    </div>
  );
}

export default App;
