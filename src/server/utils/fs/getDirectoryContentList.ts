import fs from "fs";
import path from "path";

function getDirectoryContent(p: string, a: string[] = []) {
  if(fs.statSync(p).isDirectory()) {
    fs.readdirSync(p).map((f: string) => getDirectoryContent(a[a.push(path.join(p, f)) - 1] as string, a));
  }
  return a;
}

export default function getDirectoryContentList(path: string, option: "ALL" | "FILES" | "DIRECTORIES") {
  const directoryContent = getDirectoryContent(path);
  return option === "ALL"
    ? directoryContent
    : option === "FILES"
      ? directoryContent.filter((unknownPath: string) => !fs.lstatSync(unknownPath).isDirectory())
      : directoryContent.filter((unknownPath: string) => fs.lstatSync(unknownPath).isDirectory());
}
