import React from "react";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiLinkedinLogo,
  PiTwitterLogo,
} from "react-icons/pi";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 md:p-6 px-2 pt-4 mt-4 md:pb-0 pb-20 w-full">
      <div className="container mx-auto flex md:flex-row flex-col md:gap-0 gap-4 md:justify-between">
        <div className="flex flex-col items-start w-64 mb-6">
          <h1 className="text-lg font-bold">StyleVow</h1>
          <p className="text-gray-600 mt-2">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration.
          </p>
          <div className="flex mt-4 space-x-4 text-gray-600">
            <a href="#" aria-label="Facebook">
              <PiFacebookLogo size={24} />
            </a>
            <a href="#" aria-label="Twitter">
              <PiTwitterLogo size={24} />
            </a>
            <a href="#" aria-label="Instagram">
              <PiInstagramLogo size={24} />
            </a>
            <a href="#" aria-label="LinkedIn">
              <PiLinkedinLogo size={24} />
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start w-64 mb-6">
          <h1 className="text-lg font-bold">Quick Links</h1>
          <ul className="mt-2 space-y-2 text-gray-600">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-start w-64 mb-6">
          <h1 className="text-lg font-bold">Contact</h1>
          <p className="mt-2 text-gray-600">
            +91 294 664 6464 <br />
            Gopalpura-Hanuman ji ka rasta, <br />
            Udaipur, Rajasthan
          </p>
        </div>

        <div className="flex flex-col items-start w-full md:w-64 mb-6">
          <h1 className="text-lg font-bold">Subscribe To Our Email</h1>
          <h2 className="text-2xl font-bold mt-2">For Latest News & Updates</h2>
          <div className="flex mt-4 w-full relative">
            <input
              type="email"
              placeholder="Enter email"
              aria-label="Email"
              className="outline-none rounded-sm px-4 py-2 w-full bg-gray-200"
            />
            <button className="absolute right-0 rounded-sm bg-pink-600 text-white h-full px-4 text-xs">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
