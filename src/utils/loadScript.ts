export default function loadScript(url: string, callback: () => void): void {
  if (scriptAlreadyExists(url)) {
    callback();

    return;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const script = document.createElement("script") as any;
  script.type = "text/javascript";

  if (script.readyState) {
    //IE
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = function () {
      callback();
    };
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
}

function scriptAlreadyExists(url: string): boolean {
  const scripts = document.getElementsByTagName("script");

  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].src === url) {
      return true;
    }
  }

  return false;
}
