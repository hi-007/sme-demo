import React from "react";
import { Card } from "antd";

const RequestPlatform: React.FC = () => (
  <Card className="font-sans w-full bg-white rounded-xl flex items-center justify-start  border-none shadow-sm">
    <h1 className="text-xl font-bold mb-4">คำขอใช้งานแพลตฟอร์ม</h1>
    <p className="text-gray-600">รายละเอียดคำขอใช้งานแพลตฟอร์ม</p>
  </Card>
);

export default RequestPlatform;

// import React, { useEffect, useState } from "react"
// import { Table, Button, Modal, Form, Input, Select, Checkbox, InputNumber, Space, Popconfirm, message } from "antd"
// import { supabase } from '../supabaseClient'

// const { Option } = Select

// const RequestPlatform: React.FC = () => {
//   const [form] = Form.useForm()
//   const [data, setData] = useState<any[]>([])
//   const [loading, setLoading] = useState(false)
//   const [editingRecord, setEditingRecord] = useState<any | null>(null)
//   const [previewRecord, setPreviewRecord] = useState<any | null>(null)

//   // โหลดข้อมูลทั้งหมด
//   const fetchData = async () => {
//     setLoading(true)
//     const { data, error } = await supabase.from("companies").select("*").order("id", { ascending: true })
//     if (error) {
//       console.error(error)
//       message.error("โหลดข้อมูลล้มเหลว")
//     } else {
//       setData(data || [])
//     }
//     setLoading(false)
//   }

//   useEffect(() => {
//     fetchData()
//   }, [])

//   // บันทึกข้อมูล (Create หรือ Update)
//   const handleFinish = async (values: any) => {
//     if (editingRecord) {
//       // Update
//       const { error } = await supabase.from("companies").update(values).eq("id", editingRecord.id)
//       if (error) {
//         message.error("แก้ไขข้อมูลล้มเหลว")
//       } else {
//         message.success("แก้ไขข้อมูลเรียบร้อย")
//         setEditingRecord(null)
//         form.resetFields()
//         fetchData()
//       }
//     } else {
//       // Create
//       const { error } = await supabase.from("companies").insert([values])
//       if (error) {
//         message.error("บันทึกข้อมูลล้มเหลว")
//       } else {
//         message.success("บันทึกข้อมูลเรียบร้อย")
//         form.resetFields()
//         fetchData()
//       }
//     }
//   }

//   // ลบข้อมูล
//   const handleDelete = async (id: number) => {
//     const { error } = await supabase.from("companies").delete().eq("id", id)
//     if (error) {
//       message.error("ลบข้อมูลล้มเหลว")
//     } else {
//       message.success("ลบข้อมูลเรียบร้อย")
//       fetchData()
//     }
//   }

//   // คอลัมน์ตาราง
//   const columns = [
//     { title: "ชื่อกิจการ", dataIndex: "businessName", key: "businessName" },
//     { title: "อีเมล", dataIndex: "email", key: "email" },
//     { title: "เบอร์โทร", dataIndex: "phone", key: "phone" },
//     {
//       title: "จัดการ",
//       key: "actions",
//       render: (_: any, record: any) => (
//         <Space>
//           <Button type="link" onClick={() => setPreviewRecord(record)}>ดู</Button>
//           <Button type="link" onClick={() => { setEditingRecord(record); form.setFieldsValue(record) }}>แก้ไข</Button>
//           <Popconfirm title="ยืนยันลบ?" onConfirm={() => handleDelete(record.id)}>
//             <Button type="link" danger>ลบ</Button>
//           </Popconfirm>
//         </Space>
//       )
//     }
//   ]

//   return (
//     <div style={{ maxWidth: 900, margin: "0 auto", padding: 20 }}>
//       <h2>แบบฟอร์มสมัคร SME</h2>
//       <Form form={form} layout="vertical" onFinish={handleFinish}>
//         <Form.Item name="email" label="อีเมล" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="phone" label="เบอร์โทรศัพท์" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="businessType" label="ประเภทกิจการ">
//           <Select>
//             <Option value="นิติบุคคล">นิติบุคคล</Option>
//             <Option value="บุคคลธรรมดา">บุคคลธรรมดา</Option>
//           </Select>
//         </Form.Item>
//         <Form.Item name="businessName" label="ชื่อกิจการ" rules={[{ required: true }]}>
//           <Input />
//         </Form.Item>
//         <Form.Item name="ownerName" label="ชื่อผู้ประกอบการ">
//           <Input />
//         </Form.Item>
//         <Form.Item name="employees" label="จำนวนพนักงาน">
//           <InputNumber min={1} style={{ width: "100%" }} />
//         </Form.Item>
//         <Form.Item name="participations" label="การเข้าร่วม">
//           <Checkbox.Group options={["อบรม", "สัมมนา", "เวิร์คช็อป"]} />
//         </Form.Item>

//         <Button type="primary" htmlType="submit">
//           {editingRecord ? "บันทึกการแก้ไข" : "บันทึก"}
//         </Button>
//         {editingRecord && (
//           <Button onClick={() => { setEditingRecord(null); form.resetFields() }} style={{ marginLeft: 8 }}>
//             ยกเลิก
//           </Button>
//         )}
//       </Form>

//       <h3 style={{ marginTop: 30 }}>รายการที่บันทึก</h3>
//       <Table rowKey="id" columns={columns} dataSource={data} loading={loading} />

//       {/* Modal Preview */}
//       <Modal open={!!previewRecord} onCancel={() => setPreviewRecord(null)} footer={null} title="รายละเอียดข้อมูล">
//         {previewRecord && (
//           <div>
//             <p><b>ชื่อกิจการ:</b> {previewRecord.businessName}</p>
//             <p><b>อีเมล:</b> {previewRecord.email}</p>
//             <p><b>เบอร์โทร:</b> {previewRecord.phone}</p>
//             <p><b>ประเภทกิจการ:</b> {previewRecord.businessType}</p>
//             <p><b>ผู้ประกอบการ:</b> {previewRecord.ownerName}</p>
//             <p><b>จำนวนพนักงาน:</b> {previewRecord.employees}</p>
//             <p><b>การเข้าร่วม:</b> {(previewRecord.participations || []).join(", ")}</p>
//           </div>
//         )}
//       </Modal>
//     </div>
//   )
// }

// export default RequestPlatform
