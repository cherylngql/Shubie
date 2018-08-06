const Reminder = (props) => {
  return (
    <div>
      <input type="text"></input>
      <div className="setAlarm">
        <input type="text" className="time hour"/>:<input type="text" className="time minute"/><button className="add" onClick={props.setAlarm}>Set</button>
      </div>
    </div>
  )
};

export default Reminder;