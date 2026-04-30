import React from "react";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="instrument-ai" theme-setting="style-4">
      <div className="pb-[15px] 2xl:pb-[50px]">
        {children}
      </div>
    </div>
  );
};

export default Layout;
