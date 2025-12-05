import { assets, footerLinks } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 md:gap-16 pb-10 border-b border-gray-700/50">
          <div className="flex-1 max-w-md">
            {/* Logo */}
            <div className="mb-6">
              <img className="h-12 md:h-14 brightness-0 invert" src={assets.logo} alt="logo" />
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Bringing you farm-fresh groceries and daily essentials at the best prices.  
              Convenient, reliable, and delivered straight to your doorstep —  
              because your family deserves only the freshest.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <span className="text-white">f</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <span className="text-white">t</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110">
                <span className="text-white">in</span>
              </a>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 flex-1">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h3 className="font-bold text-lg text-white mb-6 relative pb-2">
                  {section.title}
                  <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-green-500 to-transparent"></span>
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link.url}
                        className="text-gray-400 hover:text-green-400 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-0 group-hover:w-1 h-0.5 bg-green-400 transition-all duration-200"></span>
                        {link.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm md:text-base text-center md:text-left">
            Copyright {new Date().getFullYear()} ©{" "}
            <a href="https://apnabazar.com" className="text-green-400 hover:text-green-300 font-semibold transition-colors">
              ApnaBazar
            </a>
            {" "}All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
