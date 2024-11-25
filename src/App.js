import React, { Component } from 'react'
import Navbar from './components/Navbar'
import News from './components/News'
import { Routes, Route } from "react-router";
import LoadingBar from 'react-top-loading-bar'


export class App extends Component {
  pageSize=12;
  apiKey = process.env.REACT_APP_NEWS_API_KEY
  state={
    progress:0
  }
  setProgress=(progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <Navbar />
        <LoadingBar
        color='#FF0000'
        progress={this.state.progress}
      />
        <Routes>
          <Route exact path='/' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' pageSize={this.pageSize} category='general' />} />
          <Route exact path='/business' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' pageSize={this.pageSize} category='business' />} />
          <Route exact path='/entertainment' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' pageSize={this.pageSize} category='entertainment' />} />
          <Route exact path='/health' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' pageSize={this.pageSize} category='health' />} />
          <Route exact path='/science' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' pageSize={this.pageSize} category='science' />} />
          <Route exact path='/sports' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' pageSize={this.pageSize} category='sports' />} />
          <Route exact path='/technology' element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' pageSize={this.pageSize} category='technology' />} />
        </Routes>
      </div>
    )
  }
}

export default App
