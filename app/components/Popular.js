const React = require('react')
const PropTypes = require('prop-types')
const api = require('../utils/api')

const SelectLanguage = props => {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className='languages'>
      {languages.map(lang => {
        return (
          <li
            style={lang === props.selectedLanguage ? {color: '#d0021b'} : null}
            onClick={props.onSelect.bind(null, lang)}
            key={lang}>
              {lang}
          </li>
        )
      })}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
  constructor(props) {
    super()
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.updateLanguage = this.updateLanguage.bind(this)
  }
  componentDidMount () {
    this.updateLanguage(this.state.selectedLanguage)
  }
  updateLanguage(lang) {
    this.setState(function () {
      return {
        selectedLanguage: lang,
        repos: null
      }
    })
    api.fetchPopularRepos(lang)
        .then(function (repos) {
          console.log(repos)
          this.setState(function () {
            return {
              repos: repos
            }
          })
        }.bind(this))
  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage} />
      </div>
    )
  }
}

module.exports = Popular
