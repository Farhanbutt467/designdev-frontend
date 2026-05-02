import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="khand">
      <div className="khand-inner">
        {children}
      </div>
    </div>
  );
};

export default Layout;
