import React from 'react';

const Contact = () => {
  return (
    <div
      name="contact"
      className="w-full h-screen bg-[#1e2023] flex justify-center items-center p-4"
    >
      <form className="flex flex-col max-w-[600px] w-full">
        <div className="pb-8">
          <p className="text-4xl font-bold inline border-b-4 border-blue-700 text-gray-300">
            Contact
          </p>
          <p className="text-gray-300 py-4">
            {' '}
            Submit the form below or shoot me an email
          </p>
        </div>
        <input
          className="bg-gray-300 p-2"
          type="text"
          placeholder="Name"
          name="name"
        />
        <input
          className="my-4 p-2 bg-gray-300"
          type="email"
          placeholder="Email"
          name="email"
        />
        <textarea
          className="bg-gray-300 p-2"
          name="message"
          rows="10"
          placeholder="Message"
        ></textarea>
        <button className="text-white border-2 hover:bg-blue-700 hover:border-blue-700 px-4 py-3 my-8 mx-auto flex items-center">
          Let's Collaborate
        </button>
      </form>
    </div>
  );
};

export default Contact;
