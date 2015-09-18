$(document).ready(function() {
    var map = initialize_gmaps();
    var myLatlng = new google.maps.LatLng(40.705189,-74.009209);
    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Full Stack",
        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    });
    new TripPlanner('#tripPlanner', map, marker);
    //set up trip planner here
});

