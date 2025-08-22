import React, { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import { useNavigate } from "react-router-dom";
import {

  Divider,
  Row,
  Col,
  Spin,
  message,
  Typography
} from "antd";


const { Title, Text } = Typography;
const PlatformTracking: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false)

  const businessType: Record<string, string> = {
    "corporate": "นิติบุคคล",
    "individual": "บุคคลธรรมดา",
  };

  const businessSector: Record<string, string> = {
    "manufacturing": "ภาคการผลิต",
    "trade_service": "ภาคการค้า/การบริการ",
  };

  const sizeOptions: Record<string, string> = {
    "micro": "วิสาหกิจรายย่อย (Micro Enterprise)",
    "small": "วิสาหกิจขนาดย่อม (Small Enterprise)",
    "medium": "วิสาหกิจขนาดกลาง (Medium Enterprise)",
    "notEligible": "ไม่เข้าเกณฑ์วิสาหกิจขนาดกลางและขนาดย่อม",
  };

  const mapAnswer: Record<string, string> = {
    "1": "ใช่",
    "2": "ไม่ใช่",
    "3": "ไม่แน่ใจ",
  };

  // ฟังก์ชันแปลงค่าที่เก็บใน DB เป็นข้อความภาษาไทย
  const mapParticipations = (values: string[] = []) => {
    const options: Record<string, string> = {
      pdpa_platform: 'การใช้งานแพลตฟอร์มรองรับกฎหมาย PDPA สำหรับหน่วยงานภาคเอกชน',
      target_support: 'การเข้าร่วมเป็นหน่วยงานเป้าหมายและรับการสนับสนุนเพื่อปฏิบัติตามกฎหมายคุ้มครองข้อมูลส่วนบุคคล',
      training_mooc: 'การฝึกอบรมหลักสูตรความรู้เกี่ยวกับกฎหมายคุมครองข้อมูลส่วนบุคคลสำหรับผู้ปฏิบัติงานผ่านระบบการเรียนรู้ในรูปแบบออนไลน์ MOOC',
    }

    return values.map(v => options[v]).filter(Boolean)
  }

  // แปลงค่า industryType จาก DB เป็นข้อความภาษาไทย
  const mapIndustryType = (value: string) => {
    const options: Record<string, string> = {
      PublicSectorStability: 'ด้านความมั่นคงภาครัฐ',
      KeyPublicSectorServices: 'ด้านบริการภาครัฐที่สำคัญ',
      InformationTechnologyandTelecommunications: 'ด้านเทคโนโลยีสารสนเทศและโทรคมนาคม',
      TransportationAndLogistics: 'ด้านการขนส่งและโลจิสติกส์',
      EnergyAndInfrastructure: 'ด้านพลังงานและสาธารณูปโภค',
      Healthcare: 'ด้านสาธารณสุข',
      Education: 'ด้านการศึกษา',
      FinanceInvestmentAndInsurance: 'ด้านการเงิน การลงทุน และการประกัน',
      Tourism: 'ด้านการท่องเที่ยว',
      WholesaleRetailAndEcommerce: 'ด้านการค้าส่ง-ค้าปลีก และการค้าออนไลน์',
      RealEstate: 'ด้านอสังหาริมทรัพย์',
    };
    return options[value] || '-';
  }

  const [companies, setCompanies] = useState<any[]>([])

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("companies")
          .select("*")
          .order("created_at", { ascending: false }) // ล่าสุดก่อน
        // .limit(1)  // ลบออกเพื่อดึงทุก record

        if (error) throw error
        if (data) setCompanies(data)
      } catch (err: any) {
        console.error("Fetch error:", err)
        message.error("โหลดข้อมูลไม่สำเร็จ")
      } finally {
        setLoading(false)
      }
    }

    fetchCompanies()
  }, [])
  // ------------------------------------------------------- //
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "รอตรวจสอบ":
        return {
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
      case "อยู่ระหว่างตรวจสอบ":
        return {
          bg: "bg-blue-100",
          text: "text-blue-700",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          ),
        };
      case "อนุมัติคำขอ":
        return {
          bg: "bg-green-100",
          text: "text-green-700",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      case "ปฏิเสธคำขอ":
        return {
          bg: "bg-red-100",
          text: "text-red-700",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ),
        };
      case "แก้ไขคำขอ":
        return {
          bg: "bg-orange-100",
          text: "text-orange-700",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6-6 3 3-6 6H9v-3z" />
            </svg>
          ),
        };
      case "รอตรวจสอบ (มีการแก้ไข)":
        return {
          bg: "bg-purple-100",
          text: "text-purple-700",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ),
        };
      default:
        return {
          bg: "bg-gray-100",
          text: "text-gray-700",
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ),
        };
    }
  };


  // ------------------------------------------------------- //


  return (
    <div className="min-h-screen ">

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
        </header>

        <section className="min-h-screen py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">

          <div className="absolute inset-0">
            <div className="absolute top-10 left-20 w-48 h-48 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-br from-green-200 to-blue-200 rounded-full opacity-15 blur-3xl"></div>
            <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-br from-orange-200 to-pink-200 rounded-full opacity-25 blur-xl"></div>
          </div>

          <div className="container px-6 py-8 mx-auto">
            <div className="container mx-auto px-4 lg:px-8 relative z-10">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-0">
                  <h2 className="text-3xl font-semibold lg:text-4xl text-gray-900">
                    สถานะการสมัครเข้าร่วมโครงการ
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto pt-8">
            <p className="md:text-xl font-medium text-gray-500 pb-2">
              คำขอของคุณ
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Spin size="large" />
            </div>
          ) : companies.length === 0 ? (
            <p className="text-center text-gray-500">ยังไม่มีคำขอ</p>
          ) : (
            <div className="space-y-0">
              {companies.map((company) => (

                <div className="container mx-auto px-4 lg:px-8 relative z-10">
                  <div className="max-w-4xl mx-auto">
                    <Row>
                      <Col span={24}>
                        <div key={company.id} className="bg-white/80 backdrop-blur-sm p-6 mb-12 rounded-2xl shadow-lg border border-gray-200/50 relative overflow-hidden">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-lg font-sans font-semibold text-gray-900">
                                {company.business_name}
                              </span>
                            </div>
                            <div className="space-y-2">
                              {/* <span className="inline-flex items-center justify-center rounded-full bg-purple-100 px-2.5 py-0.5 text-purple-700">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="-ms-1 me-1.5 size-4"

                                >
                                  <circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" /></svg>
                                <p className="text-sm font-sans whitespace-nowrap">{company.status}</p>
                              </span> */}
                              <div className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium font-sans ${getStatusBadge(company.status).bg} ${getStatusBadge(company.status).text}`}>
                                {getStatusBadge(company.status).icon}
                                {company.status}
                              </div>

                            </div>
                          </div>
                          {/* ------------------------------------------- */}

                          <div className="space-y-4 mt-4">
                            <details
                              className="cursor-pointer  group border-s-4 border-gray-200 bg-gray-50 p-4 [&_summary::-webkit-details-marker]:hidden"
                            //open
                            >
                              <summary className="flex items-center justify-between gap-1.5 text-gray-900">
                                <h2 className="text-lg font-medium font-sans">ข้อมูลการลงทะเบียน</h2>

                                <svg
                                  className="size-5 shrink-0 transition-transform duration-300 group-open:-rotate-180"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                              </summary>
                              <div className="mb-4">
                                <Title level={5} className="font-sans ">ข้อมูลผู้ติดต่อ</Title>
                                <Row gutter={[16, 16]} className="pl-4">
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">อีเมล:</Text>
                                      <p className="font-sans">
                                        <span>{company.email}</span>
                                      </p>
                                    </div>
                                  </Col>
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">หมายเลขโทรศัพท์:</Text>
                                      <p className="font-sans">
                                        <span>{company.phone}</span>
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <Divider></Divider>

                              <div className="mb-4">
                                <Title level={5} className="font-sans 2">ข้อมูลพื้นฐานของกิจการ</Title>
                                <Row gutter={[16, 16]} className="pl-4">
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">ประเภทธุรกิจ:</Text>
                                      <p className="font-sans">
                                        {company?.business_type ? businessType[String(company.business_type)] : "-"}
                                      </p>
                                    </div>
                                  </Col>
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">เลขทะเบียนผู้ประกอบการ SME:</Text>
                                      <p className="font-sans">
                                        <span>{company.business_reg_num}</span>
                                      </p>
                                    </div>
                                  </Col>
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">ชื่อผู้ประกอบการ SME:</Text>
                                      <p className="font-sans">
                                        <span>{company.owner_name}</span>
                                      </p>
                                    </div>

                                  </Col>
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">ชื่อสถานประกอบการ SME:</Text>
                                      <p className="font-sans">
                                        <span>{company.business_name}</span>
                                      </p>
                                    </div>
                                  </Col>
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">เว็บไซต์:</Text>
                                      <p className="font-sans">
                                        <span>{company.website_name}</span>
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <Divider></Divider>

                              <div className="mb-4">
                                <Title level={5} className="font-sans ">ข้อมูลการประเมินขนาดกิจการ</Title>
                                <Row gutter={[16, 16]} className="pl-4">
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">ภาคธุรกิจ:</Text>
                                      <p className="font-sans">
                                        {company?.business_sector ? businessSector[String(company.business_sector)] : "-"}
                                      </p>
                                    </div>
                                  </Col>
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">จำนวนพนักงาน:</Text>
                                      <p className="font-sans">
                                        <span>{company.employees} คน</span>
                                      </p>
                                    </div>
                                  </Col>
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">รายได้ของกิจการ (บาท/ปี):</Text>
                                      <p className="font-sans">
                                        <span>{company.revenue?.toLocaleString()} บาท</span>
                                      </p>
                                    </div>
                                  </Col>
                                  <Col span={12}>
                                    <div className="flex items-center">
                                      <Text strong className="font-sans mr-2">ขนาดกิจการ:</Text>
                                      <p className="font-sans">
                                        {company?.size_category ? sizeOptions[String(company.size_category)] : "-"}
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </div>
                              <Divider></Divider>
                              <div className="mb-4">
                                <Title level={5} className="font-sans">การดำเนินการของหน่วยงาน</Title>

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
                                          {company?.dataWithRisk ? mapAnswer[String(company.dataWithRisk)] : "-"}
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
                                          {company?.occasionalProcessing ? mapAnswer[String(company.occasionalProcessing)] : "-"}

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
                                            {company?.section26Processing ? mapAnswer[String(company.section26Processing)] : "-"}

                                          </span>
                                        </li>
                                      </ul>
                                    </div>
                                  </Col>

                                </Row>
                              </div>
                              <Divider></Divider>

                              <div className="mb-4">
                                <Title level={5} className="font-sans">ประเภทอุตสาหกรรม</Title>
                                <Row gutter={[16, 16]} className="pl-6">
                                  <ul className="space-y-3 text-sm font-sans">
                                    <li className="flex gap-x-3">
                                      <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                          <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                      </span>
                                      <span className="text-gray-800 pl-0">
                                        {mapIndustryType(company.industry_type)}
                                      </span>
                                    </li>
                                  </ul>
                                </Row>
                              </div>
                              <Divider></Divider>
                              <div className="mb-4">
                                <Title level={5} className="font-sans">การดำเนินการที่ประสงค์เข้าร่วม</Title>

                                <Row gutter={[16, 16]} className="pl-4">
                                  {mapParticipations(company.participations).map((text, idx) => (
                                    <Col span={24} key={idx}>
                                      <div className="flex items-start gap-x-2 py-1">
                                        <span className="size-5 flex justify-center items-center rounded-full bg-blue-50 text-blue-600">
                                          <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12"></polyline>
                                          </svg>
                                        </span>
                                        <span className="text-gray-800 font-sans pl-1">{text}</span>
                                      </div>
                                    </Col>
                                  ))}
                                </Row>
                              </div>

                              <Divider></Divider>

                              <div className="mb-8">
                                <Title level={5} className="font-sans">หลักฐานประกอบการพิจารณาคุณสมบัติ</Title>
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

                            </details>
                          </div>
                          <div className="p-4 mt-4 flex justify-start bg-gray-50 rounded-xl">
                            <div>
                              <div className="text-md font-sans font-semibold mb-2">
                                <h4 >หมายเหตุ :</h4>
                              </div>
                              <div>
                                xxxx
                              </div>
                            </div>
                          </div>
                          {/* ----------------- Footer ------------------ */}
                          <div className="py-4">
                            <span className="text-md font-sans text-gray-600">
                              ส่งเมื่อ: {new Date(company.created_at).toLocaleString()}
                            </span>
                            {company.updated_at && (
                              <>
                                <br />
                                <span className="text-md font-sans text-gray-600">
                                  อัปเดตเมื่อ: {new Date(company.updated_at).toLocaleString()}
                                </span>
                              </>
                            )}
                          </div>

                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* <section className="font-sans min-h-screen py-0 bg-gradient-to-br bg-white relative overflow-hidden">
          
        </section> */}
      </div>

    </div>


  );
}







export default PlatformTracking;

