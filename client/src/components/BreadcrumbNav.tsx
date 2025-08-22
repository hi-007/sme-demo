import React from "react";
import { Breadcrumb } from "antd";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbNavProps {
  breadcrumbNameMap: Record<string, string>;
  homePath?: string;
  homeLabel?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  breadcrumbNameMap,
  homePath = "/crm-sme/dashboard",
  homeLabel = "Dashboard",
}) => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets
    .map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      // ✅ ข้ามถ้า URL ตรงกับ homePath เพื่อไม่ให้ซ้ำ
      if (url === homePath) return null;

      const name = breadcrumbNameMap[url];
      if (!name) return null; // ✅ ไม่มีชื่อ ไม่ต้องใส่

      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{name}</Link>
        </Breadcrumb.Item>
      );
    })
    .filter((item) => !!item); // ✅ กรอง null ออก

  return (
    <Breadcrumb className="">
      <Breadcrumb.Item>
        <Link to={homePath}>{homeLabel}</Link>
      </Breadcrumb.Item>
      {extraBreadcrumbItems}
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
