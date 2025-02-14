import { tickets } from "../../lib/utils."


const First = ({step, handleBack, handleNext, selectedNumber, setSelectedNumber, setActiveTicket, activeTicket}) => {
  
  console.log(selectedNumber)
  const handleTicketClick = (index) => {
    setActiveTicket(index);
    setSelectedNumber(1);
  };

  return (
    <>
      <div className="head__container">
        <h2>Ticket Selection</h2>
        <p>Step {step}/3</p>
      </div>
      <div className="progress__section">
        <div
          className="progress__bar"
          style={{ width: `${(step / 3) * 100}%`, backgroundColor: "#24A0B5" }}
        ></div>
      </div>
      <div className="form__wrapper">
        <div className="form__details">
          <h1>Techember Fest ”25</h1>
          <p>
            Join us for an unforgettable experience at [Event Name]! Secure your spot now.
          </p>
          <div className="event-details">
            <p>
              📍 [Event Location]
              <span>| |</span>
            </p>
            <p className="date">March 15, 2025 | 7:00 PM</p>
          </div>
        </div>

        <div className="seperator"></div>

        <div className="ticket__section">
          <p>Select Ticket Type: </p>
          <div className="ticket__types">
            {
              tickets.map((ticket, index) => (
                <div
                  key={index}
                  className={`ticket__item ${activeTicket === index ? 'active' : ''}`}
                  onClick={() => handleTicketClick(index)}
                >
                  <h2>{ticket.price === 0 ? 'Free' : '$' + ticket.price }</h2>
                  <h4>{ticket.type}</h4>
                  <p>{ticket.availability}</p>
                </div>
              ))
            }
          </div>
        </div>

        <div className="ticket-section">
          <p>Number of Ticket: </p>
          <select
            value={selectedNumber}
            onChange={(e) => setSelectedNumber(e.target.value)}
            className='drop__down'
          >
            {[...Array(10)].map((_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="btns">
          <button className="btn cancel" onClick={handleBack} disabled={step === 1}>Cancel</button>
          <button className="btn next" onClick={handleNext} disabled={step === 3}>Next</button>
        </div>
      </div>
    </>
  )
}

export default First