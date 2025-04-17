import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Channels from './Channels/Channels'
import ChannelView from './ChannelView/ChannelView'
import Settings from './Settings/Settings'

function Content({channels, getChannels}) {
  return (
    <div className='content-container'>
      <Routes>
        <Route path='settings' element={<Settings/>} />
        <Route path='channels' element={<Channels channels={channels}/>} />
        {/* fetch the data from one channel */}
        <Route path='channel/:id' element={<ChannelView getChannels={getChannels}/>} /> 
      </Routes>
    </div>
  )
}

export default Content
