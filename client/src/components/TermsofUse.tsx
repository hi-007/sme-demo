
//import React, { useState } from 'react';
//import TermsCheckbox from "../components/TermsCheckbox";
//import { Mail, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
//import { Upload } from "lucide-react";

import {
  Form,
  // Input,
  // Radio,
  // Checkbox,
  // Select,
  Button,
  // Divider,
  // Typography
  //Row,
  //Col,
  //message,
  //Typography
} from "antd";


const TermsofUse: React.FC = () => {
  const navigate = useNavigate();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (!termsAccepted) {
  //     alert("กรุณายอมรับเงื่อนไขก่อนสมัครใช้งาน");
  //     return;
  //   }
  //   // ทำการส่งข้อมูลสมัครใช้งาน
  //   console.log("ส่งข้อมูลเรียบร้อย");
  // };
  //----------------------------------------------------------------------------//
  const [form] = Form.useForm();

  
  //----------------------------------------------------------------------------//

  //----------------------------------------------------------------------------//


  return (
    <>
      <div>
        <nav className="border-t-4 border-blue-500">
          <div className="container flex items-center justify-between px-6 py-3 mx-auto">

            <button
              onClick={() => navigate("/")}
              className="font-bold text-2xl text-gray-900 hover:text-gray-700 transition-colors"
            >
              SME DEMO
            </button>

            <a className="my-1 text-sm font-medium text-gray-500 rtl:-scale-x-100 hover:text-blue-500 lg:mx-4 lg:my-0" href="#">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </nav>


        <section className="font-sans min-h-screen py-20 bg-gradient-to-br bg-white relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">
                  ข้อกำหนดและเงื่อนไขการใช้บริการ
                </h1>
              </div>

              <div className="grid lg:grid-cols-1 gap-12">
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-gray-200 rounded-full opacity-30 -translate-y-16 translate-x-16"></div>
                  <Form
                    form={form}
                    layout="vertical"
                    //onFinish={handleSubmit}
                    className="space-y-4 font-sans"
                    size="large"
                  >
                    <h2 className="text-lg font-semibold mt-2 text-center">ข้อกำหนดและเงื่อนไขการใช้บริการ</h2>

                    <div className="space-y-4 text-gray-700 text-sm leading-relaxed">
                      <h2 className="text-lg font-semibold mt-2">1. ข้อกำหนดและเงื่อนไขการขอใช้แพลตฟอร์มรองรับกฎหมาย PDPA สำหรับหน่วยงานภาคเอกชน</h2>
                      <p>1.1 เป็นหน่วยงานภาคเอกชนที่เป็นวิสาหกิจรายย่อย (Micro Enterprise) วิสาหกิจขนาดกลาง (Medium Enterprise) และขนาดย่อม (Small Enterprise) ตามกฎกระทรวงกำหนดลักษณะของวิสาหกิจขนาดกลางและขนาดย่อม พ.ศ. 2562 และจดทะเบียนเป็นนิติบุคคล โดยมีเงื่อนไขการพิจารณาตามเอกสารแนบที่ 1</p>
                      <p>1.2 ได้รับการสนับสนุนจากผู้บริหารระดับสูงของหน่วยงาน โดยผู้มีอำนาจหรือเทียบเท่าลงนามในแบบฟอร์มแจ้งความประสงค์ฯ</p>

                      <h2 className="text-lg font-semibold mt-4">2. ข้อกำหนดและเงื่อนไขการเข้าเป็นหน่วยงานเป้าหมายและรับการสนับสนุน</h2>
                      <p>2.1 เป็นหน่วยงานภาคเอกชนที่เป็นวิสาหกิจขนาดกลาง (Medium Enterprise) และขนาดย่อม (Small Enterprise) ตามกฎกระทรวงกำหนดลักษณะของวิสาหกิจขนาดกลางและขนาดย่อม พ.ศ. 2562 และจดทะเบียนเป็นนิติบุคคล โดยมีเงื่อนไขการพิจารณาตามเอกสารแนบที่ 1 ซึ่งเข้าเกณฑ์อย่างใดอย่างหนึ่ง ดังต่อไปนี้:</p>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>เป็นหน่วยงานที่มีการเก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคลที่มีความเสี่ยงที่จะมีผลกระทบต่อสิทธิและเสรีภาพของเจ้าของข้อมูล</li>
                        <li>เป็นหน่วยงานที่ไม่ใช่กิจการที่เก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคลเป็นครั้งคราว</li>
                        <li>เป็นหน่วยงานที่มีการเก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคลตามมาตรา 26 (Sensitive data)</li>
                      </ul>
                      <p>2.2 ได้รับการสนับสนุนจากผู้บริหารระดับสูงของหน่วยงาน โดยผู้มีอำนาจหรือเทียบเท่าลงนามในแบบฟอร์มแจ้งความประสงค์ฯ</p>
                      <p>2.3 หน่วยงานยอมรับเงื่อนไขของโครงการ และสมัครใจให้ความร่วมมือดำเนินกิจกรรมตามแผนการดำเนินงานสนับสนุนเพื่อปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลสำหรับหน่วยงานเป้าหมาย</p>

                      <h2 className="text-lg font-semibold mt-4">3. ข้อกำหนดและเงื่อนไขการขอเข้าร่วมฝึกอบรมหลักสูตรความรู้เกี่ยวกับกฎหมายคุ้มครองข้อมูลส่วนบุคคล</h2>
                      <p>3.1 เป็นหน่วยงานภาคเอกชนที่ได้รับคัดเลือกเป็นหน่วยงานเป้าหมาย หรือหน่วยงานเอกชนอื่นที่มีความประสงค์ขอเข้าร่วมฝึกอบรม ซึ่งเป็นวิสาหกิจรายย่อย (Micro Enterprise), ขนาดกลาง (Medium Enterprise), ขนาดย่อม (Small Enterprise)</p>
                      <p>3.2 ได้รับการสนับสนุนจากผู้บริหารระดับสูงของหน่วยงาน</p>
                      <p>3.3 หน่วยงานสามารถส่งรายชื่อบุคลากรของหน่วยงานเพื่อเข้าร่วมการอบรมได้ หน่วยงานละ 10 คน และรายชื่อสำรอง หน่วยงานละ 5 คน</p>
                      <p>3.4 บุคลากรที่เข้าร่วมฝึกอบรมต้องเข้าร่วมการสอบวัดผลหลักสูตรความรู้เกี่ยวกับ PDPA ในรูปแบบ on-site</p>
                      <p>3.5 หากต้องการส่งรายชื่อเพิ่มเติม โครงการจะพิจารณาตามข้อ 1.1 เป็นอันดับแรก</p>

                      <h2 className="text-lg font-semibold mt-4">4. วิธีการและขั้นตอนการแจ้งความประสงค์</h2>
                      <ul className="list-decimal list-inside ml-4 space-y-1">
                        <li>ศึกษาข้อกำหนดและหลักเกณฑ์การคัดเลือก และแผนการดำเนินงานสนับสนุนสำหรับหน่วยงานเป้าหมาย</li>
                        <li>แจ้งความประสงค์ โดยระบุรายละเอียดตามแบบฟอร์ม พร้อมแนบหนังสืออนุมัติจากผู้บริหาร</li>
                        <li>ส่งความประสงค์มายัง [ระบุแบบฟอร์มรับสมัคร] ภายในวันที่ [*]</li>
                      </ul>

                      <h2 className="text-lg font-semibold mt-4">5. ข้อกำหนดและหลักเกณฑ์การคัดเลือกหน่วยงาน</h2>
                      <ul className="list-decimal list-inside ml-4 space-y-1">
                        <li>โครงการพิจารณาเฉพาะหน่วยงานที่นำส่งข้อมูลครบถ้วนและภายในกำหนด</li>
                        <li>กรณีมีหน่วยงานไม่ถึงจำนวนที่กำหนด โครงการเสนอรายชื่อหน่วยงานตามเกณฑ์</li>
                        <li>กรณีมีหน่วยงานมากกว่าที่กำหนด จะดำเนินการคัดเลือกตามเกณฑ์ เช่น จำนวนพนักงาน ขนาดกิจการ และความเกี่ยวข้องกับ core activities</li>
                      </ul>

                      <h2 className="text-lg font-semibold mt-4">6. ช่องทางติดต่อสอบถามเพิ่มเติม</h2>
                      <ul className="list-disc list-inside ml-4 space-y-1">
                        <li>Line ID: @gppchelpdesk</li>
                        <li>โทรศัพท์: 063-220-3430, 095-167-1928</li>
                        <li>อีเมล: support-gppc@pdpc.or.th</li>
                      </ul>
                    </div>

                    <Form.Item className="flex justify-center gap-4">
                      <Button
                        onClick={() => navigate("/")}

                        color="primary" variant="outlined" className="w-36 h-10 font-sans p-4 mr-2">
                        ปฏิเสธเงื่อนไข
                      </Button>

                      <Button
                        onClick={() => navigate("/platformRegis")}
                        type="primary" htmlType="submit" className="w-36 h-10 font-sans p-4 ml-2">
                        ยอมรับเงื่อนไข
                      </Button>

                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>





      </div>




    </>


  );
};

export default TermsofUse;
