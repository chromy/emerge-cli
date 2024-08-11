import axios from "axios";
import { loadKey } from "./auth.js";

export interface UploadOptions {
  path: string;
}

export async function upload(options: UploadOptions): Promise<boolean> {
  const key = loadKey();
  if (key === undefined) {
    console.log("Must authenticate with emerge auth before uploading.");
    return false;
  }

  await axios({
    method: "get",
    url: "https://api.emergetools.com/upload",
    responseType: "stream",
  });

  console.log(options.path);
  return true;
}
