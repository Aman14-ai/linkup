// components/Footer.tsx
import Link from "next/link";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">EventHub</h3>
            <p className="text-blue-100">
              Connecting people through amazing events and experiences.
            </p>
            <div className="flex space-x-4">
              <Link href="#" aria-label="Twitter" className="hover:text-blue-300 transition-colors">
                <FaTwitter className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Facebook" className="hover:text-blue-300 transition-colors">
                <FaFacebook className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="Instagram" className="hover:text-blue-300 transition-colors">
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link href="#" aria-label="LinkedIn" className="hover:text-blue-300 transition-colors">
                <FaLinkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-blue-100 hover:text-white transition-colors">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-blue-100 hover:text-white transition-colors">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-100 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-100 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="h-5 w-5 mt-0.5 text-blue-200" />
                <span className="text-blue-100">123 Event Street, San Francisco, CA 94107</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="h-5 w-5 text-blue-200" />
                <span className="text-blue-100">info@eventhub.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Newsletter</h3>
            <p className="text-blue-100">
              Subscribe to get updates on upcoming events.
            </p>
            <form className="flex flex-col space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-blue-700 pt-6 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} EventHub. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link href="/privacy" className="hover:text-white transition-colors">
             Developed by
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              <b>Aman Kumar Choudhary</b>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  