import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';

const Dashboard = () => {
  const [ticker, setTicker] = useState("");

  // Fetch protected data on component mount
  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axiosInstance.get('/protected-view/'); // ✅ trailing slash
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProtectedData();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/predict/', { // ✅ trailing slash
        ticker: ticker,
      });
      console.log(response.data);
    } catch (error) {
      console.error('There was an error making the API request:', error);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 mx-auto'>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className='form-control'
              placeholder="Enter Stock Ticker"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              required
            />
            <button type='submit' className='btn btn-info mt-3'>
              See Prediction
            </button>
          </form>
        </div>
      </div>
      
      Dashboard
    </div>
  );
};

export default Dashboard;
