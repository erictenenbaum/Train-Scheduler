
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDu2uhQzLSwcuMNvIpwmrMKemDO3JSaAKY",
    authDomain: "traintime-edef7.firebaseapp.com",
    databaseURL: "https://traintime-edef7.firebaseio.com",
    projectId: "traintime-edef7",
    storageBucket: "",
    messagingSenderId: "989779008290"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var name;
  var destination;
  var frequency;
  var nextArrival;
  var minAway;
  var firstTrain;

  var num = 2;

  database.ref().on("child_added", function(snapshot, PrevChildKey) {
      var newPost = snapshot.val();
      console.log(newPost);

      



  });


  $("#submit-button").on("click", function(){

   name = $("#nameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#firstTrainInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

      database.push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      });


  })