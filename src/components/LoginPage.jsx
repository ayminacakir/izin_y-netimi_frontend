import React, { useState, useEffect } from "react";
import { FaUserGroup, FaUser, FaEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);  // Giriş durumu

    const handleLogin = (e) => {
        e.preventDefault();

        // Basit doğrulama (gerçek projede backend'den kontrol edilmeli)
        if (email && password) {
            localStorage.setItem("token", "some-auth-token");
            setIsLoggedIn(true);  // Giriş başarılı, durumu güncelle
        } else {
            alert("Lütfen email ve şifre giriniz.");
        }
    };

    // Giriş başarılı olduğunda yönlendirme işlemi
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/home");  // Giriş başarılıysa yönlendir
        }
    }, [isLoggedIn, navigate]);  // isLoggedIn değiştiğinde useEffect tetiklenir

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-800 to-cyan-100">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-[350px] text-center flex flex-col justify-center">
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-bold">GİRİŞ YAP</h1>
                    <FaUserGroup className="text-cyan-500 text-2xl mx-auto mt-2" />
                </div>

                <form onSubmit={handleLogin} className="space-y-4 text-left">
                    <div className="relative">
                        <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="email"
                            placeholder="Email adresiniz"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200"
                            required
                        />
                    </div>

                    <div className="relative">
                        <FaEyeSlash className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="password"
                            placeholder="Şifre"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-cyan-500 focus:ring focus:ring-cyan-200"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm mt-1">
                        <label className="flex items-center">
                            <input type="checkbox" className="mr-2" />
                            Beni Hatırla
                        </label>

                        <button
                            type="button"
                            className="text-cyan-500 hover:underline text-xs"
                            onClick={() => navigate("/change-password")}
                        >
                            Parolamı Unuttum
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 w-full rounded-lg font-semibold transition"
                    >
                        Giriş Yap
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;