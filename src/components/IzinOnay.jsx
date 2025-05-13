import React, { useState } from "react";
import { FiRefreshCcw } from "react-icons/fi";

function IzinOnay() {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("izinTaleplerim");
    return savedData ? JSON.parse(savedData) : [];
  });

  const handleUpdateStatus = (id, newStatus) => {
    const updatedData = data.map((entry) =>
      entry.id === id ? { ...entry, status: newStatus } : entry
    );

    // LocalStorage'a güncellenmiş datayı kaydet
    localStorage.setItem("izinTaleplerim", JSON.stringify(updatedData));

    setData(updatedData);

  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">İzin Onaylama</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          className="border p-2 rounded-xl w-48 box-border h-[42px] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <input
          type="text"
          placeholder="gg.aa.yyyy"
          className="border p-2 rounded-xl w-48 box-border h-[42px] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
        />
        <select className="border p-2 rounded-xl w-48 box-border h-[42px] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200">
          <option>İzin Türü Seçiniz</option>
          <option>Yıllık İzin</option>
          <option>Mazeret İzni</option>
          <option>Doğum İzni</option>
          <option>Hastalık İzni</option>
        </select>
        <button
          onClick={() => {
            const updatedData = localStorage.getItem("izinTaleplerim");
            if (updatedData) {
              setData(JSON.parse(updatedData));
            }
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 flex items-center justify-center"
        >
          Yenile <FiRefreshCcw className="ml-2" />
        </button>
      </div>

      <table className="w-full border border-gray-200 mt-6 rounded-xl overflow-hidden shadow-xl">
        <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
          <tr>
            <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">Kullanıcı Adı</th>
            <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">İzin Aralığı</th>
            <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">İzin Türü</th>
            <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">Durum</th>
            <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {data.filter(entry => entry.status === "Beklemede").map((entry) => (
            <tr key={entry.id}>
              <td className="border-t px-4 py-3">{entry.name}</td>
              <td className="border-t px-4 py-3">
                {entry.start} / {entry.end}
              </td>
              <td className="border-t px-4 py-3">{entry.type}</td>
              <td className="border-t px-4 py-3">{entry.status}</td>
              <td className="border-t px-4 py-3">
                <button
                  onClick={() => handleUpdateStatus(entry.id, "Onaylandı")}
                  className="bg-green-400 text-white px-3 py-1 rounded-xl hover:bg-green-600 mr-2"
                >
                  Onayla
                </button>
                <button
                  onClick={() => handleUpdateStatus(entry.id, "Reddedildi")}
                  className="bg-red-400 text-white px-3 py-1 rounded-xl hover:bg-red-600"
                >
                  Reddet
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}

export default IzinOnay;
