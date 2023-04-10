const deleteButtons = document.querySelectorAll(".delete-btn");
deleteButtons.forEach((btn) => {
  btn.addEventListener("click", (event) => {
    event.preventDefault();
    if (confirm("Are you sure you want to delete this habit?")) {
      const habitId = event.target.dataset.habitId;
      fetch(`/habit/${habitId}/delete`, { method: "DELETE" })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          } else {
            alert("Could not delete habit. Please try again later.");
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Could not delete habit. Please try again later.");
        });
    }
  });
});

/// log creation
$.ajax({
  url: `/habit/${habitId}/log/create`,
  method: "POST",
  data: { action, date },
  success: (data) => {
    const entries = data.map((entry) => ({
      title:
        entry.action === "done" ? "✓" : entry.action === "notdone" ? "X" : "-",
      date: entry.date,
    }));
    $("#calendar").fullCalendar("removeEventSources");
    $("#calendar").fullCalendar("addEventSource", entries);
    $("#log-list").empty();
    data.forEach((entry) => {
      const li = $("<li>");
      $("<span>").text(new Date(entry.date).toLocaleDateString()).appendTo(li);
      $("<span>").text(entry.action).appendTo(li);
      const updateForm = $("<form>").attr({
        method: "POST",
        action: `/habit/${habitId}/log/${entry._id}/update`,
      });
      $("<label>").text("Done").appendTo(updateForm);
      $("<input>")
        .attr({
          type: "radio",
          name: "action",
          value: "done",
        })
        .prop("checked", entry.action === "done")
        .appendTo(updateForm);
      $("<label>").text("Not Done").appendTo(updateForm);
      $("<input>")
        .attr({
          type: "radio",
          name: "action",
          value: "notdone",
        })
        .prop("checked", entry.action === "notdone")
        .appendTo(updateForm);
      $("<label>").text("No Action").appendTo(updateForm);
      $("<input>")
        .attr({
          type: "radio",
          name: "action",
          value: "noaction",
        })
        .prop("checked", entry.action === "noaction")
        .appendTo(updateForm);
      $("<button>").attr("type", "submit").text("Update").appendTo(updateForm);
      li.append(updateForm);
      $("#log-list").append(li);
    });
    form[0].reset();
  },
  error: (xhr, status, error) => {
    console.error(error);
  },
});
