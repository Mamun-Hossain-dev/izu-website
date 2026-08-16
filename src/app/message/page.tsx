import React from "react";
import MessageContainer from "./_components/message-container";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingFooter } from "@/components/landing/landing-footer";

const MessagePage = () => {
  return (
    <div className="pt-16">
      <LandingHeader active="message" />
      <MessageContainer />
      <LandingFooter />
    </div>
  );
};

export default MessagePage;
