/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import { execSync } from "child_process";
import packageJson from "./package.json" with { type: "json" };
import "./src/env.js";

const commitHash = execSync("git log --pretty=format:%h -n1")
    .toString()
    .trim();


/** @type {import("next").NextConfig} */
const config = {
    env: {
        VERSION: packageJson.version,
        COMMIT_HASH: commitHash,
    },
};

export default config;
