'use client'

import { useState } from 'react'
import { registerUser } from '../../lib/api'
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";



export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [first_name, setFirst_Name] = useState('');
    const [last_name, setLast_Name] = useState('');
    const [family_member, setFamily_Member] = useState(false);
    const [tax_code, setTax_Code] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();



    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            await registerUser(email, password, first_name, last_name, family_member, tax_code)
            setModalOpen(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message || 'Errore durante la registrazione')
            } else {
                setError('Errore sconosciuto durante la registrazione')
            }
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
                <h1 className="text-2xl mb-4 text-center font-bold">Register</h1>

                {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-3 px-3 py-2 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <div className="relative w-full mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className="w-full mb-4 px-3 py-2 border rounded pr-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                        title="La password deve avere almeno 8 caratteri, includere una maiuscola, una minuscola, un numero e un simbolo."
                    />
                    <button
                        type="button"
                        className="absolute right-3 top-1/3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
                <input
                    type="text"
                    placeholder="Nome"
                    className="w-full mb-4 px-3 py-2 border rounded"
                    value={first_name}
                    onChange={(e) => setFirst_Name(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Cognome"
                    className="w-full mb-4 px-3 py-2 border rounded"
                    value={last_name}
                    onChange={(e) => setLast_Name(e.target.value)}
                />
                <label className="flex items-center gap-2 w-full mb-4 px-3 py-2 border rounded cursor-pointer">
                    <input
                        type="checkbox"
                        checked={family_member}
                        onChange={(e) => setFamily_Member(e.target.checked)}
                        className="accent-blue-600"
                    />
                    <span className="text-gray-400" >Familiare</span>
                </label>
                <input
                    type="text"
                    placeholder="Codice Fiscale"
                    className="w-full mb-4 px-3 py-2 border rounded"
                    value={tax_code}
                    maxLength={16}
                    onChange={(e) => setTax_Code(e.target.value.toUpperCase())}
                    style={{ textTransform: "uppercase" }}
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Caricamento...' : 'Registrati'}
                </button>
            </form>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-80 text-center">
                        <h2 className="text-xl font-bold mb-4">Registrazione riuscita!</h2>
                        <p>La tua registrazione è andata a buon fine.</p>
                        <button
                            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            onClick={() => { setModalOpen(false); router.push("/"); }}
                        >
                            Chiudi
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}