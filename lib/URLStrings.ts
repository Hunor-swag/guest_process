export function getURL() {
  if (typeof window === "undefined") {
    console.log(
      "Window object is undefined. This is a server side code. You are probably trying to get the URL in a server side component."
    );
    return "https://www.putboot.dev";
  }
  return window.location.origin;
}

export function getHostname() {
  if (typeof window === "undefined") {
    console.log(
      "Window object is undefined. This is a server side code. You are probably trying to get the URL in a server side component."
    );
    return "www.putboot.dev";
  }
  return window.location.hostname;
}

export function getSubdomain() {
  const url = getHostname();
  return url.split(".")[0];
}
