import React from "react";
import AboutUsContainer from "./_components/about-us-container";
import { AppDownloadAndFooter } from "@/components/landing/app-download-and-footer";
import { LandingHeader } from "@/components/landing/landing-header";

const AboutUsPage = () => {
  return (
    <div>
      <LandingHeader />
      <AboutUsContainer />
      <AppDownloadAndFooter />
    </div>
  );
};

export default AboutUsPage;
