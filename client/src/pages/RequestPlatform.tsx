import React, { useEffect, useState } from "react";
import { Alert, Drawer, Flex, Tag, Card, Table, Spin, message, Dropdown, Menu, Modal, Row, Col, Form, Input, Radio, InputNumber, Select, Checkbox, Divider, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { supabase } from "../supabaseClient";
import { AlertTriangle, CheckCircle2, BarChart3, MoreVertical } from "lucide-react";
const { TextArea } = Input;
import { DownloadOutlined } from '@ant-design/icons';


interface Company {
  id: string;
  business_reg_num: string;
  business_name: string;
  owner_name: string;
  email: string;
  status: string;
  created_at: string;
  size_category: string;
  business_type: string;
}


const RequestPlatform: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  // -------------------------------------//

  const [form] = Form.useForm(); // ใช้ form instance

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // สำหรับแสดง modal ยืนยัน

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [reviewComment, setReviewComment] = useState(""); // Review comment for the status update
  const [confirmStatus, setConfirmStatus] = useState(""); // The selected status for confirmation
  const [loadings, setLoadings] = useState(false); // Loading state for the buttons

  const [successAlert, setSuccessAlert] = useState(false); // To control showing success alert


  // const handleMenuClick = ({ key }: { key: string }) => {
  //   if (key === "view") {
  //     setIsModalOpen(true);
  //   } else if (key === "edit") {
  //     console.log("ประวัติการแก้ไข");
  //   } else if (key === "delete") {
  //     console.log("ลบข้อมูล");
  //   }
  // };

  // ฟังก์ชัน handle เมนูที่คลิก
  const handleMenuClick = ({ key }: { key: string }, record: any) => {
    if (key === "view") {
      setSelectedCompany(record); // กำหนดข้อมูลที่เลือก
      form.setFieldsValue(record);
      setIsModalOpen(true); // เปิด modal เมื่อคลิก "ดูข้อมูล"
    } else if (key === "edit") {
      setIsDrawerOpen(true); // เปิด drawer
    } else if (key === "delete") {
      console.log("ลบข้อมูล");
    }
  };

  // const ActionMenu = () => (
  //   <Menu className="font-sans" onClick={handleMenuClick}>
  //     <Menu.Item key="view">ดูข้อมูล</Menu.Item>
  //     <Menu.Item key="edit">ประวัติการแก้ไข</Menu.Item>
  //     <Menu.Item key="delete">ลบข้อมูล</Menu.Item>
  //   </Menu>
  // );

  // Dropdown Menu สำหรับเลือกเมนู
  const ActionMenu = ({ record }: { record: any }) => (
    <Menu className="font-sans" onClick={(e) => handleMenuClick(e, record)}>
      <Menu.Item key="view">ดูข้อมูล</Menu.Item>
      <Menu.Item key="edit">ประวัติการแก้ไข</Menu.Item>
      <Menu.Item key="delete" danger>ลบข้อมูล</Menu.Item>
    </Menu>
  );


  const sizeOptions: Record<string, string> = {
    "micro": "วิสาหกิจรายย่อย (Micro Enterprise)",
    "small": "วิสาหกิจขนาดย่อม (Small Enterprise)",
    "medium": "วิสาหกิจขนาดกลาง (Medium Enterprise)",
    "notEligible": "ไม่เข้าเกณฑ์วิสาหกิจขนาดกลางและขนาดย่อม",
  };
  // -------------------------------------//


  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     setLoading(true);
  //     try {
  //       const { data, error } = await supabase
  //         .from("companies")
  //         .select("*")
  //         .order("created_at", { ascending: false });
  //       if (error) throw error;
  //       if (data) {
  //         setCompanies(data as Company[]);
  //       }
  //     } catch (err: any) {
  //       console.error("Fetch error:", err);
  //       message.error("โหลดข้อมูลไม่สำเร็จ");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCompanies();
  // }, []);

  // Fetch companies from Supabase
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("companies")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCompanies(data); // Set the data to state
    } catch (err) {
      message.error("Failed to load data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     setLoading(true);
  //     try {
  //       const { data, error } = await supabase
  //         .from("companies")
  //         .select("*")
  //         .order("created_at", { ascending: false });
  //       if (error) throw error;
  //       //setCompanies(data as Company[]);
  //       setCompanies(data);
  //     } catch (err: any) {
  //       console.error("Fetch error:", err);
  //       message.error("โหลดข้อมูลไม่สำเร็จ");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchCompanies();
  // }, []);


  useEffect(() => {
    fetchCompanies(); // เรียกใช้ฟังก์ชันดึงข้อมูลบริษัทเมื่อคอมโพเนนต์เริ่มต้น
  }, []);


  const openConfirmationModal = (status: string) => {
    setConfirmStatus(status); // ตั้งค่าตัวแปรสถานะที่จะเลือก
    setIsConfirmModalOpen(true); // เปิด Modal ยืนยัน
  };

  const handleStatusUpdate = async () => {
    if (!selectedCompany) return;

    try {
      setLoadings(true);

      const { error } = await supabase
        .from("companies")
        .update({
          status: confirmStatus,
          review_comment: reviewComment,
        })
        .eq("id", selectedCompany.id);

      if (error) throw new Error(error.message);

      setSelectedCompany({ ...selectedCompany, status: confirmStatus });
      setIsConfirmModalOpen(false);
      setIsModalOpen(false);
      fetchCompanies();

     
    } catch (err) {
      message.error("ไม่สามารถอัปเดตสถานะได้");
      console.error(err);
    } finally {
      setLoadings(false);
    }
  };
  // const handleStatusUpdate = async () => {
  //   if (!selectedCompany) return;

  //   try {
  //     setLoadings(true);

  //     const { error } = await supabase
  //       .from("companies")
  //       .update({
  //         status: confirmStatus, // อัปเดตสถานะ
  //         review_comment: reviewComment, // เพิ่มความคิดเห็นการพิจารณา
  //       })
  //       .eq("id", selectedCompany.id);

  //     if (error) throw new Error(error.message);

  //     // อัปเดตสถานะใน UI
  //     setSelectedCompany({ ...selectedCompany, status: confirmStatus });

  //     //message.success(`สถานะถูกอัปเดตเป็น: ${confirmStatus}`);
  //     setIsConfirmModalOpen(false); // ปิด Modal ยืนยัน
  //     setIsModalOpen(false); // ปิด Modal ข้อมูล
  //     fetchCompanies(); // รีเฟรชข้อมูลในตารางหลังจากอัปเดตสถานะ

  //     // Show success alert
  //   } catch (err) {
  //     message.error("ไม่สามารถอัปเดตสถานะได้");
  //     console.error(err);
  //   } finally {
  //     setLoadings(false);
  //   }
  // };

  // เมื่อคลิกแถวในตาราง
  // const handleRowClick = (record: Company) => {
  //   setSelectedCompany(record); // กำหนดข้อมูลที่เลือก
  //   form.setFieldsValue(record); // กำหนดค่าฟอร์มให้ตรงกับข้อมูลที่เลือก
  //   setIsModalOpen(true); // เปิด Modal
  // };


  // const handleRowClick = (record: any) => {
  //   setSelectedCompany(record); // กำหนดข้อมูลที่เลือก
  //   form.setFieldsValue(record); // กำหนดค่าฟอร์มให้ตรงกับข้อมูลที่เลือก
  //   setIsModalOpen(true); // เปิด Modal
  // };


  const columns: ColumnsType<Company> = [
    {
      title: "ลำดับ",
      key: "index",
      align: "center",
      render: (_: any, __: any, index: number) => index + 1, // เริ่มจาก 1
      width: 60,
    },
    {
      title: "เลขทะเบียนผู้ประกอบการ",
      dataIndex: "business_reg_num",
      key: "business_reg_num",
      align: "center",
      width: "180px"
    },
    {
      title: "ชื่อองค์กร",
      dataIndex: "business_name",
      key: "business_name",
      width: "220px",
    },
    {
      title: "ขนาดกิจการ",
      dataIndex: "size_category",
      key: "size_category",
      width: "100px",
      render: (value: string) => {
        return (
          <div className="py-1.5 px-3.5 bg-gray-50 rounded-full flex items-center justify-center w-max gap-1">
            <span className="font-light text-md text-gray-800">
              {sizeOptions[value] || "-"}  {/* ✅ ใช้ mapping แทน string ตรงๆ */}
            </span>
          </div>
        );
      },
    },

    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      //align: "center",
      width: "180px",
      render: (status: string) => {
        switch (status) {
          case "รอตรวจสอบ":
            return (
              <div className="py-1.5 px-3.5 bg-amber-50 rounded-full flex justify-center w-max items-center gap-1">
                <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2.5" cy="3" r="2.5" fill="#D97706" />
                </svg>
                <span className="font-medium text-md text-amber-600">รอตรวจสอบ</span>
              </div>
            );
          case "อยู่ระหว่างตรวจสอบ":
            return (
              <div className="py-1.5 px-3.5 bg-amber-50 rounded-full flex items-center justify-center w-max gap-1">
                <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2.5" cy="3" r="2.5" fill="#D97706"></circle>
                </svg>
                <span className="font-medium text-md text-amber-600">อยู่ระหว่างตรวจสอบ</span>
              </div>
            );
          case "อนุมัติคำขอ":
            return (
              <div className="py-1.5 px-3.5 bg-green-50 rounded-full flex items-center justify-center w-max gap-1">
                <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2.5" cy="3" r="2.5" fill="#16A34A"></circle>
                </svg>
                <span className="font-medium text-md text-green-600">อนุมัติคำขอ</span>
              </div>
            );
          case "ปฏิเสธคำขอ":
            return (
              <div className="py-1.5 px-3.5 bg-red-50 rounded-full flex items-center justify-center w-max gap-1">
                <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2.5" cy="3" r="2.5" fill="#DC2626"></circle>
                </svg>
                <span className="font-medium text-md text-red-600">ปฏิเสธคำขอ</span>
              </div>
            );
          case "รอตรวจสอบ (มีการแก้ไข)":
            return (
              <div className="py-1.5 px-3.5 bg-amber-50 rounded-full flex justify-center w-max items-center gap-1">
                <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2.5" cy="3" r="2.5" fill="#D97706" />
                </svg>
                <span className="font-medium text-md text-amber-600">รอตรวจสอบ (มีการแก้ไข)</span>
              </div>
            );
          case "แก้ไขคำขอ":
            return (
              <div className="py-1.5 px-3.5 bg-blue-50 rounded-full flex items-center justify-center w-max gap-1">
                <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2.5" cy="3" r="2.5" fill="#2563EB"></circle>
                </svg>
                <span className="font-medium text-md text-blue-600">แก้ไขคำขอ</span>
              </div>
            );

          default:
            return (
              <div className="py-1.5 px-3.5 bg-gray-50 rounded-full flex items-center justify-center w-max gap-1">
                <svg width="5" height="6" viewBox="0 0 5 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2.5" cy="3" r="2.5" fill="#6B7280"></circle>
                </svg>
                <span className="font-medium text-md text-gray-600">{status}</span>
              </div>
            );
        }
      },
    },
    {
      title: "วันที่ยื่นคำขอ",
      dataIndex: "created_at",
      key: "created_at",
      width: "180px",
      align: "center",
      render: (date: string) => new Date(date).toLocaleString("th-TH"),
    },
    // {
    //   title: "ผู้ตรวจสอบ",
    //   dataIndex: "auditor",
    //   width: "140px",
    //   align: "center",
    //   key: "auditor",
    // },
    {
      title: "",
      key: "action",
      align: "center",
      render: (_: any, record: any) => (
        <Dropdown overlay={<ActionMenu record={record} />} trigger={["click"]}>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="h-5 w-5 text-gray-500" />
          </button>
        </Dropdown>
      ),
    },
    //     {
    //   title: "",
    //   key: "action",
    //   width: "80px",
    //   align: "center",
    //     render: (_: any, record: any) => (
    //       <Dropdown overlay={<ActionMenu record={record} />} trigger={["click"]}>
    //       <button className="p-2 hover:bg-gray-100 rounded-full">
    //         <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
    //           <path
    //             fill="#a6a5a5"
    //             fillRule="evenodd"
    //             d="M6.51 12a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 12v.01a1.5 1.5 0 0 0 1.5 1.5h.01a1.5 1.5 0 0 0 1.5-1.5zm5.5-1.5a1.5 1.5 0 0 1 1.5 1.5v.01a1.5 1.5 0 0 1-1.5 1.5H12a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5zm7 0a1.5 1.5 0 0 1 1.5 1.5v.01a1.5 1.5 0 0 1-1.5 1.5H19a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //       </button>
    //     </Dropdown>
    //   ),
    // },
    // {
    //   title: "",
    //   key: "action",
    //   render: (text: any, record: any) => (
    //     <Button onClick={() => handleRowClick(record)}>ดูข้อมูล</Button>
    //   ),
    // },
    // {
    //   title: "",
    //   key: "action",
    //   width: "80px",
    //   align: "center",
    //   render: () => (
    //     <Dropdown overlay={<ActionMenu />} trigger={["click"]}>
    //       <button className="p-2 hover:bg-gray-100 rounded-full">
    //         {/* ไอคอน 3 จุด */}
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           width="20"
    //           height="20"
    //           viewBox="0 0 24 24"
    //         >
    //           <path
    //             fill="#a6a5a5"
    //             fillRule="evenodd"
    //             d="M6.51 12a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 12v.01a1.5 1.5 0 0 0 1.5 1.5h.01a1.5 1.5 0 0 0 1.5-1.5zm5.5-1.5a1.5 1.5 0 0 1 1.5 1.5v.01a1.5 1.5 0 0 1-1.5 1.5H12a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5zm7 0a1.5 1.5 0 0 1 1.5 1.5v.01a1.5 1.5 0 0 1-1.5 1.5H19a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5z"
    //             clipRule="evenodd"
    //           />
    //         </svg>
    //       </button>
    //     </Dropdown>
    //   ),
    // },
  ];

  return (
    <>
      {/* Success Alert */}
      {successAlert && (
        <Alert
          message="Success"
          description="The status has been updated successfully."
          type="success"
          showIcon
          closable
          onClose={() => setSuccessAlert(false)}
          style={{ marginBottom: 16 }}
        />
      )}


      <div className="pb-6">
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card className="w-full bg-white rounded-2xl border-none shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-500 font-sans">คำขอทั้งหมด</p>
                  <p className="text-3xl font-bold text-yellow-600">365</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="w-full bg-yellow-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                    // style={{ width: `${(riskMetrics.medium / totalRisks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {/* {Math.round((riskMetrics.medium / totalRisks) * 100)}% */}
                  </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="w-full bg-white rounded-2xl border-none shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-500 font-sans">รอตรวจสอบ</p>
                  <p className="text-3xl font-bold text-orange-500">79</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="w-full bg-orange-200 rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                    // style={{ width: `${(riskMetrics.high / totalRisks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {/* {Math.round((riskMetrics.high / totalRisks) * 100)}% */}

                  </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="w-full bg-white rounded-2xl border-none shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium text-gray-500 font-sans">อยู่ระหว่างตรวจสอบ</p>
                  <p className="text-3xl font-bold text-yellow-600">5</p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="w-full bg-yellow-200 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                    // style={{ width: `${(riskMetrics.medium / totalRisks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {/* {Math.round((riskMetrics.medium / totalRisks) * 100)}% */}
                  </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card className="w-full bg-white rounded-2xl border-none shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="ttext-lg font-medium text-gray-500 font-sans">อนุมัติ</p>
                  <p className="text-3xl font-bold text-green-500">35</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center">
                  <div className="w-full bg-green-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                    // style={{ width: `${(riskMetrics.low / totalRisks) * 100}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground">
                    {/* {Math.round((riskMetrics.low / totalRisks) * 100)}% */}

                  </span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>

      <Card className="w-full bg-white rounded-2xl border-none shadow-sm">
        <h1 className="text-xl font-bold mb-4 font-sans ">คำขอใช้งานแพลตฟอร์ม</h1>

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
          <div className="">
            <Table
              rowKey="id"
              columns={columns}
              dataSource={companies}
              pagination={{ pageSize: 5 }}

            />
          </div>

        )}
      </Card>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)} // ปุ่มปิดภายในยังใช้ได้
        footer={null}
        closable={false} // เอา X ของ AntD ออก
        maskClosable={false} // ❌ ไม่สามารถคลิกนอก modal เพื่อปิด
        width="95%"
        className="!max-w-full"

        style={{ top: 30, padding: 0 }}
        bodyStyle={{ height: "90vh", padding: 0, overflow: "hidden" }}
      //maskStyle={{ overflow: "hidden" }}
      >
        <div className="flex flex-col h-full bg-white font-sans">
          {/* Header */}
          <div className="flex justify-between items-center py-3 px-4 border-b border-gray-200">
            <h4 className="font-bold text-gray-700 text-lg">พิจารณาคำขอลงทะเบียน : {selectedCompany?.business_name}</h4>
            <button
              type="button"
              className="size-8 flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="p-4 overflow-y-auto flex-1">
            <p className="text-gray-700">
            </p>
            <div className="flex justify-center items-center"> {/* จัดคอนเทนต์ให้อยู่กลาง Modal */}

              <Row gutter={[24, 24]} >
                <Col span={16}>
                  {selectedCompany ? (

                    <Card className="w-full bg-white rounded-xl border-lg shadow-md">
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={() => { }}
                        className="space-y-4 font-sans"
                        size="large"
                      //disabled
                      >
                        <Divider className="font-sans text-lg">ข้อมูลผู้ติดต่อ</Divider>
                        <Form.Item
                          label="อีเมลผู้ประสานงาน"
                          name="email"
                          rules={[{ required: true, type: "email", message: "กรุณากรอกอีเมล" }]}
                        >
                          <Input readOnly />
                        </Form.Item>

                        <Form.Item
                          label="หมายเลขโทรศัพท์ผู้ประสานงาน"
                          name="phone"
                          rules={[{ required: true, message: "กรุณากรอกหมายเลขโทรศัพท์" }]}
                        >
                          <Input readOnly />
                        </Form.Item>

                        <Divider className="font-sans pt-4">หมวดที่ 1: ข้อมูลพื้นฐานของกิจการ</Divider>
                        <Form.Item
                          label="ประเภทธุรกิจ"
                          name="business_type"
                          rules={[{ required: true, message: "กรุณาเลือกประเภทธุรกิจ" }]}
                        >
                          <Radio.Group disabled>
                            <Radio value="corporate" >นิติบุคคล</Radio>
                            <Radio value="individual">บุคคลธรรมดา</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Form.Item
                          label="เลขทะเบียนผู้ประกอบการ SME"
                          name="business_reg_num"
                          rules={[{ required: true, message: "กรุณากรอกเลขทะเบียนผู้ประกอบการ SME" }]}
                        >
                          <Input readOnly />
                        </Form.Item>

                        <Form.Item
                          label="ชื่อผู้ประกอบการ SME"
                          name="owner_name"
                          rules={[{ required: true, message: "กรุณากรอกชื่อผู้ประกอบการ SME" }]}
                        >
                          <Input readOnly />
                        </Form.Item>

                        <Form.Item
                          label="ชื่อสถานประกอบการ SME"
                          name="business_name"
                          rules={[{ required: true, message: "กรุณากรอกชื่อสถานประกอบการ SME" }]}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          label="เว็บไซต์"
                          name="website_name"
                        >
                          <Input readOnly />
                        </Form.Item>
                        <Divider className="font-sans pt-4">หมวดที่ 2: ขนาดกิจการ</Divider>

                        {/* ภาคธุรกิจ */}
                        <Form.Item
                          label="ภาคธุรกิจ"
                          name="business_sector"
                          rules={[{ required: true, message: "กรุณาเลือกภาคธุรกิจ" }]}
                        >
                          <Radio.Group disabled>
                            <Radio value="manufacturing">ภาคการผลิต</Radio>
                            <Radio value="trade_service">ภาคการค้า/การบริการ</Radio>
                          </Radio.Group>
                        </Form.Item>

                        {/* จำนวนพนักงาน */}
                        <Form.Item
                          label="จำนวนพนักงาน"
                          name="employees"
                          rules={[{ required: true, message: "กรุณากรอกจำนวนพนักงาน" }]}
                        >
                          <InputNumber min={1} className="w-full" readOnly />
                        </Form.Item>

                        {/* รายได้ */}

                        <Form.Item
                          label="รายได้ของกิจการ (บาท/ปี)"
                          name="revenue"
                          rules={[{ required: true, message: "กรุณากรอกรายได้ของกิจการ" }]}
                        >

                          <InputNumber<number>
                            className="w-full"
                            //formatter={formatter}
                            parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                            // onChange={onChange}
                            readOnly
                          />
                        </Form.Item>
                        <Form.Item
                          label="ขนาดกิจการ"
                          name="size_category"
                          rules={[{ required: true, message: "กรุณาเลือกขนาดกิจการ" }]}
                        >
                          <Radio.Group disabled className="flex flex-col space-y-2">
                            {Object.keys(sizeOptions).map((key) => (
                              <Radio key={key} value={key}>
                                {sizeOptions[key]}
                              </Radio>
                            ))}
                          </Radio.Group>
                        </Form.Item>

                        <Divider className="font-sans pt-4">หมวดที่ 3: ประเภทอุตสาหกรรม</Divider>
                        <Form.Item label="ประเภทอุตสาหกรรม" name="industry_type" className="" rules={[{ required: true, message: "กรุณาเลือกประเภทอุตสาหกรรม" }]}>
                          <Select disabled placeholder="เลือกประเภทอุตสาหกรรม">
                            <Select.Option value="PublicSectorStability" className="font-sans" >ด้านความมั่นคงภาครัฐ</Select.Option>
                            <Select.Option value="KeyPublicSectorServices" className="font-sans">ด้านบริการภาครัฐที่สำคัญ</Select.Option>
                            <Select.Option value="InformationTechnologyandTelecommunications" className="font-sans">ด้านเทคโนโลยีสารสนเทศและโทรคมนาคม</Select.Option>
                            <Select.Option value="TransportationAndLogistics" className="font-sans">ด้านการขนส่งและโลจิสติกส์</Select.Option>
                            <Select.Option value="EnergyAndInfrastructure" className="font-sans" >ด้านพลังงานและสาธารณูปโภค</Select.Option>
                            <Select.Option value="Healthcare" className="font-sans">ด้านสาธารณสุข</Select.Option>
                            <Select.Option value="Education" className="font-sans">ด้านการศึกษา</Select.Option>
                            <Select.Option value="FinanceInvestmentAndInsurance" className="font-sans">ด้านการเงิน การลงทุน และการประกัน</Select.Option>
                            <Select.Option value="Tourism" className="font-sans">ด้านการท่องเที่ยว</Select.Option>
                            <Select.Option value="WholesaleRetailAndEcommerce" className="font-sans">ด้านการค้าส่ง-ค้าปลีก และการค้าออนไลน์</Select.Option>
                            <Select.Option value="RealEstate" className="font-sans">ด้านอสังหาริมทรัพย์</Select.Option>
                          </Select>
                        </Form.Item>


                        <Divider className="font-sans pt-4">หมวดที่ 4: การดำเนินการของหน่วยงาน</Divider>

                        <Form.Item
                          label=" มีการเก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคลที่มีความเสี่ยงที่จะมีผลกระทบต่อสิทธิและเสรีภาพของเจ้าของข้อมูล"
                          name="dataWithRisk"
                          rules={[{ required: true, message: 'กรุณาระบุคำตอบ' }]}
                        >
                          <Radio.Group disabled>
                            <Radio value="1">ใช่</Radio>
                            <Radio value="2">ไม่ใช่</Radio>
                            <Radio value="3">ไม่แน่ใจ</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item
                          label="เป็นหน่วยงานที่ไม่ใช่กิจการที่เก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคลเป็นครั้งคราว"
                          name="occasionalProcessing"
                          rules={[{ required: true, message: 'กรุณาระบุคำตอบ' }]}
                        >
                          <Radio.Group disabled>
                            <Radio value="1">ใช่</Radio>
                            <Radio value="2">ไม่ใช่</Radio>
                            <Radio value="3">ไม่แน่ใจ</Radio>
                          </Radio.Group>
                        </Form.Item>
                        <Form.Item
                          label=" มีการเก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคลตามมาตรา 26 (Sensitive data) ในการดำเนินการหลัก เช่น ข้อมูลสุขภาพ ข้อมูลเชื้อชาติ ข้อมูลศาสนา ข้อมูลประวัติอาชญากรรม ข้อมูลชีวมิติ เป็นต้น"
                          name="section26Processing"
                          rules={[{ required: true, message: 'กรุณาระบุคำตอบ' }]}
                        >
                          <Radio.Group disabled>
                            <Radio value="1">ใช่</Radio>
                            <Radio value="2">ไม่ใช่</Radio>
                            <Radio value="3">ไม่แน่ใจ</Radio>
                          </Radio.Group>
                        </Form.Item>

                        <Divider className="font-sans pt-4">หมวดที่ 5: การดำเนินการที่ประสงค์เข้าร่วม</Divider>
                        <Form.Item name="participations" rules={[{ required: true, message: "กรุณาเลือกอย่างน้อย 1 ข้อ" }]}>
                          <Checkbox.Group disabled className="flex flex-col items-start py-4">
                            <div className="flex items-start justify-start">
                              <Checkbox value="pdpa_platform" />
                              <span className="font-sans text-left pl-2">
                                การใช้งานแพลตฟอร์มรองรับกฎหมาย PDPA สำหรับหน่วยงานภาคเอกชน
                              </span>
                            </div>
                            <div className="flex items-start justify-start">
                              <Checkbox value="target_support" />
                              <span className="font-sans text-left pl-2">
                                การเข้าร่วมเป็นหน่วยงานเป้าหมายและรับการสนับสนุนเพื่อปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล
                              </span>
                            </div>
                            <div className="flex items-start justify-start">
                              <Checkbox value="training_mooc" />
                              <span className="font-sans text-left pl-2">
                                การฝึกอบรมหลักสูตรความรู้เกี่ยวกับกฎหมายคุมครองข้อมูลส่วนบุคคลสำหรับผู้ปฏิบัติงานผ่านระบบการเรียนรู้ในรูปแบบออนไลน์ MOOC <br /> (Massive Open Online Course) ซึ่งจัดทำโดยคณะนิติศาสตร์ จุฬาลงกรณ์มหาวิทยาวิทยาลัย และการสอบวัดผลหลักสูตรความรู้เกี่ยวกับกฎหมายคุ้มครองข้อมูลส่วนบุคคลของผู้ปฏิบัติงาน ในรูปแบบ on-site ซึ่งจัดโดยคณะนิติศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย
                              </span>
                            </div>
                          </Checkbox.Group>
                        </Form.Item>


                        <Divider className="font-sans pt-4">หมวดที่ 6: หลักฐานประกอบการพิจารณาคุณสมบัติ</Divider>

                        <ul className="list-disc ps-5 space-y-2 text-sm text-gray-600 py-4">
                          <li className="marker:text-blue-600">
                            <div className="flex justify-between items-center">
                              <span>หนังสือรับรองการขึ้นทะเบียนผู้ประกอบการ SME</span>
                              <button className="text-blue-600 hover:text-blue-800">
                                <Button color="primary" variant="filled" shape="circle" icon={<DownloadOutlined />} size="middle" />

                              </button>
                            </div>
                          </li>

                          <li className="marker:text-blue-600">
                            <div className="flex justify-between items-center">
                              <span>
                                หนังสือรับรองการจดทะเบียนบริษัท</span>
                              <button className="text-blue-600 hover:text-blue-800">
                                <Button color="primary" variant="filled" shape="circle" icon={<DownloadOutlined />} size='middle' />
                              </button>
                            </div>
                          </li>

                          <li className="marker:text-blue-600">
                            <div className="flex justify-between items-center">
                              <span>หนังสืออนุมัติจากผู้บริหารเพื่อขอรับการสนับสนุนเพื่อปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล</span>
                              <button className="text-blue-600 hover:text-blue-800">
                                <Button color="primary" variant="filled" shape="circle" icon={<DownloadOutlined />} size="middle" />
                              </button>

                            </div>
                          </li>

                        </ul>

                      </Form>
                    </Card>
                  ) : (
                    <Spin />
                  )}
                </Col>
                <Col span={8}>
                  <Card className="w-full bg-white rounded-xl border-lg shadow-md">
                    <p className="text-lg font-medium text-gray-800 font-sans">ผลการพิจารณา</p>
                    <p className="text-md font-medium text-gray-600 font-sans pt-2">สถานปัจจุบัน : <Tag color="green" className="font-sans"> {selectedCompany?.status} </Tag></p>
                    <br />
                    <div className="pb-6">
                      {/* <p className="text-md font-medium text-gray-800 font-sans">หมายเหตุการพิจารณา </p> */}
                      {/* <TextArea
                        rows={4}
                        placeholder="กรุณากรอกเหตุผลในการพิจารณา"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                      /> */}
                    </div>
                    <Flex vertical gap="small" style={{ width: '100%' }} >
                      <Button
                        className="font-sans"
                        size="large"
                        color="default"
                        variant="solid"
                        loading={loadings}
                        onClick={() => openConfirmationModal("อนุมัติคำขอ")}
                      >
                        อนุมัติ
                      </Button>

                      <Button
                        color="danger"
                        variant="outlined"
                        className="font-sans"
                        size="large"
                        loading={loadings}
                        onClick={() => openConfirmationModal("ปฏิเสธคำขอ")}
                      >
                        ปฏิเสธ
                      </Button>
                      <Button className="font-sans"
                        color="primary"
                        variant="dashed"
                        size="large"
                        loading={loadings}
                        onClick={() => openConfirmationModal("แก้ไขคำขอ")}
                      >
                        ส่งกลับเพื่อแก้ไข
                      </Button>

                    </Flex>
                  </Card>
                </Col>
              </Row>
            </div>
          </div>

          {/* Footer */}
          {/* <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t border-gray-200">
            <button
              onClick={() => setIsModalOpen(false)}
              className="py-2 px-3 text-sm font-medium rounded-lg border border-gray-200 bg-white hover:bg-gray-50"
            >
              Close
            </button>
            <button className="py-2 px-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700">
              Save changes
            </button>
          </div> */}
        </div>
      </Modal>
      {/* Confirmation Modal */}
      {/* Modal ยืนยันการอัปเดตสถานะ */}
      <Modal
        title="ยืนยันการอัปเดตสถานะ"
        visible={isConfirmModalOpen}
        onCancel={() => setIsConfirmModalOpen(false)}
        onOk={handleStatusUpdate}
        confirmLoading={loadings}
        okText={
          <div className="font-sans">
            ยืนยัน
          </div>
        }
        cancelText={
          <div className="font-sans">
            ยกเลิก
          </div>
        }
        className="font-sans"
      >
        {/* <p>กรุณายืนยันการอัปเดตสถานะของคำขอ</p> */}
        <p>สถานะที่จะอัปเดตเป็น: {confirmStatus}</p>
        <TextArea
          rows={4}
          placeholder="กรุณากรอกเหตุผลในการพิจารณา"
          value={reviewComment}
          onChange={(e) => setReviewComment(e.target.value)}
        />
      </Modal>

      <Drawer
        title={
          <div className="font-sans">
            ประวัติการแก้ไข
          </div>
        }
        placement="right" // drawer ด้านขวา
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={500}
      >
        {/* เนื้อหาประวัติการแก้ไข */}

        {/* คุณสามารถ map ข้อมูลจริงมาที่นี่ได้ */}
      </Drawer>


    </>
  );
};

export default RequestPlatform;
