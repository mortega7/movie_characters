import { redirect } from "react-router-dom";

import { removeAuthToken } from "../util/auth";

export async function action() {
  removeAuthToken();
  return redirect("/");
}