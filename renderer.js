
  document.getElementById("start-btn").addEventListener("click", function () {
    const selectedPage = document.getElementById("custom-timer").value;
    if (selectedPage) {
      window.location.href = selectedPage;
    }
  });
