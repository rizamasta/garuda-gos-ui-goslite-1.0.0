App.controller('getFereController', ['$http','$scope','$filter', function ($http,$scope,$filter) {
    //delete(localStorage['bookFlightData']);
    //delete(localStorage['getFareParams']);
    if(typeof(localStorage['bookFlightData'])!="undefined" &&
       typeof(localStorage['getFareParams'])!="undefined")
    {
        /**
         * get parameter from localstorage['getFare']
         */
        var getFareParams= JSON.parse(localStorage['getFareParams']);
        $scope.fareParams = getFareParams[0];
        $scope.SelectionDep  = $scope.fareParams.Selection.dep[0];
        $scope.showChild = false;
        $scope.showInfant= false;
        $scope.taxad =[];
        $scope.taxch =[];
        $scope.taxin =[];
        $scope.fareAdult  = 0;
        $scope.fareChild  = 0;
        $scope.fareInfant  = 0;
        var tempTaxad =[];
        var length    =0;
        var indexing    ="";
        /**
         *
         * @type {*|string}
         * encode to URL params
         */
        var urlParams = Object.keys($scope.fareParams).map(function(key){
            return encodeURIComponent(key) +'='+ encodeURIComponent($scope.fareParams[key]);
        }).join('&');

        $http({
            method : 'POST',
            url    : 'server/respon_fare.json',
            data   : urlParams,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(data, status, headers, config){
                $scope.resultFare = data;
                $scope.fareAdult  = data.nopaxa;
                $scope.fareChild  = data.nopaxc;
                $scope.fareInfant  = data.nopaxi;
                //console.log(data.nopaxc) ;
                //tax adult
                $scope.res = $scope.resultFare.tax.split(" ");
                var a = $scope.res.indexOf("");
                if(a != -1)
                {
                    $scope.res.splice(a,1);
                }
                angular.forEach($scope.res,function(taxa){
                    length    =  taxa.length-2;
                    indexing  =  $filter('limitTo')(taxa,-2,0);
                    tempTaxad = {id:indexing, value : $filter('limitTo')(taxa,length,0)};
                    $scope.taxad.push(tempTaxad);
                });
                //end tax ad

                    if(parseInt($scope.fareChild) > 0){
                        $scope.showChild = true;
                        $scope.res = $scope.resultFare.taxc.split(" ");
                        var a = $scope.res.indexOf("");
                        if(a != -1)
                        {
                            $scope.res.splice(a,1);
                        }
                        angular.forEach($scope.res,function(taxc){
                            length    =  taxc.length-2;
                            indexing  =  $filter('limitTo')(taxc,-2,0);
                            tempTaxad = {id:indexing, value : $filter('limitTo')(taxc,length,0)};
                            $scope.taxch.push(tempTaxad);
                        });
                    }
                    if(parseInt($scope.fareInfant) > 0){
                        $scope.showInfant = true;
                        $scope.res = $scope.resultFare.taxi.split(" ");
                        var a = $scope.res.indexOf("");
                        if(a != -1)
                        {
                            $scope.res.splice(a,1);
                        }
                        angular.forEach($scope.res,function(taxi){
                            length    =  taxi.length-2;
                            indexing  =  $filter('limitTo')(taxi,-2,0);
                            tempTaxad = {id:indexing, value : $filter('limitTo')(taxi,length,0)};
                            $scope.taxin.push(tempTaxad);
                        });
                    }

                    switch ($scope.resultFare.srvclass) {
                        case "eco" : $scope.serviceClass="Economy";
                            break;
                        case "1st" : $scope.serviceClass="First Class";
                            break;
                        case "exe" : $scope.serviceClass="Executive";
                            break;
                        default : "Economy";
                    };




        }).error(function(e){
            console.log(e);
        });

   }
   else{
       document.location.href=base_url+'bookFlight';
       localStorage.clear();
   }
    $scope.sebelumnya = function (){
        document.location.href=base_url+'bookFlightAvailable';
    };



}]);
