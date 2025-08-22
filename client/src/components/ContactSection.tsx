import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "antd";

const ContactSection = () => {
  return (
    <section className="min-h-screen py-40 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-20 w-48 h-48 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-15 blur-3xl"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-25 blur-xl"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl lg:text-4xl text-gray-900 mb-6">
              บริการให้คำปรึกษา และแจ้งปัญหา (Help Desk)
            </h2>
            <p className="text-xl text-gray-600">
              การยินยอมให้ เก็บข้อมูลส่วนบุคคลเพื่อประมวลผล
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">อีเมล</h3>
                  <p className="text-gray-600">support-gppc@pdpc.or.th</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">หมายเลขโทรศัพท์</h3>
                  <p className="text-gray-600">063-220-3430 หรือ 095-642-6610</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล</h3>
                  <p className="text-gray-600">

                    120 หมู่ 3 ชั้น 7 อาคารรัฐประศาสนภักดี
                    ศูนย์ราชการเฉลิมพระเกียรติฯ
                    ถนน แจ้งวัฒนะ แขวง ทุ่งสองห้อง
                    <br />เขต หลักสี่ กรุงเทพฯ 10210</p>
                </div>
              </div>
            </div>

            {/* Contact Form with Enhanced Design */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 relative overflow-hidden">
              {/* Form background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-gray-200 rounded-full opacity-30 -translate-y-16 translate-x-16"></div>

              <form className="space-y-6 relative z-10">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    ชื่อ - นามสกุล
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors bg-white/70"
                    //placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors bg-white/70"
                    //placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    กรุณาระบุรายละเอียดของปัญหา หรือ การขอคำปรึกษา
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-colors resize-none bg-white/70"
                    //placeholder="Tell us about your project"
                  ></textarea>
                </div>


                <Button size="large" color="default" variant="solid" className="font-sans w-full">
                  ส่งข้อมูล
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;