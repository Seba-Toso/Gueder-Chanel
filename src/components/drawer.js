// imports
import React, {useState} from 'react'
import * as Icon from 'react-icons/vsc'
import Switch from "react-switch";


const Drawer = ({corsEnablingApiURL, handleLocationData, handleTemperatureSystem, temperatureSystem, handleVelocitySystem, velocitySystem}) => {

    const [ isOpen, setIsOpen ] = useState(false)
    let drawerPosition = `translateX(${isOpen? '100%' : '-100%'})`
    const openDrawer = () => {
        //console.log('open')
        setIsOpen(true)
    }
    const closeDrawer = () => {
        //console.log('close')
        setIsOpen(false)
    }
    
    const [ inputLocation, setInputLocation ] = useState('')
    const [ locationData, setlocationData ] = useState([])
    const handleInput = (e) => {
        setInputLocation(e.target.value)
        //console.log(e.target.value);
    }
    const handleSearch = (e) => {
        e.preventDefault()
        fetch(`${corsEnablingApiURL}https://www.metaweather.com/api/location/search/?query=${inputLocation}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setlocationData(data))
        .catch(error => console.log(error))
        //console.log('data fetched, ', locationData);
    }

    
    const handleGeolocation = () =>{
        const success = (pos) => {
            let {latitude, longitude} = pos.coords
            console.log(latitude, longitude);
            fetch(`${corsEnablingApiURL}https://www.metaweather.com/api/location/search/?lattlong=${latitude.toFixed(2)},${longitude.toFixed(2)}`, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => handleLocationData(data[0].woeid))
        .catch(error => console.log(error))
        }

        const error = (err) => {
            console.log(err);
        }
        
        navigator.geolocation.getCurrentPosition(success, error)
    }


    const locationsList = () => {
        return(
            locationData.map( location => 
            <li 
            key={location.woeid} 
            className='drawerItem' 
            onClick={() => {
                handleLocationData(location.woeid)
                setIsOpen(false)
            }}
            >
                <h2 className='drawerItemTitle'>{location.title}</h2>
                <Icon.VscChevronRight />
            </li>
            )
        )
    }

    const handleTemperatureSwitch = (e) => {
        console.log(e);
        handleTemperatureSystem()
    }
    const handleVelocitySwitch = (e) => {
        console.log(e);
        handleVelocitySystem()
    }


    return (
        <React.Fragment>
        <div className='headerContainer'>
            <button 
            onClick={openDrawer} 
            className="headerBtn openTab"
            >
                Search <Icon.VscSearch />
            </button>
            <div>
                <button 
                onClick={handleGeolocation} 
                className="headerBtn geoloc"
                >
                <Icon.VscPerson/>
                </button>
            </div>
        </div>
        <div className='drawer' style={{transform: drawerPosition}}>
            <div className='headerContainer'>
                <form className='searchInput' onSubmit={handleSearch}>
                    <input placeholder={`search for a city`} value={inputLocation} onChange={handleInput} autoFocus={true} /> 
                    <button className="headerBtn search"><Icon.VscSearch/></button>
                </form>
                
                <button 
                    onClick={closeDrawer} 
                    className="headerBtn closeTab"
                >
                    <Icon.VscClose />
                </button>
            </div>
            <div className='settings'>
                <span>
                    <p>°C </p>
                    <Switch 
                        onChange={handleTemperatureSwitch} 
                        checked={temperatureSystem} 
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={20}
                        width={48}
                        className="react-switch"
                        id="material-switch"
                    />
                    <p> °F</p>
                </span>
                <span>
                    <p>mph </p>
                    <Switch 
                        onChange={handleVelocitySwitch} 
                        checked={velocitySystem} 
                        onColor="#86d3ff"
                        onHandleColor="#2693e6"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        height={20}
                        width={48}
                        className="react-switch"
                        id="material-switch"
                    />
                    <p> km/h</p>
                </span>
            </div>
            <br/>
            <ul className='drawerList'>
                {locationsList()}
            </ul>
        </div>
        </React.Fragment>
    )
}

export default Drawer;