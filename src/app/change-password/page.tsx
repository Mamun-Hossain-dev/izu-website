import { LandingFooter } from '@/components/landing/landing-footer'
import ChangePasswordContainer from './_components/change-password-container'
import { LandingHeader } from '@/components/landing/landing-header'

const ChangePasswordPage = () => {
  return (
    <div className="pt-16">
      <LandingHeader />
      <ChangePasswordContainer />
      <LandingFooter />
    </div>
  )
}

export default ChangePasswordPage
