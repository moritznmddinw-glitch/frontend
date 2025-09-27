export const dynamic = "force-dynamic";

export default function LoginPage() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      localStorage.setItem("token", data.token);
      window.location.href = "/account";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="card max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-black">Login</h2>
        {error && <div className="alert alert-error mb-2">{error}</div>}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username or Email" className="input" required value={username} onChange={e => setUsername(e.target.value)} />
          <input type="password" name="password" placeholder="Password" className="input" required value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="btn w-full" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-black">Belum punya akun? </span>
          <a href="/register" className="text-blue-700 hover:underline">Register</a>
        </div>
      </div>
    </section>
  );
}
