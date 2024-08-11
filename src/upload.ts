import { z } from "zod";
import axios from "axios";
import fs from "node:fs";
import { loadKey } from "./auth.js";
import { openUrl } from "./helpers.js";

export const UploadOptions = z.object({
  path: z.string(),
});
export type UploadOptions = z.infer<typeof UploadOptions>;

const UploadResponse = z.object({
  upload_id: z.string(),
  uploadURL: z.string(),
});
type UploadResponse = z.infer<typeof UploadResponse>;

export async function upload(options: UploadOptions): Promise<boolean> {
  const key = loadKey();
  if (key === undefined) {
    console.log("Must authenticate with emerge auth before uploading.");
    return false;
  }

  let response;
  try {
    response = await axios({
      method: "post",
      url: "https://api.emergetools.com/upload",
      responseType: "json",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-API-Token": key,
      },
      data: {},
    });
  } catch (e) {
    console.log(`${e}`);
    return false;
  }

  const { uploadURL: uploadUrl, upload_id: uploadId } = UploadResponse.parse(
    response.data
  );

  try {
    const data = new FormData();
    const { path } = options;
    const buffer = fs.readFileSync(path);
    const blob = new Blob([buffer]);
    data.append("file", blob, path);
    await axios({
      method: "put",
      url: uploadUrl,
      data,
    });
  } catch (e) {
    console.log(`${e}`);
    return false;
  }

  const buildUrl = `https://www.emergetools.com/build/${uploadId}`;
  console.log(`Build uploaded to ${buildUrl}`);
  openUrl(buildUrl);

  return true;
}
