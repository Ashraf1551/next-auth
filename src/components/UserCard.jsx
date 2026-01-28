"use client";

import { useSession } from "next-auth/react";

const UserCard = () => {
  const session = useSession();
  console.log(session);
  return (
    <div>
      <h2 className="font-bold">User- Client</h2>
      <div value="border-2 p-4 rounded">{JSON.stringify(session)}</div>
    </div>
  );
};

export default UserCard;
