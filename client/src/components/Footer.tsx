import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-20 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-green-500 to-blue-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-br from-orange-500 to-pink-600 rounded-full blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company */}
          <div>
            <div className="font-bold text-2xl mb-6">SME DEMO</div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล
              <br />
              120 หมู่ 3 ชั้น 7 อาคารรัฐประศาสนภักดี
              <br />
              ศูนย์ราชการเฉลิมพระเกียรติฯ
              ถนน แจ้งวัฒนะ
              <br />
              แขวง ทุ่งสองห้อง
              เขต หลักสี่ กรุงเทพฯ 10210
              <br />
              หมายเลขโทรศัพท์: 063-220-3430 095-642-6610
              <br />
              อีเมล: support-gppc@pdpc.or.th            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-700 rounded-lg flex items-center justify-center hover:from-gray-700 hover:to-gray-600 transition-all duration-300 shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Consent Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Record of Processing Activities Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Breach Notification Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Data Subject Access Request Management</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Office of the Personal Data Protection Commission: OPDPC</a></li>

            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Team</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">News</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Get in Touch</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2023 GPPC Support
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
