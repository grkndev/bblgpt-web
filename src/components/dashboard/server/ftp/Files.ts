import { FileSystem } from "./types";

export const initialFileSystem: FileSystem = {
  Home: [
    {
      id: "1",
      name: "Documents",
      type: "folder",
      size: "-",
      lastModified: "2023-05-15 10:30",
    },
    {
      id: "2",
      name: "Images",
      type: "folder",
      size: "-",
      lastModified: "2023-05-14 15:45",
    },
    {
      id: "3",
      name: "report.pdf",
      type: "file",
      size: "2.5 MB",
      lastModified: "2023-05-13 09:20",
    },
    {
      id: "4",
      name: "data.xlsx",
      type: "file",
      size: "1.8 MB",
      lastModified: "2023-05-12 14:10",
    },
  ],
  "Home/Documents": [
    {
      id: "5",
      name: "Project A",
      type: "folder",
      size: "-",
      lastModified: "2023-05-16 11:20",
    },
    {
      id: "6",
      name: "Project B",
      type: "folder",
      size: "-",
      lastModified: "2023-05-17 09:15",
    },
    {
      id: "7",
      name: "resume.docx",
      type: "file",
      size: "500 KB",
      lastModified: "2023-05-18 14:30",
    },
  ],
  "Home/Images": [
    {
      id: "8",
      name: "Vacation",
      type: "folder",
      size: "-",
      lastModified: "2023-05-19 16:45",
    },
    {
      id: "9",
      name: "profile.jpg",
      type: "file",
      size: "2.1 MB",
      lastModified: "2023-05-20 10:10",
    },
    {
      id: "10",
      name: "banner.png",
      type: "file",
      size: "3.5 MB",
      lastModified: "2023-05-21 12:00",
    },
  ],
  "Home/Documents/Project A": [
    {
      id: "11",
      name: "proposal.docx",
      type: "file",
      size: "1.2 MB",
      lastModified: "2023-05-22 09:30",
    },
    {
      id: "12",
      name: "budget.xlsx",
      type: "file",
      size: "800 KB",
      lastModified: "2023-05-23 11:45",
    },
  ],
  "Home/Documents/Project B": [
    {
      id: "13",
      name: "presentation.pptx",
      type: "file",
      size: "5.5 MB",
      lastModified: "2023-05-24 14:20",
    },
    {
      id: "14",
      name: "notes.txt",
      type: "file",
      size: "50 KB",
      lastModified: "2023-05-25 16:30",
    },
  ],
  "Home/Images/Vacation": [
    {
      id: "15",
      name: "beach.jpg",
      type: "file",
      size: "4.2 MB",
      lastModified: "2023-05-26 10:00",
    },
    {
      id: "16",
      name: "mountain.jpg",
      type: "file",
      size: "3.8 MB",
      lastModified: "2023-05-27 12:15",
    },
  ],
};
