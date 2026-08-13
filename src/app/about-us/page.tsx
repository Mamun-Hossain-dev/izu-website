import React from 'react'
import AboutUsContainer from './_components/about-us-container'
// import { AppDownloadSection } from '@/components/landing/app-download-section'
import { LandingFooter } from '@/components/landing/landing-footer'
import { LandingHeader } from '@/components/landing/landing-header'

const AboutUsPage = () => {
  return (
    <div className="pt-16">
      <LandingHeader active="about" />
      <AboutUsContainer />
      {/* <AppDownloadSection /> */}
      <LandingFooter />
    </div>
  )
}

export default AboutUsPage
