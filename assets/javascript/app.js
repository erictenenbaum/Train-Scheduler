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
  var minAway;
  var firstTrain;
  var now;
  var timeCon;
  var diffTime;
  var tRemainder;
  var minUntilNextArrival;
  var nextA;

  var num = 2;

  database.ref().on("child_added", function(snapshot, PrevChildKey) {
      var newPost = snapshot.val();
      console.log(newPost);

      name = newPost.name;
      destination = newPost.destination;
      frequency = newPost.frequency;
      firstTrain = newPost.firstTrain;

      timeCon = moment(firstTrain, "hh:mm").subtract(1, "years");
      
      var timeCon2 = moment(firstTrain, "hh:mm");
      
      console.log("timeCon: " + timeCon);
      console.log("timeCon2: " + timeCon2);
      

      now = moment();

      diffTime = moment().diff(moment(timeCon), "minutes");
      
      console.log("diffTime: " + diffTime);

      tRemainder = diffTime % frequency;
      
      console.log("tRemainder : " + tRemainder);

      minUntilNextArrival = frequency - tRemainder;

      nextA = moment().add(minUntilNextArrival, "minutes");

      nextArrival = moment(nextA).format("hh:mm");


      // console.log(nextArrival);
      // console.log(tRemainder);
      // console.log("this " + frequency);




      $('#myTable').last().append($("<tr>" + "<td>" + num++ + "</td>" +
										  "<td>" + name + "</td>" + 
											"<td>" + destination + "</td>" +
											"<td>" + frequency + "</td>" +
											"<td>" + nextArrival + "</td>" +
											"<td>" + minUntilNextArrival + "</td>" + 
										// 	"<td>" + "string" + "</td>" + 
									"</tr>"));






      // var a = moment().to(timeCon, "mm");

      // var b = moment().minute(a);
      // var b = moment();

      // var c = b.diff(timeCon, "minutes");

      // var aa = moment(timeCon).add(frequency, "m")

      // var bb = moment(aa, "mm");

      // console.log("this: " + bb);




      


      // console.log(timeCon);
      // console.log(b);
      // console.log(-c);

      // start trying to figure out when the first train takes off, then add the frequency and roll over that ever duration
      // of the frequency. So if the first train takes off at noon and runs ever 30 minutes and it is now 2:40
      // the next train will take off in 20 minutes. and the next arrival will be 3:00. 
      
      



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