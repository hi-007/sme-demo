// import React, { useState } from 'react';
// import { Flex, Input, Typography, Button, message } from 'antd';
// import type { GetProps } from 'antd';


import { useNavigate } from "react-router-dom";
import email from '../images/Email-campaign-bro.svg'; // Adjust the path as necessary


const SentEmail: React.FC = () => {
    const navigate = useNavigate();


    return (
        <div>
            <header className="bg-white 0">
                <nav className="border-t-4 border-blue-500">
                    <div className="container flex items-center justify-between px-6 py-3 mx-auto">
                        <button
                            onClick={() => navigate("/")}
                            className="font-bold text-2xl text-gray-900 hover:text-gray-700 transition-colors"
                        >
                            SME DEMO
                        </button>

                        <a className="my-1 text-sm font-medium text-gray-500 rtl:-scale-x-100  hover:text-blue-500 lg:mx-4 lg:my-0" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                    </div>
                </nav>

                <div className="container px-6 py-16 mx-auto">
                    <div className="items-center lg:flex">
                        <div className="w-full lg:w-1/2">
                            <div className="lg:max-w-lg">
                                <h1 className="text-3xl font-semibold text-gray-800lg:text-4xl">ยืนยันอีเมลของคุณ </h1>
                                {/* <span className="text-blue-500">SME</span> */}
                                <p className="mt-3 text-gray-600">เพื่อติดตามสถานะการสมัครเข้าร่วมโครงการ กรุณากรอกอีเมลของคุณด้านล่าง</p>

                                <div className="flex flex-col mt-6 space-y-3 lg:space-y-0 lg:flex-row">
                                    <input id="email" type="text" className="w-72 px-4 py-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:ring focus:ring-opacity-40 focus:ring-blue-300" placeholder="กรุณาใส่ที่อยู่อีเมลของคุณ" />

                                    <button
                                        onClick={() => navigate("/verifyEmail")}
                                        className="w-full px-5 py-2 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto lg:mx-4 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                        ส่งรหัสยืนยัน
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
                            <img src={email}
                                alt="email"
                                className="w-full max-w-lg lg:mx-auto"
                            />

                        </div>
                    </div>
                </div>
            </header>

        </div>


    );
};

export default SentEmail;

