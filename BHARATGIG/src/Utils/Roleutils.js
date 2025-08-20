import { UserRoles } from "../types/Usertypes";

export const isAdmin = (role) => role === UserRoles.ADMIN;
export const isClient = (role) => role === UserRoles.CLIENT;
export const isUser = (role) => role === UserRoles.USER;
