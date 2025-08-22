import { Menu, X } from "lucide-react";
import { useState } from "react";
//import { Button } from "@/components/ui/button";
import { Button } from "antd";
//import { Link } from "react-router-dom";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection('home')}
              className="font-bold text-2xl text-gray-900 hover:text-gray-700 transition-colors"
            >
              SME DEMO
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              แจ้งปัญหา/รับคำปรึกษา
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              บริการของเรา
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              เกณฑ์การพิจารณา
            </button>
            <button
              onClick={() => scrollToSection('faq')}
              className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
            >
              คำถามที่พบบ่อย
            </button>


            {/* <Link to="/platformRegis">
              <button
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
              >
                สมัครใช้งานแพลตฟอร์ม
              </button>
            </Link> */}
          </div>

          {/* CTA Button */}
          <Link to="/login">
            <div className="hidden md:flex items-center">
              <Button size="large" color="default" variant="solid" className="font-sans w-full px-6 py-2 rounded-full font-normal">
                เข้าสู่ GPPC Platform
              </Button>
            </div>
            </Link>


          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-left"
              >
                แจ้งปัญหา/รับคำปรึกษา
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-left"
              >
                บริการของเรา
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-left"
              >
                เกณฑ์การพิจารณา
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-gray-900 transition-colors font-medium text-left"
              >
                คำถามที่พบบ่อย
              </button>

              {/* <Link to="/platformRegis">
                <button
                  className="text-gray-700 hover:text-gray-900 transition-colors font-medium"
                >
                  สมัครใช้งานแพลตฟอร์ม
                </button>
              </Link> */}
              <div className="pt-4">

                <Button size="large" color="default" variant="solid" className="font-sans w-full px-6 py-2 rounded-full font-normal">
                  เข้าสู่ GPPC Platform
                </Button>
              </div>
            </div>

          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;