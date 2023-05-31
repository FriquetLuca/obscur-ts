import path from "path";
const removeExtension = (filePath: string) => filePath.slice(0, -path.extname(filePath).length);
export default removeExtension;