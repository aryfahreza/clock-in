import { useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { Search } from "lucide-react";
import axios from "axios";
import dayjs from "dayjs";

type AttendanceLog = {
    date: string;
    time: string;
    status: "Masuk" | "Pulang";
};

export default function Home() {
    const todayStr = "2026-07-08";

    const [todayRecords, setTodayRecords] = useState<{ masuk?: string; pulang?: string }>({});

    const [fromDate, setFromDate] = useState("2026-07-01");
    const [toDate, setToDate] = useState(todayStr);

    const [logs, setLogs] = useState<AttendanceLog[]>([]);

    const handleClockAction = async (type: "Masuk" | "Pulang") => {

        try {
            const now = new Date();
            const currentTime = now.toLocaleTimeString("id-ID");

            if (type === "Masuk") {
                await axios.post("http://localhost:3000/attendance/check-in", {}, {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                    }
                }
                );
                setTodayRecords(prev => ({ ...prev, masuk: currentTime }));
            } else {
                await axios.post("http://localhost:3000/attendance/check-out", {}, {
                    headers: {
                        Authorization: "Bearer " + sessionStorage.getItem("token")
                    }
                }
                );
                setTodayRecords(prev => ({ ...prev, pulang: currentTime }));
            }

            fetchAttendanceSummary();
        } catch (error) {
            console.log("Error ", error);
        }

    };

    const fetchAttendanceStatus = async () => {
        try {
            const response = await axios.get("http://localhost:3000/attendance/attendance-status", {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                }
            });

            setTodayRecords({
                masuk: response.data.checkIn ? new Date(response.data.checkIn).toLocaleTimeString("id-ID") : "",
                pulang: response.data.checkOut ? new Date(response.data.checkOut).toLocaleTimeString("id-ID") : "",
            })
        } catch (error) {
            console.log("Error ", error);
        }
    }

    const fetchAttendanceSummary = async () => {
        try {
            const response = await axios.get("http://localhost:3000/attendance/summary", {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token")
                }
            });

            const result = response.data.map((item) => ({
                date: dayjs(new Date(item.time)).format("YYYY-MM-DD"),
                time: dayjs(new Date(item.time)).format("HH:mm:ss"),
                status: item.status
            }))

            setLogs(result);
        } catch (error) {
            console.log("Error ", error);
        }
    }

    useEffect(() => {
        fetchAttendanceStatus();
        fetchAttendanceSummary();
    }, [])

    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-slate-900">Hello, John Doe!</h1>

            <div className="card flex flex-col gap-4">
                <div className="text-sm font-semibold text-slate-700">
                    Today's Attendance: <span className="text-primary-600 font-bold">{todayRecords.masuk ? (todayRecords.pulang ? "Complete" : "Working") : "Not Started"}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div>
                        <p className="text-slate-400 font-medium">Check-in</p>
                        <p className="text-base font-bold text-slate-800 mt-0.5">{todayRecords.masuk || "—"}</p>
                    </div>
                    <div>
                        <p className="text-slate-400 font-medium">Check-out</p>
                        <p className="text-base font-bold text-slate-800 mt-0.5">{todayRecords.pulang || "—"}</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="filled"
                        label="Clock In"
                        onClick={() => handleClockAction("Masuk")}
                        disabled={!!todayRecords.masuk}
                        fullWidth
                    />
                    <Button
                        label="Clock Out"
                        variant="outlined"
                        onClick={() => handleClockAction("Pulang")}
                        disabled={!todayRecords.masuk || !!todayRecords.pulang}
                        fullWidth
                    />
                </div>
            </div>

            <div className="card flex flex-col gap-4">
                <h2 className="text-sm font-bold text-slate-800">Attendance Log</h2>

                <div className="flex items-end gap-3 p-3 bg-slate-50 rounded-lg border border-slate-100">
                    <Input id="from" label="From" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
                    <Input id="to" label="To" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
                    <Button label="Search" variant="filled" icon={Search} />
                </div>

                <div className="overflow-x-auto rounded-lg border border-slate-100">
                    <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 text-slate-500 border-b border-slate-100 uppercase tracking-wide">
                            <tr>
                                <th className="px-4 py-3 font-semibold">Tanggal</th>
                                <th className="px-4 py-3 font-semibold">Waktu</th>
                                <th className="px-4 py-3 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-slate-600">
                            {logs.map((log, index) => (
                                <tr key={index} className="hover:bg-slate-50/50">
                                    <td className="px-4 py-3 font-medium text-slate-900">{log.date}</td>
                                    <td className="px-4 py-3">{log.time}</td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-block px-2 py-0.5 rounded-sm font-bold ${log.status === "Masuk" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
                                            }`}>
                                            {log.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}