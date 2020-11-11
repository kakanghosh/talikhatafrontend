import React, { forwardRef, Ref } from 'react';
import { Helmet } from 'react-helmet';

type PageProps = {
  className: string;
  children: React.ReactNode;
  title: string;
};

const Page = (
  { children, title = '', className }: PageProps,
  ref: Ref<HTMLDivElement>
) => {
  return (
    <div ref={ref} className={className}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
};

export default forwardRef(Page);
