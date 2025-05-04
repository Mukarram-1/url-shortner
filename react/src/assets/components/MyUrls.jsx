import React from "react";
import UrlTable from "./UrlTable";

function MyUrls() {
  return (
    <>
      <div
        style={{
          overflow: "scroll",
        }}
        className="noscroll"
      >
        <div className="sidebar-child">
          <div className="users inner-sidebar-child">
            <h1>My Urls</h1>

            <UrlTable />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyUrls;
