"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { registerUser } from "../lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [familyMember] = useState(false);
  const [taxCode] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setEmailError("");
    setPasswordError("");

    if (password !== confirmPassword) {
      setPasswordError("Le password non corrispondono");
      return;
    }

    setLoading(true);
    try {
      const result = await registerUser(
        email,
        password,
        firstName,
        lastName,
        familyMember,
        taxCode
      );
      if (!result.success) {
        if (result.error === "Email già registrata") {
          setEmailError(result.error);
        } else {
          setError(result.error);
        }
      } else {
        setModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex w-full max-w-4xl overflow-hidden rounded-lg border bg-card shadow-lg">
        <form
          onSubmit={handleSubmit}
          className={cn("flex w-full md:w-1/2 flex-col gap-6 p-8", className)}
          {...props}
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">Crea il tuo account</h1>
            <p className="text-muted-foreground text-sm">
              Compila i campi per registrarti
            </p>
            {error && (
              <h1 className="text-center text-sm text-red-500">{error}</h1>
            )}
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="firstName" className="mb-2 block">
                Nome
              </Label>
              <Input
                id="firstName"
                value={
                  firstName.charAt(0).toUpperCase() +
                  firstName.slice(1).toLowerCase()
                }
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="flex-1">
              <Label htmlFor="lastName" className="mb-2 block">
                Cognome
              </Label>
              <Input
                id="lastName"
                value={
                  lastName.charAt(0).toUpperCase() +
                  lastName.slice(1).toLowerCase()
                }
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            {emailError && (
              <h2 className="text-center text-lg font-bold text-red-500">
                {emailError}
              </h2>
            )}{" "}
            <Input
              id="email"
              type="email"
              placeholder="nome@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            {passwordError && (
              <h2 className="text-center text-lg font-bold text-red-500">
                {passwordError}
              </h2>
            )}
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.~])[A-Za-z\d@$!%*?&.~]{8,}$"
                title="Almeno 8 caratteri, una maiuscola, una minuscola, un numero e un simbolo."
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Conferma Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Cliccando su Registrati, accetti i nostri{" "}
            <a href="#" className="underline hover:text-foreground">
              Termini di servizio
            </a>{" "}
            e{" "}
            <a href="#" className="underline hover:text-foreground">
              Politica sulla privacy
            </a>
            .
          </p>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Caricamento…" : "Registrati"}
          </Button>

          {modalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
              <div className="w-80 rounded-lg bg-card p-6 text-center shadow-lg">
                <h2 className="mb-4 text-xl font-bold">
                  Registrazione riuscita!
                </h2>
                <p className="text-muted-foreground">
                  La tua registrazione è andata a buon fine.
                </p>
                <Button
                  className="mt-4 w-full"
                  onClick={() => {
                    setModalOpen(false);
                    router.push("/");
                  }}
                >
                  Chiudi
                </Button>
              </div>
            </div>
          )}
        </form>

        <div className="hidden md:flex md:w-1/2">
          <Image
            src="/zerachiel.png"
            alt="Zerachiel logo"
            width={0}
            height={0}
            sizes="100vw"
            className="h-full w-full object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
