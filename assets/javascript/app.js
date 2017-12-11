  console.log("hello");

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
  var firstTrain;
  var now;
  var firstTMoment;
  var timeDiffMoment;
  var leftoverMin;
  var minUntilNextArrival;
  var nextA;

  var num = 1;

  database.ref().on("child_added", function(snapshot, PrevChildKey) {
      var newPost = snapshot.val();
      console.log(newPost);

      name = newPost.name;
      destination = newPost.destination;
      frequency = newPost.frequency;
      firstTrain = newPost.firstTrain;

      firstTMoment = moment(firstTrain, "hh:mm").subtract(1, "years");        
      console.log(firstTMoment);  
      now = moment();

      timeDiffMoment = moment().diff(moment(firstTMoment), "minutes");      
      console.log(timeDiffMoment);

      leftoverMin = timeDiffMoment % frequency;  
      console.log(leftoverMin)

      minUntilNextArrival = frequency - leftoverMin;
      nextA = moment().add(minUntilNextArrival, "minutes");
      nextArrival = moment(nextA).format("hh:mm"); 

      $('#myTable').last().append($("<tr>" + "<td>" + num++ + "</td>" +
										  "<td>" + name + "</td>" + 
											"<td>" + destination + "</td>" +
											"<td>" + frequency + "</td>" +
											"<td>" + nextArrival + "</td>" +
											"<td>" + minUntilNextArrival + "</td>" + 
											"</tr>"));  
     });


  $("#submit-button").on("click", function(){

   name = $("#nameInput").val().trim();
    destination = $("#destinationInput").val().trim();
    firstTrain = $("#firstTrainInput").val().trim();
    frequency = $("#frequencyInput").val().trim();

      database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
      });


  })