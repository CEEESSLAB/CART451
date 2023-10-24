window.onload = function () {
  console.log("we are loaded");

  //runa ssaerach request -- get back all entries which match the $geonear criteria (see server)
  document.querySelector("#findData").addEventListener(
    "click",

    async function () {
      let lat_lng_vals = {
        lat_send: document.querySelector("#search_lat").value,
        lng_send: document.querySelector("#search_long").value,
      };
      let response = await fetch(
        `http://localhost:4200/sendSearch?${new URLSearchParams(lat_lng_vals)}`
      );
      console.log("the response::: ");
      console.log(await response.json());
    }
  ); //click
// send data to the server usin POST (after form is filled out)
  document
    .querySelector("#sendData")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      console.log("clicked");
      // create a new object to send to the server and will be saved to the mongodb
      let shipwreck_data = {
        feature_type: document.querySelector("#feature_type").value,
        chart: document.querySelector("#chart").value,
        wat_lev: document.querySelector("#water_level").value,
        latdec: parseFloat(document.querySelector("#lat").value),
        londec: parseFloat(document.querySelector("#lng").value),
        coordinates: [
          parseFloat(document.querySelector("#lat").value),
          parseFloat(document.querySelector("#lng").value),
        ],
      };

      // Default options are marked with *
      const response = await fetch("/postForm", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(shipwreck_data), // body data type must match "Content-Type" header
      });

      console.log(await response.text());
    });
};
