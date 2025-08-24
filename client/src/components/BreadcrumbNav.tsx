import React from "react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbNavProps {
  breadcrumbNameMap: Record<string, string>;
  homePath?: string;
  homeLabel?: string;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  breadcrumbNameMap,
  homePath = "/crm-sme/dashboard",
  //homeLabel = "Dashboard",
}) => {
  const location = useLocation();
  const pathSnippets = location.pathname.split("/").filter((i) => i);

  const extraBreadcrumbItems = pathSnippets
    .map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      // ✅ ข้าม homePath ไม่ให้ซ้ำ
      if (url === homePath) return null;

      const name = breadcrumbNameMap[url];
      if (!name) return null;

      return (
        <li key={url} className="flex items-center gap-2">
          {/* ลูกศรแบ่งขั้น */}
          <span className="rtl:rotate-180">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </span>

          <Link
            to={url}
            className="block transition-colors hover:text-gray-900"
          >
            {name}
          </Link>
        </li>
      );
    })
    .filter((item) => !!item);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-1 text-sm text-gray-700">
        {/* Home */}
        <li>
          <Link
            to={homePath}
            className="flex items-center gap-1 transition-colors hover:text-gray-900"
            aria-label="Home"
          >
            {/* ไอคอนบ้าน */}
            <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m3 9l9-7l9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><path d="M9 22V12h6v10" /></g></svg>

            {/* ✅ ใช้ homeLabel แสดงชื่อ */}
            {/* <span>{homeLabel}</span> */}
          </Link>
        </li>

        {extraBreadcrumbItems}
      </ol>
    </nav>
  );
};

export default BreadcrumbNav;
