export default function getApiUrl() {
  return process.env.NODE_ENV === "test"
    ? "http://localhost:3001"
    : "https://api.putboot.dev";
}
