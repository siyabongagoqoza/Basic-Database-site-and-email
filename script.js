// Configs for my firebase app
 const firebaseConfig = {
    apiKey: "AIzaSyDUrqoN-6I_TdAhNVHb-yxGpydDzIB8b0A",
    authDomain: "temp-firestore-db.firebaseapp.com",
    projectId: "temp-firestore-db",
    storageBucket: "temp-firestore-db.firebasestorage.app",
    messagingSenderId: "1068696548382",
    appId: "1:1068696548382:web:411500ce784357a5ed6a0f",
    measurementId: "G-808DS4WBLN"
  };

// Initialize Firebase app with the configs
firebase.initializeApp(firebaseConfig);

// Initialize Firestore and get a reference to the service
const db = firebase.firestore();


/*
async function addPotentialClient(clientData) {
  try {
    const docRef = await addDoc(collection(db, "potentialClients"), {
      name: clientData.name,
      email: clientData.email,
      message: clientData.message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp() // Add a timestamp for when the document was created
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Thank you! Your message has been sent.");
    // Clear form fields
    document.getElementById("dname").value = "";
    document.getElementById("demail").value = "";
    document.getElementById("dmessage").value = "";
  } catch (e) {
    console.error("Error adding document: ", e);
    alert("Error sending message. Check console for details.");
  }
}

// Example usage:

*/
// Add data to the firestore database
async function addPotentialClient(clientData) {
  try {
    const docRef = await db.collection("potentialClients").add({
      name: clientData.name,
      email: clientData.email,
      message: clientData.message,
      createdAt: new Date()
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Get data from the firestore database
async function getPotentialClient() {
  try {
    const docRef = await db.collection("potentialClients").get();
    console.log("Retrieved document: ", docRef);
    const displayData = document.getElementById("doutput");
    displayData.innerHTML = docRef.docs.map(doc => `<p><strong>Name:</strong> ${doc.data().name} <br><strong>Email:</strong> ${doc.data().email} <br><strong>Message:</strong> ${doc.data().message}</p>`).join('');
  } catch (e) {
    console.error("Error retrieving document: ", e);
  }
}

const button = document.getElementById("dbutton");
const pullButton = document.getElementById("dpullbutton");

button.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission and page reload
    const clientData = {
        name: document.getElementById("dname").value,
        email: document.getElementById("demail").value,
        message: document.getElementById("dmessage").value
    };
    console.log("Sending data:", clientData);
    addPotentialClient(clientData);
});

pullButton.addEventListener('click', (event) => {
    event.preventDefault();
    getPotentialClient();
});


