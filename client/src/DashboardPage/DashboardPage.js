import React, { useEffect } from 'react'
import "./dashboardPage.css"
import Nav from './Nav/Nav'
import Sidebar from './Sidebar.js/Sidebar'
import Content from './Content/Content'
import useChannels from '../shared/hooks/useChannels'
import useUserDetails from '../shared/hooks/useUserDetails'
import LoadingSpinner from '../shared/components/LoadingSpinner'
import { connectWithSocketServer } from '../socketConn/socketConn'
export default function DashboardPage() {
  const { getChannels, isFetching, followedChannels, allChannels} = useChannels();
  const { isLogged } = useUserDetails();

  //only refreshing at the start of the application
  useEffect(() => {
    getChannels(isLogged);
    connectWithSocketServer();
  }, [])

  if(isFetching) {
    return <LoadingSpinner/>
  }
  return (
    <div className='dashboard-container'>
      <Nav/>
      <Sidebar channels = {followedChannels}/>
      <Content channels = {allChannels} getChannels={getChannels}/>
    </div>
  )
}
