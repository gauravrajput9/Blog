import { getAllUsers, getUser } from "@/actions/user.actions";

export async function fetchUser(userId: string) {
  const data = await getUser(userId);
  return data;
}

export type UserParams = {
  userId: string;
};


export async function fetchAllUsers(){
  try {
    const data = await getAllUsers()
    console.log(data)
    return data
  } catch (error) {
    console.log(error);
    throw error
  }
}