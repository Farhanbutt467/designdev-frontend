import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="instrument" theme-setting="style-5">
      {children}
    </div>
  );
};

export default Layout;
