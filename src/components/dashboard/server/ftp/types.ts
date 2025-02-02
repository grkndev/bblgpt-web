export type FileItem = {
  id: string;
  name: string;
  type: "file" | "folder";
  size: string;
  lastModified: string;
};

export type PathHistory = {
  past: string[][];
  present: string[];
  future: string[][];
};

export type FileSystem = {
  [key: string]: FileItem[];
};
