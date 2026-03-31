import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => (
  <nav aria-label="breadcrumbs" className="breadcrumbs">
    {items.map((item, index) => {
      const isLast = index === items.length - 1;

      return (
        <span key={`${item.label}-${index}`} className="breadcrumbs__item">
          {item.href && !isLast ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          {!isLast ? <span className="breadcrumbs__divider">/</span> : null}
        </span>
      );
    })}
  </nav>
);
