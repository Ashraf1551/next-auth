"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";

const AuthButton = () => {
  const session = useSession();

  return (
    <div>
      <div className="flex gap-5">
        {session.status == "authenticated" ? (
          <button className="btn" onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          <>
            <LoginButton></LoginButton>
            <Link href={"/register"} className="btn">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthButton;
