import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className=" ">{children}</div>
  );
};

export default Layout;
