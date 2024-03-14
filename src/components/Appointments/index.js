import {Component} from 'react'

import {v4 as uuid4} from 'uuid'

import {format} from 'date-fns'

import './index.css'

import AppointmentItem from '../AppointmentItem'

const initialList = []

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: initialList, starBtn: false}
  title = event => {
    const {title} = this.state
    this.setState({title: event.target.value})
  }
  date = event => {
    const {date} = this.state
    this.setState({date: event.target.value})
  }
  onAddBtn = event => {
    event.preventDefault()
    const {title, date, appointmentList} = this.state
    const formattedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuid4(),
      newTitle: title,
      newDate: formattedDate,
      isStar: false,
    }
    this.setState(prev => ({
      appointmentList: [...prev.appointmentList, newAppointment],
      title: '',
      date: '',
    }))
  }
  starImgFunc = id => {
    const {appointmentList} = this.state
    this.setState({
      appointmentList: appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isStar: !each.isStar}
        }
        return each
      }),
    })
  }
  onStarred = () => {
    const {starBtn} = this.state
    this.setState({starBtn: !starBtn})
  }
  onFilterChange = () => {
    const {appointmentList, starBtn} = this.state
    if (starBtn) {
      return appointmentList.filter(each => each.isStar === true)
    }
    return appointmentList
  }

  render() {
    const {title, date, appointmentList, starBtn} = this.state
    const filteredAppointmentList = this.onFilterChange()
    const classStyle=starBtn?"star-filled":"star-empty"
    return (
      <div>
        <div>
          <div>
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.onAddBtn}>
                <label htmlFor="titleid">TITLE</label>
                <input
                  value={title}
                  id="titleid"
                  type="text"
                  placeholder="Title"
                  onChange={this.title}
                />
                <label htmlFor="todaysDate">DATE</label>
                <input
                  id="todaysDate"
                  value={date}
                  type="date"
                  onChange={this.date}
                />
                <button type="submit">Add</button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <div>
            <div>
              <h1>Appointments</h1>
              <button className={`${classStyle}`} type="button" onClick={this.onStarred}>
                Starred
              </button>
            </div>
            <ul>
              {filteredAppointmentList.map(eachAppointment => (
                <AppointmentItem
                  newEachAppointment={eachAppointment}
                  isStarImgFunc={this.starImgFunc}
                  key={eachAppointment.id}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
