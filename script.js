const firebaseConfig = {
  apiKey: "AIzaSyAXszYZD5NQg9z2iMVB3GL3Ta5UMXKiREU",
  authDomain: "live-login-8e5b2.firebaseapp.com",
  projectId: "live-login-8e5b2",
  storageBucket: "live-login-8e5b2.firebasestorage.app",
  messagingSenderId: "251218568786",
  appId: "1:251218568786:web:612469df20d8f4d707e18b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



// ✅ Login function (form submit hole eta call hobe)
function login(e) {
  e.preventDefault(); // Form reload bondho korar jonno

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Firebase authentication try
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      // Login success hole Firestore e data save korbo
      db.collection("logins").add({
        email: email,
        time: new Date().toLocaleString()
      });

      // Redirect to logs page
      window.location.href = "logs.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
}

// ✅ logs.html e data show korar code
if (document.getElementById("logList")) {
  db.collection("logins")
    .orderBy("time", "desc")
    .onSnapshot(snapshot => {
      const logList = document.getElementById("logList");
      logList.innerHTML = "";

      snapshot.forEach(doc => {
        const data = doc.data();
        const li = document.createElement("li");
        li.textContent = `${data.email} | ${data.time}`;
        logList.appendChild(li);
      });
    });
}
