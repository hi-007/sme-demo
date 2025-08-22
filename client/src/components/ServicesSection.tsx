import { Palette, Code, Smartphone, Globe
  // , Zap
} from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "ระบบจัดการการขอความยินยอม (Consent Management)",
    description: "ความยินยอมเป็นหนึ่งในฐานกฎหมายที่สำคัญในพระราชบัญญัติ คุ้มครองข้อมูลส่วนบุคคล ซึ่งสร้างภาระหน้าที่ให้กับหน่วยงานต้องมีการจัดทำแบบฟอร์ม จัดเก็บแบบฟอร์ม รวมถึงตรวจสอบเพื่อดำเนินกิจกรรมต่างๆ ดังนั้นระบบจัดการความยินยอมจะเข้ามาทำให้แบบฟอร์มความยินยอมทั้งหมดถูกทำให้อยู่ในรูปแบบดิจิตอล (Digitalize) ซึ่งทำให้สามารถรวบรวมความยินยอมและบริหารจัดการความยินยอมได้ง่าย รวมไปถึงสามารถเชื่อมต่อไปยังระบบงาน หรือ แอพพลิเคชั่นต่างๆ ของหน่วยงาน เพื่อให้สอดรับกับนโยบาย(ร่าง) นโยบายการพัฒนาแพลตฟอร์มภาครัฐเพื่อรองรับการปฏิบัติ ตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล (Government Platform for PDPA Compliance : GPPC)"
  },
  {
    icon: Code,
    title: "ระบบบริหารบันทึกกิจกรรมการประมวลผลข้อมูลส่วนบุคคล (Record of Processing Activities Management)",
    description: "บันทึกกิจกรรมการประมวลผลข้อมูลส่วนบุคคล เป็นเอกสารที่หน่วยงานจำเป็นต้องจัดทำเพื่อให้สอดคล้องตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล มาตรา 39 ซึ่งบันทึกกิจกรรมการประมวลผลข้อมูลส่วนบุคคลเป็นส่วนที่สำคัญที่สุดในกฎหมายคุ้มครองข้อมูลส่วนบุคคลเนื่องจากบันทึกฉบับนี้จะบอกทุกอย่างที่หน่วยงานต้องทำเพื่อให้พนักงานทุกคนในหน่วยงานสามารถปฏิบัติตามกฎหมายฉบับนี้ได้อย่างถูกต้อง การบันทึกกิจกรรมประมวลผลข้อมูลส่วนบุคคลบนระบบบริหารบันทึกกิจกรรมการประมวลผลข้อมูลส่วนบุคคลจะช่วยให้การจัดทำบันทึกง่ายขึ้นและครบถ้วนตามวัตถุประสงค์ของกฎหมายฉบับนี้"
  },
  {
    icon: Smartphone,
    title: "ระบบจัดการแจ้งเหตุละเมิดข้อมูลส่วนบุคคล (Data Breach Notification Management)",
    description: "การแจ้งเหตุละเมิดตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล มาตรา 37 กำหนดให้หน่วยงานต้องแจ้งเรื่องไปยังสำนักงานคุ้มครองข้อมูลส่วนบุคคล (สคส.) ภายใน 72 ชัวโมง ทำให้ระบบจัดการแจ้งเหตุละเมิดข้อมูลส่วนบุคคล มีหน้าที่สำคัญในการรับเรื่องแจ้งเหตุละเมิดที่เกิดขึ้น รวมไปถึงเป็นเครื่องมือให้เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลของหน่วยงานสามารถจัดการเหตุละเมิดได้สะดวก รวดเร็วมากยิ่งขึ้น โดยระบบฯออกแบบให้มีการเชื่อมต่อไปยัง ระบบงานสำหรับสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล เพื่อให้เป็นการอำนวยความสะดวกให้หน่วยงานสามารถแจ้งเหตุละเมิดและแก้ไขเหตุการณ์ได้ภายใน 72 ชั่วโมง"
  },
  {
    icon: Globe,
    title: "ระบบจัดการคำขอใช้สิทธิของเจ้าของข้อมูลส่วนบุคคล (Data Subject Access Request Management)",
    description: "หน่วยงานรัฐมีหน้าที่ให้บริการประชาชนทั่วไป จึงทำให้มีผู้ติดต่อกับหน่วยงานเป็นจำนวนมาก เกิดการเก็บ รวบรวม และใช้ ข้อมูลส่วนบุคคลอย่างหลีกเลี่ยงไม่ได้ กฎหมายคุ้มครองข้อมูลส่วนบุคคลกำหนดให้หน่วยงานต้องมีช่องทางให้เจ้าของข้อมูลส่วนบุคคลเข้ามาใช้สิทธิตามมาตรา 30 ถึง 36 โดยระบบจัดการคำขอใช้สิทธิของเจ้าของข้อมูลส่วนบุคคลจะเข้ามาช่วยรับคำขอการใช้สิทธิจากเจ้าของข้อมูลส่วนบุคคล และ เป็นเครื่องมือให้เจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคลมาบริหารจัดการคำขอใช้สิทธิได้สะดวกมากยิ่งขึ้น"
  },
  // {
  //   icon: Zap,
  //   title: "ระบบงานสำหรับสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (Office of the Personal Data Protection Commission: OPDPC)",
  //   description: "สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล (สคส.) มีหน้าที่กำหนดมาตรการหรือแนวทางการดำเนินการเกี่ยวกับการคุ้มครองข้อมูลส่วนบุคคล เพื่อให้เป็นไปตามพระราชบัญญัติฯ โดยอีกหนึ่งหน้าที่สำคัญคือต้องมีการรับเรื่องแจ้งเหตุละเมิดข้อมูลส่วนบุคคลจากหน่วยงานต่างๆ รวมไปถึงรับเรื่องอุทธรณ์การใช้สิทธิตามพระราชบัญญัติฯ โดยระบบงานสำหรับสำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล จะเป็นช่องทางในการรับเรื่องแจ้งเหตุละเมิดและอุทธรณ์ จากหน่วยงานต่างๆของภาครัฐและเอกชนเพื่ออำนวยความสะดวกให้การดำเนินงานตามกฎหมายเป็นไปอย่างรวดเร็วและถูกต้องตามกฏหมาย"
  // },
  // {
  //   icon: Users,
  //   title: "Consulting",
  //   description: "Expert guidance and consultation to help you make informed decisions about your digital projects."
  // }
];

const ServicesSection = () => {
  return (
    <section className="min-h-screen py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Graphics */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-25 blur-lg"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-bold text-4xl lg:text-5xl text-gray-900 mb-6">
            แพลตฟอร์มภาครัฐฯ
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            ประกอบไปด้วย 5 ระบบย่อยดังต่อไปนี้
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl hover:shadow-lg transition-all duration-300 group border border-gray-200/50 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Card background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-50 -translate-y-10 translate-x-10"></div>

              <div className="relative z-10">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-black group-hover:to-gray-800 group-hover:text-white transition-all duration-300">
                  <service.icon className="w-6 h-6" />
                </div>

                <h3 className="font-semibold text-xl text-gray-900 mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
