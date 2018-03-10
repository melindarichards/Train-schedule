var config = {
	apiKey: "AIzaSyCyvinYVis262Ghi9V-ZEDt2EfhEYjiTMY",
	authDomain: "melinda-project-one.firebaseapp.com",
	databaseURL: "https://melinda-project-one.firebaseio.com",
	projectId: "melinda-project-one",
	storageBucket: "melinda-project-one.appspot.com",
	messagingSenderId: "11703787222"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Capture button click for adding new train
$("#add-train").on("click", function (event) {
	event.preventDefault();
	
	// Grabs new train data that was added by user
	var newTrainNumber = $("#trainNumber-input").val().trim();
	var newDestination = $("#destination-input").val().trim();
	var newFirstTrainTime = $("#firstTrainTime-input").val().trim();
	var newFrequency = $("#frequency-input").val().trim();


	// Temporarily stores the new train data
	var newSchedule = {
		trainNumber: newTrainNumber,
		destination: newDestination,
		firstTrainTime: newFirstTrainTime,
		frequency: newFrequency,

	};
	
	// Pushes new train data into Firebase
	dataRef.ref().push(newSchedule);

 // Alert
 alert("Train successfully added");

 // Clears all of the new train data from the form
 $("#trainNumber-input").val("");
 $("#destination-input").val("");
 $("#frequency-input").val("");
 $("#firstTrainTime-input").val("");

});

// Creates Firebase event
dataRef.ref().on("child_added", function (childSnapshot) {

	console.log(childSnapshot.val());

	// Stores new train data in variables
	
	var newTrainNumber = childSnapshot.val().trainNumber;
	var newDestination = childSnapshot.val().destination;
	var newFirstTrainTime = childSnapshot.val().firstTrainTime;
	console.log(newFirstTrainTime);
	var newFrequency = childSnapshot.val().frequency;

	
// Math

	// First train time pushed back one day
	var newFirstTrainTimeConverted = moment(newFirstTrainTime, "HH:mm").subtract(1, "days");
	console.log(newFirstTrainTimeConverted);

	// Current Time
	var currentTime = moment();
	console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

	// Difference between the times
	var diffTime = moment().diff(newFirstTrainTimeConverted, "minutes");
	console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
//make sure you understand next line!!!!!!!!!!!
var tRemainder = diffTime % newFrequency;
console.log(tRemainder);

// Minutes Until Train
//make sure you understand next line!!!!!!!!!!!
var newMinutesAway = newFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + newMinutesAway);

// Next Train
var newNextArrival = moment().add(newMinutesAway, "minutes");
console.log("ARRIVAL TIME: " + moment(newNextArrival).format("HH:mm"));
  // Add new train data into the table

		$("#current-schedule > tbody").append("<tr><td>" 
		+ newTrainNumber + "</td><td>" 
		+ newDestination + "</td><td>" 
		// + newfirstTrainTime + "</td><td>" 
		+ newFrequency + "</td><td>" 
		+ newNextArrival.format("HH:mm") + "</td><td>"
		+ newMinutesAway + "</td><td>"
		+ "</td></tr>");
});