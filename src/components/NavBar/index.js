import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class NavBar extends Component {
  state = {
    optionButtonStatus: false,
    selectedOption: 'Home',
  }

  renderOptions = () => {
    const {selectedOption} = this.state
    const homeOptionColor = selectedOption === 'Home' ? 'home-highlight' : ''
    const aboutOptionColor = selectedOption === 'About' ? 'about-highlight' : ''
    return (
      <div>
        <div className="option-container">
          <Link className="link" to="/" onClick={this.onChangeSelectedOption}>
            <p className={`option-text ${homeOptionColor}`}>Home</p>
          </Link>
          <Link
            className="link"
            to="/about"
            onClick={this.onChangeSelectedOption}
          >
            <p className={`option-text ${aboutOptionColor}`}>About</p>
          </Link>
        </div>
        <button
          className="menu-button"
          type="button"
          onClick={this.onOptionButtonClicked}
        >
          <img
            className="menu-logo"
            src="/img/add-to-queue 1.png"
            alt="menu-logo"
          />
        </button>
      </div>
    )
  }

  onChangeSelectedOption = event => {
    this.setState({
      selectedOption: event.target.textContent,
    })
  }

  onOptionButtonClicked = () => {
    this.setState({
      optionButtonStatus: true,
    })
  }

  onCrossButtonClicked = () => {
    this.setState({
      optionButtonStatus: false,
    })
  }

  renderOptionsInSmallDevices = () => {
    const {selectedOption} = this.state
    const homeOptionColor = selectedOption === 'Home' ? 'home-highlight' : ''
    const aboutOptionColor = selectedOption === 'About' ? 'about-highlight' : ''
    return (
      <div className="option-container-small-device">
        <Link className="link" to="/">
          <p className={`option-text ${homeOptionColor}`}>Home</p>
        </Link>
        <Link className="link" to="/about">
          <p className={`option-text ${aboutOptionColor}`}>About</p>
        </Link>
        <button
          className="menu-button cross-icon"
          type="button"
          onClick={this.onCrossButtonClicked}
        >
          <img src="/img/Shape.png" alt="cross" />
        </button>
      </div>
    )
  }

  render() {
    const {optionButtonStatus} = this.state
    return (
      <>
        <div className="nav-bar">
          <Link to="/" className="nav-home-link">
            <h1 className="logo-title">
              COVID19<span className="highlight-word">INDIA</span>
            </h1>
          </Link>
          {this.renderOptions()}
        </div>
        {optionButtonStatus && this.renderOptionsInSmallDevices()}
      </>
    )
  }
}

export default NavBar
