  // database config with var
  var firebaseConfig = {
      apiKey: "AIzaSyD1buSTqD3TTaJyyIbTj_Qtkh5LZTQNIKc",
      authDomain: "cbc-activies.firebaseapp.com",
      databaseURL: "https://cbc-activies.firebaseio.com",
      projectId: "cbc-activies",
      storageBucket: "cbc-activies.appspot.com",
      messagingSenderId: "1020142440827",
      appId: "1:1020142440827:web:918acd6243f90753252dde"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Create a variable to reference the database.
  var database = firebase.database();
  var name = "";
  var des = "";
  var date = "";
  var rate = "";

  $("#submitButton").on("click", function() {
      name = $("#inputName").val().trim();
      des = $("#inputrole").val().trim();
      date = $("#inputDate").val().trim();
      rate = parseInt($("#inputRate").val().trim());
      console.log(name, des, date, rate);
      if (name != "" && des != "" && moment(date, "HH:mm", true).isValid() && !Number.isNaN(rate)) {
          database.ref().push({
              name,
              des,
              date,
              rate,
          });
      } else {
          alert("Data input incorrect");
      }
  });
  database.ref().on(
      "child_added",
      function(snapshot) {
          // First Time (pushed back 1 year to make sure it comes before current time)
          var firstTimeConverted = moment(snapshot.val().date, "HH:mm").subtract(1, "years");
          console.log(firstTimeConverted);

          // Current Time
          var currentTime = moment();
          console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

          // Difference between the times
          var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
          console.log("DIFFERENCE IN TIME: " + diffTime);


          // Time apart (remainder)
          var tRemainder = diffTime % snapshot.val().rate;
          console.log(tRemainder);

          // Minute Until Train
          var tMinutesTillTrain = snapshot.val().rate - tRemainder;
          console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

          // Next Train
          var nextTrain = moment(new Date).add(tMinutesTillTrain, "minutes");
          console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
          //Adding to Table
          var newDiv = $("<div>")
          newDiv.addClass("row")
          newDiv.addClass("trainInfoRow")
          var nameDiv = $("<div>")
          nameDiv.text(snapshot.val().name);
          nameDiv.addClass("col-md-3")
          newDiv.append(nameDiv)
          var roleDiv = $("<div>")
          roleDiv.text(snapshot.val().des);
          roleDiv.addClass("col-md-3")
          newDiv.append(roleDiv)
          var dateDiv = $("<div>")
          dateDiv.text(snapshot.val().rate);
          dateDiv.addClass("col-md-2")
          newDiv.append(dateDiv)
          var rateDiv = $("<div>")
          rateDiv.text(moment(nextTrain).format("LT"));
          rateDiv.addClass("col-md-2")
          var monthDiv = $("<div>")
          monthDiv.text(tMinutesTillTrain);
          monthDiv.addClass("col-md-2")
          newDiv.append(rateDiv)
          newDiv.append(monthDiv)
              //   var totalDiv = $("<div>")
              //   totalDiv.text(snapshot.val().totalBill);
              //   totalDiv.addClass("col-md-2")
              //   newDiv.append(totalDiv)
          $("#trainDisplay").append(newDiv)
      })