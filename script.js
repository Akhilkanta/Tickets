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
    if (ticketsToBook > 0) { // Removed the condition for availableTickets
        alert(`Successfully booked ${ticketsToBook} tickets!`);
    } else {
        alert('Invalid number of tickets.');
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

// Function to save data to Excel
function saveDataToExcel() {
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet([["Customer ID"], ...queue.map(id => [id])]);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");
    XLSX.writeFile(workbook, "CustomerBookings.xlsx");
}
