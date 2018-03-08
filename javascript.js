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

// Initial Values
var trainNumber = "";
var destination = "";
var frequency = 0;
var nextArrival = "";
var minutesAway = "";

// Capture Button Click
$("#add-train").on("click", function (event) {
	event.preventDefault();
	console.log(event);
	// YOUR TASK!!!
	// Code in the logic for storing and retrieving the most recent user.
	// Don't forget to provide initial data to your Firebase database.
	trainNumber = $("#trainNumber-input").val().trim();
	destination = $("#destination-input").val().trim();
	frequency = $("#frequency-input").val().trim();
	nextArrival = $("#nextArrival-input").val().trim();
	// minutesAway = $("#minutesAway-input").val().trim();
	console.log('TESTING', trainNumber, destination, frequency, nextArrival)
	// Code for the push
	dataRef.ref().push({
		trainNumber: trainNumber,
		destination: destination,
		frequency: frequency,
		nextArrival: nextArrival,
		minutesAway: minutesAway,

		// dateAdded: firebase.database.ServerValue.TIMESTAMP
	});
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot) {

	// Log everything that's coming out of snapshot
	// console.log(childSnapshot.val().name);
	console.log(childSnapshot.val().trainNumber);
	console.log(childSnapshot.val().destination);
	console.log(childSnapshot.val().frequency);
	console.log(childSnapshot.val().nextArrival);
	console.log(childSnapshot.val().minutesAway);

	// full list of items to the well
	// $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name +
	// 	" </span><span class='member-email'> " + childSnapshot.val().email +
	// 	" </span><span class='member-age'> " + childSnapshot.val().age +
	// 	" </span><span class='member-comment'> " + childSnapshot.val().comment + " </span></div>");

	// Handle the errors
}, function (errorObject) {
	console.log("Errors handled: " + errorObject.code);
});
dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {

	// Change the HTML to reflect
	$("#trainNumber-display").text(snapshot.val().trainNumber);
	$("#destination-display").text(snapshot.val().destination);
	$("#frequency-display").text(snapshot.val().frequency);
	$("#nextArrival-display").text(snapshot.val().nextArrival);
	$("#minutesAway-display").text(snapshot.val().minutesAway);
});