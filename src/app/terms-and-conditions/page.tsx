import React from 'react'
import TermsAndConditionsContainer from './_components/terms-and-conditions-container'
import { LandingFooter } from '@/components/landing/landing-footer'
import { LandingHeader } from '@/components/landing/landing-header'

const TermsAndConditionPage = () => {
  return (
    <div className="pt-16">
      <LandingHeader />
      <TermsAndConditionsContainer/>
      <LandingFooter />
    </div>
  )
}

export default TermsAndConditionPage
