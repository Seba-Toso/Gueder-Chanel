// imports
import React, {useState} from 'react'
import * as Icon from 'react-icons/vsc'


const Drawer = ({corsEnablingApiURL, handleLocationData}) => {
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
    
    const [ locationData, setlocationData ] = useState([])
    const handleSearch = (e) => {
        e.preventDefault()
        fetch(`${corsEnablingApiURL}https://www.metaweather.com/api/location/search/?query=san`, {
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


    const locationsList = () => {
        return(
            locationData.map( location => 
            <li 
            key={location.woeid} 
            className='drawerItem' 
            onClick={() => handleLocationData(location.woeid)}
            >
                <h2 className='drawerItemTitle'>{location.title}</h2>
                <Icon.VscChevronRight />
            </li>
            )
        )
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
            <button 
            onClick={()=>alert('searchlocation')} 
            className="headerBtn geoloc"
            >
                <Icon.VscPerson/>
            </button>
        </div>
        <div className='drawer' style={{transform: drawerPosition}}>
            <div className='headerContainer'>
                <form className='searchInput' onSubmit={handleSearch}>
                    <input placeholder={`search location`} /> 
                    <button className="headerBtn search"><Icon.VscSearch/></button>
                </form>
                
                <button 
                    onClick={closeDrawer} 
                    className="headerBtn closeTab"
                >
                    <Icon.VscClose />
                </button>
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