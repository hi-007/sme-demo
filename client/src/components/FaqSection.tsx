
const FaqSection = () => {
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
            คำถามที่พบบ่อย

          </h2>
        </div>


        <div className="space-y-4">
          <details className="group [&_summary::-webkit-details-marker]:hidden" open>
            <summary
              className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
            >
              <h2 className="text-lg font-medium">1. มีระยะเวลาดำเนินการโครงการฯ ถึงเมื่อไร และจะเปิดให้ใช้งานแพลตฟอร์มภาครัฐฯ เมื่อไร</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block size-5 shrink-0 group-open:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden size-5 shrink-0 group-open:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </summary>
            <p className="px-4 pt-4 text-gray-900">
              โครงการพัฒนาแพลตฟอร์มภาครัฐฯ มีระยะเวลาดำเนินโครงการฯ ให้แล้วเสร็จภายใน ๓๐๐ วัน นับตั้งแต่วันที่ 8 ธันวาคม 2565 ถึงวันที่ 3 ตุลาคม 2566 และ คาดว่าจะเปิดให้ใช้งานแพลตฟอร์มภาครัฐฯ ภายในช่วงเดือนเมษายน 2566 นี้
            </p>
          </details>
          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
            >
              <h2 className="text-lg font-medium">2. การสมัครเข้าร่วมโครงการฯ เพื่อเป็นหน่วยงานเป้าหมาย มีขั้นตอนอย่างไร จะมีการเรียกสัมภาษณ์ หรือต้องส่งเอกสารอื่น ๆ เพิ่มเติมอีกหรือไม่</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block size-5 shrink-0 group-open:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden size-5 shrink-0 group-open:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </summary>

            <p className="px-4 pt-4 text-gray-900">
              สำหรับการสมัครเข้าร่วมเป็นหน่วยงานเป้าหมาย กำหนดให้หน่วยงานที่มีความประสงค์จะเข้าร่วมฯ จัดทำข้อมูลในแบบฟอร์มแจ้งความประสงค์เข้าร่วมเป็นหน่วยงานเป้าหมาย พร้อมแนบเอกสารยืนยันการเข้าร่วมโครงการฯ ซึ่งลงนามโดยผู้บริหารของหน่วยงานจัดส่งมายัง สดช. โดยไม่มีการสัมภาษณ์หรือส่งเอกสารอื่น ๆ เพิ่มเติม
              ทั้งนี้ สดช. จะมีการประกาศรายชื่อหน่วยงานเป้าหมายจำนวน 200 หน่วยงาน ผ่านช่องทางต่าง ๆ เช่น แจ้งเป็นหนังสือ อีเมล หรือเว็บไซต์ gppc.onde.go.th เป็นต้น

            </p>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
            >
              <h2 className="text-lg font-medium">3. การเข้าร่วมโครงการฯ มีค่าใช้จ่ายหรือไม่</h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block size-5 shrink-0 group-open:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden size-5 shrink-0 group-open:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </summary>

            <p className="px-4 pt-4 text-gray-900">
              หน่วยงานที่เข้าร่วมเป็นหน่วยงานเป้าหมาย 200 หน่วยงาน ไม่ต้องเสียค่าใช้จ่ายใด ๆ ในการดำเนินกิจกรรมของโครงการฯ ไม่ว่าจะเป็นการใช้บริการแพลตฟอร์มภาครัฐฯ การอบรมหลักสูตรที่เกี่ยวข้องกับการคุ้มครองข้อมูลส่วนบุคคล และการบริการให้คำปรึกษา (Help Desk)
            </p>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
            >
              <h2 className="text-lg font-medium">4. เอกสารยืนยันการเข้าร่วมโครงการฯ ต้องมีลักษณะ หรือข้อความอย่างไร</h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block size-5 shrink-0 group-open:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden size-5 shrink-0 group-open:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </summary>

            <p className="px-4 pt-4 text-gray-900">
              สำหรับเอกสารยืนยันการเข้าร่วมโครงการ สามารถศึกษาข้อกำหนดและเงื่อนไขการสมัครได้ที่นี้ และสามารถแสดงความประสงค์ผ่านช่องทางอีเมลได้ตามตัวอย่างประกอบใน Google Drive ทั้งนี้ ขอให้หน่วยงานจัดทำหนังสือแจ้งความประสงค์เข้าร่วมเป็นหน่วยงานเป้าหมาย และยินยอมทำตามเงื่อนไขของโครงการฯ” และลงนามโดยผู้บริหารของหน่วยงาน ถึง เลขาธิการสำนักงานคณะกรรมการดิจิทัลเพื่อเศรษฐกิจและสังคมแห่งชาติ            </p>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
            >
              <h2 className="text-lg font-medium">5. หน่วยงานที่เข้าร่วมโครงการฯ จะได้รับ การรับรองการปฏิบัติตาม พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคลหรือไม่</h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block size-5 shrink-0 group-open:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden size-5 shrink-0 group-open:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </summary>

            <p className="px-4 pt-4 text-gray-900">
              หน่วยงานที่สมัครเข้าร่วมเป็นหน่วยงานเป้าหมายของโครงการฯ จะมีที่ปรึกษาทำหน้าที่ให้คำปรึกษาและเข้าให้คำแนะนำในการปรับปรุงระบบสารสนเทศ หรือระบบงานคอมพิวเตอร์ หรือ Application เพื่อรองรับกับแพลตฟอร์มภาครัฐฯ ที่พัฒนาขึ้น และทำหน้าที่ในการรับรองผลการปรับปรุงระบบสารสนเทศ หรือระบบงานคอมพิวเตอร์ หรือ Application ของหน่วยงาน ที่ผ่านการอบรม และเป็นไปตามกฎหมาย ณ สถานที่หน่วยงานนั้น ภายในระยะเวลาโครงการฯ            </p>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
            >
              <h2 className="text-lg font-medium">6. หน่วยงานเป้าหมายภายใต้โครงการฯ จำนวน 200 หน่วยงาน ได้แก่หน่วยงาน ใดบ้าง และสามารถติดตามรายชื่อได้จากที่ใด</h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block size-5 shrink-0 group-open:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden size-5 shrink-0 group-open:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </summary>

            <p className="px-4 pt-4 text-gray-900">
              รายชื่อหน่วยงานเป้าหมายภายใต้โครงการฯ จำนวน 200 หน่วยงาน จะมีการคัดเลือกจากหน่วยงานที่แสดงความประสงค์เข้าร่วมโครงการฯ และผ่านการคัดเลือก
              โดยสามารถติดตามการประกาศผ่านทางเว็บไซต์ gppc.onde.go.th ซึ่งจะประกาศแจ้งรายชื่อหน่วยงานเป้าหมาย จำนวน 200 หน่วยงานต่อไป

            </p>
          </details>

          <details className="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              className="flex items-center justify-between gap-1.5 rounded-md border border-gray-100 bg-gray-50 p-4 text-gray-900"
            >
              <h2 className="text-lg font-medium">7. หนึ่งหน่วยงาน สามารถสมัครเข้าร่วมโครงการฯ ได้กี่ท่าน</h2>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="block size-5 shrink-0 group-open:hidden"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="hidden size-5 shrink-0 group-open:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </summary>

            <p className="px-4 pt-4 text-gray-900">
              การเข้าร่วมโครงการฯ จะเป็นการแจ้งความประสงค์ในนามหน่วยงาน หรือนิติบุคคล ไม่ใช่ในนามบุคคล

            </p>
          </details>
        </div>


      </div>
    </section>
  );
};

export default FaqSection;
