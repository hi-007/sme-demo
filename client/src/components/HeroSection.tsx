//import { ArrowRight } from "lucide-react";
import { Button } from "antd";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="min-h-screen pt-72 pb-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-48 h-48 bg-gradient-to-br from-green-100 to-blue-100 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-br from-orange-100 to-pink-100 rounded-full opacity-25 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="font-bold text-5xl lg:text-6xl text-gray-900 leading-tight mb-6">
              Government Platform for PDPA Compliance
              <span className="block text-gray-600">GPPC</span>
            </h1>

            <p className="text-xl lg:text-3xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              โครงการแพลตฟอร์มเพื่อสนับสนุนการปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลสำหรับภาคเอกชน
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* <Button className="bg-black hover:bg-gray-800 text-white px-8 py-4 text-lg rounded-full font-semibold group">
                Start Project
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button> */}
              <Link to="/termsofuse">
                <Button size="large" color="default" variant="solid" className="font-sans rounded-full font-semibold group px-10 py-6 text-lg">
                  สมัครใช้งานแพลตฟอร์ม
                </Button>
              </Link>
              <Link to="/sentEmail">
                <Button size="large" color="default" variant="outlined" className="font-sans rounded-full font-semibold group px-10 py-6 text-lg">
                  ติดตามผลการสมัคร
                </Button>
              </Link>

              {/* <Button variant="outline" className="border-2 border-gray-300 hover:border-black px-8 py-4 text-lg rounded-full font-semibold">
              ติดตามผลการสมัครใช้งานแพลตฟอร์ม
              </Button> */}
            </div>
          </div>

          {/* Visual Element with Enhanced Graphics */}
          {/* <div className="mt-16">
            <div className="relative max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-2xl border border-gray-200/50 relative">
                <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl rotate-12 opacity-80"></div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl rotate-45 opacity-70"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Design</h3>
                    <p className="text-gray-600">Beautiful interfaces that users love</p>
                  </div>

                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-600 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-6 h-6 bg-white rounded-sm"></div>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Development</h3>
                    <p className="text-gray-600">Robust solutions built to scale</p>
                  </div>

                  <div className="text-center group">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-600 to-gray-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-6 h-6 bg-white rounded-full"></div>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">Strategy</h3>
                    <p className="text-gray-600">Data-driven decisions that deliver results</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
