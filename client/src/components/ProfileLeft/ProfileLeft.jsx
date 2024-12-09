import React from 'react'
import './ProfileLeft.css'
import LogoSearch from '../LogoSearch/LogoSearch'
import FollowerCard from '../FollowersCard/FollowerCard'
import InfoCard from '../InfoCard/InfoCard'
const ProfileLeft = () => {
  return (
    <div className="ProfileLeft">
        <LogoSearch/>
        <InfoCard/>
        <FollowerCard/>
    </div>
  )
}

export default ProfileLeft