// [[[[[[[[[[[[[[[[[[[[[[[[[[[ Smart Search ]]]]]]]]]]]]]]]]]]]]]]]]]]]
// [[[[[[[[[[[[[[[[[[[[[[[[[[[ Smart Search ]]]]]]]]]]]]]]]]]]]]]]]]]]]

  $(document).ready(function () {
    // Function to filter table rows based on input value
    function filterTable(columnIndex, inputId) {
      var value = $(inputId).val().toLowerCase(); // Get the value from the input field
      $("#dataTable tbody tr").filter(function () {
        $(this).toggle($(this).find("td:eq(" + columnIndex + ")").text().toLowerCase().indexOf(value) > -1); // Show/hide rows based on the search value
      });
    }

    // Event listeners for each search bar
    $("#searchName").on("keyup", function () {
      filterTable(1, "#searchName"); // Filter the table by the first column (index 0)
    });

    $("#searchEmail").on("keyup", function () {
      filterTable(4, "#searchEmail"); // Filter the table by the second column (index 1)
    });

    $("#searchPhone").on("keyup", function () {
      filterTable(5, "#searchPhone"); // Filter the table by the third column (index 2)
    });
  });

// [[[[[[[[[[[[[[[[[[[[[[[[[[[ Smart Search ]]]]]]]]]]]]]]]]]]]]]]]]]]]
// [[[[[[[[[[[[[[[[[[[[[[[[[[[ Smart Search ]]]]]]]]]]]]]]]]]]]]]]]]]]]
