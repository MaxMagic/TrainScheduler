var config = {
    apiKey: "AIzaSyAk3gzpz14mbGdW2Kf3D579T7HOUVBa3oc",
    authDomain: "trainscheduler-ba26c.firebaseapp.com",
    databaseURL: "https://trainscheduler-ba26c.firebaseio.com",
    projectId: "trainscheduler-ba26c",
    storageBucket: "trainscheduler-ba26c.appspot.com",
    messagingSenderId: "837568288906"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  
  $("#addTrain").on("click", function() {
      event.preventDefault();
      
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var firstTrain = moment($("#firsttrainTime").val().trim(), "HHmm").subtract(10, "years").format("X");
      var frequency = $("#frequency").val().trim();
  
      var newTrain = {
          name: trainName,
          destination: destination,
          firstTrain: firstTrain,
          frequency: frequency
      }
  
      database.ref().push(newTrain);
  
      alert(newTrain.name + " has been successfully added");
  
      $("#trainName").val("");
      $("#destination").val("");
      $("#firstTrain").val("");
      $("#frequency").val("");    
  });
  
  database.ref().on("child_added", function(snapshot) {
  
    console.log(snapshot.val());

    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().firstTrain;
    var frequency = childSnapshot.val().rate;
  
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);

    var firstTimeConverted = moment(firstTrain, "HHmm").subtract(1, "years");
    console.log(firstTimeConverted);

    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HHmm"));

    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(destination),
      $("<td>").text(frequency),
      $("<td>").text(nextTrain),
      $("<td>").text(tMinutesTillTrain)
    );
    
    $("#train-table > tbody").append(newRow);
  
  });
