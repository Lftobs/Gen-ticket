
import { useState } from 'react'
import First from './steps/First';
import Second from './steps/Second';
import Final from './steps/Final';

const MultiStepForm = () => {
	const [noOfTickets, setNoOfTickets] = useState(1);
	const [activeTicket, setActiveTicket] = useState(0);
	const [step, setStep] = useState(1);
	const [uploadedImage, setUploadedImage] = useState(null)

	const handleNext = () => {
			if (step < 3) {
					setStep(step + 1);
			}
	};

	const handleBack = () => {
			if (step > 1) {
					setStep(step - 1);
			}
	};

	const handleNewTicket = () => {
		setStep(1);
		setUploadedImage(null);
	}


	return (
			<section className="container">

				{step === 1 && (
					<First 
						step={step} 
						handleBack={handleBack} 
						handleNext={handleNext} 
						selectedNumber={noOfTickets} 
						setSelectedNumber={setNoOfTickets}
						activeTicket={activeTicket}
						setActiveTicket={setActiveTicket}
					/>
				)}

				{step === 2 && (
					<Second 
						step={step} 
						handleBack={handleBack} 
						handleNext={handleNext} 
						uploadedImage={uploadedImage}
						activeTicket={activeTicket}
						selectedNumber={noOfTickets}
						setUploadedImage={setUploadedImage}
					/>
				)}

				{step === 3 && (
					<Final 
						step={step}
						handleNewTicket={handleNewTicket}
					/>
				)}
			</section>
	)
}

export default MultiStepForm