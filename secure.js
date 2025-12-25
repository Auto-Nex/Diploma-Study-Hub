// SHA-256 hashing function
    async function hashPassword(password) {
        const msgBuffer = new TextEncoder().encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
    }

    // Users + Hashed Passwords
    const users = [
        { username: "Mandavi", password: "5307d9efed272c7392cbde7fcb731c1a943d77468a090da2cb3d5d6f40522949" }, // pass: Mandavi@06122006
        { username: "Shivam@69772",  password: "5d24292a88d41851fe18cc1352a68977514a5ffef56d16fc8260f9a055f4933a" }, // pass: 
        { username: "Prajwal", password: "d2a383deed45ac574926bb785c0a87d0b4a72f217bd010df863d80dcdf2abdc2" }  // pass: Prajwal@358
    ];

    async function login() {
        const name = document.getElementById("username").value.trim();
        const pwd = document.getElementById("password").value;

        const hashed = await hashPassword(pwd);

        console.log("Entered Password (Hashed):", hashed); 

        const userFound = users.find(u => u.username === name && u.password === hashed);

        if (userFound) {
            alert(`🔓 Welcome ${name}! Login Successful.`);
            // Example of redirect
            // window.location.href = "dashboard.html";
            document.getElementById("login").style.display = "none";
            document.getElementById("main").style.display ="block";
        
        } else {
            alert("❌ Access Denied: Wrong Username or Password.");
            document.getElementById("errormsg").innerText = "Incorrect User Name OR Password. please try again.";
        }
    }

    // ⏎ Press Enter to Login
    document.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            login();
        }
    });