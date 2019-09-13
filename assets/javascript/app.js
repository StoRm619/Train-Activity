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
  var nextTrain = "";

  $("#submitButton").on("click", function() {
      name = $("#inputName").val().trim();
      des = $("#inputrole").val().trim();
      date = $("#inputDate").val().trim();
      rate = parseInt($("#inputRate").val().trim());
      console.log(name, des, date, rate);
      if (name != "" && des != "" && moment(date, "HH:mm", true).isValid() && !Number.isNaN(rate)) {
          nextTrain = moment(date).add(rate, 'm');
          console.log(nextTrain);

          database.ref().push({
              name,
              des,
              date,
              rate,
              nextTrain,

          });
      } else {
          alert("Data input incorrect");
      }
  });
  database.ref().on(
      "child_added",
      function(snapshot) {
          //console.log(snapshot.val())​;
          var newDiv = $("<div>")
          newDiv.addClass("row")
          newDiv.addClass("trainInfoRow")
          var nameDiv = $("<div>")
          nameDiv.text(snapshot.val().name);
          nameDiv.addClass("col-md-2")
          newDiv.append(nameDiv)
          var roleDiv = $("<div>")
          roleDiv.text(snapshot.val().des);
          roleDiv.addClass("col-md-2")
          newDiv.append(roleDiv)
          var dateDiv = $("<div>")
          dateDiv.text(snapshot.val().date);
          dateDiv.addClass("col-md-2")
          newDiv.append(dateDiv)
          var monthDiv = $("<div>")
          monthDiv.text(snapshot.val().nextTrain)
          monthDiv.addClass("col-md-2")
          newDiv.append(monthDiv)
          var rateDiv = $("<div>")
          rateDiv.text(snapshot.val().rate);
          rateDiv.addClass("col-md-2")
          newDiv.append(rateDiv)
              //   var totalDiv = $("<div>")
              //   totalDiv.text(snapshot.val().totalBill);
              //   totalDiv.addClass("col-md-2")
              //   newDiv.append(totalDiv)
          $("#trainDisplay").append(newDiv)
      })