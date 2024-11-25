import React, { useState } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { Routes, Route } from "react-router";
import LoadingBar from 'react-top-loading-bar'


const App = () => {
  let pageSize = 12;
  let apiKey = process.env.REACT_APP_NEWS_API_KEY

  const [progress, setProgress] = useState(0)

  return (
    <div>
      <Navbar />
      <LoadingBar
        color='#FF0000'
        progress={progress}
      />
      <Routes>
        <Route exact path='/' element={<News setProgress={setProgress} apiKey={apiKey} key='general' pageSize={pageSize} category='general' />} />
        <Route exact path='/business' element={<News setProgress={setProgress} apiKey={apiKey} key='business' pageSize={pageSize} category='business' />} />
        <Route exact path='/entertainment' element={<News setProgress={setProgress} apiKey={apiKey} key='entertainment' pageSize={pageSize} category='entertainment' />} />
        <Route exact path='/health' element={<News setProgress={setProgress} apiKey={apiKey} key='health' pageSize={pageSize} category='health' />} />
        <Route exact path='/science' element={<News setProgress={setProgress} apiKey={apiKey} key='science' pageSize={pageSize} category='science' />} />
        <Route exact path='/sports' element={<News setProgress={setProgress} apiKey={apiKey} key='sports' pageSize={pageSize} category='sports' />} />
        <Route exact path='/technology' element={<News setProgress={setProgress} apiKey={apiKey} key='technology' pageSize={pageSize} category='technology' />} />
      </Routes>
    </div>
  )
}

export default App

