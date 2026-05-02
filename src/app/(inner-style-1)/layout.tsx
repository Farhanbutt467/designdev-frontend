import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="beatrice-kanit" theme-setting="style-5">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
