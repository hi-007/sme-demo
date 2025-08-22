//import React, { useState } from 'react';
import { Input, Typography, Button } from 'antd';
import type { GetProps } from 'antd';
import { useNavigate } from "react-router-dom";


type OTPProps = GetProps<typeof Input.OTP>;



const { Title, Text } = Typography;

const VerifyEmail: React.FC = () => {
  const navigate = useNavigate();


  const onChange: OTPProps['onChange'] = (text) => {
    console.log('onChange:', text);
  };

  const onInput: OTPProps['onInput'] = (value) => {
    console.log('onInput:', value);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };


  return (

    <div>
      <header className="bg-white">
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

        <div className="container px-6 py-16 mx-auto">
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-semibold lg:text-4xl text-gray-900 mb-6">
                  ยืนยันอีเมลของคุณ
                </h2>
                <p className="md:text-xl font-medium text-gray-500">
                  เราได้ส่งรหัสยืนยันไปที่ SME_DEMO@gmail.com <br /> กรุณากรอกรหัสยืนยันเพื่อเปิดใช้งานบัญชีของคุณ
                </p>
              </div>

              <div className="text-center font-sans">
                <div className="flex flex-col items-center">
                  <Title
                    level={5}
                    className="text-md font-light font-sans mb-2"
                  >
                    รหัสยืนยัน
                  </Title>

                </div>

                <div className="flex flex-col items-center">


                  <Input.OTP
                    length={6}
                    formatter={(str) => str.toUpperCase()}
                    {...sharedProps}
                    className="text-xl text-center rounded-lg border-2 border-gray-300 focus:border-blue-500 font-sans"
                  />
                </div>

                <Button
                  type="primary"
                  className="font-semibold w-30 h-12 mt-6 mb-4 py-2 text-md font-sans"
                 onClick={() => navigate("/platformTracking")}
                >
                  ยืนยันอีเมล
                </Button>

                <div>
                  <Text className="text-md font-sans">
                    ไม่ได้รับอีเมล?{" "}
                    <Button className="font-sans font-medium" type="link">
                      ส่งรหัสใหม่อีกครั้ง
                    </Button>
                  </Text>
                </div>

                <div className="mt-10">
                  <Text className="text-md text-gray-500 font-sans">
                    ต้องการความช่วยเหลือ?{" "}
                    <a href="mailto:contact@dev.ai" className="text-blue-500">
                      ติดต่อเรา
                    </a>
                  </Text>
                </div>
              </div>



            </div>
          </div>
        </div>
      </header>

    </div>



    // <div>

    //   <section className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
    //     {/* Background Graphics */}
    //     <div className="absolute inset-0">
    //       <div className="absolute top-10 left-20 w-48 h-48 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
    //       <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-15 blur-3xl"></div>
    //       <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-25 blur-xl"></div>
    //     </div>


    //     <div className="container mx-auto px-4 lg:px-8 relative z-10">
    //       <div className="max-w-4xl mx-auto">
    //         <div className="text-center mb-16">
    //           <h2 className="text-3xl font-semibold lg:text-4xl text-gray-900 mb-6">
    //             ยืนยันอีเมลของคุณ
    //           </h2>
    //           <p className="md:text-xl font-medium text-gray-500">
    //             เราได้ส่งรหัสยืนยันไปที่ SME_DEMO@gmail.com <br /> กรุณากรอกรหัสยืนยันเพื่อเปิดใช้งานบัญชีของคุณ
    //           </p>
    //         </div>

    //         <div className="text-center font-sans">
    //           <div className="flex flex-col items-center">
    //             <Title
    //               level={5}
    //               className="text-md font-light font-sans mb-2"
    //             >
    //               รหัสยืนยัน
    //             </Title>

    //           </div>

    //           <div className="flex flex-col items-center">


    //             <Input.OTP
    //               length={6}
    //               formatter={(str) => str.toUpperCase()}
    //               {...sharedProps}
    //               className="text-xl text-center rounded-lg border-2 border-gray-300 focus:border-blue-500 font-sans"
    //             />
    //           </div>

    //           <Button
    //             type="primary"
    //             className="font-semibold w-30 h-12 mt-6 mb-4 py-2 text-md font-sans"
    //           // onClick={handleSubmit}
    //           >
    //             ยืนยันอีเมล
    //           </Button>

    //           <div>
    //             <Text className="text-md font-sans">
    //               ไม่ได้รับอีเมล?{" "}
    //               <Button className="font-sans font-medium" type="link">
    //                 ส่งรหัสใหม่อีกครั้ง
    //               </Button>
    //             </Text>
    //           </div>

    //           <div className="mt-10">
    //             <Text className="text-md text-gray-500 font-sans">
    //               ต้องการความช่วยเหลือ?{" "}
    //               <a href="mailto:contact@dev.ai" className="text-blue-500">
    //                 ติดต่อเรา
    //               </a>
    //             </Text>
    //           </div>
    //         </div>



    //       </div>
    //     </div>
    //   </section>
    // </div>


  );
};

export default VerifyEmail;

