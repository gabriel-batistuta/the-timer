import React, { Component } from 'react';
import './App.css';
import Clock, { hour, formatDate, calculateDaysToNextYear } from './components/Clock/Clock';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState({
        date: new Date(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { date } = this.state;

    return (
      <div class="main">
        <h1>THE TIMER</h1>
        <Clock />
        <div class="info-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Days To Next Year</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{formatDate(date)}</td>
                <td>{hour(date)}</td>
                <td>{calculateDaysToNextYear(date)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;
