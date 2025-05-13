import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { Button, Modal } from "antd";

function IzinTaleplerim() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("izinTaleplerim");
    return savedData ? JSON.parse(savedData) : [];
  });

  const yeniIzinTalebiEkle = (talep) => {
    const yeniTalep = { ...talep, durum: "Beklemede" };
    const updatedData = [...data, yeniTalep];
    setData(updatedData);
    localStorage.setItem("izinTaleplerim", JSON.stringify(updatedData));
  };

  const [newIzin, setNewIzin] = useState({
    start: "",
    end: "",
    type: "",
    status: "Beklemede",
  });

  const [tarih, setTarih] = useState("");
  const [izinTuru, setIzinTuru] = useState("");
  const [durum, setDurum] = useState("");
  const [aramaSonuclari, setAramaSonuclari] = useState(null);

  const izinAra = () => {
    const sonuclar = data.filter((talep) => {
      return (
        (tarih === "" || talep.start === tarih) &&
        (izinTuru === "" || talep.type === izinTuru) &&
        (durum === "" || talep.status === durum)
      );
    });
    setAramaSonuclari(sonuclar);
  };

  const liste = aramaSonuclari !== null ? aramaSonuclari : data;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">İzin Taleplerim</h1>

        <Button
          type="primary"
          onClick={showModal}
          className="bg-orange-500 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-orange-600 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-200"
        >
          <span className="text-xl font-bold">+</span>
          Yeni İzin Talebi Oluştur
        </Button>

        {/* Modal */}
        <Modal
          title="Yeni İzin Oluşturma"
          centered
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={800}
          bodyStyle={{
            padding: "30px",
            backgroundColor: "#f9fafb",
            borderRadius: "10px",
          }}
          footer={null}
        >
          <form className="space-y-8">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="baslangictarihi"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Başlangıç Tarihi
                  </label>
                  <input
                    id="baslangictarihi"
                    type="date"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    value={newIzin.start}
                    onChange={(e) => setNewIzin({ ...newIzin, start: e.target.value })}
                  />
                </div>

                <div>
                  <label
                    htmlFor="bitistarihi"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Bitiş Tarihi
                  </label>
                  <input
                    id="bitistarihi"
                    type="date"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    value={newIzin.end}
                    onChange={(e) => setNewIzin({ ...newIzin, end: e.target.value })}
                  />
                </div>
              </div>

              <div className="md:w-[336px]">
                <label
                  htmlFor="tur"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  İzin Türü Seçiniz
                </label>
                <select
                  id="tur"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  value={newIzin.type}
                  onChange={(e) => setNewIzin({ ...newIzin, type: e.target.value })}
                >
                  <option value="" disabled>
                    İzin Türü Seçiniz
                  </option>
                  <option>Yıllık İzin</option>
                  <option>Mazeret İzni</option>
                  <option>Hastalık İzni</option>
                  <option>Doğum İzni</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="aciklama"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Açıklama Giriniz
                </label>
                <input
                  id="aciklama"
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  yeniIzinTalebiEkle({
                    id: Date.now(),
                    start: newIzin.start,
                    end: newIzin.end,
                    type: newIzin.type,
                    status: "Beklemede",
                  });
                  closeModal();
                  setNewIzin({ start: "", end: "", type: "", status: "Beklemede" });
                }}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg"
              >
                Yeni İzin Talebi Oluştur
              </button>
            </div>
          </form>
        </Modal>
      </div>

      {/* Arama Alanı */}
      <div className="flex flex-wrap gap-4 mb-4">
        <input
          className="border p-2 rounded w-48"
          type="date"
          value={tarih}
          onChange={(e) => setTarih(e.target.value)}
        />

        <select
          className="border p-2 rounded-xl w-48 box-border h-[42px] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          value={izinTuru}
          onChange={(e) => setIzinTuru(e.target.value)}
        >
          <option value="">İzin Türü Seçiniz</option>
          <option>Yıllık İzin</option>
          <option>Mazeret İzni</option>
          <option>Doğum İzni</option>
          <option>Hastalık İzni</option>
        </select>

        <select
          className="border p-2 rounded-xl w-48 box-border h-[42px] shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          value={durum}
          onChange={(e) => setDurum(e.target.value)}
        >
          <option value="">Durum Seçiniz</option>
          <option>Beklemede</option>
          <option>Onaylandı</option>
          <option>Reddedildi</option>
        </select>

        <button
          onClick={izinAra}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200 flex items-center justify-center"
        >
          Ara
          <IoIosSearch className="ml-2" />
        </button>
      </div>

      {/* Tablo */}
      <table className="w-full border border-gray-200 mt-6 rounded-xl overflow-hidden shadow-xl">
        <thead className="bg-gradient-to-r from-blue-100 to-blue-200">
          <tr>
            <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">
              Başlangıç Tarihi
            </th>
            <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">
              Bitiş Tarihi
            </th>
            <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">
              İzin Türü
            </th>
            <th className="border-b px-4 py-3 text-left font-semibold text-gray-700">
              Durum
            </th>
          </tr>
        </thead>
        <tbody>
          {liste.map((izin) => (
            <tr
              key={izin.id}
              className="hover:bg-blue-50 transition duration-200"
            >
              <td className="border-t px-4 py-3">{izin.start}</td>
              <td className="border-t px-4 py-3">{izin.end}</td>
              <td className="border-t px-4 py-3">{izin.type}</td>
              <td className="border-t px-4 py-3">{izin.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IzinTaleplerim;
