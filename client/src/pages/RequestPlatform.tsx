import React, { useEffect, useState } from "react";
import { DatePicker, Timeline, Drawer, Flex, Tag, Card, Table, Spin, message, Dropdown, Menu, Modal, Row, Col, Form, Input, Radio, InputNumber, Select, Checkbox, Divider, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { supabase } from "../supabaseClient";
import { MoreVertical } from "lucide-react";

import type { SelectProps } from "antd";


//import { TablePaginationConfig } from 'antd';

// import { AlertTriangle, CheckCircle2, BarChart3, MoreVertical } from "lucide-react";
const { TextArea } = Input;
import { DownloadOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { notification } from "antd";
import { EarningsCard } from '../components/EarningsCard';
import { StatsGrid } from '../components/StatsGrid';


interface Company {
  id: string;
  business_reg_num: string;
  business_name: string;
  owner_name: string;
  email: string;
  status: string;
  created_at: string;
  updated_at: string;
  size_category: string;
  business_type: string;
  review_comment: string;
}

const { RangePicker } = DatePicker;

const RequestPlatform: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  const [loading, setLoading] = useState(false);
  // -------------------------------------//

  // -------------------------------------//

  const [form] = Form.useForm(); // ใช้ form instance

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false); // สำหรับแสดง modal ยืนยัน

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [reviewComment, setReviewComment] = useState(""); // Review comment for the status update
  const [confirmStatus, setConfirmStatus] = useState(""); // The selected status for confirmation
  const [loadings, setLoadings] = useState(false); // Loading state for the buttons

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10, // ขนาดเริ่มต้นของแต่ละหน้า
  });
  const [total, setTotal] = useState<number | undefined>(undefined); // กำหนดให้เป็น undefined แทน null



  // ฟังก์ชัน handle เมนูที่คลิก
  const handleMenuClick = ({ key }: { key: string }, record: any) => {
    if (key === "view") {
      setSelectedCompany(record); // กำหนดข้อมูลที่เลือก
      form.setFieldsValue(record);

      // ✅ เซ็ตค่า selectBefore / selectAfter
      setSelectBefore(record.business_prefix || "");
      setSelectAfter(record.business_suffix || "");

      setIsModalOpen(true); // เปิด modal เมื่อคลิก "ดูข้อมูล"
    } else if (key === "edit") {
      setIsDrawerOpen(true); // เปิด drawer
    } else if (key === "delete") {
      console.log("ลบข้อมูล");
    }
  };


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

  const [showInput, setShowInput] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);


  const handleClickInput = () => {
    setShowInput((prev) => !prev); // toggle แสดง/ซ่อน Input
    setShowDrawer(false);          // ปิด Drawer ถ้าเปิดอยู่
  };

  const handleClickDrawer = () => {
    setShowDrawer(true);
    setShowInput(false);           // ซ่อน Input ถ้ามี
  };

  const handleDrawerClose = () => {
    setShowDrawer(false);
  };
  // -------------------------------------//



  const { Option } = Select;
  // state สำหรับ selectBefore / selectAfter
  const [selectBefore, setSelectBefore] = useState("");
  const [selectAfter, setSelectAfter] = useState("");

  const handleBeforeChange: SelectProps["onChange"] = (value) => {
    setSelectBefore(value as string);
    form.setFieldsValue({ business_prefix: value });
  };

  const handleAfterChange: SelectProps["onChange"] = (value) => {
    setSelectAfter(value as string);
    form.setFieldsValue({ business_suffix: value });
  };

  // -------------------------------------//


  // ✅ ใช้ notification hook
  const [api, contextHolder] = notification.useNotification();



  // Fetch companies from Supabase
  // const fetchCompanies = async () => {
  //   setLoading(true);
  //   try {
  //     const { data, error } = await supabase
  //       .from("companies")
  //       .select("*")
  //       .order("created_at", { ascending: false });

  //     if (error) throw error;
  //     setCompanies(data);
  //   } catch (err) {
  //     message.error("Failed to load data");
  //     console.error("Fetch error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // Fetch companies from Supabase
  // const fetchCompanies = async () => {
  //   setLoading(true);
  //   const { current, pageSize } = pagination;

  //   try {
  //     const { data, error, count } = await supabase
  //       .from("companies")
  //       .select("*", { count: "exact" }) // ใช้ count: "exact" เพื่อรับจำนวนทั้งหมด
  //       .order("created_at", { ascending: false })
  //       .range((current - 1) * pageSize, current * pageSize - 1); // จัดการ range ตามหน้าและขนาดของหน้า

  //     if (error) throw error;
  //     setCompanies(data); // Set the data to state
  //     setTotal(count ?? undefined); // ใช้ undefined แทน null ถ้า count เป็น null
  //   } catch (err) {
  //     message.error("Failed to load data");
  //     console.error("Fetch error:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // const [filteredCompanies, setFilteredCompanies] = useState<Company[]>([]); // กรองข้อมูล


  // ฟังก์ชันค้นหาข้อมูลทั้งหมด
  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const { data, error, count } = await supabase
        .from("companies")
        .select("*", { count: "exact" })
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCompanies(data); // Set the full data
      setFilteredCompanies(data); // Set filtered data as the full data initially
      setTotal(count ?? 0); // Set total count
    } catch (err) {
      message.error("Failed to load data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  // -------------------------------------//

  const handleClear = () => {
    form.resetFields();  // รีเซ็ตฟอร์ม
    setFilteredCompanies(companies); // รีเซ็ตการกรองข้อมูล
    setTotal(companies.length); // รีเซ็ตจำนวนทั้งหมด
    setPagination({ current: 1, pageSize: pagination.pageSize }); // รีเซ็ตหน้าเป็นหน้าแรก

  };
  // -------------------------------------//

  // ฟังก์ชันกรองข้อมูล
  const handleSearch = (values: any) => {
    const { keyword, sizeCategory, Status, dateRange } = values;

    // กรองข้อมูลจากข้อมูลทั้งหมด
    const filteredData = companies.filter((company) => {
      const matchesKeyword =
        keyword ? company.business_name.includes(keyword) || company.business_reg_num.includes(keyword) : true;
      const matchesSizeCategory =
        sizeCategory && sizeCategory !== "all" ? company.size_category === sizeCategory : true;
      const matchesStatus =
        Status && Status !== "all" ? company.status === Status : true;

      // การกรองวันที่
      let matchesDateRange = true;
      if (dateRange && dateRange.length === 2) {
        const startDate = new Date(dateRange[0]);
        const endDate = new Date(dateRange[1]);

        matchesDateRange =
          new Date(company.created_at) >= startDate && new Date(company.created_at) <= endDate;
      } else if (dateRange && dateRange.length === 1) {
        // กรณีที่กรอกวันเดียว ให้ใช้วันนั้นทั้งวันเริ่มต้นและสิ้นสุด
        const selectedDate = new Date(dateRange[0]);
        matchesDateRange =
          new Date(company.created_at).toDateString() === selectedDate.toDateString(); // เปรียบเทียบวันเดียว
      }

      return matchesKeyword && matchesSizeCategory && matchesStatus && matchesDateRange;
    });
    setFilteredCompanies(filteredData); // อัพเดตข้อมูลที่กรอง
    setTotal(filteredData.length); // อัพเดตจำนวนทั้งหมดที่กรอง
  };
  // -------------------------------------//

  const [filteredCompanies, setFilteredCompanies] = useState(companies); // ข้อมูลที่กรองแล้ว

  const [keyword, setKeyword] = useState(""); // เก็บค่าคำค้นหา


  // ฟังก์ชันสำหรับการค้นหาตามคำที่กรอก
  const handleSearchkeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setKeyword(value); // เก็บค่าคำค้นหาใน state

    setLoading(true);
    // กรองข้อมูลตามคำค้นหา
    const filteredData = companies.filter(
      (item) =>
        item.business_name.toLowerCase().includes(value.toLowerCase()) || // ค้นหาจากชื่อธุรกิจ
        item.business_reg_num.includes(value) // ค้นหาจากเลขทะเบียน
    );
    setFilteredCompanies(filteredData); // เซตข้อมูลที่กรองแล้ว
    setTotal(filteredData.length); // อัพเดตจำนวนทั้งหมดที่กรอง

    setLoading(false);
  };
  // -------------------------------------//

  // useEffect(() => {
  //   fetchCompanies();
  // }, []);


  useEffect(() => {
    fetchCompanies(); // เรียกใช้ฟังก์ชันดึงข้อมูลบริษัทเมื่อคอมโพเนนต์เริ่มต้นหรือ pagination เปลี่ยนแปลง
  }, [pagination]);
  // -------------------------------------//

  const openConfirmationModal = (status: string) => {
    setConfirmStatus(status); // ตั้งค่าตัวแปรสถานะที่จะเลือก
    setIsConfirmModalOpen(true); // เปิด Modal ยืนยัน
  };
  // -------------------------------------//

  const handleReceiveCase = async () => {
    if (!selectedCompany) return;

    try {
      setLoadings(true);

      // กำหนดสถานะใหม่เป็น "อยู่ระหว่างตรวจสอบ"
      const confirmStatus = "อยู่ระหว่างตรวจสอบ";

      const { error } = await supabase
        .from("companies")
        .update({
          status: confirmStatus,
        })
        .eq("id", selectedCompany.id);

      if (error) throw error;

      api.success({
        message: "ข้อมูลอัปเดตสำเร็จ",
        description: "สถานะของคำขอถูกอัปเดตเป็น 'อยู่ระหว่างตรวจสอบ'",
        placement: "topRight",
        className: "font-sans text-gray-900",
      });

      // อัปเดตสถานะใน state
      setSelectedCompany({ ...selectedCompany, status: confirmStatus });

      // ปิด modal
      // setIsConfirmModalOpen(false);
      // setIsModalOpen(false);

      // ดึงข้อมูลใหม่
      fetchCompanies();
    } catch (err) {
      console.error(err);
      api.error({
        message: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัปเดตสถานะได้ กรุณาลองใหม่",
        placement: "topRight",
        className: "font-sans text-gray-900",

      });
    } finally {
      setLoadings(false);
    }
  };
  // -------------------------------------//


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

      if (error) throw error;

      api.success({
        message: "ข้อมูลอัปเดตสำเร็จ",
        description: "สถานะของคำขอถูกอัปเดตเรียบร้อยแล้ว",
        placement: "topRight",
        className: "font-sans text-gray-900", // Customize font here

      });

      setSelectedCompany({ ...selectedCompany, status: confirmStatus });
      setIsConfirmModalOpen(false);
      setIsModalOpen(false);
      fetchCompanies();
    } catch (err) {
      console.error(err);
      api.error({
        message: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถอัปเดตสถานะได้ กรุณาลองใหม่",
        placement: "topRight",
      });
    } finally {
      setLoadings(false);
    }
  };
  // -------------------------------------//


  // Mapping prefix value → ข้อความไทย
  const BUSINESS_PREFIX_LABEL: Record<string, string> = {
    company: "บริษัท",
    "public-company": "บริษัท (มหาชน)",
    "ordinary-partnership": "ห้างหุ้นส่วนสามัญนิติบุคคล",
    "limited-partnership": "ห้างหุ้นส่วนจำกัด",
    association: "สมาคม",
    foundation: "มูลนิธิ",
  };

  // Mapping suffix value → ข้อความไทย
  const BUSINESS_SUFFIX_LABEL: Record<string, string> = {
    ltd: "จำกัด",
    "public-ltd": "จำกัด (มหาชน)",
    unspecified: "",
  };

  // Helper function รวมชื่อเต็ม
  const getFullBusinessName = (record: any) => {
    const prefix = BUSINESS_PREFIX_LABEL[record.business_prefix] || "";
    const name = record.business_name || "";
    const suffix = BUSINESS_SUFFIX_LABEL[record.business_suffix] || "";

    return `${prefix ? prefix + " " : ""}${name}${suffix ? " " + suffix : ""}`;
  };

  // -------------------------------------//


  const columns: ColumnsType<Company> = [
    {
      title: "ลำดับ",
      key: "index",
      align: "center",
      render: (_: any, __: any, index: number) => {
        // คำนวณลำดับจาก filteredCompanies และ pagination
        const currentPage = pagination?.current ?? 1;
        const pageSize = pagination?.pageSize ?? 5;
        return (currentPage - 1) * pageSize + index + 1;
      },
      width: 70,
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
      render: (_: any, record: any) => getFullBusinessName(record),
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

  ];

  return (
    <>
      {contextHolder}

      {/* <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6"> */}
      <div className=" mx-auto space-y-6 mb-4">
        {/* Header */}

        {/* Dashboard Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Earnings Card */}
          <div className="lg:col-span-1">
            <EarningsCard />
          </div>

          {/* Stats Grid */}
          <div className="lg:col-span-3 font-sans">
            <StatsGrid />
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* <div className="pb-6">
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
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground">

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
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground">
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
                    ></div>
                  </div>
                  <span className="ml-2 text-xs text-muted-foreground">

                  </span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div> */}

      <Card className="w-full bg-white rounded-2xl border-none shadow-sm">

        <div className="flex justify-between ">
          <div className="">
            <h1 className="text-xl font-bold mb-4 font-sans ">คำขอใช้งานแพลตฟอร์ม</h1>
          </div>
          <div className="flex items-center gap-2">

            {/* แสดง Input ถ้า showInput = true */}
            {showInput && (
              <Input
                placeholder="Search here..."
                value={keyword} // ใช้ค่า keyword ที่กรอก
                onChange={handleSearchkeyword} // เรียกฟังก์ชันค้นหาทุกครั้งที่มีการพิมพ์
                // style={{ marginBottom: "10px", width: "300px" }} // จัดแต่งเพิ่มเติม
                variant="underlined"
              />
            )}


            {/* ปุ่ม Input */}
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={handleClickInput}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                />
              </svg>
            </button>


            {/* ปุ่ม Drawer */}
            <button
              className="p-2 hover:bg-gray-100 rounded-full"
              onClick={handleClickDrawer}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1"
                  d="M4 6h16M7 12h10m-6 6h2"
                />
              </svg>
            </button>


            {/* Drawer */}


            <Drawer
              title={
                <div className="font-sans">
                  ตัวกรอกค้นหา
                </div>
              } placement="right"      // drawer เปิดจากขวา
              onClose={handleDrawerClose}
              open={showDrawer}
              width={500}

            >
              <Form layout="vertical" size="large" onFinish={handleSearch} form={form}>
                <Form.Item label="คำค้นหา" name="keyword">
                  <Input />
                </Form.Item>
                {/* <Form.Item label="เลขทะเบียนผู้ประกอบการ" name="businessRegNum">
                  <Input />
                </Form.Item> */}
                <Form.Item label="ขนาดกิจการ" name="sizeCategory">
                  <Select>
                    {/* ตัวเลือกขนาดกิจการ รวม "ทั้งหมด" */}
                    <Select.Option value="all" className="font-sans">ทั้งหมด</Select.Option>
                    <Select.Option value="micro" className="font-sans">วิสาหกิจรายย่อย</Select.Option>
                    <Select.Option value="small" className="font-sans">วิสาหกิจขนาดย่อม</Select.Option>
                    <Select.Option value="medium" className="font-sans">วิสาหกิจขนาดกลาง</Select.Option>
                    <Select.Option value="notEligible" className="font-sans">ไม่เข้าเกณฑ์วิสาหกิจขนาดกลางและขนาดย่อม</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="สถานะ" name="Status">
                  <Select>
                    {/* ตัวเลือกขนาดกิจการ รวม "ทั้งหมด" */}
                    <Select.Option value="all" className="font-sans">ทั้งหมด</Select.Option>
                    <Select.Option value="รอตรวจสอบ" className="font-sans">รอตรวจสอบ</Select.Option>
                    <Select.Option value="อยู่ระหว่างตรวจสอบ" className="font-sans">อยู่ระหว่างตรวจสอบ</Select.Option>
                    <Select.Option value="อนุมัติคำขอ" className="font-sans">อนุมัติคำขอ</Select.Option>
                    <Select.Option value="ปฏิเสธคำขอ" className="font-sans">ปฏิเสธคำขอ</Select.Option>
                    <Select.Option value="รอตรวจสอบ (มีการแก้ไข)" className="font-sans">รอตรวจสอบ (มีการแก้ไข)</Select.Option>
                    <Select.Option value="แก้ไขคำขอ" className="font-sans">แก้ไขคำขอ</Select.Option>

                  </Select>
                </Form.Item>
                <Form.Item label="วันที่ยื่นคำขอ" name="dateRange">
                  <RangePicker
                    className="w-full"
                    placeholder={["วันที่เริ่มต้น", "วันที่สิ้นสุด"]} // กำหนด placeholder สำหรับทั้ง 2 ช่อง
                  />
                </Form.Item>

                <div className="flex justify-end">
                  <Button type="dashed" size="large" className="mr-2 font-sans" onClick={handleClear}>
                    ล้างค่า
                  </Button>
                  <Button type="primary" size="large" htmlType="submit" className="font-sans">
                    ค้นหา
                  </Button>
                </div>
              </Form>

            </Drawer>


          </div>

        </div>
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Spin size="large" />
          </div>
        ) : (
          <div className="font-sans">

            <Table
              rowKey="id"
              columns={columns}
              dataSource={filteredCompanies} // ใช้ข้อมูลที่กรอง
              scroll={{ x: 'max-content', y: 55 * 7 }}

              pagination={{
                className: 'pt-4',
                total,
                pageSize: pagination.pageSize ?? 10,
                current: pagination.current ?? 1,
                showTotal: (total, range) => (
                  <span className="font-sans">
                    {`${range[0]}-${range[1]} จาก ${total} รายการ`}
                  </span>
                ), showSizeChanger: true,
                onChange: (page, pageSize) => {
                  setPagination({ current: page, pageSize });
                  // กรองข้อมูลใหม่ตามหน้า
                  setFilteredCompanies(filteredCompanies.slice((page - 1) * pageSize, page * pageSize));
                },
              }}
            />

            {/* <Table
              rowKey="id"
              columns={columns}
              dataSource={filteredCompanies}
              scroll={{ x: 'max-content', y: 55 * 7 }}
              pagination={{
                total,
                pageSize: pagination.pageSize ?? 10,
                current: pagination.current ?? 1,
                showTotal: (total, range) => (
                  <span className="font-sans">
                    {`${range[0]}-${range[1]} จาก ${total} รายการ`}
                  </span>
                ), showSizeChanger: true,
                onChange: (page, pageSize) => {
                  setPagination({ current: page, pageSize });
                  // กรองข้อมูลใหม่ตามหน้า
                  setFilteredCompanies(companies.slice((page - 1) * pageSize, page * pageSize));
                },
              }}
            /> */}

            {/* <Table
              rowKey="id"
              columns={columns}
              dataSource={companies}
              scroll={{ x: 'max-content', y: 55 * 7 }}
              pagination={{
                className: 'pt-4',
                total: total,
                pageSize: pagination.pageSize ?? 10,
                current: pagination.current ?? 1,  // ใช้ค่าดีฟอลต์ 1 หากเป็น undefined
                showTotal: (total, range) => (
                  <span className="font-sans">
                    {`${range[0]}-${range[1]} จาก ${total} รายการ`}
                  </span>
                ),
                showSizeChanger: true,
                onChange: handleTableChange,
              }}
            /> */}

          </div>

        )}
      </Card>
      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        closable={false}
        maskClosable={false}
        width="95%"
        className="!max-w-full"
        style={{ top: 20, padding: 0 }} // Use style here for height

      >

        <div className="flex flex-col h-[90vh] bg-white font-sans overflow-hidden mt-2">
          {/* Header */}
          <div className="flex justify-between items-center pb-4 px-0 border-b border-gray-200">
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
                          label="เลขทะเบียนผู้ประกอบการ"
                          name="business_reg_num"
                          rules={[{ required: true, message: "กรุณากรอกเลขทะเบียนผู้ประกอบการ" }]}
                        >
                          <Input readOnly />
                        </Form.Item>

                        <Form.Item
                          label="ชื่อผู้ประกอบการ"
                          name="owner_name"
                          rules={[{ required: true, message: "กรุณากรอกชื่อผู้ประกอบการ" }]}
                        >
                          <Input readOnly />
                        </Form.Item>

                        {/* <Form.Item
                          label="ชื่อสถานประกอบการ"
                          name="business_name"
                          rules={[{ required: true, message: "กรุณากรอกชื่อสถานประกอบการ" }]}
                        >
                          <Input readOnly/>
                        </Form.Item> */}


                        <Form.Item
                          label="ชื่อสถานประกอบการ"
                          name="business_name"
                          rules={[{ required: true, message: "กรุณากรอกชื่อสถานประกอบการ" }]}
                        >
                          <Input
                            readOnly
                            className="w-full"
                            addonBefore={
                              <Select
                                disabled
                                value={selectBefore}
                                onChange={handleBeforeChange}
                                className="w-44"
                              >
                                <Option value="company">บริษัท</Option>
                                <Option value="ordinary-partnership">ห้างหุ้นส่วนสามัญนิติบุคคล</Option>
                                <Option value="limited-partnership">ห้างหุ้นส่วนจำกัด</Option>
                                <Option value="association">สมาคม</Option>
                                <Option value="foundation">มูลนิธิ</Option>
                              </Select>
                            }
                            addonAfter={
                              <Select
                                disabled
                                value={selectAfter}
                                onChange={handleAfterChange}
                                className="w-40"
                              >
                                <Option value="ltd">จำกัด</Option>
                                <Option value="public-ltd">จำกัด (มหาชน)</Option>
                                <Option value="unspecified">-</Option>
                              </Select>
                            }
                            placeholder="กรอกชื่อสถานประกอบการ"
                          />
                        </Form.Item>

                        <Form.Item name="business_prefix" noStyle>
                          <Input type="hidden" />
                        </Form.Item>
                        <Form.Item name="business_suffix" noStyle>
                          <Input type="hidden" />
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
                              <p className="text-blue-600 hover:text-blue-800">
                                <Button color="primary" variant="filled" shape="circle" icon={<DownloadOutlined />} size="middle" />

                              </p>
                            </div>
                          </li>

                          <li className="marker:text-blue-600">
                            <div className="flex justify-between items-center">
                              <span>
                                หนังสือรับรองการจดทะเบียนบริษัท</span>
                              <p className="text-blue-600 hover:text-blue-800">
                                <Button color="primary" variant="filled" shape="circle" icon={<DownloadOutlined />} size='middle' />
                              </p>
                            </div>
                          </li>

                          <li className="marker:text-blue-600">
                            <div className="flex justify-between items-center">
                              <span>หนังสืออนุมัติจากผู้บริหารเพื่อขอรับการสนับสนุนเพื่อปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล</span>
                              <p className="text-blue-600 hover:text-blue-800">
                                <Button color="primary" variant="filled" shape="circle" icon={<DownloadOutlined />} size="middle" />
                              </p>

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
                    <div className="py-4">
                      <span className="text-md font-sans text-gray-600">
                        ส่งเมื่อ: {selectedCompany?.created_at ? new Date(selectedCompany.created_at).toLocaleString() : 'ข้อมูลไม่พร้อม'}
                      </span>
                      <br />
                      <span className="text-md font-sans text-gray-600">
                        อัปเดตเมื่อ: {selectedCompany?.updated_at ? new Date(selectedCompany.updated_at).toLocaleString() : 'ข้อมูลไม่พร้อม'}
                      </span>
                    </div>

                    <div className="pb-6">
                      <p className="text-md font-medium text-gray-800 font-sans">หมายเหตุการพิจารณา </p>
                      <TextArea
                        rows={4}
                        value={selectedCompany?.review_comment || '-'}
                        readOnly
                        disabled
                      />
                    </div>

                    <Flex vertical gap="small" style={{ width: '100%' }} >

                      {selectedCompany?.status === "รอตรวจสอบ" || selectedCompany?.status === "รอตรวจสอบ (มีการแก้ไข)" ? (
                        <Button
                          className="font-sans"
                          size="large"
                          color="primary"
                          variant="solid"
                          loading={loadings}
                          onClick={() => {
                            handleReceiveCase(); // ฟังก์ชันที่เปลี่ยนสถานะ
                          }}
                          disabled={loadings}
                        >
                          รับเรื่อง
                        </Button>
                      ) : (
                        <>
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
                        </>
                      )}
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
        // title="ยืนยันการอัปเดตสถานะ"
        title={
          <div className="flex items-center">
            <ExclamationCircleOutlined className="mr-2 text-yellow-600 text-2xl" />
            <p className="text-lg">ยืนยันการอัปเดตสถานะ</p>
          </div>
        } open={isConfirmModalOpen}
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
        <p className="my-2">สถานะที่จะอัปเดตเป็น: {confirmStatus}</p>
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
        <Timeline
          items={[
            {
              children: 'Create a services site 2015-09-01',
            },
            {
              children: 'Solve initial network problems 2015-09-01',
            },
            {
              children: 'Technical testing 2015-09-01',
            },
            {
              children: 'Network problems being solved 2015-09-01',
            },
          ]}
        />

        {/* คุณสามารถ map ข้อมูลจริงมาที่นี่ได้ */}
      </Drawer>


    </>
  );
};

export default RequestPlatform;
