import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  FileSearchOutlined,
  InfoCircleTwoTone,
} from "@ant-design/icons";
import { Menu } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const consumerMenu = [
  getItem("Product Tracker", "sub1", <FileSearchOutlined />, [
    getItem("Track My Product", "track"),
  ]),
  {
    type: "divider",
  },
  getItem("Account", "sub5", <SettingOutlined />, [getItem("Login", "login")]),
];

const adminMenu = [
  getItem("Product Tracker", "sub1", <FileSearchOutlined />, [
    getItem("Track My Product", "track"),
  ]),
  getItem("Product Safety Reports", "sub3", <InfoCircleTwoTone />, [
    getItem("Report an Issue", "issue"),
  ]),
  {
    type: "divider",
  },
  getItem("Account", "sub5", <SettingOutlined />, [
    getItem("Logout", "logout"),
  ]),
];

const supplyChainMenu = [
  getItem("Product Tracker", "sub1", <FileSearchOutlined />, [
    getItem("Track My Product", "track"),
  ]),
  getItem("Manage Records", "sub4", <AppstoreOutlined />, [
    getItem("Add Record", "record"),
  ]),
  {
    type: "divider",
  },
  getItem("Account", "sub5", <SettingOutlined />, [
    getItem("Logout", "logout"),
  ]),
];

function UserNavbar() {
  let history = useHistory();
  const [Farmer, setFarmer] = useState(false);
  const [Processor, setProcessor] = useState(false);
  const [Storage, setStorage] = useState(false);
  const [Logistics, setLogistics] = useState(false);
  const [Certificate, setCertificate] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const [Consumer, setConsumer] = useState(true);

  const onClick = async (e) => {
    console.log("click ", e);
    if (e.key === "login") {
      history.push("/login");
    } else if (e.key === "logout") {
      await window.localStorage.clear();
      history.push("/");
      window.location.reload();
    } else if (e.key === "track") {
      history.push("/");
    } else if (e.key === "history") {
      history.push("/ViewHistory");
    } else if (e.key === "register") {
      history.push("/Register");
    } else if (e.key === "viewUsers") {
      history.push("/ViewUsers");
    } else if (
      e.key === "record" &&
      localStorage.getItem("role") === "Farmer"
    ) {
      history.push("/Farmer");
    } else if (
      e.key === "record" &&
      localStorage.getItem("role") === "Processor"
    ) {
      history.push("/Processor");
    } else if (
      e.key === "record" &&
      localStorage.getItem("role") === "Storage"
    ) {
      history.push("/Storage");
    } else if (
      e.key === "record" &&
      localStorage.getItem("role") === "Logistics"
    ) {
      history.push("/Logistics");
    } else if (
      e.key === "record" &&
      localStorage.getItem("role") === "Certificate"
    ) {
      history.push("/Certificate");
    } else if (e.key === "issue" && localStorage.getItem("role") === "Admin") {
      history.push("/Issue");
    }
  };

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    if (token) {
      if (role.includes("Farmer")) {
        setFarmer(true);
        setConsumer(false);
      } else if (role.includes("Processor")) {
        setProcessor(true);
        setConsumer(false);
      } else if (role.includes("Storage")) {
        setStorage(true);
        setConsumer(false);
      } else if (role.includes("Logistics")) {
        setLogistics(true);
        setConsumer(false);
      } else if (role.includes("Certificate")) {
        setCertificate(true);
        setConsumer(false);
      } else if (role.includes("Admin")) {
        setAdmin(true);
        setConsumer(false);
      }
    }
  }, []);

  return (
    <div>
      {Consumer ? (
        <>
          <Menu
            onClick={onClick}
            style={{
              width: 285,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={consumerMenu}
          />
        </>
      ) : null}

      {Admin ? (
        <>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={adminMenu}
          />
        </>
      ) : null}

      {Farmer || Processor || Storage || Logistics || Certificate ? (
        <>
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={supplyChainMenu}
          />
        </>
      ) : null}
    </div>
  );
}

export default UserNavbar;
