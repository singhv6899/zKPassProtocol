// Logic for age gated service login
document.getElementById("ageGatedLoginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const userId = document.getElementById("userIdAge").value;
    const ethereumId = document.getElementById("ethereumIdAge").value;

    // Call backend API to login for age gated service
    try {
        const response = await fetch('/login/ageGated', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, ethereumId })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Logic for non-age gated service login
document.getElementById("nonAgeGatedLoginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    const userId = document.getElementById("userIdNonAge").value;
    const ethereumId = document.getElementById("ethereumIdNonAge").value;

    // Call backend API to login for non-age gated service
    try {
        const response = await fetch('/login/nonAgeGated', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId, ethereumId })
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
});