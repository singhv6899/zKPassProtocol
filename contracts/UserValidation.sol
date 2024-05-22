pragma solidity ^0.8.0;

contract UserValidation {
    struct User {
        string ethereumId;
        uint age;
    }

    mapping(uint => User) private users;

    function setUser(uint userId, string memory ethereumId, uint age) public {
        users[userId] = User(ethereumId, age);
    }

    function calculateAge(uint dob) private view returns (uint) {
        uint currentDate = block.timestamp; // Current timestamp
        uint age = (currentDate - dob) / 31536000; // Assuming 31536000 seconds in a year
        return age;
    }

    // Validate age function
    function validateAge(uint userId, uint dob) public view returns(bool) {
        uint age = calculateAge(dob);
        return age >= 21; // Return true if age is 21 or above
    }

   function validateLoginAgeGated(uint userId, uint dob, string memory ethereumId) public view returns(bool) {
        string memory storedEthereumId = users[userId].ethereumId;
        if (keccak256(abi.encodePacked(storedEthereumId)) == keccak256(abi.encodePacked(ethereumId))) {
            return validateAge(userId, dob);
        }
        return false;
    }

    function validateLoginNonAgeGated(uint userId, string memory ethereumId) public view returns(bool) {
        string memory storedEthereumId = users[userId].ethereumId;
        return keccak256(abi.encodePacked(storedEthereumId)) == keccak256(abi.encodePacked(ethereumId));
    }
}