// imports
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
    
    return currentLocationData === null || today === null ? 
        <div className='mainContainer'>
            <h1>-</h1>
            <h1>NN<small>°C</small></h1>
            <strong>-</strong>
            <div><span>When</span> - <span>ddd, d° mmm</span></div>
            <div><VscLocation fontSize={22}/> <span>-</span></div>
        </div> 
        : 
        <div className='mainContainer'>
            <div>{dayIcon}</div>
            <div><h1>{today.the_temp.toFixed(1)}</h1> <p>°C</p></div>
            <div><strong>{today.weather_state_name}</strong></div>
            <div><span>Today</span> - <span>{today.applicable_date}</span></div>
            <div><VscLocation fontSize={22}/> <span> {currentLocationData.title}</span></div>
        </div>
    
}

export default MainView;