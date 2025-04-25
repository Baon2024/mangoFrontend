import logo from './logo.svg';
import './App.css';
import Spreadsheet from "react-spreadsheet";
import { cloneElement, useEffect, useState } from 'react';
import TopBar from './topBar';
import { ToastContainer, toast } from 'react-toastify';
import ContextDrawer from './contextDrawer';
//import { Button, Navbar, Dropdown, Spinner, Toast } from 'flowbite-react';


export default function App() {
  
  const [isLoading, setIsLoading] = useState(false);
  const [callStatus, setCallStatus] = useState({ success: 0, failed: 0, total: 0 });
  const [showToast, setShowToast] = useState(false);
  const [ question, setQuestion ] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [ columnLabels, setColumnLabels ] = useState(["Phone Number"]);
  const [contextText, setContextText] = useState("This spreadsheet contains contact information for various professionals.");
  const [data, setData] = useState([
    [{ value: "+447311252643" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
    [{ value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }, { value: "" }],
  ]);
  
  const customStyles = {
    border: "2px solid blue",
    fontSize: "16px",
  };
  

  //const columnLabels = ["Phone Number", ""];

  //presumabky just create lots of entry rows at the start
  //can always allow users to create new rows/columns later, programatically

  async function onClick() {
    console.log("value of data is:", data);
    const prevData = data;
    console.log("prevData is:", prevData);

    const newData = [
      { value: 'dogs' },
      { value: 'food' },
      { value: 'stuff' }
    ]
    console.log("value of newData is:", newData);
    
    // Append the new row correctly
  const updatedData = [...prevData, newData];

  console.log("Updated data:", updatedData);

  setData(updatedData);
    
  }

  useEffect(() => {
    console.log("this is the value of the data:", data);
  },[data])

  async function addRow() {
    const newData = [{ value: ""}];


    const prevData = data;

    const updatedData = [...prevData, newData];
    setData(updatedData);
  }

  async function addColumn() {
    const newData = { value: ""};

    const prevData = data;

    /*prevData.forEach((row, index) => {
      console.log(`this is what this row ${index} looks like:`, row);
      row.push(newData);
      console.log("value of row after adding newData is:", row);
    })*/

    
  // Create a new updated data array
  const updatedData = data.map(row => [...row, { ...newData }]);

    
    console.log("updatedData after adding column:", updatedData);
    setData(updatedData);
  }

  useEffect(() => {
    console.log("callStatus after filtering now is:", callStatus);
  },[callStatus]);

  useEffect(() => {
    console.log("question is:", question);
  },[question])

  const makePhoneCall = async (phoneNumber) => {
    try {
      // Format the phone number with +44 prefix
      let formattedNumber = phoneNumber.toString().trim().replace(/\s+/g, '');

    // UK phone number regex: 
    // - Mobile: starts with +447 or 07 followed by 9 more digits
    // - Landline: starts with +44 and a valid area code, or 01 / 02 with 8-10 digits
    const ukPhoneRegex = /^(?:\+44(7\d{9}|1\d{8,9}|2\d{8,9})|07\d{9}|01\d{8,9}|02\d{8,9})$/;

    // Validate formatted number
    if (!ukPhoneRegex.test(formattedNumber)) {
      console.error(`Invalid UK phone number: ${formattedNumber}`);
      setToastMessage(`Invalid UK phone number: ${formattedNumber}`);
      setToastType('warning');
      setShowToast(true);
      setIsLoading(false);
      return;
    }

    // Format the number
    if (formattedNumber.startsWith('+44')) {
      // Already correctly formatted
    } else if (formattedNumber.startsWith('+')) {
      // Already has another country code, reject it
      console.error(`Invalid UK phone number: ${formattedNumber}`);
      return;
    } else if (formattedNumber.startsWith('0')) {
      // Convert leading 0 to +44
      formattedNumber = '+44' + formattedNumber.substring(1);
    } else {
      console.error(`Invalid UK phone number: ${formattedNumber}`);
      setToastMessage(`Invalid UK phone number: ${formattedNumber}`);
      setToastType('warning');
      setShowToast(true);
      setIsLoading(false);
      return;
    }

    

      //this correctly returns error for those that don't match
    if (!contextText) {
      console.error(`No context text set`);
      setToastMessage(`No context text set`);
      setToastType('warning');
      setShowToast(true);
      setIsLoading(false);
      return;
    }
      
      console.log(`Making call to formatted number: ${formattedNumber} (original: ${phoneNumber})`);

      //const prompt = `You need to ask these questions, seperately: ${question}`;

      const questionNumber = question.length;
      console.log("questionNumber is:", questionNumber);

      const realPrompt = `You are a agent calling a number to ask questions the user has given you. You need to ask the person who answers ${questionNumber} questions. The questions are: ${question}. You need to ask these questions sequentially, one at a time. `;
      //need to replace prompt with realPrompt below
      console.log("realPrompt is:", realPrompt);

      const response1 = await fetch('https://mangoexpressbackend.onrender.com/outbound-call', { //so this sends data to backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          number: formattedNumber,
          prompt: realPrompt,
          first_message: "Hi, I'm calling to ask you some questions. Are we okay to proceed?",
          questionNumber: questionNumber,
          mode: 'cors'
        })
      });

      //this second step is after a setTimer delay, and retrieves the returned correctResponse

      // **Wait for response after delay**
      let time = 50000 * questionNumber
      console.log("time is:", time);

    await new Promise(resolve => setTimeout(resolve, time));

    const response = await fetch('https://mangoexpressbackend.onrender.com/retrieve-response', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Ensure the server knows you expect JSON
        'Cache-Control': 'no-cache', // Prevent caching
        'ngrok-skip-browser-warning': 'true',
    'Pragma': 'no-cache',        // Additional header to prevent caching
    "redirect": 'follow'
      },
      mode: 'cors' // Needed if calling from a browser to an external domain
    });
        

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Data returned:", data);
    
    return data; // ✅ Returns response properly
    } catch (error) {
      console.error(`Error initiating call to ${phoneNumber}:`, error);
      return false;
    }
  };

  const handleEnrichClick = async () => {
    //need to replace this all with my code, passing down spreadsheetData as a child to be used by this function

      if (question.length === 0) {
        alert('You need to set a question!');
        setToastType('error');
        setShowToast(true);
        return;
      }   
  
      if (!data) {
        setToastMessage('Cannot access spreadsheet data');
        setToastType('error');
        setShowToast(true);
        return;
      }
  
      //need code if context doesn't exist
      console.log("data inside of handleEnrichClick is:", data);
  
      setIsLoading(true);
      setCallStatus({ success: 0, failed: 0, total: 0 });
  
      
       

     
      //function to return row phone numbers that exist
      const getPhoneNumbers = (data) => {
        return data
          .map(row => row[0]?.value) // Extract the first column's value
          .filter(value => value && value.startsWith("+")); // Keep only valid phone numbers
      };
      
      // get rows with phone numbers that exist:
      const phoneNumbers = getPhoneNumbers(data);
      console.log("phoneNumbers returned from data:",phoneNumbers);

      //tell user if there are no numbers to call
      if (phoneNumbers.length === 0) {
        //setToastMessage('No phone numbers found to call.');
        toast.error('No phone numbers found');
        setToastType('warning');
        setShowToast(true);
        setIsLoading(false);
        return;
      }
      
      //update number of phone calls needed to make
      setCallStatus(prev => ({ ...prev, total: phoneNumbers.length }));
    
     
      
         
      // Make calls sequentially to avoid overwhelming the API
      let successCount = 0;
      let dataFromCalls = [];
        
      
      for (const phoneNumber of phoneNumbers) {
        const success = await makePhoneCall(phoneNumber); //this is where call to backend for blank.ai phone call occurs
        //its clear to me that should also send the contextPrompt too, to send relevant answers 
        //but first lets just get a basic call working
        console.log("value of success is:", success);
        
        if (success) {
          successCount++;
          setCallStatus(prev => ({ ...prev, success: prev.success + 1 }));
          //if successfull, need to wipe the global variables from outbound2.js
          //function to wipe global variables - direct to an endpoint specifically for wiping, GET or POST??
        } else {
          setCallStatus(prev => ({ ...prev, failed: prev.failed + 1 }));
        }
  
        
        const entry = [phoneNumber, ...success.flat()];
        console.log("value of entry is:", entry);
        //if success variable contains returned data for the phonecall, add to dataFromCalls
        dataFromCalls.push(/*entry*/ success); //the daat has already been combined in backend, so don't need to combine it here
        

      }
      console.log("dataFromCalls looks like this after all success call data returned and put in array:", dataFromCalls);
      //setData(dataFromCalls);
      //here, you'll need to transform dataFromCalls into the correct format to manually update workbookData
      //i presume this is the more manual cursor generated code, for turning the array into the correct structure
        //const formattedDataFromCalls = dataFromCalls.forEach(/*call, index code to format each array member );*/
      //in the code, format data in needed format, and add the phonenumber for each index from formattedData above: formattedData[index]
        //console.log("formattedDataFromCalls looks like this after formatting dataFromCalls:", formattedDataFromCalls);
        /*function insertReturnedData(returnedData) {
          setData(prevData => {
            // Create a new array to avoid mutation
            return prevData.map(row => {
              // Find matching phone number
              const match = returnedData.find(item => item[0] === row[0].value);
              console.log("value of match is:", match);
              
              if (match) {
                return [
                  { value: match[0] }, // Keep phone number
                  ...match.slice(1).map(value => ({ value })) // Map all additional values
                ];
              }
        
              return row; // If no match, keep row unchanged
            });
          });
        }*/
          function insertReturnedData(returnedData) {
            setData(prevData => {
              return prevData.map(row => {
                // Find matching phone number
                const match = returnedData.find(item => item[0] === row[0].value);
                console.log("value of match is:", match);
          
                // If a match is found, update the row
                if (match) {
                  return [
                    { value: match[0] }, // Keep phone number
                    ...match.slice(1).map(value => ({ value })), // Map all additional values
                    ...new Array(row.length - match.length).fill({ value: "" }) // Fill remaining columns with empty values
                  ];
                }
          
                // If no match is found, return the row as is (keep empty columns)
                return row;
              });
            });
          }
        insertReturnedData(dataFromCalls);
        //make columnLabels equal phoneNumber + questions
        console.log("value of question is:", question, "value of columnLabels is:", columnLabels);
        let questionDuplicate = [...question];
        console.log("clone of question is:", question);
        questionDuplicate.unshift(columnLabels[0]);
        console.log("value of questionDuplicate now is:", questionDuplicate)
        
        setColumnLabels(questionDuplicate);
        setIsLoading(false);

     //need to format returned data
    }
     
    const handleContextUpdate = (newContext) => {
      setContextText(newContext);
      // In a real app, you would also save this to a database or API
      console.log("Context updated:", newContext);

      
    };

    function shuffleHandler() {
      console.log("data before shuffle is:", data);

      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      }
      
      const reshuffled = [...data]; // Copy to avoid mutating the original
      shuffleArray(reshuffled);
      console.log("data after shuffling is:", reshuffled);
      setData(reshuffled);
    }

  return (
    <div className="App">
        <TopBar handleEnrichClick={handleEnrichClick} data={data}  addRow={addRow} addColumn={addColumn} columnLabels={columnLabels} setColumnLabels={setColumnLabels} shuffleHandler={shuffleHandler} callStatus={callStatus} isLoading={isLoading} />
        <Spreadsheet data={data} onChange={setData} columnLabels={columnLabels} styles={customStyles} />
        <ContextDrawer onContextUpdate={handleContextUpdate} contextData={contextText} question={question} setQuestion={setQuestion} />
    </div>
  );
}
