import React, { useCallback, useState } from 'react'
import { Mail } from 'lucide-react';
import ImageUpload from '../Image';
import { tickets } from '../../lib/utils.';
import '../../assets/css/Ticket.css'

const Second = ({step, handleBack, handleNext, uploadedImage, setUploadedImage, activeTicket, selectedNumber}) => {

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    request: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSubmit = async() => {
    setLoading(true);
    const data = new FormData();
    let cloud_url = '';
    if (!uploadedImage) {
      alert("Please upload an image");
      setLoading(false);
      return;
    }
    if (formData.name.trim() === '' || formData.email.trim() === '') {
      alert("Name or email cannot be empty");
      setLoading(false);
      return;
    }
    data.append("file", uploadedImage);
    data.append("upload_preset", "hng-img");
    try {
      const response = await fetch(
      "https://api.cloudinary.com/v1_1/dh9zsffcy/image/upload",
      {
        method: "POST",
        body: data,
      }
      );
      const url_res = await response.json();
      if (!url_res.secure_url) {
        alert("Image upload failed. Please try again.");
        setLoading(false);
        return;
      }
      cloud_url = url_res.secure_url;
      const ticketData = {
        user_data: formData,
        ticket_data: tickets[activeTicket],
        img_url: cloud_url || '',
        no_tickets: selectedNumber
      };
  
      const existingTicket = localStorage.getItem("ticket");
      if (existingTicket) {
        const parsedTicket = JSON.parse(existingTicket);
        const updatedTicket = [
          ...parsedTicket,
          ticketData
        ];
        localStorage.setItem("ticket", JSON.stringify(updatedTicket));
        
      } else {
        localStorage.setItem("ticket", JSON.stringify([ticketData]));
      }
      handleNext();
    } catch (error) {
      console.error("Error uploading image:", error);
      setLoading(false);
      return;
    }
    setLoading(false);
    
  }
  

  
  return (
    <>
      <div className="head__container">
        <h2>Attendee Details</h2>
        <p>Step {step}/3</p>
      </div>

      <div className="progress__section">
        <div
          className="progress__bar"
          style={{ width: `${(step / 3) * 100}%`, backgroundColor: "#24A0B5" }}
        ></div>
      </div>

      <div className="form__wrapper">
        <div className="image__section">
          <p>Upload profile photo</p>
          <div className="darker">
            <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
          </div>
        </div>

        <div className="seperator"></div>

        <div className="input__section">
          <label htmlFor="name">Enter your name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            placeholder="Enter your name"
          />
        </div>

        <div className="input__section">
          <label htmlFor="email">Enter your email*</label>
          <div className="input__email">
            <Mail className="mail__icon" />
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter a valid email. e.g., hello@avioflagos.io"
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="input__section">
          <label htmlFor="request">Special Request?</label>
          <textarea
            name="request"
            value={formData.request}
            placeholder="Enter any special requests"
            onChange={handleChange}
            disabled={loading}
          ></textarea>
        </div>

        <div className="btns">
          <button
            className="btn cancel"
            onClick={handleBack}
            disabled={step === 1 || loading}
          >
            Back
          </button>

          <button
            className="btn next"
            onClick={handleSubmit}
            disabled={step === 3 || loading}
          >
            {loading ? "Loading..." : "Get My Ticket"}
          </button>
        </div>
      </div>
    </>
  );
}

export default Second