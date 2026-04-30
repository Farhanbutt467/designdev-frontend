import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="spacegrotesk" theme-setting="style-2">
      {children}
    </div>
  );
};

export default Layout;
