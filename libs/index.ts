import { exec } from "node:child_process";
import type { Plugin } from "vite";

/**
 * Vite plugin to upload the build output to an S3-compatible bucket (e.g., MinIO) using the `mc` CLI.
 *
 * @param {Object} params - Configuration parameters.
 * @param {string} params.host - The S3/MinIO endpoint (e.g., http://localhost:9000).
 * @param {string} params.username - The S3/MinIO access key.
 * @param {string} params.password - The S3/MinIO secret key.
 * @param {string} params.bucket - The bucket name to upload to.
 * @returns {import('vite').Plugin} A Vite plugin object.
 *
 * This plugin runs after the Vite build (`closeBundle`), sets the MinIO alias, and mirrors the `./dist` directory to the specified bucket.
 * Requires the `mc` CLI to be installed and available in the environment.
 *
 * This is convenient for running the production stack locally.
 */
export function mfViteS3({
  host,
  username,
  password,
  bucket,
}: Record<string, string>): Plugin {
  return {
    name: "mf-vite-s3",
    closeBundle() {
      exec(
        `mc alias set local ${host} ${username} ${password} && mc mirror --overwrite ./dist local/${bucket}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`mc mirror error: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`mc mirror stderr: ${stderr}`);
          }
          if (stdout) {
            console.log(`mc mirror stdout: ${stdout}`);
          }
        }
      );
    },
  };
}
