
export interface UploadOptions {
  path: string;
};

export async function upload(options: UploadOptions): Promise<boolean> {
  console.log(options.path);
  return true;
}

