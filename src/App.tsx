import React, { ChangeEvent } from 'react';
import Search from './components/Search';
import './App.scss';

import { mainData, AstronomicalObjects } from './models/data.interface';

interface MainState {
  searching: string;
  data: mainData | null;
  loading: boolean;
  emulateError: boolean;
}

class App extends React.Component<Record<string, never>, MainState> {
  state: MainState = {
    searching: localStorage.getItem('searching') || '',
    data: null,
    loading: false,
    emulateError: false,
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.setState({ loading: true });

    const { searching } = this.state;

    const queryString = searching.length > 0 ? `?name=${searching}` : '';

    fetch(
      `https://stapi.co/api/v2/rest/astronomicalObject/search${queryString}`,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        method: 'POST',
      }
    )
      .then((response) => response.json())
      .then((data) => {
        this.setState({ data, loading: false });
      });
  }

  handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ searching: value });
  };

  handleSearchSubmit = () => {
    const { searching } = this.state;
    localStorage.setItem('searching', searching);
    this.fetchData();
  };

  handleThrowError = () => {
    this.setState({ emulateError: true });
  };

  renderList = (data: AstronomicalObjects) => {
    if (!data.length) return <div>Nothing found</div>;

    return data.map((obj) => {
      return (
        <div className="card" key={obj.uid}>
          <h3 className="card__title">Title: {obj.name}</h3>
          <p className="card__type">Type: {obj.astronomicalObjectType}</p>
          <p className="card__location">
            Location: {obj.location ? obj.location.name : 'Unknown location'}
          </p>
        </div>
      );
    });
  };

  render() {
    const { searching, data, loading, emulateError } = this.state;

    if (emulateError) {
      throw new Error('Emulate error!');
    }

    return (
      <>
        <header>
          <h1>Star Treck</h1>
          <h2>Astronomical Objects</h2>
          <div className="buttons">
            <Search
              searching={searching}
              onSearchChange={this.handleSearchChange}
              onSearchSubmit={this.handleSearchSubmit}
            />
            <button onClick={this.handleThrowError}>Emulate Error</button>
          </div>
        </header>
        <main>
          {loading && <div>Loading...</div>}
          <div className="card-list">
            {data && !loading && (
              <>{this.renderList(data.astronomicalObjects)}</>
            )}
          </div>
        </main>
        <footer className="footer">The Rolling Scopes School, 2024</footer>
      </>
    );
  }
}

export default App;
