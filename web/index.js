/*const Web3 = require('web3');
const web3 = new Web3('http://127.0.0.1:7545'); // Update with your network address

const contractABI = [{
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_minimumAge",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "minimumAge",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "userAge",
        "type": "uint256"
      }
    ],
    "name": "checkAge",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_minimumAge",
        "type": "uint256"
      }
    ],
    "name": "setMinimumAge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; // Add your contract ABI here
const contractAddress = '0x0d3448060864a6B7F2EfF0fD6cfB71EFC1B0a264'; // Add your contract address here

const ageChecker = new web3.eth.Contract(contractABI, contractAddress);

async function checkAge() {
    const age = document.getElementById('age').value;
    const accounts = await web3.eth.getAccounts();
    const isAdult = await ageChecker.methods.isAdult(age).call({ from: accounts[0] });
    document.getElementById('result').innerText = isAdult ? 'You are an adult.' : 'You are not an adult.';
}*/
// Function to generate a random alphanumeric string
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    // Generate a random Ethereum ID
    const ethereumId = generateRandomString(42);
    console.log('Generated Ethereum ID:', ethereumId);
  
    // Assign the generated Ethereum ID to a hidden field in the form
    const ethereumIdInput = document.getElementById('ethereumId');
      if (ethereumIdInput) {
          ethereumIdInput.value = ethereumId;
      } else {
          console.error("Element with ID 'ethereumId' not found.");
      }
    document.getElementById('loginButton').addEventListener('click', function() {
      window.location.href = "login.html";
    });
    
    // Handle form submission
    document.getElementById("registrationForm").addEventListener("submit", async function(event) {
        event.preventDefault();
        
        const fullName = document.getElementById("fullName").value;
        const address = document.getElementById("address").value;
        const dob = document.getElementById("dob").value;
        const password = document.getElementById("password").value;
        const ethereumId = document.getElementById("ethereumId").value;
  
        // Call backend API to register user
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ fullName, address, dob, password, ethereumId })
            });
  
            
            
            if (response.ok) {
                const data = await response.json();
                document.getElementById("registrationResult").innerText = `Registration successful! Your User ID is: ${data.userId}. Your Ethereum ID is: ${data.ethereumId}`;
            } else {
                const data = await response.json();
                document.getElementById("registrationResult").innerText = data.error;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
    
  });
