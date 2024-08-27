import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Import specific icons from react-icons
import { HiMail, HiPhone } from 'react-icons/hi';
import LogoMain from "../Logo/LogoMain";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-bl from-green-100 to-green-800 text-gray-800 py-8 shadow-sm shadow-black mt-3">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Company Name */}
          <div className="flex items-center mb-4 md:mb-0">
            <LogoMain/>
            <span className="text-white text-2xl font-bold">Enatega</span>
          </div>

          {/* Developer Info */}
          <div className="text-center md:text-left">
            <p className="mb-2 flex items-center justify-center md:justify-start">
              <HiMail className="mr-2 text-xl" />
              Developer: Ahmad Raza Khokhar
            </p>
            <p className="mb-2 flex items-center justify-center md:justify-start">
              <HiMail className="mr-2 text-xl" />
              Email:{" "}
              <a
                href="mailto:ahmadrazawebexpert@gmail.com"
                className=" hover:underline"
              >
                ahmadrazawebexpert@gmail.com
              </a>
            </p>
            <p className="mb-2 flex items-center justify-center md:justify-start">
              <HiPhone className="mr-2 text-xl" />
              Phone:{" "}
              <a
                href="tel:+923008039275"
                className="hover:underline"
              >
                +92 300 803 9275
              </a>
            </p>
            <div className="mt-4 flex justify-center md:justify-start space-x-4">
              <a
                href="https://github.com/AhmadRazaKhokhar1"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:underline flex items-center space-x-2"
              >
                <FaGithub className="text-xl" />
                <span>GitHub</span>
              </a>
              <a
                href="https://pk.linkedin.com/in/ahmad-raza-khokhar"
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:underline flex items-center space-x-2"
              >
                <FaLinkedin className="text-xl" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}