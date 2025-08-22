import { CheckCircle } from "lucide-react";

const features = [
  "วิสาหกิจรายย่อย (Micro Enterprise) ",
  "วิสาหกิจขนาดย่อม (Small Enterprise) ",
  "วิสาหกิจขนาดกลาง (Medium Enterprise)",
  "ประเภทอุตสาหกรรม/กลุ่มธุรกิจ"
];

const AboutSection = () => {
  return (
    <section className="min-h-screen py-40 bg-white relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-purple-100 rounded-l-full opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-green-100 to-blue-100 rounded-r-full opacity-25"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="font-bold text-4xl lg:text-5xl text-gray-900 mb-6">
              เกณฑ์การพิจารณาวิสาหกิจ <br />ขนาดกลางและขนาดย่อม
            </h2>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              ภายใต้โครงการแพลตฟอร์มเพื่อสนับสนุนการปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล
              สำหรับภาคเอกชน
            </p>

            {/* <p className="text-gray-600 mb-8 leading-relaxed">
              หน่วยงานภาคเอกชนที่แจ้งความประสงค์จะได้รับการสนับสนุนด้านองค์ความรู้ความเข้าใจเกี่ยวกับกฎหมายคุ้มครองข้อมูลส่วนบุคคล การให้คำปรึกษา และให้ข้อเสนอแนะด้านกฎหมายคุ้มครองข้อมูลส่วนบุคคล และให้บริการแพลตฟอร์มรองรับกฎหมาย PDPA สำหรับหน่วยงานภาคเอกชน ซึ่งเป็นเครื่องมือสนับสนุนและรองรับการปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล
              </p> */}

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{feature}</span>
                </div>
              ))}

              <ul className="pl-8 max-w-xl space-y-1 text-gray-500 list-disc list-inside ">
                <li>
                  กลุ่มธุรกิจตลาดเงิน ตลาดทุน ประกันภัย
                </li>
                <li>
                  กลุ่มธุรกิจท่องเที่ยว โรงแรม
                </li>
                <li>
                  กลุ่มธุรกิจการผลิตและการค้า และธุรกิจดิจิทัลและธุรกรรมทางอิเล็กทรอนิกส์
                </li>
                <li>
                  กลุ่มธุรกิจสาธารณสุข และธุรกิจการศึกษา
                </li>
              </ul>

            </div>
          </div>

          {/* Visual with Enhanced Graphics */}
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl p-8 h-96 flex items-center justify-center relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl opacity-20 rotate-12"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl opacity-30 -rotate-12"></div>
              <div className="absolute top-1/2 left-4 w-8 h-8 bg-gradient-to-br from-orange-400 to-pink-500 rounded-lg opacity-25 rotate-45"></div>

              <div className="text-center relative z-10">
                <div className="w-24 h-24 bg-gradient-to-br from-black to-gray-800 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <div className="w-8 h-8 bg-white rounded-lg"></div>
                </div>
                <h3 className="font-semibold text-2xl text-gray-900 mb-2">Our Vision</h3>
                <p className="text-gray-600">Building the future of digital experiences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;