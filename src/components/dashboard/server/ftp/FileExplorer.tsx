"use client"

import { useState, useCallback, useEffect } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Folder,
  File,
  Upload,
  Download,
  Trash2,
  FolderPlus,
  RefreshCw,
  Edit,
  ArrowLeft,
  ArrowRight,
} from "lucide-react"
import { FileItem, PathHistory } from "./types"
import { initialFileSystem } from "./Files"





export default function FileExplorer() {
  const [pathHistory, setPathHistory] = useState<PathHistory>({
    past: [],
    present: ["Home"],
    future: [],
  })
  const [files, setFiles] = useState<FileItem[]>(initialFileSystem["Home"])
  const [newFolderName, setNewFolderName] = useState("")
  const [isNewFolderDialogOpen, setIsNewFolderDialogOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [newName, setNewName] = useState("")

  const updatePath = useCallback((newPath: string[]) => {
    setPathHistory((prev) => ({
      past: [...prev.past, prev.present],
      present: newPath,
      future: [],
    }))
  }, [])

  useEffect(() => {
    const currentPath = pathHistory.present.join("/")
    if (initialFileSystem[currentPath]) {
      setFiles(initialFileSystem[currentPath])
    } else {
      console.error(`Path not found: ${currentPath}`)
      setFiles([])
    }
  }, [pathHistory.present])

  const handleFolderClick = (folderName: string) => {
    updatePath([...pathHistory.present, folderName])
  }

  const handleBreadcrumbClick = (index: number) => {
    updatePath(pathHistory.present.slice(0, index + 1))
  }

  const handleGoBack = () => {
    if (pathHistory.past.length > 0) {
      const newPresent = pathHistory.past[pathHistory.past.length - 1]
      setPathHistory((prev) => ({
        past: prev.past.slice(0, -1),
        present: newPresent,
        future: [prev.present, ...prev.future],
      }))
    }
  }

  const handleGoForward = () => {
    if (pathHistory.future.length > 0) {
      const newPresent = pathHistory.future[0]
      setPathHistory((prev) => ({
        past: [...prev.past, prev.present],
        present: newPresent,
        future: prev.future.slice(1),
      }))
    }
  }

  const handleNewFolder = () => {
    if (newFolderName.trim()) {
      const newFolder: FileItem = {
        id: Date.now().toString(),
        name: newFolderName,
        type: "folder",
        size: "-",
        lastModified: new Date().toLocaleString(),
      }
      setFiles((prevFiles) => [...prevFiles, newFolder])
      setNewFolderName("")
      setIsNewFolderDialogOpen(false)
    }
  }

  const handleItemSelect = (id: string) => {
    setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
  }

  const handleDelete = () => {
    setFiles((prevFiles) => prevFiles.filter((file) => !selectedItems.includes(file.id)))
    setSelectedItems([])
  }

  const handleRename = () => {
    if (newName.trim() && selectedItems.length === 1) {
      setFiles((prevFiles) =>
        prevFiles.map((file) => (file.id === selectedItems[0] ? { ...file, name: newName } : file)),
      )
      setIsRenameDialogOpen(false)
      setNewName("")
      setSelectedItems([])
    }
  }

  const openRenameDialog = () => {
    if (selectedItems.length === 1) {
      const selectedFile = files.find((file) => file.id === selectedItems[0])
      if (selectedFile) {
        setNewName(selectedFile.name)
        setIsRenameDialogOpen(true)
      }
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">FTP File Explorer</h1>
      <div className="flex items-center mb-4 gap-2">
        <Button variant="outline" size="icon" onClick={handleGoBack} disabled={pathHistory.past.length === 0}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={handleGoForward} disabled={pathHistory.future.length === 0}>
          <ArrowRight className="h-4 w-4" />
        </Button>
        <Breadcrumb className="ml-2">
          <BreadcrumbList>
            {pathHistory.present.map((item, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink onClick={() => handleBreadcrumbClick(index)}>{item}</BreadcrumbLink>
                {index < pathHistory.present.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mb-4 flex gap-2 flex-wrap">
        <Button variant="default">
          <Upload className="mr-2 h-4 w-4" /> Upload
        </Button>
        <Button variant="secondary">
          <Download className="mr-2 h-4 w-4" /> Download
        </Button>
        <Button variant="destructive" onClick={handleDelete} disabled={selectedItems.length === 0}>
          <Trash2 className="mr-2 h-4 w-4" /> Delete
        </Button>
        <Button variant="outline" onClick={openRenameDialog} disabled={selectedItems.length !== 1}>
          <Edit className="mr-2 h-4 w-4" /> Rename
        </Button>
        <Dialog open={isNewFolderDialogOpen} onOpenChange={setIsNewFolderDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <FolderPlus className="mr-2 h-4 w-4" /> New Folder
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Folder</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={handleNewFolder}>Create Folder</Button>
          </DialogContent>
        </Dialog>
        <Button variant="ghost">
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30px]"></TableHead>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Last Modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell>
                <Checkbox checked={selectedItems.includes(file.id)} onCheckedChange={() => handleItemSelect(file.id)} />
              </TableCell>
              <TableCell className="font-medium">
                {file.type === "folder" ? (
                  <button className="flex items-center" onClick={() => handleFolderClick(file.name)}>
                    <Folder className="mr-2 h-4 w-4" />
                    {file.name}
                  </button>
                ) : (
                  <div className="flex items-center">
                    <File className="mr-2 h-4 w-4" />
                    {file.name}
                  </div>
                )}
              </TableCell>
              <TableCell>{file.size}</TableCell>
              <TableCell>{file.lastModified}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Rename Item</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="newName" className="text-right">
                New Name
              </Label>
              <Input id="newName" value={newName} onChange={(e) => setNewName(e.target.value)} className="col-span-3" />
            </div>
          </div>
          <Button onClick={handleRename}>Rename</Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

