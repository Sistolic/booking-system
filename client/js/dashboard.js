async function showReservations(limit = true) {
  const grid = document.querySelector(".reservation-grid");
  grid.innerHTML = "";

  var response = await fetch("/api/reservations/get");
  var data = await response.json();

  // Set the reservation stats
  totalReservations(data.length);
  var guests = data.map((item) => item.guests);
  guests = guests.reduce((sum, current) => sum + current, 0);

  totalPeople(guests);
  totalSpace(guests);

  // Show only five items or all
  data = limit ? data.splice(0, 5) : data;
  data.forEach((item) => {
    var { id, fullname, guests, date, hour, status } = item;
    status = status.toLowerCase();

    grid.innerHTML += `
     <div class="reservation-item">
        <div class="reservation-info">
          <div class="reservation-name">${fullname}</div>
          <div class="reservation-details">
            ${formatHour(hour)} • Party of ${guests}
          </div>
        </div>
        <div class="status-badge ${status}">${status}</div>
      </div>
      `;
  });
}

function formatHour(time) {
  const [h, m] = time.split(":");

  const date = new Date();
  date.setHours(h, m);

  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}
function totalReservations(reservationsNum) {
  const totalDiv = document.getElementById("totalReservations").children[0];

  console.log(totalDiv);
  totalDiv.innerHTML = reservationsNum;
}
function totalPeople(peopleNum) {
  const peopleDiv = document.getElementById("totalCustomers").children[0];
  peopleDiv.innerHTML = peopleNum;
}
function totalSpace(space) {
  const spaceDiv = document.getElementById("totalSpace").children[0];
  spaceDiv.innerHTML = `${20 - space}/20`;
}

document.addEventListener("DOMContentLoaded", async () => {
  showReservations();
});
