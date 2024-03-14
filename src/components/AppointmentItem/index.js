const AppointmentItem = props => {
  const {newEachAppointment, isStarImgFunc} = props
  const {id, newTitle, newDate, isStar} = newEachAppointment
  const selectStarImg = () => {
    isStarImgFunc(id)
  }
  const isStarImg = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li>
      <div>
        <p>{newTitle}</p>
        <p>Date: {newDate}</p>
      </div>
      <button data-testid="star">
        <img src={isStarImg} onClick={selectStarImg} alt="star" />
      </button>
    </li>
  )
}
export default AppointmentItem
