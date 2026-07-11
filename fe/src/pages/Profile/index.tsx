import { useEffect, useState } from "react";
import { Camera, User, ShieldCheck } from "lucide-react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import axios from "axios";

type Profile = {
    name: string;
    email: string;
    position: string;
    phone: string;
    photoUrl: string
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile>();
  const [phoneInput, setPhoneInput] = useState(profile?.phone);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    const localPreviewUrl = URL.createObjectURL(e.target.files[0]);
    setProfile((prev) => ({ ...prev, photoUrl: localPreviewUrl }));
  };

  const handleUpdatePhone = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProfile((prev) => ({ ...prev, phone: phoneInput }));
    alert("Nomor handphone berhasil diperbarui secara lokal!");
  };

  const handleUpdatePassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError("");

    if (password !== confirmPassword) {
      setPasswordError("Password konfirmasi tidak cocok.");
      return;
    }

    setPassword("");
    setConfirmPassword("");
    alert("Password berhasil diperbarui!");
  };

  const handleFetchProfile = async () => {
        try {
            const response = await axios.get("http://localhost:3000/users/profile", {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                }
            });

            setProfile(response.data);
        } catch (error) {
            console.log("Error ", error);
        }
  }

  useEffect (() => {
    handleFetchProfile();
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-slate-900">Profil Saya</h1>

      <div className="card flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
        <div className="relative">
          <img
            src={profile?.photoUrl}
            alt={profile?.name}
            className="w-24 h-24 rounded-full object-cover border-2 border-slate-200"
          />
          <label className="absolute bottom-0 right-0 p-2 bg-primary-600 text-white rounded-full cursor-pointer hover:bg-primary-700 transition-colors shadow-md">
            <Camera size={14} />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoChange}
            />
          </label>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-bold text-slate-900">{profile?.name}</h2>
          <p className="text-sm text-primary-600 font-semibold">
            {profile?.position}
          </p>
        </div>
      </div>

      <form onSubmit={handleUpdatePhone} className="card flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <User size={18} className="text-slate-400" />
          <h3 className="font-bold text-sm text-slate-800">
            Informasi Pribadi
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="fullname"
            label="Nama Lengkap"
            value={profile?.name}
            disabled
          />
          <Input
            id="email"
            label="Email Perusahaan"
            value={profile?.email}
            disabled
          />
          <Input
            id="phoneno"
            label="Nomor Handphone"
            placeholder="Contoh: 0812345678"
            value={phoneInput}
            onChange={(e) => setPhoneInput(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end mt-2">
          <Button label="Simpan Perubahan" type="submit" />
        </div>
      </form>

      <form
        onSubmit={handleUpdatePassword}
        className="card flex flex-col gap-4"
      >
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <ShieldCheck size={18} className="text-slate-400" />
          <h3 className="font-bold text-sm text-slate-800">Keamanan Akun</h3>
        </div>

        {passwordError && (
          <div className="p-3 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-lg">
            {passwordError}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="password"
            label="Password Baru"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Input
            id="confirmPassword"
            label="Konfirmasi Password Baru"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex justify-end mt-2">
          <Button label="Ubah Password" type="submit" color="warning" />
        </div>
      </form>
    </div>
  );
}
