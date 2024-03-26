'use client';
import {signIn} from "next-auth/react";
import Image from "next/image";
import {FormEvent,useState} from "react";
import Register from '@/components/Register'

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginInProgress, setLoginInProgress] = useState(false);
  const [registerLogin,setRegisterLogin]=useState('login')

  async function handleFormSubmit(ev:FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setLoginInProgress(true);

    await signIn('credentials', {email, password, callbackUrl: '/products'});

    setLoginInProgress(false);
  }
  return (
    <>
      {registerLogin === "register" ? (
        <Register />
      ) : (
        <section className="mt-8">
          <h1 className="text-center text-primary text-4xl mb-4">Login</h1>
          <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              disabled={loginInProgress}
              onChange={ev => setEmail(ev.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              disabled={loginInProgress}
              onChange={ev => setPassword(ev.target.value)}
            />
            <button type="submit" disabled={loginInProgress}>
              {loginInProgress ? "Logging in..." : "Login"}
            </button>
            <div className="my-4 text-center text-gray-500">or login with provider</div>
            <button
              type="button"
              disabled={loginInProgress}
              onClick={() => signIn('google', { callbackUrl: '/products' })}
              className="flex gap-4 justify-center"
            >
              <Image src="/google.png" alt="" width={24} height={24} />
              Login with Google
            </button>
            <div>
                Dont have an account?
                <button className="ml-1" onClick={() => setRegisterLogin('register')}>
                  Register
                </button>
            </div>
          </form>
        </section>
      )}
    </>
  );
}