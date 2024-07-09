import axios from "axios";

export async function getAllUsers() {
  try {
    const response = await axios.get("/api/db");
    return response.data;
  } catch (error) {
    console.error("Error while fetching users:", error);
    return [];
  }
}

export async function getLoggedInUserByUsername(username: string) {
  try {
    const users = await getAllUsers();
    return users.find((user: any) => user.username === username) || null;
  } catch (error) {
    console.error("Error while getting logged-in user:", error);
    return null;
  }
}
