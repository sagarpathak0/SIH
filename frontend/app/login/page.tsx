import Link from 'next/link';

export default function Login() {
  return (
    <div className="container">
      <h1>Login</h1>
      <div>
        <Link href="/api/auth/google">
          <button>Login with Google</button>
        </Link>
      </div>
      <div>
        <Link href="/api/auth/github">
          <button>Login with GitHub</button>
        </Link>
      </div>
      <div>
        <Link href="/login/email">
          <button>Login with Email</button>
        </Link>
      </div>
    </div>
  );
}
