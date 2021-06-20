import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Footer from '../Footer'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },

  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },

  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    suggestion: [],
    covidDetailsIndia: [],
    isDataUpdate: false,
    totalCases: {},
  }

  componentDidMount() {
    this.getDateFromApi()
  }

  getDateFromApi = async () => {
    const response = await fetch(
      'https://api.covid19india.org/v4/min/data.min.json',
    )
    const indiaCovidCasesData = await response.json()
    const {TT} = indiaCovidCasesData
    delete indiaCovidCasesData.TT
    this.setState({
      covidDetailsIndia: indiaCovidCasesData,
      isDataUpdate: true,
      totalCases: TT,
    })
  }

  filterSuggestion = event => {
    const userSearch = event.target.value
    const filterSuggestion = statesList.filter(eachItem =>
      eachItem.state_name.toLowerCase().includes(userSearch.toLowerCase()),
    )

    this.setState({
      suggestion: filterSuggestion,
    })
  }

  renderInputValue = event => {
    const searchInputEl = document.getElementById('searchInput')
    searchInputEl.value = event.target.textContent
  }

  renderSuggestions = () => {
    const {suggestion} = this.state
    return (
      <ul id="suggestionContainer" className="suggestion-list-container">
        {suggestion.map(eachState => (
          <Link
            className="link-item"
            to={`/${eachState.state_name}/${eachState.state_code}`}
            key={eachState.state_code}
          >
            <li className="suggestion-item" onClick={this.renderInputValue}>
              <p className="state-name">{eachState.state_name}</p>
              <div className="each-state-code-container">
                <p className="state-code">{eachState.state_code}</p>
                <i
                  className="arrow-icon fa fa-chevron-right"
                  aria-hidden="true"
                >
                  {' '}
                </i>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  returnStateName = index => {
    const state = statesList[index]
    if (state !== undefined) return state.state_name
    return ''
  }

  renderTotalCases = () => {
    const {totalCases} = this.state
    return (
      <div className="card-container">
        <div className="confirmed card">
          <p>Confirmed</p>
          <img src="/img/Group.png" alt="confirmed-log" />
          <p>{totalCases.total.confirmed}</p>
        </div>
        <div className="tested card">
          <p>Active</p>
          <img src="/img/protection 1.png" alt="active-log" />
          <p>{totalCases.total.confirmed - totalCases.total.recovered}</p>
        </div>
        <div className="recovered card">
          <p>Recovered</p>
          <img src="/img/recovered 1.png" alt="recovered-log" />
          <p>{totalCases.total.recovered}</p>
        </div>
        <div className="deceased card">
          <p>Deceased</p>
          <img
            src="/img/Corona Virus Symptoms Shortness of breath.png"
            alt="active-log"
          />
          <p>{totalCases.total.deceased}</p>
        </div>
      </div>
    )
  }

  removeSuggestions = () => {
    const suggestionContainerEl = document.getElementById('suggestionContainer')
    suggestionContainerEl.style.display = 'none'
  }

  reRenderSuggestions = () => {
    const suggestionContainerEl = document.getElementById('suggestionContainer')
    suggestionContainerEl.style.display = 'block'
  }

  renderCasesListIndia = () => {
    const {covidDetailsIndia} = this.state

    return (
      <div className="state-wise-list-container">
        <div className="state-list-item list-titles">
          <p className="list-item-count state-name">State/UT</p>
          <p className="list-item-count">Confirmed</p>
          <p className="list-item-count">Active</p>
          <p className="list-item-count">Recovered</p>
          <p className="list-item-count">Deceased</p>
          <p className="list-item-count">Population</p>
        </div>

        <ul className="list-container">
          {Object.keys(covidDetailsIndia).map((key, index) => (
            <Link
              className="link-item"
              to={`/${this.returnStateName(index)}/${key}`}
              key={key}
            >
              <li className="state-list-item">
                <p className="list-item-count state-name">
                  {this.returnStateName(index)}
                </p>
                <p className="list-item-count confirmed">
                  {covidDetailsIndia[key].total.confirmed}
                </p>
                <p className="list-item-count tested">
                  {covidDetailsIndia[key].total.tested}
                </p>
                <p className="list-item-count recovered">
                  {covidDetailsIndia[key].total.recovered}
                </p>
                <p className="list-item-count deceased">
                  {covidDetailsIndia[key].total.deceased}
                </p>
                <p className="list-item-count population">
                  {covidDetailsIndia[key].meta.population}
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  renderSpinner = () => (
    <div className="spinner-container">
      <Loader type="Oval" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderCovidIndiaPageDetails = () => (
    <>
      <div className="search-bar-container">
        <i className="icon fa fa-search" aria-hidden="true">
          {' '}
        </i>
        <input
          className="search-bar"
          type="search"
          id="searchInput"
          placeholder="Enter the State"
          onChange={this.filterSuggestion}
          onFocus={this.reRenderSuggestions}
        />
      </div>
      {this.renderSuggestions()}
      {this.renderTotalCases()}
      {this.renderCasesListIndia()}
      <Footer />
    </>
  )

  render() {
    const {isDataUpdate} = this.state
    return (
      <div className="home-page-container">
        {isDataUpdate
          ? this.renderCovidIndiaPageDetails()
          : this.renderSpinner()}
      </div>
    )
  }
}

export default Home
