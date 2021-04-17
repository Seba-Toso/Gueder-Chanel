// imports
import React from 'react'
import { VscLocation } from 'react-icons/vsc'


const MainView = ({currentLocationData}) => {


    let today = null
    let dayIcon = "-"
    if(currentLocationData){
        today = currentLocationData.consolidated_weather[0]
        dayIcon = <img 
        src={`https://www.metaweather.com/static/img/weather/${today.weather_state_abbr}.svg`} 
        alt='Forecast of the day'
        className='todayImage'
        />
    }

    const defaultContent = () => {
        return (
            <React.Fragment>
                <h1 >Have a nice day!</h1>
                <h2 >Whenever it rained, then there was sun.</h2>
                <small>Press geolocation or search a place to see the forecast.</small>
            </React.Fragment>
        )
    }
    
    return currentLocationData === null || today === null ? 
        <div className='mainContainer'>
            {defaultContent()}
        </div> 
        : 
        <div className='mainContainer'>
            <div>{dayIcon}</div>
            <div><h1>{today.the_temp.toFixed(1)}</h1> <p>°C</p></div>
            <div><strong>{today.weather_state_name}</strong></div>
            <div><span>Today</span> ● <span>{today.applicable_date}</span></div>
            <div><VscLocation fontSize={32} style={{verticalAlign: 'sub'}}/> <h2>{currentLocationData.title}</h2></div>
        </div>
    
}

export default MainView;