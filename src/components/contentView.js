// imports
import React from 'react'
import Card from './card'

const ContentView = ({currentLocationData}) => {

    let week = []
    if(currentLocationData){
        week = currentLocationData.consolidated_weather
    }


    const displayMoreDays = () => {
        return (
            week.map((data, index) => index === 0 ? 
                null 
                :
                <Card key={data.id} className='weekCards'>
                    <div>
                        <p className='dayTitle'>{index === 1? 'Tomorrow' : data.applicable_date}</p>
                    </div>
                    <div className='dayimage'>
                        <img 
                        src={`https://www.metaweather.com/static/img/weather/${data.weather_state_abbr}.svg`} 
                        alt='Forecast of the day'
                        className='weekImage'
                        />
                    </div>
                    <div className='dayMinMax'>
                        <small>{data.min_temp.toFixed(1)}  {data.max_temp.toFixed(1)}</small>
                    </div>
                </Card>
            )
        )
    }
    const displayData = () => {
        return (
            <React.Fragment>
            <div className='hightlightContainer'>
                <p>Wind Status </p>
                <div><h1>{week[0].wind_speed.toFixed(0)}</h1> <small>mph</small></div>
                <div>{week[0].wind_direction_compass}</div>
            </div>
            <div className='hightlightContainer'>
                <p>Humidity</p>
                <div><h1>{week[0].humidity}</h1> <small>%</small></div>
                <div>Some random animation</div>
            </div>
            <div className='hightlightContainer'>
                <p>Visibility</p>
                <div><h1>{week[0].visibility.toFixed(1)}</h1> <small>milles</small></div>
            </div>
            <div className='hightlightContainer'>
                <p>Air Pressure</p>
                <div><h1>{week[0].air_pressure}</h1> <small>mb</small></div>
            </div>
            </React.Fragment>
        )
    }
    
    return week.length === 0?
    null
    :
    (
        <div className='contentContainer'>
            <div className='weekContainer'>{displayMoreDays()}</div>
            <br/>
            <div className='weekSubtitle'>
                <h2 style={{width: '80%',textAlign: 'left', marginLeft: '1rem'}}>Today's Hightlight</h2>
            </div>
            <div className='weekContainer'>{displayData()}</div>
        </div>
    )
}

export default ContentView;