import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Chart from '../Chart'
import SpreadChart from '../SpreadChart'
import './index.css'

class StateItem extends Component {
  state = {
    stateData: {},
    isDataFetched: false,
    state: '',
    stateCasesData: {},
    chart: [],
    spreadTreadsData: [],
  }

  componentDidMount() {
    this.getDataFromApi()
  }

  getDataFromApi = async () => {
    const {match} = this.props
    const {params} = match
    const {key, stateName} = params

    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const indiaCovidCasesData = await response.json()
    const stateDataIndex = Object.keys(indiaCovidCasesData).filter(
      eachKey => eachKey === key,
    )

    const chartResponse = await fetch(
      'https://api.covid19india.org/v4/min/timeseries-AP.min.json',
    )
    const chartDataFromApi = await chartResponse.json()
    const data = indiaCovidCasesData[stateDataIndex]

    const spreadTreads = await fetch(
      `https://api.covid19india.org/v4/min/timeseries-${key}.min.json`,
    )
    const spreadTreadsDataObj = await spreadTreads.json()
    const spreadTotalData = Object.keys(spreadTreadsDataObj).map(
      stateCode => spreadTreadsDataObj[stateCode].dates,
    )
    const spreadTotalDataArray = Object.keys(spreadTotalData[0]).map(date => [
      date,
      spreadTotalData[0][date],
    ])
    const lastThreeMonthsData = spreadTotalDataArray.slice(
      spreadTotalDataArray.length - 90,
      spreadTotalDataArray.length,
    )

    const confirmedChartData = this.callOnConfirmedCases(chartDataFromApi)

    this.setState({
      stateData: data,
      isDataFetched: true,
      state: stateName,
      stateCasesData: chartDataFromApi,
      chart: confirmedChartData,
      spreadTreadsData: lastThreeMonthsData,
    })
  }

  renderSpinner = () => (
    <div className="spinner-container">
      <Loader type="Oval" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTotalCases = () => {
    const {stateData} = this.state
    return (
      <div className="card-container" id="cardContainer">
        <button
          type="button"
          className="confirmed card confirmed-card confirmed-button button"
        >
          <p>Confirmed</p>
          <img src="/img/Group.png" alt="confirmed-log" />
          <p>{stateData.total.confirmed}</p>
        </button>
        <button
          className="tested card tested-button button"
          type="button"
          onClick={this.callOnActiveCases}
        >
          <p>Active</p>
          <img src="/img/protection 1.png" alt="active-log" />
          <p>{stateData.total.tested}</p>
        </button>
        <button
          type="button"
          className="recovered card recovered-button button"
          onClick={this.callOnRecoveredCases}
        >
          <p>Recovered</p>
          <img src="/img/recovered 1.png" alt="recovered-log" />
          <p>{stateData.total.recovered}</p>
        </button>
        <button
          type="button"
          className="deceased card deceased-button button"
          onClick={this.callOnDeceasedCases}
        >
          <p>Deceased</p>
          <img
            src="/img/Corona Virus Symptoms Shortness of breath.png"
            alt="active-log"
          />
          <p>{stateData.total.deceased}</p>
        </button>
      </div>
    )
  }

  renderTopDistricts = () => {
    const {stateData} = this.state
    const {districts} = stateData
    return (
      <>
        <h1 className="district-heading">Top Districts</h1>
        <ul className="top-districts-container">
          {Object.keys(districts).map(key => (
            <li className="districts-list-item" key={key}>
              <p className="district-count">{districts[key].total.confirmed}</p>
              <p className="district-name">{key}</p>
            </li>
          ))}
        </ul>
      </>
    )
  }

  callOnConfirmedCases = stateCasesData => {
    const {AP} = stateCasesData
    const {dates} = AP

    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.confirmed,
    ])
    const lastTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const chartData = ['#9A0E31', lastTenDaysConfirmedCases]

    return chartData
  }

  callOnActiveCases = () => {
    const {stateCasesData} = this.state
    const {AP} = stateCasesData
    const {dates} = AP
    console.log(dates)

    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.tested,
    ])
    const lastTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const chartData = ['#0A4FA0', lastTenDaysConfirmedCases]

    this.setState({
      chart: chartData,
    })
  }

  callOnRecoveredCases = () => {
    const {stateCasesData} = this.state
    const {AP} = stateCasesData
    const {dates} = AP

    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.recovered,
    ])
    const lastTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const chartData = ['#216837', lastTenDaysConfirmedCases]

    this.setState({
      chart: chartData,
    })
  }

  callOnDeceasedCases = () => {
    const {stateCasesData} = this.state
    const {AP} = stateCasesData
    const {dates} = AP
    const confirmedCases = Object.keys(dates).map(index => [
      index,
      dates[index].total.deceased,
    ])
    const lastTenDaysConfirmedCases = confirmedCases.slice(
      confirmedCases.length - 10,
      confirmedCases.length,
    )
    const chartData = ['#474C57', lastTenDaysConfirmedCases]

    this.setState({
      chart: chartData,
    })
  }

  renderSpreadTrendCharts = () => {
    const {spreadTreadsData} = this.state
    const spreadTreadsConfirmedCount = spreadTreadsData.map(
      eachItem => eachItem[1].total.confirmed,
    )
    const spreadTreadsActiveCount = spreadTreadsData.map(
      eachItem => eachItem[1].total.tested,
    )
    const spreadTreadsRecoveredCount = spreadTreadsData.map(
      eachItem => eachItem[1].total.recovered,
    )
    const spreadTreadsDeceasedCount = spreadTreadsData.map(
      eachItem => eachItem[1].total.deceased,
    )
    return (
      <>
        <SpreadChart
          chartData={spreadTreadsConfirmedCount}
          chartHeading="Confirmed"
          chartColor="confirmed-heading"
          chartBgColor="confirmed-chart"
          color="#ff073a"
        />
        <SpreadChart
          chartData={spreadTreadsActiveCount}
          chartHeading="Total Active"
          chartColor="active-heading"
          chartBgColor="active-chart"
          color="#007bff"
        />
        <SpreadChart
          chartData={spreadTreadsRecoveredCount}
          chartHeading="Recovered"
          chartColor="recovered-heading"
          chartBgColor="recovered-chart"
          color="#27a243"
        />
        <SpreadChart
          chartData={spreadTreadsDeceasedCount}
          chartHeading="Deceased"
          chartColor="deceased-heading"
          chartBgColor="deceased-chart"
          color="#6c757d"
        />
        <SpreadChart
          chartData={spreadTreadsConfirmedCount}
          chartHeading="Deceased"
          chartColor="deceased-heading"
          chartBgColor="deceased-chart"
          color="#6c757d"
        />
        <SpreadChart
          chartData={spreadTreadsConfirmedCount}
          chartHeading="Deceased"
          chartColor="deceased-heading"
          chartBgColor="deceased-chart"
          color="#6c757d"
        />
        <SpreadChart
          chartData={spreadTreadsConfirmedCount}
          chartHeading="Deceased"
          chartColor="deceased-heading"
          chartBgColor="deceased-chart"
          color="#6c757d"
        />
      </>
    )
  }

  renderStateDetails = () => {
    const {stateData, state, chart} = this.state

    return (
      <>
        <div className="state-name-container">
          <div className="state-name-update-details-card">
            <h1 className="state-name-heading">{state}</h1>
            <p className="last-date-text">{stateData.meta.last_updated}</p>
          </div>
          <div className="state-name-update-details-card">
            <p className="tested-text">Tested</p>
            <p className="tested-count">{stateData.total.tested}</p>
          </div>
        </div>
        {this.renderTotalCases()}
        {this.renderTopDistricts()}
        <Chart chart={chart} />
        <div className="spread-trend-container">
          <h1 className="spread-heading">Spread Trends</h1>
          <button type="button" className="spread-button">
            Cumulative
          </button>
          <button type="button" className="spread-button">
            Daily
          </button>
        </div>
        {this.renderSpreadTrendCharts()}
      </>
    )
  }

  render() {
    const {isDataFetched} = this.state
    return (
      <div className="state-page-container">
        {isDataFetched ? this.renderStateDetails() : this.renderSpinner()}
      </div>
    )
  }
}

export default StateItem
