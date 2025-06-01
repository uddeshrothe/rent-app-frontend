import React, { useState } from 'react';
import NameStep from './steps/NameStep';
import WheelStep from './steps/WheelStep';
import TypeStep from './steps/TypeStep';
import ModelStep from './steps/ModelStep';
import DateStep from './steps/DateStep';

const StepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    vehicleType: '',
    vehicleId: '',
    startDate: null,
    endDate: null
  });

  const steps = [
    <NameStep data={formData} setData={setFormData} />,
    <WheelStep data={formData} setData={setFormData} />,
    <TypeStep data={formData} setData={setFormData} />,
    <ModelStep data={formData} setData={setFormData} />,
    <DateStep data={formData} setData={setFormData} />,
  ];

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      {steps[step]}
      <div className="mt-4 flex justify-between">
        {step > 0 && <button onClick={handleBack} className="btn">Back</button>}
        {step < steps.length - 1 ? (
          <button onClick={handleNext} className="btn">Next</button>
        ) : (
          <button onClick={() => alert('Submit to backend')} className="btn">Submit</button>
        )}
      </div>
    </div>
  );
};

export default StepForm;
