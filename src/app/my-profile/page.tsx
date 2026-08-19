import React from 'react'
import MyProfileContainer from './_components/my-profile-container'
import { LandingHeader } from '@/components/landing/landing-header'
import { LandingFooter } from '@/components/landing/landing-footer'

const MyProfilePage = () => {
  return (
    <div className="pt-16 overflow-x-clip">
      <LandingHeader />
      <MyProfileContainer />
      <LandingFooter />
    </div>
  )
}

export default MyProfilePage
