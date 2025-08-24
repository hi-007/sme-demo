// src/components/CompanyRegistration.tsx
import { useEffect, useState } from "react";
import { Form, Input, Radio, InputNumber, Select, Checkbox, Divider, Button, Modal, Row, Col, Typography, message } from 'antd'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import { Upload } from "lucide-react";

import { useLocation } from "react-router-dom";


const { Title, Text } = Typography

const { Link } = Typography;
import type { InputNumberProps } from 'antd';

// options
const sizeOptions = [
  { value: "micro", label: "วิสาหกิจรายย่อย (Micro Enterprise)" },
  { value: "small", label: "วิสาหกิจขนาดย่อม (Small Enterprise)" },
  { value: "medium", label: "วิสาหกิจขนาดกลาง (Medium Enterprise)" },
  { value: "notEligible", label: "ไม่เข้าเกณฑ์วิสาหกิจขนาดกลางและขนาดย่อม" },
];

//----------------------------------------------------------------------------//
const renderIndustryWarning = (value: string) => {
  switch (value) {
    case 'PublicSectorStability': return 'ด้านความมั่นคงภาครัฐ'
    case 'KeyPublicSectorServices': return 'ด้านบริการภาครัฐที่สำคัญ'
    case 'InformationTechnologyandTelecommunications': return 'ด้านเทคโนโลยีสารสนเทศและโทรคมนาคม'
    case 'TransportationAndLogistics': return 'ด้านการขนส่งและโลจิสติกส์'
    case 'EnergyAndInfrastructure': return 'ด้านพลังงานและสาธารณูปโภค'
    case 'Healthcare': return 'ด้านสาธารณสุข'
    case 'Education': return 'ด้านการศึกษา'
    case 'FinanceInvestmentAndInsurance': return 'ด้านการเงิน การลงทุน และการประกัน'
    case 'Tourism': return 'ด้านการท่องเที่ยว'
    case 'WholesaleRetailAndEcommerce': return 'ด้านการค้าส่ง-ค้าปลีก และการค้าออนไลน์'
    case 'RealEstate': return 'ด้านอสังหาริมทรัพย์'
    default: return 'ไม่ระบุ'
  }
}


//----------------------------------------------------------------------------//


const PlatformRegis = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  //----------------------------------------------------------------------------//

  const location = useLocation();
  const { companyId } = location.state || {};

  const [companyData, setCompanyData] = useState<any>(null);


  // Fetch company data by companyId
  useEffect(() => {
    if (companyId) {
      setLoading(true);
      const fetchCompanyData = async () => {
        try {
          const { data, error } = await supabase
            .from("companies")
            .select("*")
            .eq("id", companyId)
            .single();

          if (error) {
            throw error;
          }

          setCompanyData(data);
          form.setFieldsValue(data); // Pre-fill the form with fetched data
        } catch (err) {
          console.error("Error fetching company data:", err);
          message.error("ไม่สามารถดึงข้อมูลบริษัทได้");
        } finally {
          setLoading(false);
        }
      };

      fetchCompanyData();
    }
  }, [companyId, form]);

  // ฟังก์ชัน formatter สำหรับแปลงค่าแสดงผลในรูปแบบเงิน
  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
  };

  const formatter: InputNumberProps<number>['formatter'] = (value) => {
    const [start, end] = `${value}`.split('.') || [];
    const v = `${start}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `${end ? `${v}.${end}` : `${v}`}`;
  };

  //----------------------------------------------------------------------------//

  // watch ค่า form
  const businessSector = Form.useWatch("business_sector", form);
  const employees = Form.useWatch("employees", form);
  const revenue = Form.useWatch("revenue", form);
  const selectedSize = Form.useWatch("sizeCategory", form); // ✅ ดูค่า sizeCategory แบบ reactive

  // ฟังก์ชันคำนวณขนาดกิจการ
  const calculateSize = (
    businessSector: string,
    employees: number,
    revenue: number
  ) => {
    if (!businessSector || !employees || !revenue) return "notEligible";

    if (businessSector === "manufacturing") {
      // ภาคการผลิต
      const maxEmployees = 200;
      const maxRevenue = 500_000_000;

      if (employees > maxEmployees || revenue > maxRevenue) return "notEligible";

      if (revenue <= 1_800_000) return "micro";
      if (revenue <= 100_000_000) return "small";
      if (revenue <= 500_000_000) return "medium";

      if (employees <= 5) return "micro";
      if (employees <= 50) return "small";
      if (employees <= 200) return "medium";
    }

    if (businessSector === "trade_service") {
      // ภาคการค้า/บริการ
      const maxEmployees = 100;
      const maxRevenue = 300_000_000;

      if (employees > maxEmployees || revenue > maxRevenue) return "notEligible";

      if (revenue <= 1_800_000) return "micro";
      if (revenue <= 50_000_000) return "small";
      if (revenue <= 300_000_000) return "medium";

      if (employees <= 5) return "micro";
      if (employees <= 30) return "small";
      if (employees <= 100) return "medium";
    }

    return "notEligible";
  };

  // อัปเดต sizeCategory อัตโนมัติ
  useEffect(() => {
    // ถ้ายังไม่กรอกครบ 3 ช่อง ไม่ต้องเซ็ตค่า
    if (!businessSector || !employees || !revenue) {
      form.setFieldsValue({ size_category: undefined });
      return;
    }

    const size = calculateSize(businessSector, employees, revenue);
    form.setFieldsValue({ size_category: size });
  }, [businessSector, employees, revenue, form]);


  //----------------------------------------------------------------------------//



  const [formData, setFormData] = useState<any>(null)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false)

  const handleSubmit = (values: any) => {
    // เพิ่ม sizeCategory ลงใน formData เผื่อ Modal ใช้งาน
    const size = calculateSize(values.businessSector, values.employees, values.revenue);
    setFormData({ ...values, sizeCategory: size });
    setIsModalVisible(true);
  };

  const [loading, setLoading] = useState(false) // ✅ เพิ่ม state loading


  const handleConfirm = async () => {
    if (!formData) return

    setLoading(true) // เริ่มแสดง Spinner
    try {

      const { error } = await supabase
        .from('companies')
        .insert([
          {
            email: formData.email,
            phone: formData.phone,
            business_type: formData.business_type,
            business_reg_num: formData.business_reg_num,
            owner_name: formData.owner_name,
            business_name: formData.business_name,
            website_name: formData.website_name,
            business_sector: formData.business_sector,
            employees: formData.employees,
            revenue: formData.revenue,
            size_category: formData.size_category,
            industry_type: formData.industry_type,
            dataWithRisk: formData.dataWithRisk,
            occasionalProcessing: formData.occasionalProcessing,
            section26Processing: formData.section26Processing,
            participations: formData.participations,
            status: "รอตรวจสอบ",
          },
        ])


      if (error) {
        console.error('Insert error:', error)
        message.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
        return
      }

      setIsModalVisible(false)
      setIsSuccessModalVisible(true)
    } finally {
      setLoading(false) // ปิด Spinner
    }
  }

  // const handleConfirm = async () => {
  //   if (!formData) return

  //   const { data, error } = await supabase
  //     .from('companies')
  //     .insert([
  //       {
  //         email: formData.email,
  //         phone: formData.phone,
  //         business_type: formData.businessType,
  //         business_reg_num: formData.businessRegNum,
  //         owner_name: formData.ownerName,
  //         business_name: formData.businessName,
  //         website_name: formData.websiteName,
  //         business_sector: formData.businessSector,
  //         employees: formData.employees,
  //         revenue: formData.revenue,
  //         size_category: formData.sizeCategory,
  //         industry_type: formData.industryType,
  //         dataWithRisk: formData.dataWithRisk,
  //         occasionalProcessing: formData.occasionalProcessing,
  //         section26Processing: formData.section26Processing,
  //         participations: formData.participations,
  //       },
  //     ])

  //   if (error) {
  //     console.error('Insert error:', error)
  //     message.error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  //     return
  //   }

  //   setIsModalVisible(false)
  //   setIsSuccessModalVisible(true)
  // }

  const handleCloseModal = () => setIsModalVisible(false)
  const handleCloseSuccessModal = () => {
    setIsSuccessModalVisible(false)
    form.resetFields()
    navigate('/')
  }


  //----------------------------------------------------------------------------//
  // Finding the label based on the selected value in sizeCategory
  //const selectedSizeLabel = sizeOptions.find(option => option.value === formData?.sizeCategory)?.label;

  //----------------------------------------------------------------------------//
  const getSelectedOptions = () => {
    const selectedValues: string[] = formData?.participations || [];
    const options: Record<string, string> = {
      pdpa_platform: 'การใช้งานแพลตฟอร์มรองรับกฎหมาย PDPA สำหรับหน่วยงานภาคเอกชน',
      target_support: 'การเข้าร่วมเป็นหน่วยงานเป้าหมายและรับการสนับสนุนเพื่อปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล',
      training_mooc: 'การฝึกอบรมหลักสูตรความรู้เกี่ยวกับกฎหมายคุมครองข้อมูลส่วนบุคคลสำหรับผู้ปฏิบัติงานผ่านระบบการเรียนรู้ในรูปแบบออนไลน์ MOOC',
    };
    return selectedValues.map(value => options[value]);
  };

  // const getSelectedOptions = () => {
  //   const selectedValues: ('pdpa_platform' | 'target_support' | 'training_mooc')[] = form.getFieldValue('participations');
  //   const options = {
  //     pdpa_platform: 'การใช้งานแพลตฟอร์มรองรับกฎหมาย PDPA สำหรับหน่วยงานภาคเอกชน',
  //     target_support: 'การเข้าร่วมเป็นหน่วยงานเป้าหมายและรับการสนับสนุนเพื่อปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล',
  //     training_mooc: 'การฝึกอบรมหลักสูตรความรู้เกี่ยวกับกฎหมายคุมครองข้อมูลส่วนบุคคลสำหรับผู้ปฏิบัติงานผ่านระบบการเรียนรู้ในรูปแบบออนไลนฯ',
  //   };

  //   return selectedValues?.map((value) => options[value]);
  // };



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

                <h1 className="text-3xl font-semibold text-gray-800 lg:text-4xl">แบบฟอร์มแจ้งความประสงค์ </h1>
                <p className="text-xl text-gray-600 mt-4">
                  ขอรับการสนับสนุนเพื่อปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล
                  <br />
                  ภายใต้โครงการแพลตฟอร์มเพื่อสนับสนุนการปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคลสำหรับภาคเอกชน สำนักงานคณะกรรมการคุ้มครองข้อมูลส่วนบุคคล

                </p>
              </div>

              <div className="grid lg:grid-cols-1 gap-12 ">
                {/* Contact Info */}


                {/* Contact Form with Enhanced Design */}
                <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-gray-200/50 relative overflow-hidden">
                  {/* Form background decoration */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-gray-100 to-gray-200 rounded-full opacity-30 -translate-y-16 translate-x-16"></div>

                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    className="space-y-4 font-sans"
                    size="large"
                  >
                    {/* อีเมลและเบอร์มือถือ */}
                    <Divider className="font-sans text-lg ">ข้อมูลผู้ติดต่อ</Divider>
                    <Form.Item
                      label="อีเมลผู้ประสานงาน"
                      name="email"
                      rules={[{ required: true, type: 'email', message: 'กรุณากรอกอีเมล' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="หมายเลขโทรศัพท์ผู้ประสานงาน"
                      name="phone"
                      rules={[{ required: true, message: 'กรุณากรอกหมายเลขโทรศัพท์' }]}
                    >
                      <Input />
                    </Form.Item>

                    {/* ข้อมูลพื้นฐานของกิจการ */}
                    <Divider className="font-sans pt-4">หมวดที่ 1: ข้อมูลพื้นฐานของกิจการ</Divider>
                    <Form.Item
                      label="ประเภทธุรกิจ"
                      name="business_type"
                      rules={[{ required: true, message: 'กรุณาเลือกประเภทธุรกิจ' }]}
                    >
                      <Radio.Group>
                        <Radio value="corporate">นิติบุคคล</Radio>
                        <Radio value="individual">บุคคลธรรมดา</Radio>
                        {/* <Radio value="communityEnterprise">วิสาหกิจชุมชน</Radio> */}
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      label="เลขทะเบียนผู้ประกอบการ SME"
                      name="business_reg_num"
                      rules={[{ required: true, message: 'กรุณากรอกเลขทะเบียนผู้ประกอบการ SME' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="ชื่อผู้ประกอบการ SME"
                      name="owner_name"
                      rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ประกอบการ SME' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      label="ชื่อสถานประกอบการ SME"
                      name="business_name"
                      rules={[{ required: true, message: 'กรุณากรอกชื่อสถานประกอบการ SME' }]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label="เว็บไซต์"
                      name="website_name"
                    >
                      <Input />
                    </Form.Item>
                    {/* ขนาดกิจการ */}
                    <Divider className="font-sans pt-4">หมวดที่ 2: ประเมินขนาดกิจการ</Divider>

                    {/* ภาคธุรกิจ */}
                    <Form.Item
                      label="ภาคธุรกิจ"
                      name="business_sector"
                      rules={[{ required: true, message: "กรุณาเลือกภาคธุรกิจ" }]}
                    >
                      <Radio.Group>
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
                      <InputNumber min={1} className="w-full" />
                    </Form.Item>

                    {/* รายได้ */}

                    <Form.Item
                      label="รายได้ของกิจการ (บาท/ปี)"
                      name="revenue"
                      rules={[{ required: true, message: "กรุณากรอกรายได้ของกิจการ" }]}
                    >

                      <InputNumber<number>
                        className="w-full"
                        formatter={formatter}
                        parser={(value) => value?.replace(/\$\s?|(,*)/g, '') as unknown as number}
                        onChange={onChange}
                      />
                    </Form.Item>

                    {/* ขนาดกิจการ */}
                    <Form.Item
                      label="ขนาดกิจการ"
                      name="size_category"
                      rules={[{ required: true, message: "กรุณาเลือกขนาดกิจการ (ระบบคำนวณตามการจ้างงานและรายได้)" }]}
                    >
                      {/* <Radio.Group className="flex flex-col space-y-2" value={selectedSize}>
                        {sizeOptions.map((opt) => (
                          <Radio key={opt.value} value={opt.value} disabled>
                            {opt.label}
                          </Radio>
                        ))}
                      </Radio.Group> */}

                      <Radio.Group className="flex flex-col space-y-2">
                        {sizeOptions.map((opt) => (
                          <Radio
                            key={opt.value}
                            value={opt.value}
                            disabled={selectedSize !== opt.value}
                            defaultChecked
                          >
                            {opt.label}
                          </Radio>
                        ))}
                      </Radio.Group>
                    </Form.Item>

                    {/* ประเภทอุตสาหกรรม */}
                    <Divider className="font-sans pt-4">หมวดที่ 3: ประเภทอุตสาหกรรม</Divider>
                    <Form.Item label="ประเภทอุตสาหกรรม" name="industry_type" className="" rules={[{ required: true, message: "กรุณาเลือกประเภทอุตสาหกรรม" }]}>
                      <Select placeholder="เลือกประเภทอุตสาหกรรม">
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
                      <Radio.Group>
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
                      <Radio.Group>
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
                      <Radio.Group>
                        <Radio value="1">ใช่</Radio>
                        <Radio value="2">ไม่ใช่</Radio>
                        <Radio value="3">ไม่แน่ใจ</Radio>
                      </Radio.Group>
                    </Form.Item>

                    <Divider className="font-sans pt-4">หมวดที่ 5: การดำเนินการที่ประสงค์เข้าร่วม</Divider>
                    <Form.Item name="participations" rules={[{ required: true, message: "กรุณาเลือกอย่างน้อย 1 ข้อ" }]}>
                      <Checkbox.Group className="flex flex-col items-start py-4">
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
                            <Upload className="w-5 h-5" />
                          </button>
                        </div>
                      </li>

                      <li className="marker:text-blue-600">
                        <div className="flex justify-between items-center">
                          <span>หนังสือรับรองการจดทะเบียนบริษัท</span>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Upload className="w-5 h-5" />
                          </button>
                        </div>
                      </li>

                      <li className="marker:text-blue-600">
                        <div className="flex justify-between items-center">
                          <span>หนังสืออนุมัติจากผู้บริหารเพื่อขอรับการสนับสนุนเพื่อปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล</span>
                          <button className="text-blue-600 hover:text-blue-800">
                            <Upload className="w-5 h-5" />
                          </button>

                        </div>
                      </li>
                      <Link href="#" target="_blank" className="font-sans">
                        ดาวน์โหลดไฟล์
                      </Link>
                    </ul>

                    {/* ปุ่ม Submit */}



                    <Form.Item className="flex justify-center gap-4">
                      <Button
                        onClick={() => navigate("/")}
                        color="primary" variant="outlined" className="w-36 h-10 font-sans p-4 mr-2">
                        ยกเลิก
                      </Button>
                      <Button type="primary" htmlType="submit" className="w-36 h-10 font-sans p-4 ml-2">
                        ลงทะเบียน
                      </Button>
                    </Form.Item>
                  </Form>

                  {/* Modal สำหรับแสดงรายละเอียด */}
                  <Modal
                    title={<span className="text-2xl font-semibold flex justify-center pb-4">ตรวจสอบรายละเอียดการลงทะเบียน</span>}  // ใช้ Tailwind สำหรับการเพิ่มขนาดตัวอักษร
                    open={isModalVisible}
                    onOk={handleConfirm}
                    onCancel={handleCloseModal}
                    closable={false} // ปิดไอคอนปิดที่มุมขวาบน
                    width={900} // ปรับขนาด Modal ให้กว้างขึ้น
                    footer={null}  // ลบ footer เดิมออก
                    maskClosable={false} // ป้องกันการคลิกนอก Modal เพื่อปิด
                    className="font-sans"
                    style={{ top: 26 }}
                  >

                    {/* ทำให้เนื้อหา scroll */}
                    <div className="overflow-y-auto overflow-x-hidden max-h-[82vh]">
                      <span className="flex justify-center mb-4 text-gray-500" >กรุณาตรวจสอบรายละเอียดการลงทะเบียนก่อนยืนยัน</span>
                      <div className="mb-4">
                        <Title level={4} className="font-sans bg-slate-100 p-2">ข้อมูลผู้ติดต่อ</Title>
                        <Row gutter={[16, 16]} className="pl-4">
                          <Col span={12}>
                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">อีเมล:</Text>
                              <p className="font-sans">
                                {formData?.email}
                              </p>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">หมายเลขโทรศัพท์:</Text>
                              <p className="font-sans">
                                {formData?.phone}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      <div className="mb-4">
                        <Title level={4} className="font-sans bg-slate-100 p-2">ข้อมูลพื้นฐานของกิจการ</Title>
                        <Row gutter={[16, 16]} className="pl-4">
                          <Col span={12}>
                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">ประเภทธุรกิจ:</Text>
                              <p className="font-sans">
                                {formData?.businessType === 'corporate' ? 'นิติบุคคล' : 'บุคคลธรรมดา'}
                              </p>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">เลขทะเบียนผู้ประกอบการ SME:</Text>
                              <p className="font-sans">
                                {formData?.businessRegNum}                              
                                </p>
                            </div>
                          </Col>


                          <Col span={12}>
                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">ชื่อผู้ประกอบการ SME:</Text>
                              <p className="font-sans">
                                {formData?.ownerName}
                              </p>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">ชื่อสถานประกอบการ SME:</Text>
                              <p className="font-sans">
                                {formData?.businessName}
                              </p>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">เว็บไซต์:</Text>
                              <p className="font-sans">
                                {formData?.websiteName}
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>

                      {/* เพิ่มกลุ่มข้อมูลอื่น ๆ เช่น ข้อมูลการประเมินขนาดกิจการ */}
                      <div className="mb-4">
                        <Title level={4} className="font-sans bg-slate-100 p-2">ข้อมูลการประเมินขนาดกิจการ</Title>

                        <Row gutter={[16, 16]} className="pl-4">
                          <Col span={12}>

                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">ภาคธุรกิจ:</Text>
                              <p className="font-sans">
                                {formData?.businessSector === 'manufacturing' ? 'ภาคการผลิต' : 'ภาคการค้า/การบริการ'}                              </p>
                            </div>


                          </Col>
                          <Col span={12}>
                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">จำนวนพนักงาน:</Text>
                              <p className="font-sans">
                                {formData?.employees} คน
                              </p>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">รายได้ของกิจการ (บาท/ปี):</Text>
                              <p className="font-sans">
                                {formData?.revenue}
                              </p>
                            </div>
                          </Col>
                          <Col span={12}>
                            <div className="flex items-center">
                              <Text strong className="font-sans mr-2">ขนาดกิจการ:</Text>
                              <p className="font-sans">
                                {sizeOptions.find(opt => opt.value === formData?.sizeCategory)?.label || 'ข้อมูลไม่ครบถ้วน'}
                              </p>

                            </div>
                          </Col>
                        </Row>
                      </div>
                      <Divider></Divider>
                      <div className="mb-4">
                        <Title level={4} className="font-sans">การดำเนินการของหน่วยงาน</Title>

                        <Row gutter={[16, 16]} className="">
                          <Col span={24}>
                            <div className="flex items-center py-2">
                              <Text strong className="font-sans">
                                1) มีการเก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคลที่มีความเสี่ยงที่จะมีผลกระทบต่อสิทธิและเสรีภาพของเจ้าของข้อมูล
                              </Text>
                            </div>
                            <ul className="space-y-3 text-sm font-sans pl-4">
                              <li className="flex gap-x-3">
                                <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </span>
                                <span className="text-gray-800">
                                  {formData?.dataWithRisk === '1' ? 'ใช่' : formData?.dataWithRisk === '2' ? 'ไม่ใช่' : 'ไม่แน่ใจ'}
                                </span>
                              </li>
                            </ul>
                          </Col>
                        </Row>

                        <Row gutter={[16, 16]} className="">
                          <Col span={24}>
                            <div className="flex items-center py-2">
                              <Text strong className="font-sans">
                                2) เป็นหน่วยงานที่ไม่ใช่กิจการที่เก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคลเป็นครั้งคราว
                              </Text>
                            </div>
                            <ul className="space-y-3 text-sm font-sans pl-4">
                              <li className="flex gap-x-3">
                                <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </span>
                                <span className="text-gray-800">
                                  {formData?.occasionalProcessing === '1' ? 'ใช่' : formData?.occasionalProcessing === '2' ? 'ไม่ใช่' : 'ไม่แน่ใจ'}
                                </span>
                              </li>
                            </ul>
                          </Col>

                        </Row>

                        <Row gutter={[16, 16]} className="">
                          <Col span={24}>
                            <div className="flex items-center py-2">
                              <Text strong className="font-sans">
                                3) มีการเก็บรวบรวม ใช้ เปิดเผยข้อมูลส่วนบุคคลตามมาตรา 26 (Sensitive data) ในการดำเนินการหลัก <br /> เช่น ข้อมูลสุขภาพ ข้อมูลเชื้อชาติ ข้อมูลศาสนา ข้อมูลประวัติอาชญากรรม ข้อมูลชีวมิติ เป็นต้น
                              </Text>
                            </div>
                            <div className="pl-4">
                              <ul className="space-y-3 text-sm font-sans ">
                                <li className="flex gap-x-3">
                                  <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                    <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                  </span>
                                  <span className="text-gray-800">
                                    {formData?.section26Processing === '1' ? 'ใช่' : formData?.section26Processing === '2' ? 'ไม่ใช่' : 'ไม่แน่ใจ'}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </Col>

                        </Row>
                      </div>
                      {/* เพิ่มรายละเอียดหมวดที่ 3 */}
                      <Divider></Divider>

                      <div className="mb-4">
                        <Title level={4} className="font-sans">ประเภทอุตสาหกรรม</Title>
                        <Row gutter={[16, 16]} className="pl-6">
                          <ul className="space-y-3 text-sm font-sans">
                            <li className="flex gap-x-3">
                              <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              <span className="text-gray-800">
                                {renderIndustryWarning(formData?.industryType)}
                              </span>
                            </li>
                          </ul>
                        </Row>
                      </div>
                      <Divider></Divider>
                      <div className="mb-4">
                        <Title level={4} className="font-sans">การดำเนินการที่ประสงค์เข้าร่วม</Title>
                        <Row gutter={[16, 16]} className="pl-6">

                          <ul className="space-y-3 text-sm font-sans">
                            {/* แสดงข้อความจาก Checkbox ที่เลือก */}
                            {getSelectedOptions()?.map((option, index) => (
                              <li key={index} className="flex gap-x-3">
                                <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                  </svg>
                                </span>
                                <span className="text-gray-800 pr-6">
                                  {option}
                                </span>
                              </li>
                            ))}
                          </ul>


                        </Row>
                      </div>

                      <Divider></Divider>

                      <div className="mb-8">
                        <Title level={4} className="font-sans">หลักฐานประกอบการพิจารณาคุณสมบัติ</Title>
                        <Row gutter={[16, 16]} className="pl-6">
                          <ul className="space-y-3 text-sm font-sans">
                            <li className="flex gap-x-3">
                              <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              <span className="text-gray-800">
                                หนังสือรับรองการขึ้นทะเบียนผู้ประกอบการ SME
                              </span>
                            </li>

                            <li className="flex gap-x-3">
                              <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              <span className="text-gray-800">
                                หนังสือรับรองการจดทะเบียนบริษัท
                              </span>
                            </li>

                            <li className="flex gap-x-3">
                              <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                              <span className="text-gray-800">
                                หนังสืออนุมัติจากผู้บริหารเพื่อขอรับการสนับสนุนเพื่อปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล
                              </span>
                            </li>
                          </ul>
                        </Row>
                      </div>
                      {/* ปุ่มปิด Modal */}
                      <div className="flex justify-center mt-6">
                        <div className="flex justify-center">
                          <Button
                            key="cancel"
                            onClick={handleCloseModal}
                            className="w-36 h-10 font-sans p-4 ml-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                          >
                            ยกเลิก
                          </Button>
                          <Button
                            key="ok"
                            type="primary"
                            onClick={handleConfirm}
                            loading={loading} // ✅ แสดง Spinner บนปุ่ม

                            className="w-36 h-10 font-sans p-4 ml-2 bg-blue-500 text-white hover:bg-blue-600"
                          >
                            ยืนยันการลงทะเบียน
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Modal Success */}
      <Modal
        //title={<span className="text-2xl font-semibold flex justify-center pb-4">Success</span>}
        open={isSuccessModalVisible}
        onOk={handleCloseSuccessModal}  // เมื่อกด "Got it" ปิด Modal และนำทางไปหน้าหลัก
        onCancel={handleCloseSuccessModal}  // เมื่อกดปิด Modal
        width={420}
        className="font-sans"
        footer={[
          <button
            key="gotIt"
            onClick={handleCloseSuccessModal}
            className="mb-2 px-5 py-2.5 cursor-pointer w-full rounded-lg text-white text-sm font-medium border-none outline-none bg-gray-800 hover:bg-gray-700"
          >
            Got it
          </button>
        ]}
        closable={false}  // ปิดไอคอนปิดที่มุมขวาบน
        maskClosable={false} // ป้องกันการคลิกนอก Modal เพื่อปิด

      >
        <div className="text-center pt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 shrink-0 fill-green-500 inline"
            viewBox="0 0 512 512"
          >
            <path
              d="M383.841 171.838c-7.881-8.31-21.02-8.676-29.343-.775L221.987 296.732l-63.204-64.893c-8.005-8.213-21.13-8.393-29.35-.387-8.213 7.998-8.386 21.137-.388 29.35l77.492 79.561a20.687 20.687 0 0 0 14.869 6.275 20.744 20.744 0 0 0 14.288-5.694l147.373-139.762c8.316-7.888 8.668-21.027.774-29.344z"
            />
            <path
              d="M256 0C114.84 0 0 114.84 0 256s114.84 256 256 256 256-114.84 256-256S397.16 0 256 0zm0 470.487c-118.265 0-214.487-96.214-214.487-214.487 0-118.265 96.221-214.487 214.487-214.487 118.272 0 214.487 96.221 214.487 214.487 0 118.272-96.215 214.487-214.487 214.487z"
            />
          </svg>
          <h4 className="text-xl text-slate-900 font-semibold mt-6">Successfully accepted!</h4>
          <p className="text-sm text-slate-500 leading-relaxed mt-4">
            ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว
          </p>
        </div>
      </Modal>


    </>
  );
}

export default PlatformRegis

