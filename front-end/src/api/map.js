import { Loader } from "@googlemaps/js-api-loader"; //引入
export function initMap(latitude, longitude) {
  const loader = new Loader({
    apiKey: "AIzaSyDTq13m-BZtXffUmP3AMGVrDf7xZCceAlU", //之前的key
    version: "weekly", //版本
    libraries: ["places"]
  });
  let center = { lat: latitude, lng: longitude };
  const mapOptions = {
    center: center,
    zoom: 12,
    disableDefaultUI: true
  };

  loader
    .load()
    .then(google => {
      const map = new google.maps.Map(
        document.getElementById("mapBox"),
        mapOptions
      );
      console.log(center);
      new google.maps.Marker({
        position: center,
        map
      });
    })
    .catch(e => {
      // do something
      console.log(e);
    });
}
