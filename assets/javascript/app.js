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
  var role = "";
  var date = "";
  var rate = "";
  var monthWork = "";
  var totalBill = "";​
  $("#submitButton").on("click", function() {
      name = $("#inputName").val().trim();
      role = $("#inputrole").val().trim();
      date = $("#inputDate").val().trim();
      rate = parseInt($("#inputRate").val().trim());
      console.log(name, role, date, rate);
      if (name != "" && role != "" && /^\d{2}\/\d{2}\/\d{4}$/.test(date) && !Number.isNaN(rate)) {
          monthWork = Math.floor(moment(new Date()).diff(moment(date), 'months', true));
          console.log(monthWork);
          totalBill = monthWork * rate;​​
          database.ref().push({
              name,
              role,
              date,
              rate,
              monthWork,
              totalBill
          });
      } else {
          alert("Data input incorrect");
      }
  });​
  database.ref().on(
          "child_added",
          function(snapshot) {
              console.log(snapshot.val())​
              var newDiv = $("<div>")
              newDiv.addClass("row")
              newDiv.addClass("trainInfoRow")
              var nameDiv = $("<div>")
              nameDiv.text(snapshot.val().name);
              nameDiv.addClass("col-md-2")
              newDiv.append(nameDiv)
              var roleDiv = $("<div>")
              roleDiv.text(snapshot.val().role);
              roleDiv.addClass("col-md-2")
              newDiv.append(roleDiv)
              var dateDiv = $("<div>")
              dateDiv.text(snapshot.val().date);
              dateDiv.addClass("col-md-2")
              newDiv.append(dateDiv)
              var monthDiv = $("<div>")
              monthDiv.text(snapshot.val().monthWork)
              monthDiv.addClass("col-md-2")
              newDiv.append(monthDiv)
              var rateDiv = $("<div>")
              rateDiv.text(snapshot.val().rate);
              rateDiv.addClass("col-md-2")
              newDiv.append(rateDiv)
              var totalDiv = $("<div>")
              totalDiv.text(snapshot.val().totalBill);
              totalDiv.addClass("col-md-2")
              newDiv.append(totalDiv)
              $("#trainDisplay").append(newDiv)
          })
      // var q = new Date();
      // var m = q.getMonth();
      // var d = q.getDay();
      // var y = q.getFullYear();
      ​
      // var date = new Date(y, m, d);
      // console.log(date);