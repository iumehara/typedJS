import React from 'react'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      restaurant: {},
      restaurants: []
    }
  }

  componentDidMount() {
    this.fetchRestaurantsAndSetState()
  }

  fetchRestaurantsAndSetState() {
    fetch('http://localhost:8080/restaurants')
      .then(response => response.json())
      .then(restaurants => this.setState({restaurants}))
  }

  saveButtonWasClicked() {
    const postOptions = {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(this.state.restaurant)
    }

    fetch('http://localhost:8080/restaurants', postOptions)
      .then(() => this.fetchRestaurantsAndSetState())
  }

  render() {
    return (
      <div>
        <label>Name</label>
        <input onChange={e => this.setState({restaurant: {name: e.target.value}})}/>
        <button onClick={this.saveButtonWasClicked.bind(this)}>Save</button>
        <ul>
          {
            this.state.restaurants.map((restaurant, i) => (
              <li key={i}>
                <span>{restaurant.id} </span>
                <span>{restaurant.name} </span>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}
