"use client";

import { getApiErrorMessage } from "@/lib/api-error";
import { createContact, type ContactPayload } from "@/services/contact-api";
import { useMutation } from "@tanstack/react-query";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import WhereWeAre from "./where-we-are";

const contactInformation = [
  {
    icon: Mail,
    title: "Email Address",
    lines: ["example@gmail.com"],
  },
  {
    icon: Phone,
    title: "Phone Number",
    lines: ["(406) 555-0120"],
  },
  {
    icon: MapPin,
    title: "Location",
    lines: ["70 Washington Square", "South, New York, USA"],
  },
  {
    icon: Clock3,
    title: "Business Hour",
    lines: ["Monday to Friday, from", "9:00 AM to 5:00 PM"],
  },
];

const fieldClassName =
  "h-11 w-full rounded-md border border-slate-400 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-500 focus:border-[#2674b7] focus:ring-2 focus:ring-[#2674b7]/15";

const initialValues: ContactPayload = {
  firstName: "",
  lastName: "",
  address: "",
  phoneNumber: "",
  subject: "",
  message: "",
};

const ContactUsContainer = () => {
  const [values, setValues] = useState<ContactPayload>(initialValues);
  const mutation = useMutation({
    mutationFn: createContact,
    onSuccess: (result) => {
      setValues(initialValues);
      toast.success(result.message || "Your message has been sent successfully.");
    },
    onError: (error) =>
      toast.error(getApiErrorMessage(error, "Unable to send your message. Please try again.")),
  });

  function update(field: keyof ContactPayload, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.firstName.trim() || !values.lastName.trim() || !values.subject.trim() || !values.message.trim()) {
      toast.error("First name, last name, subject and message are required.");
      return;
    }

    mutation.mutate({
      ...values,
      firstName: values.firstName.trim(),
      lastName: values.lastName.trim(),
      address: values.address.trim(),
      phoneNumber: values.phoneNumber.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    });
  }

  return (
    <main className="bg-white">
      <section className="container px-4 py-10 sm:py-12 lg:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-semibold tracking-[-0.03em] text-[#171717] sm:text-4xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Our team is always ready to assist you with any questions or concerns you
            might have. Fill out the form below and we&apos;ll get back to you as soon as
            possible.
          </p>
        </div>

        <div className="mt-10 grid items-start gap-10 lg:mt-14 lg:grid-cols-[minmax(0,2.25fr)_minmax(240px,0.9fr)] lg:gap-14 xl:gap-20">
          <form className="space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="mb-2 block text-sm font-medium text-slate-800">
                  First Name
                </label>
                <input
                  id="first-name"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Enter Your First Name"
                  className={fieldClassName}
                  value={values.firstName}
                  onChange={(event) => update("firstName", event.target.value)}
                />
              </div>
              <div>
                <label htmlFor="last-name" className="mb-2 block text-sm font-medium text-slate-800">
                  Last Name
                </label>
                <input
                  id="last-name"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Enter Your Last Name"
                  className={fieldClassName}
                  value={values.lastName}
                  onChange={(event) => update("lastName", event.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-800">
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                autoComplete="street-address"
                placeholder="Enter your address"
                className={fieldClassName}
                value={values.address}
                onChange={(event) => update("address", event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-800">
                Phone Number
              </label>
              <input
                id="phone"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                placeholder="Enter your phone number"
                className={fieldClassName}
                value={values.phoneNumber}
                onChange={(event) => update("phoneNumber", event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-2 block text-sm font-medium text-slate-800">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What is this regarding?"
                className={fieldClassName}
                value={values.subject}
                onChange={(event) => update("subject", event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium text-slate-800">
                You Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us how we can help you"
                className="min-h-28 w-full resize-y rounded-md border border-slate-400 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-500 focus:border-[#2674b7] focus:ring-2 focus:ring-[#2674b7]/15"
                value={values.message}
                onChange={(event) => update("message", event.target.value)}
              />
            </div>

            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              <button
                type="reset"
                onClick={() => setValues(initialValues)}
                className="h-12 rounded-full border border-[#2674b7] bg-white px-6 text-base font-semibold text-[#2674b7] transition hover:bg-[#f0f7fd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2674b7]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={mutation.isPending}
                className="h-12 rounded-full bg-[#2a73b5] px-6 text-base font-semibold text-white transition hover:bg-[#205f96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2674b7]"
              >
                {mutation.isPending ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>

          <aside aria-labelledby="contact-information-title" className="lg:pt-1">
            <h2 id="contact-information-title" className="text-lg font-semibold text-slate-900">
              Contract Information
            </h2>
            <div className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-1 lg:gap-7">
              {contactInformation.map(({ icon: Icon, title, lines }) => (
                <div key={title} className="flex items-start gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-slate-100 text-slate-800">
                    <Icon className="size-5" strokeWidth={1.7} aria-hidden="true" />
                  </span>
                  <div className="pt-0.5">
                    <h3 className="text-sm font-medium text-slate-900">{title}</h3>
                    {lines.map((line) => (
                      <p key={line} className="text-sm leading-5 text-slate-500">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <WhereWeAre />
    </main>
  );
};

export default ContactUsContainer;
