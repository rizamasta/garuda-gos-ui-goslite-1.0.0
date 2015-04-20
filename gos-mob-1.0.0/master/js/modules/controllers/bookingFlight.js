App.controller('bookingFlightController_pax', ['$http','$scope', function($http,$scope){
/* for button sebelumnya dan button top*/
    $scope.sebelumnya = function (){
        document.location.href=base_url+'bookFlightAvailable';
    };
    $scope.step1 = function(){
        document.location.href=base_url+'bookFlight';
    };
/* for button sebelumnya dan button top*/

    /*if data not empty */
    if(typeof(localStorage['bookFlightData'])!="undefined" &&
        typeof(localStorage['getFareParams'])!="undefined"){

        $scope.tgl = new Date();
        console.log($scope.tgl.getFullYear());





    }
    else{
        document.location.href=base_url+'bookFlight';
        localStorage.clear();
    }
}]);