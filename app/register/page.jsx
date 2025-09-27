export default function RegisterPage() {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Register failed");
      setSuccess(data.message || "Registration successful, check your email to confirm account");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="card max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-black">Register</h2>
        {error && <div className="alert alert-error mb-2">{error}</div>}
        {success && <div className="alert alert-success mb-2">{success}</div>}
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Username" className="input" required value={username} onChange={e => setUsername(e.target.value)} />
          <input type="email" name="email" placeholder="Email" className="input" required value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" name="password" placeholder="Password" className="input" required value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="btn w-full" disabled={loading}>{loading ? "Loading..." : "Register"}</button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-black">Sudah punya akun? </span>
          <a href="/login" className="text-blue-700 hover:underline">Login</a>
        </div>
      </div>
    </section>
  );
}
