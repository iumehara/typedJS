// @flow
import React from 'react'

type Restaurant = {
  id: number,
  name: string
}

type NewRestaurant = {
  name: string
}

type Props = {}

type State = {
  newRestaurant: NewRestaurant,
  restaurants: Array<Restaurant>
}

export default class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      newRestaurant: {name: ''},
      restaurants: []
    }
  }

  componentDidMount() {
    this.fetchRestaurantsAndSetState()
  }

  fetchRestaurantsAndSetState() {
    fetch('http://localhost:8080/restaurants')
      .then((response: Object) => response.json())
      .then((restaurants: Array<Restaurant>) => this.setState({restaurants}))
  }

  saveButtonWasClicked() {
    const postOptions = {
      headers: {'Content-Type': 'application/json'},
      method: 'POST',
      body: JSON.stringify(this.state.newRestaurant)
    }

    fetch('http://localhost:8080/restaurants', postOptions)
      .then(() => this.fetchRestaurantsAndSetState())
  }

  render() {
    return (
      <div>
        <label>Name</label>
        <input onChange={e => this.setState({newRestaurant: {name: e.target.value}})}/>
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
