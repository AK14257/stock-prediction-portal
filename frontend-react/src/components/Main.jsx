import React from 'react'
import Button from './Button'
import Header from './Header'
import Footer from './Footer'

const Main = () => {
  return (
    <>
      
      <div className='container'>
        <div className='p-5 text-center bg-light-dark'>
          <h1 className='text-light'>Stock Prediction Portal</h1>
          <p className='text-light lead'>
            A stock prediction system uses historical market data,
            machine learning algorithms, and statistical models to forecast future stock prices.
            It analyzes trends, patterns, and financial indicators to help investors 
            make informed decisions. While predictions aren't guaranteed, 
            such systems enhance decision-making in the volatile and complex world of stock trading.
          </p>
          <Button text='Explore' class='btn-outline-warning' url='/dashboard' />
        </div>
      </div>
    </>
  )
}

export default Main
