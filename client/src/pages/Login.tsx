import React from "react";
import { Button, Form, Input, Checkbox } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
    email?: string;
    password?: string;
    remember?: boolean;
};

const Login: React.FC = () => {

    const navigate = useNavigate();

    const onFinish = () => {
        navigate("/crm-sme");
    };

    return (
        <div className="relative overflow-hidden h-screen ">
            <div className="grid grid-cols-12 gap-3 h-screen bg-white">
                <div className="bg-[#182237] text-white xl:col-span-4 lg:col-span-4 col-span-12 lg:block hidden relative overflow-hidden flex-col justify-center px-12">
                    <svg
                        width="800"
                        height="800"
                        className="absolute -top-44 -left-44 z-0 opacity-90 pointer-events-none"
                    >
                        <circle cx="250" cy="260" r="240" fill="#23314A" />
                    </svg>
                    <div className="flex justify-center h-screen items-center z-10 relative font-sans">
                        <div className="z-10 relative">
                            <h1 className="text-4xl font-bold mb-4 leading-snug">
                                Welcome to <br />SME CRM
                            </h1>
                            <p className="mb-8 text-base text-[#dde3ed]">
                                CRM helps developers to build<br />
                                organized and well coded dashboards full<br />
                                of beautiful and rich modules.
                            </p>
                            <Button
                                type="primary"
                                shape="round"
                                size="large"
                                className="bg-[#2196f3]"
                                onClick={() => navigate("/")}

                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                    <svg
                        width="260"
                        height="90"
                        viewBox="0 0 260 90"
                        className="absolute bottom-10 left-12 z-10 pointer-events-none"
                    >
                        <circle cx="40" cy="50" r="35" fill="#3963a9" />
                        <rect
                            x="75"
                            y="15"
                            rx="35"
                            width="50"
                            height="70"
                            fill="#3963a9"
                            transform="rotate(-25 75 15)"
                        />
                        <rect
                            x="145"
                            y="15"
                            rx="35"
                            width="50"
                            height="70"
                            fill="#3963a9"
                            transform="rotate(-25 145 15)"
                        />
                    </svg>
                </div>

                <div className="xl:col-span-8 lg:col-span-8 col-span-12 sm:px-12 px-4">
                    <div className="flex h-screen items-center px-3 lg:justify-start justify-center">
                        <div className="max-w-[420px] w-full mx-auto">
                            <div className="mb-3 mt-8 flex items-center justify-center">
                                <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid" fill="#000000" width="36" height="36">
                                    <g>
                                        <path d="M127.962816,0 C198.911815,0.558586285 255.754376,55.4725719 255.999327,129.30333 C256.222426,196.981097 200.939466,257.457031 124.744539,255.972592 C55.244106,254.617978 -1.52329281,198.006026 0.0311827848,124.08815 C1.40287938,58.8018828 54.6684376,0.674744901 127.962816,0 Z M101.003768,147.357453 C105.554452,147.357453 110.106845,147.367703 114.65753,147.352329 C116.833796,147.345496 118.196951,147.837462 117.689611,150.565481 C116.574147,156.564732 115.660252,162.599855 114.679737,168.621313 C112.832587,179.971832 110.991701,191.32349 109.157078,202.676286 C108.981132,203.757586 108.415712,204.914048 109.809616,205.660538 C112.182326,206.929741 118.670127,205.31377 120.011075,203.0743 C137.018063,174.694017 154.01651,146.30861 171.006416,117.918077 C174.535588,112.012778 172.683883,108.820124 165.760488,108.768878 C157.794512,108.711938 149.828537,108.711938 141.862561,108.768878 C139.389066,108.782544 137.708182,108.456275 138.304349,105.219207 C140.080893,95.5899998 141.703697,85.9334607 143.331626,76.2769217 C144.604815,68.7175012 145.824481,61.1489702 146.990622,53.5713287 C147.16486,52.4404904 147.853271,51.0414624 146.011815,50.3701339 C142.079426,49.2279869 137.854573,50.6944931 135.475545,54.0274221 C122.392896,75.8151342 109.320497,97.6091098 96.2583467,119.409349 C92.3157866,125.985976 88.2553597,132.494275 84.4989951,139.176812 C81.6838569,144.181882 83.5321454,147.282292 89.0565125,147.34208 C93.0383616,147.384785 97.0219188,147.350621 101.005476,147.359162 L101.003768,147.357453 Z" fill="#1D5FE6"></path>
                                    </g>
                                </svg>

                            </div>
                            <div className="text-center mb-6">
                                <div className="text-3xl font-bold mb-2">
                                    Sign In
                                </div>

                                <div className="text-[#7d8898] mb-6 font-medium text-[15px]">
                                    Sign in to your account
                                </div>
                            </div>

                            <Form
                                layout="vertical"
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                className="flex flex-col gap-4"
                            >
                                <Form.Item<FieldType>
                                    label={<span className="font-semibold text-[15px]">Email Address</span>}
                                    name="email"
                                    rules={[{ required: true, message: "Please input your email!" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input
                                        className="rounded-full py-2 px-4 text-[16px]"
                                        size="large"
                                        type="email"
                                    />
                                </Form.Item>

                                <Form.Item<FieldType>
                                    label={<span className="font-semibold text-[15px]">Password</span>}
                                    name="password"
                                    rules={[{ required: true, message: "Please input your password!" }]}
                                    style={{ marginBottom: 0 }}
                                >
                                    <Input.Password
                                        className="rounded-full py-2 px-4 text-[16px]"
                                        size="large"
                                    />
                                </Form.Item>

                                <Form.Item<FieldType> name="remember" valuePropName="checked">
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>

                                <Button
                                    type="primary"
                                    shape="round"
                                    size="large"
                                    className="bg-[#2196f3] text-sm"
                                    htmlType="submit"
                                >
                                    Sign in
                                </Button>
                            </Form>

                            <div className="mt-6 text-[15px] text-[#222] text-center">
                                Don&apos;t have an account?{" "}
                                <a href="#" className="text-[#2196f3] no-underline hover:underline">
                                    Sign up
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
