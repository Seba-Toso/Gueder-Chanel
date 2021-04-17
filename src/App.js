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
      //console.log('location data, ', currentLocationData);
  }

  const [ temperatureSystem, setTemperatureSystem ] = useState(false)
  const [ velocitySystem, setVelocitySystem ] = useState(false)
  const handleTemperatureSystem = (check) => {
      //console.log(check);
      setTemperatureSystem(!temperatureSystem)
  }
  const handleVelocitySystem = () => {
      //console.log();
      setVelocitySystem(!velocitySystem)
  }

  
  return (
    <div className="App App-header">
      <Drawer 
      corsEnablingApiURL={corsEnablingApiURL} 
      handleLocationData={handleLocationData} 
      handleTemperatureSystem={handleTemperatureSystem} 
      handleVelocitySystem={handleVelocitySystem} 
      temperatureSystem={temperatureSystem}
      velocitySystem={velocitySystem}
      />
    
      <div className='pagesContainer'>
        <MainView 
        currentLocationData={currentLocationData} 
        temperatureSystem={temperatureSystem}
        />
        <ContentView 
        currentLocationData={currentLocationData}
        temperatureSystem={temperatureSystem}
        velocitySystem={velocitySystem}
        />
      </div>

    </div>
  );
}

export default App;
