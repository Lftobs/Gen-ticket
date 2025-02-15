import React from 'react'
import ticketBg from "../../assets/ticket.svg";
import barCode from "../../assets/barcode.svg";
import '../../assets/css/TicketFinal.css';
import html2canvas from 'html2canvas';


const Final = ({step, handleNewTicket}) => {
  const storedTickets = JSON.parse(localStorage.getItem("ticket")) || [];
  const ticketData = storedTickets[storedTickets.length - 1];
 

  const downloadTicketAsImage = () => {
    const ticketElement = document.querySelector('.ticket__container');
    html2canvas(ticketElement, {
      allowTaint: true,
      useCORS: true,
    }).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'ticket.png';
      link.click();
    });
  };
 
  return (
      <>
      <div className="head__container">
        <h2>Ready</h2>
        <p>Step {step}/3</p>
      </div>

      <div className="progress__section">
          <div
              className="progress__bar"
              style={{ width: `${(step / 3) * 100}%`}}
          ></div>
      </div>

      <div className="">
        <div className='ticket__title'>
          <h1>Your Ticket is Booked!</h1>
          <p>You can download or Check your email for a copy</p>
        </div>

        <div className="ticket__container">
          <img src={ticketBg} alt="ticket-bg" className="ticket__bg" />
          <div className="ticket__info">
            <div className='ticket__details'>
              <h1>Techember Fest ”25</h1>
              <div className="event__details_final">
                <p>
                  📍 04 Rumens road, Ikoyi, Lagos
                </p>
                <p className="date">📅 March 15, 2025 | 7:00 PM</p>
              </div>
              <div className="ticket__details__pfp">
                <img src={ticketData?.img_url} alt="user" />
              </div>
              <div className='ticket__details__info'>
                <div className='ticket__details__info__item'>
                  <h2>Enter your name</h2>
                  <p>{ticketData?.user_data?.name}</p>
                </div>
                <div className='ticket__details__info__item'>
                  <h2>Enter your email *</h2>
                  <p>{ticketData?.user_data?.email}</p>
                </div>
                <div className='ticket__details__info__item'>
                  <h2>Ticket Type:</h2>
                  <p>{ticketData?.ticket_data?.type}</p>
                </div>
                <div className='ticket__details__info__item'>
                  <h2>Ticket for:</h2>
                  <p>{ticketData?.no_tickets}</p>
                </div>
                <div className='ticket__details__info__item'>
                  <h2>Special Request?</h2>
                  <p>{ticketData?.user_data?.request || 'None'}</p>
                </div>
              </div>
            </div>
          </div>
          <img src={barCode} alt="barcode" className='ticket__barcode'/>
        </div>
 
        <div className="btns step-3">
          <button className="btn cancel" onClick={handleNewTicket}>Book Another Ticket</button>

          <button className="btn next" onClick={downloadTicketAsImage} >Download Ticket</button>
        </div>
      </div>
    </>
  )
}

export default Final