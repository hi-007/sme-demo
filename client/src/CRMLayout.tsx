import React, { useState } from "react";
import type { MenuProps } from "antd";
import {
    Layout,
    Menu,
    Button,
    Badge,
    Avatar,
    Dropdown,
    //Card,
    // Col,
    // Row
} from "antd";
import {
    UserOutlined,
} from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
import { Outlet, useLocation, Link } from "react-router-dom";
import BreadcrumbNav from "./components/BreadcrumbNav";


/* ✅ เมนู Sidebar */

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
    {
        key: "/crm-sme/dashboard", icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4.979 9.685C2.993 8.891 2 8.494 2 8s.993-.89 2.979-1.685l2.808-1.123C9.773 4.397 10.767 4 12 4s2.227.397 4.213 1.192l2.808 1.123C21.007 7.109 22 7.506 22 8s-.993.89-2.979 1.685l-2.808 1.124C14.227 11.603 13.233 12 12 12s-2.227-.397-4.213-1.191z" /><path strokeLinecap="round" d="M22 12s-.993.89-2.979 1.685l-2.808 1.124C14.227 15.603 13.233 16 12 16s-2.227-.397-4.213-1.191L4.98 13.685C2.993 12.891 2 12 2 12m20 4s-.993.89-2.979 1.685l-2.808 1.124C14.227 19.603 13.233 20 12 20s-2.227-.397-4.213-1.192L4.98 17.685C2.993 16.891 2 16 2 16" opacity="0.5" /></g></svg>),
        label: <Link to="/crm-sme/dashboard">Dashboard</Link>
    },
    {
        key: "/crm-sme/company", icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" d="M14.5 6.5h3m0 0h3m-3 0v3m0-3v-3" /><path d="M2.5 6.5c0-1.886 0-2.828.586-3.414S4.614 2.5 6.5 2.5s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586S2.5 8.386 2.5 6.5Zm11 11c0-1.886 0-2.828.586-3.414s1.528-.586 3.414-.586s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586s-.586-1.528-.586-3.414Z" /><path d="M2.5 17.5c0-1.886 0-2.828.586-3.414S4.614 13.5 6.5 13.5s2.828 0 3.414.586s.586 1.528.586 3.414s0 2.828-.586 3.414s-1.528.586-3.414.586s-2.828 0-3.414-.586S2.5 19.386 2.5 17.5Z" opacity="0.5" /></g></svg>),
        label: <Link to="/crm-sme/company">ข้อมูลบริษัท/หน่วยงาน</Link>
    },
    {
        key: "sub1",
        label: "บริหารจัดการคำขอ",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19.562 7a2.132 2.132 0 0 0-2.1-2.5H6.538a2.132 2.132 0 0 0-2.1 2.5M17.5 4.5c.028-.26.043-.389.043-.496a2 2 0 0 0-1.787-1.993C15.65 2 15.52 2 15.26 2H8.74c-.26 0-.391 0-.497.011a2 2 0 0 0-1.787 1.993c0 .107.014.237.043.496" opacity="0.5" /><path strokeLinecap="round" d="M15 18H9" /><path d="M2.384 13.793c-.447-3.164-.67-4.745.278-5.77C3.61 7 5.298 7 8.672 7h6.656c3.374 0 5.062 0 6.01 1.024s.724 2.605.278 5.769l-.422 3c-.35 2.48-.525 3.721-1.422 4.464s-2.22.743-4.867.743h-5.81c-2.646 0-3.97 0-4.867-.743s-1.072-1.983-1.422-4.464z" /></g></svg>),
        children: [
            { key: "/crm-sme/platform", label: <Link to="/crm-sme/platform">บริหารจัดการคำขอการใช้งานแพลตฟอร์ม</Link> },
            { key: "/crm-sme/training", label: <Link to="/crm-sme/training">บริหารจัดการคำขออบรม</Link> },
            { key: "7", label: "บริหารจัดการคำขอสอบวัดผล" },
        ],
    },
    {
        key: "sub2",
        label: "รายงาน",
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12c0-4.714 0-7.071 1.464-8.536C4.93 2 7.286 2 12 2s7.071 0 8.535 1.464C22 4.93 22 7.286 22 12s0 7.071-1.465 8.535C19.072 22 16.714 22 12 22s-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12Z" opacity="0.5" /><path strokeLinecap="round" d="M7 18V9m5 9V6m5 12v-5" /></g></svg>),
        children: [
            { key: "9", label: "รายงานสถิติการลงทะเบียนเข้าร่วมโครงการ" },
            { key: "10", label: "รายงานแบบประเมินความรู้ความเข้าใจ" },
            { key: "11", label: "รายงานแบบประเมินความพึงพอใจ" },
            // {
            //     key: "sub3",
            //     label: "Submenu",
            //     children: [
            //         { key: "11", label: "Option 11" },
            //         { key: "12", label: "Option 12" },
            //     ],
            // },
        ],
    },
    {
        key: "/crm-sme/settings", icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 16c0-2.828 0-4.243.879-5.121C3.757 10 5.172 10 8 10h8c2.828 0 4.243 0 5.121.879C22 11.757 22 13.172 22 16s0 4.243-.879 5.121C20.243 22 18.828 22 16 22H8c-2.828 0-4.243 0-5.121-.879C2 20.243 2 18.828 2 16Z" /><circle cx="12" cy="16" r="2" opacity="0.5" /><path strokeLinecap="round" d="M6 10V8a6 6 0 1 1 12 0v2" opacity="0.5" /></g></svg>),
        label: <Link to="/crm-sme/settings">ตั้งค่าบัญชีผู้ใช้งาน</Link>,
    },

];

const CRMLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();
    /*---------------------------------------------------------------------------------*/
    // ✅ เมนูโปรไฟล์
    const profileMenu: MenuProps["items"] = [
        {
            key: "1",
            label: <a href="/profile" className="font-sans">ข้อมูลผู้ใช้งาน</a>,
        },
        {
            key: "2",
            label: <a href="/settings" className="font-sans">ตั้งค่าบัญชี</a>,
        },
        {
            key: "3",
            danger: true,
            label: <a href="/logout" className="font-sans">ออกจากระบบ</a>,
        },
    ];
    /*---------------------------------------------------------------------------------*/
    const breadcrumbNameMap: Record<string, string> = {
        "/crm-sme": "Dashboard", // ✅ กรณีอยู่หน้า root layout
        //"/crm-sme/dashboard": "Dashboard",
        "/crm-sme/home": "Dashboard",
        "/crm-sme/company": "ข้อมูลบริษัท/หน่วยงาน",
        "/crm-sme/platform": "บริหารจัดการคำขอการใช้งานแพลตฟอร์ม",
        "/crm-sme/training": "บริหารจัดการคำขออบรม",
        "/crm-sme/settings": "ตั้งค่าบัญชีผู้ใช้งาน",
    };

    const hideBreadcrumb = location.pathname === "/crm-sme/dashboard";


    /*---------------------------------------------------------------------------------*/

    return (
        <Layout className="min-h-screen bg-[#f8fafd]">
            {/* Sidebar */}
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                width={320}
                collapsedWidth={100}
                className="bg-[#08162b] font-sans"
            >
                <div
                    className={`text-white text-center py-6 text-lg font-bold transition-opacity duration-300 `}
                >
                    {collapsed ? "SME" : "SME DEMO"}
                </div>
                <Menu
                    defaultSelectedKeys={[location.pathname]}   // ✅ ให้ค่าเริ่มต้นตรงกับ URL ปัจจุบัน
                    defaultOpenKeys={["sub1"]}                   // ✅ เปิดเมนูย่อยที่ต้องการ
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    selectedKeys={[location.pathname]}           // ✅ Active ตาม URL
                    items={items}
                    className={`font-sans custom-menu bg-[#08162b] font-light ${collapsed ? "text-lg py-4 " : "text-base py-4"
                        } transition-all duration-300`}
                    inlineIndent={16}
                />

            </Sider>

            {/* Main Content */}
            <Layout className="bg-[#f8fafd]">
                <Header className="bg-transparent pl-6 pt-4 flex items-center justify-between">
                    {/* Left: Toggle */}
                    <div className="flex justify-center items-center h-full">
                        <Button
                            type="text"
                            onClick={() => setCollapsed(!collapsed)}
                            icon={
                                collapsed ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path d="M12 3h-1C7.229 3 5.343 3 4.172 4.172S3 7.229 3 11v2c0 3.771 0 5.657 1.172 6.828S7.229 21 11 21h1" />
                                            <path
                                                strokeDasharray="2.5 3"
                                                strokeLinecap="round"
                                                d="M11 3h4c2.828 0 4.243 0 5.121.879C21 4.757 21 6.172 21 9v6c0 2.828 0 4.243-.879 5.121C19.243 21 17.828 21 15 21h-4"
                                                opacity="0.5"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                d="M12 2v20"
                                            />
                                        </g>
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                    >
                                        <g
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                        >
                                            <path d="M12 3h-1C7.229 3 5.343 3 4.172 4.172S3 7.229 3 11v2c0 3.771 0 5.657 1.172 6.828S7.229 21 11 21h1" />
                                            <path
                                                strokeDasharray="2.5 3"
                                                strokeLinecap="round"
                                                d="M11 3h4c2.828 0 4.243 0 5.121.879C21 4.757 21 6.172 21 9v6c0 2.828 0 4.243-.879 5.121C19.243 21 17.828 21 15 21h-4"
                                                opacity="0.5"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                d="M12 2v20"
                                            />
                                        </g>
                                    </svg>
                                )
                            }
                        />
                    </div>

                    {/* Right: Notifications + Profile */}
                    <div className="flex items-center gap-4">
                        <Badge count={5} size="small" className="mr-4">
                            <Button
                                type="text"
                                shape="circle"
                                className="hover:bg-gray-100"
                                icon={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M2.53 14.77c-.213 1.394.738 2.361 1.902 2.843c4.463 1.85 10.673 1.85 15.136 0c1.164-.482 2.115-1.45 1.902-2.843c-.13-.857-.777-1.57-1.256-2.267c-.627-.924-.689-1.931-.69-3.003C19.525 5.358 16.157 2 12 2S4.475 5.358 4.475 9.5c0 1.072-.062 2.08-.69 3.003c-.478.697-1.124 1.41-1.255 2.267" /><path d="M8 19c.458 1.725 2.076 3 4 3c1.925 0 3.541-1.275 4-3" /></g></svg>
                                }
                            />
                        </Badge>

                        <Dropdown
                            menu={{ items: profileMenu }}
                            placement="bottomRight"
                            arrow
                        >
                            <Avatar
                                size="large"
                                icon={<UserOutlined />}
                                className="cursor-pointer "
                            />
                        </Dropdown>
                    </div>
                </Header>


                {/* <div className="flex items-end justify-between px-6 pt-8">
                    {!hideBreadcrumb && (
                        <div className="font-sans">
                            <BreadcrumbNav
                                breadcrumbNameMap={breadcrumbNameMap}
                                homePath="/crm-sme"
                                homeLabel="Dashboard"
                            />
                        </div>
                    )}
                </div> */}

                <div className="font-sans mt-10 mb-0 px-8">
                    {/* Breadcrumb */}
                    {/* Only show Breadcrumb if not on the dashboard */}
                    {!hideBreadcrumb && (
                        <div className="font-sans">
                            <BreadcrumbNav
                                breadcrumbNameMap={breadcrumbNameMap}
                                homePath="/crm-sme"
                                homeLabel="Dashboard"
                            />
                        </div>
                    )}
                </div>

                <Content className="p-8">
                    <Outlet />
                </Content>

            </Layout>
        </Layout>
    );
};

export default CRMLayout;
