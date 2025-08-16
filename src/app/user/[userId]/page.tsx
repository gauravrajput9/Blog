"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchUser, UserParams } from "@/lib/userUtils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useSession } from "next-auth/react";

interface UserData {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  bio?: string;
  createdAt?: string;
}

const ViewAccount = () => {
  const params = useParams<UserParams>();
  const router = useRouter();
  const { data: session } = useSession();
  const userId = params.userId;

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetchUser(userId)
      .then((data) => setUser(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);


  if (!session || !session.user) {
    return (
      <p className="text-center mt-10">
        You must be logged in to view this page.
      </p>
    );
  }

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg animate-pulse">
        <div className="flex flex-col items-center mb-6">
          <div className="w-28 h-28 rounded-full bg-gray-300 dark:bg-gray-600 mb-4"></div>
          <div className="h-6 w-48 bg-gray-300 dark:bg-gray-600 mb-2 rounded"></div>
          <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-4 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
        <div className="mt-6 h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    );
  }

  if (!user) return <p className="text-center mt-10">User not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
        My Account
      </h1>

      <div className="flex flex-col items-center mb-6">
        {user.image ? (
          <Image
            src={session?.user.image || user?.image}
            alt={user.name}
            width={120}
            height={120}
            className="rounded-full object-cover mb-4"
          />
        ) : (
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600 mb-4">
            <span className="text-3xl text-gray-700 dark:text-gray-200">
              👤
            </span>
          </div>
        )}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          {user.name}
        </h2>
        <p className="text-gray-500 dark:text-gray-300">{user.email}</p>
      </div>

      <div className="space-y-4">
        <div>
          <span className="font-semibold text-gray-700 dark:text-gray-200">
            Role:{" "}
          </span>
          <span className="text-gray-600 dark:text-gray-300">{user.role}</span>
        </div>

        {user.bio && (
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Bio:{" "}
            </span>
            <span className="text-gray-600 dark:text-gray-300">{user.bio}</span>
          </div>
        )}

        {user.createdAt && (
          <div>
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Joined On:{" "}
            </span>
            <span className="text-gray-600 dark:text-gray-300">
              {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        )}
      </div>

      <div className="mt-6">
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <Button onClick={() => router.push(`/user/${(session?.user as any)?.id}/edit-profile`)}>
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ViewAccount;
