import React from "react";
import { Divider, Table } from "antd";

const columns = [
  {
    title: "Personel No",
    dataIndex: "personnel_no",
  },
  {
    title: "Name",
    dataIndex: "name",
  },

  {
    title: "departman",
    dataIndex: "department",
  },

  {
    title: "Pozisyon",
    dataIndex: "position",
  },

  {
    title: "Pozisyon",
    dataIndex: "position",
  },
  {
    title: "Kalan İzin",
    dataIndex: "remaining_leave",
  },
  {
    title: "Kullanılan İzin",
    dataIndex: "used_leave",
  },
  {
    title: "Telefon No",
    dataIndex: "phone_no",
  },
];
const data = [];

function PersonelListesi() {
  return (
    <div>
      <>
        <Divider>PERSONEL LİSTESİ</Divider>
        <Table columns={columns} dataSource={data} size="middle" />
      </>
    </div>
  );
}

export default PersonelListesi;