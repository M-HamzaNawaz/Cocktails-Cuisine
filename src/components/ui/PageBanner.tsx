import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../utils/constant';

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageBannerProps {
  title: string;
  breadcrumbs?: BreadcrumbItem[];
}

const PageBanner: React.FC<PageBannerProps> = ({
  title,
  breadcrumbs = [{ label: title }],
}) => {
  const items = [{ label: 'Home', to: ROUTES.HOME }, ...breadcrumbs];

  return (
    <div className="w-full bg-[#ff4c3b] text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 text-sm">
        <span>{title}</span>
        <div className="flex flex-wrap items-center justify-end gap-1 text-xs opacity-90">
          {items.map((item, index) => (
            <React.Fragment key={`${item.label}-${index}`}>
              {index > 0 && <span className="mx-1">/</span>}
              {item.to && index !== items.length - 1 ? (
                <Link to={item.to} className="transition hover:opacity-100">
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageBanner;
