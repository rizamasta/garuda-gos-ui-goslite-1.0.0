/**=========================================================
 * Module: bookFlight.js
 * Provides a simple demo for typeahead
 =========================================================*/

App.controller('bookFlightController', ['$scope', '$http', '$filter' ,function ($scope,$http,$filter) {
   /*start cari data dengan $http*/
  //localStorage.clear();
   	$http({
				    method: 'POST',
				    url: 'http://localhost/garuda/gateway/',
				    data: "method=Reservation_Master_Airports&Reservation_Master_Airports%5Baction%5D=Reservation_Master_Airports",
				    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).success(function(data, status, headers, config) {
						$scope.airports_data = data.data;
						console.log($scope.airports_data);
				}).error(function(e) {
						console.log('error');
						console.log(e);
				});

	/*stop-cari data*/
	/*start-atribut typeahead*/
	$scope.tripType = "o";
	$scope.clickTrip = function(){
		if($scope.tripType == "o"){
			$scope.returnWay = false;
		}
		else{
			$scope.returnWay = true;
		}
		//console.log($scope.tripType);
	};

		$scope.onSelectOrigin = function ($item,$model,$label){
			$scope.selectedAirportsOrigin 		= null;
			$scope.selectedAirportsDest 		= '';
			$scope.$item 						= $item;
			$scope.$model 						= $model;
			$scope.$label 						= $label;
			$scope.selectedAirportsOrigin 		= $scope.$item;
			$scope.selectedAirportsOriginLabel 	= $scope.$label;
			$scope.Origin 						= $scope.selectedAirportsOrigin.code;
			if($scope.selectedAirportsOrigin.code){
			    	if(angular.equals($scope.selectedAirportsDest.code, $scope.selectedAirportsOrigin.code)){
			    		alert("Can't used the same data!");
			    		$scope.selectedAirportsOrigin = null;
			    	}
			    	else{
			    		$scope.originDetail = $scope.selectedAirportsOrigin.cityName+" ("+$scope.selectedAirportsOrigin.code+")";
			    	}
			    }

		};


		$scope.onSelectDest = function ($item,$model,$label){
			$scope.selectedAirportsDest 	= null;
			$scope.$item 	 				= $item;
			$scope.$model 					= $model;
			$scope.$label 					= $label;
			$scope.selectedAirportsDest 	= $scope.$item;
			$scope.selectedAirportsDestLabel= $scope.$label;
			$scope.Dest 					= $scope.selectedAirportsDest.code;
			if($scope.selectedAirportsDest.code){
			    	if(angular.equals($scope.selectedAirportsDest.code, $scope.selectedAirportsOrigin.code)){
			    		alert("Can't used the same data!");
			    		$scope.selectedAirportsDest = null;
			    	}
			    	else{
			    		$scope.destDetail = $scope.selectedAirportsDest.cityName+" ("+$scope.selectedAirportsDest.code+")";
			    	}
			    }

		};

	/*end-atribut typeahead*/
	/*start-atribut datepicker*/
		$scope.dateClick = function(){
			if(!$scope.useValue){
							$scope.minDateReturn = $scope.dateDeparture;
						}
		};

		$scope.today = function() {
		    $scope.dt 							= new Date();
		    $scope.defaultDateDeparture 		= new Date();
			$scope.dateDeparture 				= $scope.defaultDateDeparture;

			};
		$scope.minDate 							= new Date();
		$scope.clear = function () {
		    $scope.dt 							= null;
		    $scope.dateDeparture 				= null;
		  	};

		$scope.disabled = function(date, mode) {
		    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
		 	 };

		$scope.minDateDeparture = new Date();

		$scope.toggleMin = function() {
		    $scope.minDate = $scope.minDate ? null : new Date();
			  };

		$scope.open = function($event) {
		    $event.preventDefault();
		    $event.stopPropagation();
		    $scope.opened = true;
			  };

		$scope.open2 = function($event) {
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened2 = true;
			  };

		$scope.dateFormat ='yyyy-mm-dd';

		$scope.dateOptions = {
		    formatYear: 'yy',
		    startingDay: 1,
		    showWeeks:false
			  };
	/*end-atribut datepicker*/

	/*Start Service Class*/
		$scope.services 	=[{'value':'1st','name':'First Class'},{'value':'exe','name':'Executive Class'},{'value':'eco','name':'Economy Class'}];
		$scope.service  	= $scope.services[0];
	/*End Service Class*/

	/**
	 * start passenger*/
		$scope.Adults 		=[{'id':'1','value':'1'},{'id':'2','value':'2'},{'id':'3','value':'3'},{'id':'4','value':'4'},{'id':'5','value':'5'},{'id':'6','value':'6'},{'id':'7','value':'7'},{'id':'8','value':'8'},{'id':'9','value':'9'}];
		$scope.Adult  		= $scope.Adults[0];
		$scope.Childs 		=[{'id':'0','value':'0'},{'id':'1','value':'1'},{'id':'2','value':'2'},{'id':'3','value':'3'},{'id':'4','value':'4'},{'id':'5','value':'5'},{'id':'6','value':'6'},{'id':'7','value':'7'},{'id':'8','value':'8'}];
		$scope.Child  		= $scope.Childs[0];
		$scope.Infants		=[{'id':'0','value':'0'},{'id':'1','value':'1'},{'id':'2','value':'2'},{'id':'3','value':'3'}];
		$scope.Infant 		= $scope.Infants[0];
		$scope.limitAdult  	= 9 - $scope.Child.value;
		$scope.limitChild  	= 10 - $scope.Adult.value;
		$scope.limitInfant 	= 4;

		/*start of function logic for calculate total pessenger*/
			$scope.onChangeAdult = function(){
				$scope.limitChild = 10 - $scope.Adult.value - $scope.Infant.value;
				$scope.infantF();
				};

			$scope.onChangeChild = function(){
				$scope.limitAdult = 9 - $scope.Child.value - $scope.Infant.value;
				$scope.infantF();
				};

			$scope.onChangeInfant = function(){
				$scope.limitAdult = 9 - $scope.Child.value - $scope.Infant.value;
				$scope.limitChild = 10 - $scope.Adult.value - $scope.Infant.value;
				};

			$scope.infantF = function() {
				var checkLimit = 0;
				var adultValue = $scope.Adult.value;
				var childValue = $scope.Child.value;

				checkLimit = (adultValue*1)+(childValue*1) ;
						if(checkLimit < 5){
							$scope.limitInfant= 4;
							}
						else{
							$scope.limitInfant = 10 - checkLimit;
								if($scope.limitInfant<0){
									$scope.limitInfant = 1;
								}
							}
				};
		/*start of function logic for calculate total pessenger*/
	/**
	 *end passenger */


	/*start localStorage */
							var bookFlightData     = new Array();
							if(localStorage['bookFlightData'])
								{
									bookFlightData     = JSON.parse(localStorage['bookFlightData']);
									//set origin
									$scope.selectedAirportsOrigin		= bookFlightData[0].selectedOrigin;
									$scope.selectedAirportsOriginLabel 	= bookFlightData[0].selectedOrigin;
									$scope.Origin						= bookFlightData[0].Origin;
									$scope.originDetail 				= bookFlightData[0].OriginDetail;

									//set destination
									$scope.selectedAirportsDest			= bookFlightData[0].selectedAirportsDest;
									$scope.selectedAirportsDestLabel	= bookFlightData[0].selectedAirportsDest;
									$scope.Dest							= bookFlightData[0].Dest;
									$scope.destDetail 					= bookFlightData[0].DestDetail;
									$scope.clickTrip();
									$scope.dateDeparture				= bookFlightData[0].dateDeparture;
									$scope.dateReturn 					= bookFlightData[0].dateReturn;

									//$scope.Adult


								}
							else{
								$scope.today();
								$scope.toggleMin();
							}
							/*enc localStorage*/

	/*start availbility*/
	$scope.setValueForAvailbility = function ()
	{
		var ddate 	= $filter('date')($scope.dateDeparture,'ddMMMyyyy');
		var	ddate2 	= ddate.toUpperCase();
		var rdate 	="";
		var rdate2  ="";
		var data 		= new Array();
		if($scope.tripType == 'o'){

			localStorage.setItem('dateReturn', null);
			localStorage.setItem('returnWay', false);
			rdate2 = null;
		}
		else{

			localStorage.setItem('dateReturn', $filter('date')($scope.dateReturn,'yyyy-MM-dd'));
			localStorage.setItem('returnWay', true);
			localStorage.setItem('returnBond',localStorage.getItem('dateReturn')+", "+"From "+$scope.destDetail+" To "+$scope.originDetail);
			rdate  = 'dateReturn', $filter('date')($scope.dateReturn,'ddMMMyyyy');
			rdate2 = rdate.toUpperCase();
		}

					data[0] = {
												'selectedOrigin' 		: $scope.selectedAirportsOriginLabel,
												'selectedAirportsDest'	: $scope.selectedAirportsDestLabel,
												'Origin'				: $scope.Origin,
												'Dest'					: $scope.Dest,
												'tripType'				: $scope.tripType,
												'dateDeparture'			: $filter('date')($scope.dateDeparture,'yyyy-MM-dd'),
												'ddate'					: ddate2,
												'OriginDetail'			: $scope.originDetail,
												'DestDetail'			: $scope.destDetail,
												'OutBond'				: $filter('date')($scope.dateDeparture,'yyyy-MM-dd') +", "+"From "+$scope.originDetail+" To "+$scope.destDetail,
												'serviceClass'			: $scope.service.value,
												'adult'					: $scope.Adult.value,
												'child'					: $scope.Child.value,
												'infant'				: $scope.Infant.value,
												'dateReturn'			: localStorage.getItem('dateReturn'),
												'rdate'					: rdate2,
												'returnWay'				: localStorage.getItem('returnWay'),
												'returnBond' 			: localStorage.getItem('returnBond')

											};
				localStorage['bookFlightData'] = JSON.stringify(data);
				console.log(data[0].dateDeparture);

	};

	/*end availbility*/

}]);
