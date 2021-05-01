// imports
import React from 'react'
import Card from './card'
import ProgressBar from "@ramonak/react-progress-bar";
import { IoMdNavigate } from 'react-icons/io'

const ContentView = ({currentLocationData, temperatureSystem, velocitySystem}) => {
    let week = []
    if(currentLocationData){
        week = currentLocationData.consolidated_weather
    }

    const temperatureFormat = {
        scale: !temperatureSystem? '°C' : '°F',
        value: (temp) => {
            return(
            !temperatureSystem? 
            temp.toFixed(1)
            :
            (((temp * 9)/5)+32).toFixed(2)
        )}
    }
    const velocityFormat = {
        scale: !velocitySystem? 'mph' : 'kmh',
        value: (vel) => {
            return(
            !velocitySystem? 
            vel.toFixed(1)
            :
            (vel * 1.61).toFixed(0)
        )}
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
                        <small>{temperatureFormat.value(data.min_temp)+temperatureFormat.scale}</small>
                         ● 
                        <small>{temperatureFormat.value(data.max_temp)+temperatureFormat.scale}</small>
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
                <div className='hightlightData'><h1>{velocityFormat.value(week[0].wind_speed)}</h1> <small>{velocityFormat.scale}</small></div>
                <div className='hightlightData'>
                    <IoMdNavigate fontSize='18px' id='windDirection' style={{transform: `rotate(${week[0].wind_direction.toFixed(0)}deg)`}}/>
                    {week[0].wind_direction_compass}
                </div>
            </div>
            <div className='hightlightContainer humidity'>
                <p>Humidity</p>
                <div className='hightlightData'><h1>{week[0].humidity}</h1> <small>%</small></div>
                <ProgressBar className='humidityProgress' completed={week[0].humidity} bgColor='#e2f51a' width='100%' height='5px' isLabelVisible={false}  />
            </div>
            <div className='hightlightContainer'>
                <p>Visibility</p>
                <div className='hightlightData'><h1>{velocityFormat.value(week[0].visibility)}</h1> <small>{!velocitySystem? 'milles' : 'KM' }</small></div>
            </div>
            <div className='hightlightContainer'>
                <p>Air Pressure</p>
                <div className='hightlightData'><h1>{week[0].air_pressure}</h1> <small>mb</small></div>
            </div>
            </React.Fragment>
        )
    }

    const defaultContent = () => {
        return (
            <div className='contentContainer'>
                <h1 className='defaultTitle'>Important Anouncement</h1>
                <p>To make this work (for now) you have to give permissions to you PC to get data from the API</p>
                <p>
                    Please enter <a href='https://cors-anywhere.herokuapp.com/corsdemo' target='_blank' rel='noreferrer'>
                        here
                    </a> and Request temporary access to the demo server"
                </p>
                <div className='defaultTextContainer'>
                <h2 className='defaultSubtilte'>Global warming and climate change</h2>
                <p className='defaultText'>Global warming is the increase of Earth's average surface temperature due to greenhouse gases that collect in the atmosphere like a thickening blanket, trapping the sun's heat and causing the planet to warm up</p>
                <p className='defaultText'>Greenhouse gases keep heat close to the earth’s surface making it livable for humans and animals. However, global warming is happening largely due to an over-emittance of these gases and fossil fuels (natural oil, gasoline, coal).</p>
                <p className='defaultText'>Global climate change has already had observable effects on the environment. Glaciers have shrunk, ice on rivers and lakes is breaking up earlier, plant and animal ranges have shifted and trees are flowering sooner.</p>
                <p className='defaultText'>Heat waves caused by global warming present greater risk of heat-related illness and death, most frequently among people who have diabetes who are elderly or are very young.</p>
                <p className='defaultText'>Global warming puts coral reefs in danger as the ocean warms, scientist fear that coral reefs will not be able to adapt quickly enough to the resulting changing conditions, and bleaching incidents and diseases will increase</p>
                </div>
                <small className='footer'>Developed by Sebastian Toso (Don Toxo)</small>
            </div>
        )
    }

    
    return week.length === 0?
    defaultContent()
    :
    (
        <div className='contentContainer'>
            <div className='weekContainer'>{displayMoreDays()}</div>
            <br/>
            <div className='weekSubtitle'>
                <h2 style={{width: '80%',textAlign: 'left', marginLeft: '1rem'}}>Today's Hightlight</h2>
            </div>
            <div className='weekContainer'>{displayData()}</div>
            <small className='footer'>Developed by Sebastian Toso (Don Toxo)</small>
        </div>
    )
}

export default ContentView;