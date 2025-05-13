import React, { useEffect, useState } from "react";
import { Button, Flex, Modal } from "antd";
import { Calendar, theme } from "antd";

function Dashboard() {
  const izinTuruRenk = {
    "Yıllık İzin": "#34d399",
    "Mazeret İzni": "#facc15",
    "Hastalık İzni": "#f87171",
    "Doğum İzni": "#a78bfa",
  };

  //TAKVİM FONKSİYONU
  const dateCellRender = (value) => {
    const dateStr = value.format("YYYY-MM-DD");
    const dateNumber = value.date();

    const oGunIzin = izinTalepleri.find((talep) => {
      const [start, end] = talep.tarih.split(" - ");
      return dateStr >= start && dateStr <= end;
    });

    if (oGunIzin) {
      const [start, end] = oGunIzin.tarih.split(" - ");
      const isTekGun = start === end;
      const isBaslangic = dateStr === start;
      const isBitis = dateStr === end;

      const izinTuru = oGunIzin.tur;
      const bgColor = izinTuruRenk[izinTuru] || "#e5e7eb";

      let borderRadius = "0";
      if (isTekGun) borderRadius = "50%";
      else if (isBaslangic) borderRadius = "12px 0 0 12px";
      else if (isBitis) borderRadius = "0 12px 12px 0";
      else borderRadius = "0";

      const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: bgColor,
        borderRadius,
        height: "24px",
        minWidth: "24px",
        padding: "0 4px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: "12px",
        fontWeight: "bold",
        textAlign: "center",
        whiteSpace: "nowrap",
        cursor: "pointer",
      };

      return (
        <div style={style} onClick={() => openIzinDetayModal(dateStr)}>
          {dateNumber}
        </div>
      );
    }

    return null;
  };

  const openIzinDetayModal = (tarih) => {
    const izin = izinTalepleri.find((talep) => talep.tarih === tarih);
    if (izin) {
      setIzinDetay(izin);
      setIzinDetayModalOpen(true);
    }
  };

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  const { token } = theme.useToken();
  const wrapperStyle = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const [izinVerileri, setIzinVerileri] = useState({
    YeniIzinTalebi: 5,
    OnayBekleyenIzinler: 12,
    BuAykiIzinGunleri: 18,
    IzinKullananPersoneller: 8,
  });

  //İZİN TALEPLERİ
  const [izinTalepleri, setIzinTalepleri] = useState(() => {
    const kayitliTalepler = localStorage.getItem("izinTalepleri");
    return kayitliTalepler ? JSON.parse(kayitliTalepler) : [];
  });

  useEffect(() => {
    localStorage.setItem("izinTalepleri", JSON.stringify(izinTalepleri));
  }, [izinTalepleri]);

  const [baslangic, setBaslangic] = useState("");
  const [bitis, setBitis] = useState("");
  const [tur, setTur] = useState("");
  const [aciklama, setAciklama] = useState("");

  const [arama, setArama] = useState("");

  const [izinModalOpen, setIzinModalOpen] = useState(false);
  const [takvimModalOpen, setTakvimModalOpen] = useState(false);
  const [izinDetayModalOpen, setIzinDetayModalOpen] = useState(false);
  const [izinDetay, setIzinDetay] = useState(null);

  useEffect(() => { }, []);

  const izinopenModal = () => {
    setIzinModalOpen(true);
  };

  const izincloseModal = () => {
    setIzinModalOpen(false);
  };

  const takvimopenModal = () => {
    setTakvimModalOpen(true);
  };

  const takvimcloseModal = () => {
    setTakvimModalOpen(false);
  };

  const izinDetaycloseModal = () => {
    setIzinDetayModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* KART YAPISI */}
      <div className="space-y-8">
        <div
          className="grid grid-cols-4
      md:grid-cols-4 gap-4"
        >
          <div className="bg-white shadow rounded-lg p-6 text-center ">
            <div className="text-lg font-semibold">Yeni İzin Talebi</div>
            <div className="text-2xl font-bold text-blue-600">
              {izinVerileri.YeniIzinTalebi}
            </div>
            <div className="text-sm text-gray-500">Bugün</div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 text-center ">
            <div className="text-lg font-semibold">Onay Bekleyen İzinler</div>
            <div className="text-2xl font-bold text-blue-600">
              {izinVerileri.OnayBekleyenIzinler}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 text-center ">
            <div className="text-lg font-semibold">Bu Ayki İzin Günleri</div>
            <div className="text-2xl font-bold text-blue-600">
              {izinVerileri.BuAykiIzinGunleri}
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6 text-center ">
            <div className="text-lg font-semibold">
              İzin Kullanan Personeller
            </div>
            <div className="text-2xl font-bold text-blue-600">
              {izinVerileri.IzinKullananPersoneller}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-14">
        {/* BUTONLARIN YAPISI */}
        <div className="flex flex-row ">
          <button
            onClick={izinopenModal}
            className=" border border-gray-400 bg-orange-400 rounded-lg px-10 py-2 "
          >
            + Yeni İzin Talebi
          </button>

          <div className="flex space-x-4 items-center ml-auto">
            <button className=" border border-gray-400 bg-zinc-200 rounded-lg px-10 py-2 ">
              Rapor Oluştur
            </button>

            <button
              onClick={takvimopenModal}
              className=" border border-gray-400 bg-blue-100 rounded-lg px-7 py-2"
            >
              Takvim Görünümü
            </button>
          </div>
        </div>
        {/* İZİN OLUŞTURMA MODAl YAPISI */}
        <Modal
          title=" Yeni İzin Oluşturma"
          centered
          open={izinModalOpen}
          onCancel={izincloseModal}
          width={800}
          bodyStyle={{
            padding: "30px",
            backgroundColor: "#f9fafb",
            borderRadius: "10px",
          }}
          footer={null}
        >
          <form
            className="space-y-8"
            onSubmit={(e) => {
              e.preventDefault();

              const yeniTalep = {
                id: Date.now(),
                calisan: "Mevcut Kullanıcı",
                tarih: `${baslangic} - ${bitis}`,
                tur: tur,
                durum: "Beklemede",
              };

              setIzinTalepleri((prev) => [...prev, yeniTalep]);

              setBaslangic("");
              setBitis("");
              setTur("");
              setAciklama("");

              izincloseModal();
            }}
          >
            <div className=" space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    for="baslangıctarihi"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Başlangıç Tarihi
                  </label>
                  <input
                    id="baslangic"
                    type="date"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                    value={baslangic}
                    onChange={(e) => setBaslangic(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    for="bitistarihi"
                    className="block text-sm font-semibold text-gray-700 mb-2"
                  >
                    Bitiş Tarihi
                  </label>
                  <input
                    id="bitis"
                    type="date"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full "
                    value={bitis}
                    onChange={(e) => setBitis(e.target.value)}
                  />
                </div>
              </div>

              <div className="md:w-[336px]">
                <label
                  for="tur"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  İzin Türü Seçiniz
                </label>
                <select
                  id="tur"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  value={tur}
                  onChange={(e) => setTur(e.target.value)}
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

              <div className="">
                <label
                  for="açıklama"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Açıklama Giriniz
                </label>
                <input
                  id="açıklama"
                  type="text"
                  className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  value={aciklama}
                  onChange={(e) => setAciklama(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="bg-blue-400 text-white px-6 py-2 rounded-lg"
              >
                OLUŞTUR
              </button>
            </div>
          </form>
        </Modal>
        {/* TAKVİM OLUŞTURMA MODAl YAPISI */}

        <Modal
          title={<div className="text-center">TAKVİM GÖRÜNÜMÜ</div>}
          centered
          open={takvimModalOpen}
          onCancel={takvimcloseModal}
          width={400}
          footer={null}
        >
          <div className="flex items-center justify-center">
            <div style={wrapperStyle}>
              <Calendar
                fullscreen={false}
                onPanelChange={onPanelChange}
                dateCellRender={dateCellRender}
              />
            </div>
          </div>
        </Modal>

        {/* İZİN DETAY MODAL */}
        <Modal
          title="İzin Detayları"
          centered
          open={izinDetayModalOpen}
          onCancel={izinDetaycloseModal}
          footer={null}
        >
          {izinDetay && (
            <div>
              <p>
                <strong>Çalışan:</strong> {izinDetay.calisan}
              </p>
              <p>
                <strong>İzin Türü:</strong> {izinDetay.tur}
              </p>
              <p>
                <strong>Durum:</strong> {izinDetay.durum}
              </p>
            </div>
          )}
        </Modal>

        {/* TABLO YAPISI */}
        <div className="overflow-x-auto">
          <div className="flex justify-between items-center mb-4 border-b pb-1">
            <h2 className="text-lg font-bold text-gray-700">
              SON İZİN TALEPLERİ
            </h2>
            <input
              type="text"
              placeholder="Personel Ara"
              value={arama}
              onChange={(e) => setArama(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 "
            />
          </div>

          <table className="min-w-full mt-4 bg-white border border-gray-200 rounded-lg shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-2 border-b"> Çalışan</th>
                <th className="text-left px-6 py-2 border-b">Tarih</th>
                <th className="text-left px-6 py-2 border-b">Tür</th>
                <th className="text-left px-6 py-2 border-b">Durum</th>
              </tr>
            </thead>

            <tbody>
              {izinTalepleri.map((talep) => (
                <tr key={talep.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 border-b">{talep.calisan}</td>
                  <td className="px-4 py-4 border-b">{talep.tarih}</td>
                  <td className="px-4 py-4 border-b">{talep.tur}</td>
                  <td className="px-4 py-4 border-b">{talep.durum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
