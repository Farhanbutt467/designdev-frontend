import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="teko-font" theme-setting="style-3">
      {children}
    </div>
  );
};

export default Layout;
