$(document).ready(function () {
  const addresses = {
    USA: [
      "123 Main St, Anytown, USA",
      "456 Elm St, Springfield, USA",
      "789 Maple Ave, Smalltown, USA",
    ],
    Germany: [
      "Hauptstraße 1, Berlin, Germany",
      "Musterweg 2, Munich, Germany",
      "Bahnhofstraße 3, Hamburg, Germany",
    ],
    France: [
      "12 Rue de Rivoli, Paris, France",
      "34 Avenue des Champs-Élysées, Paris, France",
      "56 Boulevard Saint-Germain, Paris, France",
    ],
    "United Kingdom": [
      "1 Oxford St, London, UK",
      "2 Baker St, London, UK",
      "3 High St, Edinburgh, UK",
    ],
    Spain: [
      "Calle Mayor 1, Madrid, Spain",
      "Avenida de la Constitución 2, Barcelona, Spain",
      "Plaza Mayor 3, Seville, Spain",
    ],
    Italy: [
      "Via Roma 1, Rome, Italy",
      "Corso Vittorio Emanuele II 2, Milan, Italy",
      "Piazza della Signoria 3, Florence, Italy",
    ],
    Canada: [
      "123 Bloor St, Toronto, Canada",
      "456 Granville St, Vancouver, Canada",
      "789 Rue Sainte-Catherine, Montreal, Canada",
    ],
    Australia: [
      "1 George St, Sydney, Australia",
      "2 Collins St, Melbourne, Australia",
      "3 Queen St, Brisbane, Australia",
    ],
    Poland: [
      "Ulica Marszałkowska 1, Warsaw, Poland",
      "Ulica Piotrkowska 2, Łódź, Poland",
      "Ulica Floriańska 3, Kraków, Poland",
    ],
    Mexico: [
      "Calle 123, Mexico City, Mexico",
      "Avenida 456, Guadalajara, Mexico",
      "Plaza 789, Monterrey, Mexico",
    ],
    India: [
      "123 MG Road, Bangalore, India",
      "456 Connaught Place, New Delhi, India",
      "789 Park Street, Kolkata, India",
    ],
    Denmark: [
      "1 Nyhavn, Copenhagen, Denmark",
      "2 Strøget, Copenhagen, Denmark",
      "3 Gothersgade, Aarhus, Denmark",
    ],
    Brazil: [
      "123 Avenida Paulista, São Paulo, Brazil",
      "456 Copacabana, Rio de Janeiro, Brazil",
      "789 Rua das Flores, Curitiba, Brazil",
    ],
    Turkey: [
      "1 Istiklal Avenue, Istanbul, Turkey",
      "2 Cumhuriyet Boulevard, Ankara, Turkey",
      "3 Konak Square, Izmir, Turkey",
    ],
    Argentina: [
      "123 Avenida 9 de Julio, Buenos Aires, Argentina",
      "456 Calle Florida, Buenos Aires, Argentina",
      "789 Avenida Santa Fe, Rosario, Argentina",
    ],
  };

  if (localStorage.getItem("rated") === "true") {
    hideDivPermanently();
  }

  if (localStorage.getItem("record") != null) {
    document.getElementById("result").innerHTML =
      localStorage.getItem("record");
  }

  function hideDivPermanently() {
    var div = document.getElementById("rating");
    if (div) {
      div.classList.add("d-none");
      localStorage.setItem("rated", "true");
    }
  }

  $("#generate").click(async () => {
    document.getElementById("spinner").classList.remove("d-none");
    const zipCode = generateRandomZipCode();
    const cardProvider = document.getElementById("cardtype");
    const country = document.getElementById("country");
    const provider = cardProvider.value;
    const response = await fetch(
      `https://randommer.io/api/Card?type=${provider}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "4bf13d9b2a0143ceaf014c3a44ed76cf",
          "Content-Type": "application/json",
        },
      }
    );
    const addressData = await fetch(
      "https://random-data-api.com/api/address/random_address"
    );
    const addressResult = await addressData.json();
    const records = await response.json();
    const cardnumber = records?.cardNumber;
    const full_name = records?.fullName;
    const cvv = records?.cvv;
    const type = records?.type;
    const generated_date = records?.date;
    const ZipCode = addressResult?.zip_code;
    const streetAddress = addressResult?.street_address;
    var datetime = generated_date.split("T");
    document.getElementById("spinner").classList.add("d-none");
    const selectedCountry = country.value;
    const addressList = addresses[selectedCountry];
    const randomIndex = Math.floor(Math.random() * addressList.length);
    const randomAddress = addressList[randomIndex];
    const result = `
  <div style="width: 2000px;">
    <h6 id="cardnum"><strong>Card Number</strong> : ${cardnumber} <button class="btn  btn-sm copy-btn" data-clipboard-text="${cardnumber}"><i class="fa fa-copy cp"></i></button></h6>
    <h6><strong>CVV</strong> : ${cvv} <button class="btn  btn-sm copy-btn" data-clipboard-text="${cvv}"><i class="fa fa-copy cp"></i></button></h6>
    <h6><strong>Date</strong> : ${datetime[0]} <button class="btn  btn-sm copy-btn" data-clipboard-text="${datetime[0]}"><i class="fa fa-copy cp"></i></button></h6>
    <h6><strong>Full Name</strong> : ${full_name} <button class="btn  btn-sm copy-btn" data-clipboard-text="${full_name}"><i class="fa fa-copy cp"></i></button></h6>
    <h6><strong>Zip Code</strong> : ${ZipCode} <button class="btn  btn-sm copy-btn" data-clipboard-text="${zipCode}"><i class="fa fa-copy cp"></i></button></h6>
  </div>
   <br>
   <div style="width: 2000px;">
    <h6><strong>Country</strong> : ${country.value} <button class="btn  btn-sm copy-btn" data-clipboard-text="${country.value}"><i class="fa fa-copy cp"></i></button></h6>
     <h6><strong>Street Address</strong> : ${randomAddress} <button class="btn  btn-sm copy-btn" data-clipboard-text="${randomAddress}"><i class="fa fa-copy cp"></i></button></h6>
  </div>
  `;
    localStorage.setItem("record", result);
    document.getElementById("result").innerHTML = result;
    window.location.reload();
  });

  $("#reset").click(function () {
    resetCard();
  });

  function resetCard() {
    document.getElementById("alert").classList.add("d-none");
    document.getElementById("result").innerHTML = "";
    localStorage.removeItem("record");
  }

  function generateRandomZipCode() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }


  var rateUsDiv = document.getElementById("rating");
  if (rateUsDiv) {
    var anchorTags = rateUsDiv.querySelectorAll("a");
    anchorTags.forEach(function (anchor) {
      anchor.addEventListener("click", function () {
        hideDivPermanently();
      });
    });
  }

  var rateUsDiv = document.getElementById("result");
  if (rateUsDiv) {
    var buttons = rateUsDiv.querySelectorAll("button");
    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        const text = button.getAttribute("data-clipboard-text");
        var icon = this.querySelector("i");
        if (icon.classList.contains("fa-copy")) {
          icon.classList.remove("fa-copy");
          icon.classList.add("fa-check");
        }
        navigator.clipboard.writeText(text);
        setTimeout(function () {
          icon.classList.add("fa-copy");
        }, 2000);
      });
    });
  }

  document.querySelectorAll('.star').forEach(function(star) {
    star.addEventListener('mouseover', function() {
        const rating = this.getAttribute('data-rating');
        highlightStars(rating);
    });

    star.addEventListener('click', function(event) {
        const url = this.getAttribute('href');
        window.location.href = url;
    });
});

function highlightStars(rating) {
    document.querySelectorAll('.star').forEach(function(star) {
        const starRating = star.getAttribute('data-rating');
        if (starRating <= rating) {
            star.style.color = 'gold';
        } else {
            star.style.color = 'grey';
        }
    });
}

document.querySelector('.stars').addEventListener('mouseleave', function() {
    document.querySelectorAll('.star').forEach(function(star) {
        star.style.color = 'grey';
    });
});

});
