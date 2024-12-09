import React from 'react'
import LogoSearch from '../LogoSearch/LogoSearch'
import './ProfileSide.css'
import ProfileCard from '../ProfileCard/ProfileCard'
import FollowerCard from '../FollowersCard/FollowerCard'
const ProfileSide = () => {
  return (
    <div className="profile">
      <LogoSearch/>
      <ProfileCard location="homepage"/>
      <FollowerCard/>
    </div>
  )
}

export default ProfileSide