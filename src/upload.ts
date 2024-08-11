import axios from "axios";

export interface UploadOptions {
  path: string;
}

export async function upload(options: UploadOptions): Promise<boolean> {
  axios({
    method: "get",
    url: "http://bit.ly/2mTM3nY",
    responseType: "stream",
  });

  console.log(options.path);
  return true;
}
