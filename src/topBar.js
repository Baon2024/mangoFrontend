import React, { useState, useRef } from 'react';
import { CircularProgress, AppBar, Toolbar, Menu, MenuItem, Snackbar, IconButton } from "@mui/material";
import { FaPhone, FaTable } from 'react-icons/fa';
import { FaClockRotateLeft, FaCheck, FaTriangleExclamation } from "react-icons/fa6";
//import mango from './mango.png';
import { Bell, History, Home, LogOut, Phone, Settings, User } from "lucide-react"

import { Button } from './components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu'
import { Toaster } from './components/toast';
//import { useToast } from "@/hooks/use-toast"

export default function TopBar({ handleEnrichClick, addRow, addColumn, shuffleHandler, callStatus, isLoading, data, setData, columnLabels}) {
  //const [isLoading, setIsLoading] = useState(false);
  //const [callStatus, setCallStatus] = useState({ success: 0, failed: 0, total: 0 });
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [anchorEl, setAnchorEl] = useState(null); // For Menu dropdown
  const openMenu = Boolean(anchorEl);
  const fileInputRef = useRef()

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  function setDarkMode() {

  }

  let darkMode;

  async function downloadHandler() {
    console.log("data inside of downloadHandler is:", data);
    console.log("columnLabels inside of downloadHandler is:", columnLabels);

    let newArray = [columnLabels]

    

    //newArray.push(data);
    console.log("newArray is:", newArray);

    data.forEach(row => {
      newArray.push(row.map(cell => cell.value));  // Extract 'value' from each object
    });

    console.log("newArray before csvContent is:", newArray);

     // Convert data to CSV format
     const csvContent = newArray.map(row => row.join(',')).join('\n');
     console.log("csvContent is:",csvContent);

     // Create a Blob from the CSV content
     const blob = new Blob([csvContent], { type: 'text/csv' });
 
     // Create an anchor element and trigger a download
     const link = document.createElement('a');
     link.href = URL.createObjectURL(blob);
     link.download = 'output.csv'; // Name the downloaded file
     link.click(); // Simulate a click to trigger the download
  }

  async function importHandler() {
    fileInputRef.current.click();
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (!file) return;
  
    const reader = new FileReader();
  
    reader.onload = (e) => {
      const text = e.target.result;
      const rawRows = text.split("\n").map((row) => row.split(","));
      console.log("Imported CSV rows:", rawRows);
      // Handle rows here (e.g., set to state)
      // Transform each cell into { value: cell }
    const formattedRows = rawRows.map(row => row.map(cell => ({ value: cell })));

    console.log("Formatted rows:", formattedRows);

    function mergeCsvIntoTable(initialData, csvData) {
      const maxRows = initialData.length;
      const maxCols = initialData[0]?.length || 0;
    
      return initialData.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          const csvCell = csvData?.[rowIndex]?.[colIndex];
          if (colIndex === 0) {
            const rawPhone = csvCell?.value ? csvCell?.value.toString().trim().replace(/\r?\n|\r/g, '') : "";
            const cleanedPhone = rawPhone
    ? (rawPhone.startsWith('+44') ? rawPhone : `+44${rawPhone}`)
    : '';
            return {
              value: cleanedPhone || (cell.value ?? ''),
            };
          }
      
          return {
            value: csvCell?.value ?? cell.value ?? '',
          };
        });
      });
    }

    // Option 1: Replace the existing grid
    setData(prev=> mergeCsvIntoTable(data, formattedRows));
    };
  
    reader.readAsText(file);
  }


  

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-white p-1">
              <img src="/mango.png" alt="Mango Logo" className="h-7 w-7" />
            </div>
            <span className="text-xl font-bold tracking-tight">Mango</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <Button
              onClick={handleEnrichClick}
              variant="secondary"
              className="bg-white text-amber-600 hover:bg-gray-100 hover:text-amber-700"
              disabled={isLoading}
              size="sm"
            >
              {isLoading ? (
                <>
                  <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-amber-600 border-b-transparent"></span>
                  <span className="font-medium">
                    {callStatus.success + callStatus.failed}/{callStatus.total}
                  </span>
                </>
              ) : (
                <>
                  <Phone className="mr-2 h-4 w-4" />
                  <span className="font-medium">Enrich</span>
                </>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={shuffleHandler}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              
              Shuffle
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={importHandler}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              
              Import CSV
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={downloadHandler}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              
              Export as CSV
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleMenuClick("history")}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
            

            <Button
              variant="ghost"
              size="sm"
              onClick={addRow}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              
              Add Row
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={addColumn}
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
            >
              
              Add Column
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-9 w-9 bg-white/10 hover:bg-white/20 border border-white/20"
                >
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs leading-none text-muted-foreground">john.doe@example.com</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleMenuClick("dashboard")}>
                  <Home className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick("settings")}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleMenuClick("toast")}>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Show Notification</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setDarkMode(!darkMode)}>
                  {darkMode ? "Light Mode" : "Dark Mode"}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleMenuClick("logout")}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <input
  type="file"
  accept=".csv"
  ref={fileInputRef}
  style={{ display: "none" }}
  onChange={handleFileChange}
/>
          </div>
        </div>
      </header>
      <Toaster />
    </>
  )
};
