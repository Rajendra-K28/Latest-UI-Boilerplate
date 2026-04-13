import { pageStyles, pageHeaderStyles, pageSectionStyles, pageGridStyles } from './Page.styles';

type PageProps = {
  children: React.ReactNode;
};

export function Page({ children }: PageProps) {
  return <div style={pageStyles.container}>{children}</div>;
}

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageHeader({ title, description, actions, children }: PageHeaderProps) {
  return (
    <div style={pageHeaderStyles.container}>
      <div style={pageHeaderStyles.content}>
        <h1 style={pageHeaderStyles.title}>{title}</h1>
        {description && <p style={pageHeaderStyles.description}>{description}</p>}
        {children}
      </div>
      {actions && <div style={pageHeaderStyles.actions}>{actions}</div>}
    </div>
  );
}

type PageSectionProps = {
  title?: string;
  children: React.ReactNode;
};

export function PageSection({ title, children }: PageSectionProps) {
  return (
    <div style={pageSectionStyles.container}>
      {title && <h2 style={pageSectionStyles.title}>{title}</h2>}
      {children}
    </div>
  );
}

type PageGridProps = {
  columns?: number;
  gap?: number | string;
  children: React.ReactNode;
};

export function PageGrid({ columns = 3, gap, children }: PageGridProps) {
  return (
    <div style={pageGridStyles.container(columns, gap)}>
      {children}
    </div>
  );
}
