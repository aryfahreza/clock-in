import { useState } from "react";
import { useNavigate } from "react-router";
import { Fingerprint } from "lucide-react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    const payload = {
      email,
      password
    }

    try {
      const response = await axios.post("http://localhost:3000/auth/login", payload);

      sessionStorage.setItem('token', response.data.accessToken);
      sessionStorage.setItem('role', response.data.role);

      navigate('/dashboard');
    } catch (e){
      console.log("Error ", e);
      setError("Invalid email or password");
    }
   
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-primary-100">
      <div className="w-full max-w-md card flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center text-center gap-1">
          <div className="p-3 bg-primary-50 text-primary-600 rounded-full mb-1">
            <Fingerprint size={32} />
          </div>
          <h1 className="font-extrabold text-2xl tracking-tight text-slate-900">
            ClockIn
          </h1>
          <p className="text-sm text-slate-500">Sistem Absensi WFH Karyawan</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="p-3 text-xs font-medium text-rose-600 bg-rose-50 border border-rose-100 rounded-lg">
              {error}
            </div>
          )}

          <Input
            id="email"
            label="Email Perusahaan"
            placeholder="user@mail.com"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            id="password"
            label="Password"
            placeholder="******"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            fullWidth
            label="Sign In"
            variant="filled"
            color="primary"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
}
