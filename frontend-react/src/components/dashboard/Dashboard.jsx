import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const [ticker, setTicker] = useState("");
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [plot, setPlot] = useState();
  const [ma100, setMA100] = useState();
  const [ma200, setMA200] = useState();
  const [prediction, setPrediction] = useState();
  const [mse, setMSE] = useState();
  const [rmse, setRMSE] = useState();
  const [r2, setR2] = useState();

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
    setLoading(true);
    try {
      const response = await axiosInstance.post('/predict/', {
        ticker: ticker,
      });
      console.log(response.data);

      const backendRoot = import.meta.env.VITE_BACKEND_ROOT;
      setPlot(`${backendRoot}${response.data.plot_img}`);
      setMA100(`${backendRoot}${response.data.plot_100_dma}`);
      setMA200(`${backendRoot}${response.data.plot_200_dma}`);
      setPrediction(`${backendRoot}${response.data.plot_prediction}`);
      setMSE(response.data.mse);
      setRMSE(response.data.rmse);
      setR2(response.data.r2);

      if (response.data.error) {
        setError(response.data.error);
      } else {
        setError(null);
      }
    } catch (error) {
      console.error('There was an error making the API request:', error);
      setError('Failed to fetch prediction');
    } finally {
      setLoading(false);
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
            {error && <small className='text-danger'>{error}</small>}

            <button type='submit' className='btn btn-info mt-3'>
              {loading ? (
                <span>
                  <FontAwesomeIcon icon={faSpinner} spin /> Please Wait ...
                </span>
              ) : (
                'See Prediction'
              )}
            </button>
          </form>
        </div>

        {/* Print prediction plots */}
        {prediction && (
          <div className='prediction mt-5'>
            <div className='p-3'>
              {plot && <img src={plot} alt="Stock Plot" style={{ maxWidth: '100%' }} />}
            </div>
            <div className='p-3'>
              {ma100 && <img src={ma100} alt="100 DMA" style={{ maxWidth: '100%' }} />}
            </div>
            <div className='p-3'>
              {ma200 && <img src={ma200} alt="200 DMA" style={{ maxWidth: '100%' }} />}
            </div>
            <div className='p-3'>
              {prediction && <img src={prediction} alt="Prediction" style={{ maxWidth: '100%' }} />}
            </div>
            <div className="text-light p-3">
              <h4>Model Evaluation</h4>
              <p>Mean Squared Error: {mse}</p>
              <p>Root Mean Squared Error: {rmse}</p>
              <p>R-Squared: {r2}</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">Dashboard</div>
    </div>
  );
};

export default Dashboard;
