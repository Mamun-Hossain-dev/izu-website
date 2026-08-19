import React from 'react'
import PrivacyPolicyPolicyContainer from './_components/privacy-policy-container'
import { LandingFooter } from '@/components/landing/landing-footer'
import { LandingHeader } from '@/components/landing/landing-header'

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-16 overflow-x-clip">
      <LandingHeader />
      <PrivacyPolicyPolicyContainer/>
      <LandingFooter />
    </div>
  )
}

export default PrivacyPolicyPage
