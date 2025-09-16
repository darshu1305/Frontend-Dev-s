import axios from "axios";
import { featureOBJ } from "../types/featureOBJ";

const API_URL = "https://bharatgig-backend-testing.onrender.com";


export async function getSkills(): Promise<featureOBJ[]> {
  try {
    const response = await axios.get<featureOBJ[]>(API_URL+"/retrieve/skills");
    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
}
export async function getInstitutes(): Promise<featureOBJ[]> {
  try {
    const response = await axios.get<featureOBJ[]>(`${API_URL}/retrieve/institues`);
    return response.data;
  } catch (error) {
    console.error("Error fetching institutes:", error);
    return [];
  }
}

export async function getDegrees(): Promise<featureOBJ[]> {
  try {
    const response = await axios.get<featureOBJ[]>(`${API_URL}/retrieve/degrees`);
    return response.data;
  } catch (error) {
    console.error("Error fetching degrees:", error);
    return [];
  }
}
export async function gettags(): Promise<featureOBJ[]> {
  try {
    const response = await axios.get<featureOBJ[]>(`${API_URL}/retrieve/tags`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}