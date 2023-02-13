import {Component} from 'react'
import './index.css'

const btnPlay = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const btnPause = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
const btnReset = 'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'

class DigitalTimer extends Component {
  state = {isRunning: false, setMinute: 25, seconds: 0, minutes: 25}

  componentDidMount() {
    this.timerId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  tick = () => {
    const {isRunning, minutes, seconds} = this.state
    if (minutes === 0 && seconds === 0) {
      this.setState({isRunning: false})
    } else if (isRunning && seconds === 0) {
      this.setState(prev => ({minutes: prev.minutes - 1, seconds: 59}))
    } else if (isRunning) {
      this.setState(prev => ({
        seconds: prev.seconds - 1,
      }))
    }
  }

  onPlayPause = () => {
    const {setMinute} = this.state
    if (setMinute > 0) {
      this.setState(prev => ({
        isRunning: !prev.isRunning,
      }))
    }
  }

  onDecrease = () => {
    const {isRunning, setMinute} = this.state
    if (!isRunning && setMinute > 0) {
      this.setState(prev => ({
        setMinute: prev.setMinute - 1,
        minutes: prev.minutes - 1,
        seconds: 0,
      }))
    }
  }

  onIncrease = () => {
    const {isRunning} = this.state
    if (!isRunning) {
      this.setState(prev => ({
        setMinute: prev.setMinute + 1,
        minutes: prev.minutes + 1,
        seconds: 0,
      }))
    }
  }

  onReset = () => {
    const {setMinute} = this.state
    this.setState({
      minutes: setMinute,
      seconds: 0,
      isRunning: false,
    })
  }

  render() {
    const {isRunning, setMinute, seconds, minutes} = this.state

    const minutesInTwoDigits = minutes > 9 ? minutes : `0${minutes}`
    const secondsInTwoDigits = seconds > 9 ? seconds : `0${seconds}`

    return (
      <div className="bg_container">
        <div className="app_container">
          <h1 className="heading">Digital Timer</h1>
          <div className="timer_container">
            <div className="img_container">
              <div className="timer_status_container">
                <h1 className="timer_count">
                  {minutesInTwoDigits}:{secondsInTwoDigits}
                </h1>
                <p className="timer_status">
                  {isRunning ? 'Running' : 'Paused'}
                </p>
              </div>
            </div>
            <div className="timer_controller">
              <div className="timer_controls">
                <img
                  src={isRunning ? btnPause : btnPlay}
                  alt={isRunning ? 'pause icon' : 'play icon'}
                  className="btn_img"
                  onClick={this.onPlayPause}
                />

                <button
                  className="btn_name"
                  onClick={this.onPlayPause}
                  type="button"
                >
                  {isRunning ? 'Pause' : 'Start'}
                </button>

                <img
                  src={btnReset}
                  className="btn_img"
                  alt="reset icon"
                  onClick={this.onReset}
                />

                <button
                  className="btn_name"
                  onClick={this.onReset}
                  type="button"
                >
                  Reset
                </button>
              </div>
              <p className="limit_para">Set Timer limit</p>
              <div className="limit_controls">
                <button
                  className="limit_btn"
                  onClick={this.onDecrease}
                  type="button"
                >
                  {' '}
                  -{' '}
                </button>
                <p className="count_show">{setMinute}</p>
                <button
                  className="limit_btn"
                  onClick={this.onIncrease}
                  type="button"
                >
                  {' '}
                  +{' '}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
