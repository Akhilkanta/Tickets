// Initial available tickets
let availableTickets = 10;

// Queue array to manage customer IDs
const queue = [];

// Function to enqueue customers
function enqueue() {
    const customerId = document.getElementById('customerId').value;
    if (customerId) {
        queue.push(customerId);
        updateQueueDisplay();
        document.getElementById('customerId').value = ''; // Clear input field
    } else {
        alert('Please enter a Customer ID');
    }
}

// Function to book tickets
function bookTickets() {
    const ticketsToBook = parseInt(document.getElementById('tickets').value);
    if (ticketsToBook > 0 && ticketsToBook <= availableTickets) {
        availableTickets -= ticketsToBook;
        document.getElementById('availableTickets').textContent = availableTickets;
        alert(`Successfully booked ${ticketsToBook} tickets!`);
    } else {
        alert('Invalid number of tickets or insufficient available tickets.');
    }
    document.getElementById('tickets').value = ''; // Clear input field
}

// Function to undo the last booking
function undoBooking() {
    if (queue.length > 0) {
        const lastCustomerId = queue.pop();
        alert(`Removed Customer ID: ${lastCustomerId} from queue.`);
        updateQueueDisplay();
    } else {
        alert('No bookings to undo.');
    }
}

// Function to update the displayed queue
function updateQueueDisplay() {
    const queueList = document.getElementById('queueList');
    queueList.innerHTML = ''; // Clear existing list
    queue.forEach(customerId => {
        const li = document.createElement('li');
        li.textContent = `Customer ID: ${customerId}`;
        queueList.appendChild(li);
    });
}

// Function to save data to local storage
function saveToLocalStorage() {
    localStorage.setItem('queue', JSON.stringify(queue));
    localStorage.setItem('availableTickets', availableTickets);
    alert('Data saved to Local Storage!');
}

// Function to load data from local storage
function loadFromLocalStorage() {
    const storedQueue = JSON.parse(localStorage.getItem('queue'));
    const storedTickets = localStorage.getItem('availableTickets');

    if (storedQueue) {
        queue.length = 0; // Clear the existing queue
        queue.push(...storedQueue); // Load stored queue
        updateQueueDisplay();
    }

    if (storedTickets) {
        availableTickets = parseInt(storedTickets);
        document.getElementById('availableTickets').textContent = availableTickets;
    }
    alert('Data loaded from Local Storage!');
}

// Fetch data from Google Sheets
function fetchGoogleSheetData() {
    const url = document.getElementById('googleSheetLink').value;
    fetch(url)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').map(row => row.split(','));
            // Handle your rows of data here
            console.log(rows);
            alert('Data fetched from Google Sheets!');
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Handle Excel file upload
function handleFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // Display loaded data in the console or handle as needed
            console.log(jsonData);
            alert('Data loaded from Excel file!');
        };
        reader.readAsArrayBuffer(file);
    } else {
        alert('Please upload a file first.');
    }
}
