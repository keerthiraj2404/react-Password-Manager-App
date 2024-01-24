import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

const profileColors = [
  '#7683cb',
  '#f59e0b',
  '#10b981',
  '#f97316',
  '#14b8a6',
  '#b91c1c',
  '#0ea5e9',
]

class PasswordManager extends Component {
  state = {
    passwordRecords: [],
    inputUrl: '',
    inputName: '',
    inputPassword: '',
    searchInput: '',
    showPassword: false,
  }

  deletePasswordRecord = id => {
    const {passwordRecords} = this.state
    const filteredPasswordRecords = passwordRecords.filter(
      event => event.id !== id,
    )

    this.setState({passwordRecords: filteredPasswordRecords})
  }

  getSearchRecords = () => {
    const {passwordRecords, searchInput} = this.state
    const filteredSearchResults = passwordRecords.filter(eachRecord =>
      eachRecord.url.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return filteredSearchResults
  }

  onInputUrlChange = event => {
    this.setState({inputUrl: event.target.value})
  }

  onSearchChange = event => {
    this.setState({searchInput: event.target.value})
  }

  onInputNameChange = event => {
    this.setState({inputName: event.target.value})
  }

  onInputPasswordChange = event => {
    this.setState({inputPassword: event.target.value})
  }

  onCheckChange = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  addPasswordRecord = event => {
    event.preventDefault()

    const {inputUrl, inputName, inputPassword} = this.state

    const profilePicColor = profileColors[Math.floor(Math.random() * 10) - 3]

    const newPasswordRecord = {
      id: uuidv4(),
      url: inputUrl,
      name: inputName,
      password: inputPassword,
      initialBgColor: profilePicColor,
    }
    this.setState(prevState => ({
      passwordRecords: [...prevState.passwordRecords, newPasswordRecord],
      inputUrl: '',
      inputName: '',
      inputPassword: '',
    }))
  }

  render() {
    const {
      showPassword,
      inputUrl,
      inputName,
      inputPassword,
      searchInput,
    } = this.state
    const filteredSearchResults = this.getSearchRecords()

    return (
      <div className="app-container">
        <div className="responsive-container">
          <div className="app-header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
              alt="app logo"
              className="app-logo"
            />
          </div>
          <div className="card-container manager-container">
            <img
              src=" https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="manager-image"
            />
            <div className="card form-container">
              <form
                className="card-responsive"
                onSubmit={this.addPasswordRecord}
              >
                <h1 className="form-heading">Add New Password</h1>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                      alt="website"
                    />
                  </div>

                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Website"
                    onChange={this.onInputUrlChange}
                    value={inputUrl}
                    name="inputUrl"
                  />
                </div>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                      alt="username"
                    />
                  </div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter Username"
                    onChange={this.onInputNameChange}
                    value={inputName}
                    name="inputName"
                  />
                </div>
                <div className="input-container">
                  <div className="icon-container">
                    <img
                      className="input-icon"
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                      alt="password"
                    />
                  </div>
                  <input
                    className="input"
                    type="password"
                    placeholder="Enter Password"
                    onChange={this.onInputPasswordChange}
                    value={inputPassword}
                    name="inputPassword"
                  />
                </div>
                <div className="btn-container">
                  <button className="add-btn" type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card-container">
            <div className="card-responsive no-password-container">
              <div className="passwords-header">
                <h1 className="passwords-header-title">
                  Your Passwords
                  <p className="results-count">
                    {' '}
                    {filteredSearchResults.length}
                  </p>
                </h1>
                <div className="search-container">
                  <div className="search-icon-container">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                      alt="search"
                      className="search-icon"
                    />
                  </div>
                  <input
                    className="search-input"
                    type="search"
                    placeholder="Search"
                    onChange={this.onSearchChange}
                    value={searchInput}
                    name="searchInput"
                  />
                </div>
              </div>
              <hr className="hr-line" />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  className="checkbox-input"
                  id="checkbox"
                  onChange={this.onCheckChange}
                />
                <label
                  htmlFor="checkbox"
                  className="checkbox-label"
                  name="checkbox"
                >
                  Show Passwords
                </label>
              </div>
              {filteredSearchResults.length !== 0 ? (
                <ul className="passwords-list-container">
                  {filteredSearchResults.map(eachRecord => (
                    <PasswordItem
                      key={eachRecord.id}
                      record={eachRecord}
                      deletePasswordRecord={this.deletePasswordRecord}
                      showPassword={showPassword}
                    />
                  ))}
                </ul>
              ) : (
                <div className="no-password-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="no-passwords-image"
                  />
                  <p className="no-passwords-title">No Passwords</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PasswordManager
