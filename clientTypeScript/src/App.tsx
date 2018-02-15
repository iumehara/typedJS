import * as React from 'react'

interface Restaurant {
  id: number,
  name: string
}

interface NewRestaurant {
  name: string
}

interface Props {}

interface State {
  newRestaurant: NewRestaurant,
  restaurants: Array<Restaurant>
}

interface FetchResponse {
  json: () => {}
}

interface ClickEvent {
  target: {
    value: string
  }
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
      .then((response: Response) => response.json())
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
        <input onChange={(e: ClickEvent) => this.setState({newRestaurant: {name: e.target.value}})}/>
        <button onClick={this.saveButtonWasClicked.bind(this)}>Save</button>
        <ul>
          {
            this.state.restaurants.map((restaurant: Restaurant, i: number) => (
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
