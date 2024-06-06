import Image from 'next/image';
import React from 'react';

interface SupportUsProps {}

const SupportUs: React.FC<SupportUsProps> = () => {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-center mb-8">Support Us</h1>
      <div className="flex items-center justify-center gap-2 my-6">
            <Image
              src="/logo.svg"
              alt="Sign in"
              width={50}
              height={50}
              className=""
            />
            <h1 className="text-5xl font-serif">
              SBI
            </h1>
          </div>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <article className="shadow-md rounded-lg px-6 py-8">
          <h2 className="text-xl font-semibold mb-4">How can we help you?</h2>
          <p className="text-gray-700">
            Our dedicated support team is here to answer your questions and
            resolve any issues you may encounter. Reach out to us through
            various channels:
          </p>
          <ul className="list-disc mt-4 ml-4">
            <li>Phone: +1-800-123-4567</li>
            <li>Email: support@sbi.com</li>
            <li>Live chat: Available on our website during business hours.</li>
          </ul>
        </article>

        <article className="shadow-md rounded-lg px-6 py-8">
          <h2 className="text-xl font-semibold mb-4">FAQs</h2>
          <p className="text-gray-700">
            Find answers to frequently asked questions about SBI services and
            features. Explore our comprehensive FAQ section to save time and
            get immediate answers.
          </p>
          <a
            href="/faq"
            className="inline-flex items-center px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Visit FAQs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="ml-2 -mr-1 w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7.707 7.707L13.13 17H10v-4a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4h-3.13L9 5z"
              />
            </svg>
          </a>
        </article>
      </section>

      <section className="mt-12 ml-10">
        <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
          <ul className="list-disc space-y-2">
            <li>
              <a href="/help-center" className="text-blue-500 hover:underline">
                Help Center
              </a>
            </li>
            <li>
              <a href="/security-center" className="text-blue-500 hover:underline">
                Security Center
              </a>
            </li>
            <li>
              <a href="/terms-and-conditions" className="text-blue-500 hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
      </section>
    </div>
  );
};

export default SupportUs;
