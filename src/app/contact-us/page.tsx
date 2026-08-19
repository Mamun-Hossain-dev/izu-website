import React from 'react'
import ContactUsContainer from './_components/contact-us-container'
import { LandingFooter } from '@/components/landing/landing-footer'
import { LandingHeader } from '@/components/landing/landing-header'

const ContactUsPage = () => {
  return (
    <div className="pt-16 overflow-x-clip">
      <LandingHeader active="contact" />
      <ContactUsContainer/>
      <LandingFooter />
    </div>
  )
}

export default ContactUsPage
