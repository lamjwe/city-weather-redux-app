import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
    renderWeather(cityData) {
        const cityName = cityData.city.name;
        const temps = cityData.list.map(weather => weather.main.temp); 
        // Conversion. Can use : _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273);
        const pressures = cityData.list.map(weather => weather.main.pressure);
        const humidities = cityData.list.map(weather => weather.main.humidity);
        
        const lon = cityData.city.coord.lon;
        const lat = cityData.city.coord.lat;
        // ES6
        // const { lon, lat } = cityData.city.coord;

        return (
            <tr key={cityName}>
                <td>{cityName}</td>
                <td>
                    <GoogleMap lon={lon} lat={lat} />
                </td>
                <td>
                    <Chart data={temps} color="red" units="&#8451;"/>
                </td>
                <td>
                    <Chart data={pressures} color="green" units="hPa"/>
                </td>
                <td>
                    <Chart data={humidities} color="orange" units="%"/>
                </td>
            </tr>
        )
    }

    render() {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Map</th>
                        <th>Temperature (&#8451;)</th>
                        <th>Pressure (hPa)</th>
                        <th>Humidity (%)</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.weather.map(this.renderWeather)}
                </tbody>
            </table>
        );
    }
}

// function mapStateToProps(state) {
//     const weather = state.weather
//     return { weather: state.weather};
// }
// Same as ^^ 
function mapStateToProps({ weather }) {
    return { weather}; // same as => { weather: weather};
}

// connect component with the function mapStateToProps
// exporting the connected version of WeatherList
export default connect(mapStateToProps)(WeatherList);