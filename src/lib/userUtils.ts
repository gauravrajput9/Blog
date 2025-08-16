import { getUser } from "@/actions/user.actions";

export async function fetchUser(userId: string) {
  const data = await getUser(userId);
  console.log(data);
  return data;
}

export type UserParams = {
  userId: string;
};
