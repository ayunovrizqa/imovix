import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import './style.scss';
import ContentWrapper from '../../components/contentWrapper/ContentWrapper';
import { Helmet } from "react-helmet";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    mathAnswer: ''
  });
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [isMathCorrect, setIsMathCorrect] = useState(true);

  useEffect(() => {
    generateMathQuestion();
  }, []);

  const generateMathQuestion = () => {
    const number1 = Math.floor(Math.random() * 10);
    const number2 = Math.floor(Math.random() * 10);
    setNum1(number1);
    setNum2(number2);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.mathAnswer) === num1 + num2) {
      emailjs.send(
        'service_w887nfy',
        'template_nr2p8a4',
        formData,
        '2SfExqYFm1w17PWkQ'
      )
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '', mathAnswer: '' });
        generateMathQuestion();
        setIsMathCorrect(true);
      })
      .catch((err) => {
        console.error('FAILED...', err);
        alert('Message failed to send.');
      });
    } else {
      setIsMathCorrect(false);
    }
  };

  return (
    <ContentWrapper>
      <div className="contact-wrapper">
         <Helmet>
        <title>Contact - IMovix</title>
        <meta name="description" content="Welcome to the Contact page of IMovix. Contact us related to dmca or copyright isssues." />
        <meta name="keywords" content="home, trending, popular, top-rated, your website" />
        <link rel="canonical" href="/contact" />
      </Helmet>
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <label>
            Name:
            <input 
              type="text" 
              name="to_name" 
              value={formData.to_name} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              name="from_name" 
              value={formData.from_name} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            Message:
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              required 
            />
          </label>
          <label>
            What is {num1} + {num2}? (Anti-bot):
            <input 
              type="text" 
              name="mathAnswer" 
              value={formData.mathAnswer} 
              onChange={handleChange} 
              required 
            />
          </label>
          {!isMathCorrect && <p className="error-message">Incorrect math answer. Please try again.</p>}
          <button type="submit">Send</button>
        </form>
      </div>
    </ContentWrapper>
  );
};

export default Contact;
