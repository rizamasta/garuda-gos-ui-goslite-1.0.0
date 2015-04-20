App.controller('availabilityController', ['$http','$scope', function ($http,$scope){

	$scope.sebelumnya = function(){
		document.location.href=base_url+"bookFlight";
	};

	var bookFlightData 	= JSON.parse(localStorage['bookFlightData']);
	var dataBook 		= bookFlightData[0];
	$scope.returnWay 		= dataBook.returnWay;
	$scope.origin 			= dataBook.Origin;
	$scope.originDetail 	= dataBook.OriginDetail;
	$scope.destination 		= dataBook.Dest;
	$scope.destDetail		= dataBook.DestDetail;
	$scope.tripType 		= dataBook.tripType;
	$scope.dateDeparture 	= dataBook.dateDeparture;
	$scope.ddate 			= dataBook.ddate;
	$scope.dateReturn 		= dataBook.dateReturn;
	$scope.rdate 			= dataBook.rdate;
	$scope.serviceClass 	= dataBook.serviceClass;
	$scope.adult 			= dataBook.adult;
	$scope.child 			= dataBook.child;
	$scope.infant 			= dataBook.infant;
	$scope.outBond 			= dataBook.OutBond;
	$scope.returnBond 		= dataBook.returnBond;
	$scope.seatClass 		= "";


			var params= {
				'originDetail' 		: $scope.originDetail,
				'origin'       		: $scope.origin,
				'destDetail' 		: $scope.destDetail,
				'dest' 				: $scope.destination,
				'tripType'       	: $scope.tripType,
				'outDate' 			: $scope.dateDeparture,
				'retDate'        	: $scope.dateReturn,
				'adults' 			: $scope.adult,
				'childs' 			: $scope.child,
				'infants' 			: $scope.infant,
				'serviceClass' 		: $scope.serviceClass,
				'active_rbd_dep'  	:
				{
					'0' : 'G',
					'1' : 'H',
					'2' : 'V',
					'3' : 'T',
					'4' : 'Q',
					'5' : 'N',
					'6' : 'K',
					'7' : 'M',
					'8' : 'B',
					'9' : 'Y'
				},

				'entity' 			: 'SA',
				'entity_code'		: 'SA3ADGM',
				'username' 			: 'SA3ADGM',
				'alteaRequestLogId' : '1426231973-0106cfc9038f1419ac1340d5e24b761843000cfc',
				'channel' 		  	: 'gos'
			};
			var urlParams = Object.keys(params).map(function(key){
				return encodeURIComponent(key) +'='+ encodeURIComponent(params[key]);
			}).join('&');

			$http({
					method 	: 'POST',
					url 	: 'server/response_availbility.json',
					data   	: urlParams,

	    			headers: {'Content-Type': 'application/x-www-form-urlencoded'}

				})
				.success(function(data , status , headers , config){
					$scope.availbility  	= data.availni;
					var values 				= $scope.availbility;
					var tempClassSeat 		= [];
					var dataTemp 			= '';
					var arrayClassSeat		= undefined;
					var subClassSeat 		= [];
					$scope.classSeat    	= [];
					$scope.SatuSatu 		= [];
					//console.log(nilai[2].class);
					 angular.forEach(values, function(nilainya,key){

					 	angular.forEach(nilainya, function(SatuSatu,number){
							var defaultClassSeat = [{"class": "Y","seat": "-","value":"false"}, {"class": "B","seat": "-","value":"false"},
								{"class": "M","seat": "-","value":"false"},	{"class": "K","seat": "-","value":"false"},
								{"class": "N","seat": "-","value":"false"}, {"class": "Q","seat": "-","value":"false"},
								{"class": "T","seat": "-","value":"false"}, {"class": "L","seat": "-","value":"false" },
								{"class": "V","seat": "-","value":"false" },{"class": "S","seat": "-","value":"false"},
								{"class": "H","seat": "-","value":"false"}];
							//console.log($scope.SatuSatu);
					 		arrayClassSeat = SatuSatu[4];
					 		angular.forEach(arrayClassSeat, function(subClassSeat,a){
					 			if(subClassSeat.class==='Y'){
					 				defaultClassSeat[0]={"class": "Y","seat": subClassSeat.seat,"value":"true"};
					 			}
					 			if(subClassSeat.class==='B'){
					 				defaultClassSeat[1]={"class": "B","seat": subClassSeat.seat,"value":"true"};
					 			}
					 			if(subClassSeat.class==='M'){
					 				defaultClassSeat[2]={"class": "M","seat": subClassSeat.seat,"value":"true"};
					 			}
					 			if(subClassSeat.class==='K'){
					 				defaultClassSeat[3]={"class": "K","seat": subClassSeat.seat,"value":"true"};
					 			}
					 			if(subClassSeat.class==='N'){
					 				defaultClassSeat[4]={"class": "N","seat": subClassSeat.seat,"value":"true"};
					 			}
					 			if(subClassSeat.class==='Q'){
					 				defaultClassSeat[5]={"class": "Q","seat": subClassSeat.seat,"value":"true"};
					 			}
					 			if(subClassSeat.class==='T'){
					 				defaultClassSeat[6]={"class": "T","seat": subClassSeat.seat,"value":"true"};
					 			}
					 			if(subClassSeat.class==='L'){
					 				defaultClassSeat[7]={"class": "L","seat": subClassSeat.seat,"value":"true"};
					 			}
					 			if(subClassSeat.class==='V'){
					 				defaultClassSeat[8]={"class": "V","seat": subClassSeat.seat,"value":"true"};
					 			}
					 			if(subClassSeat.class==='S'){
					 				defaultClassSeat[9]={"class": "S","seat": subClassSeat.seat,"value":"true"};
					 			}
					 			if(subClassSeat.class==='H'){
					 				defaultClassSeat[10]={"class": "H","seat": subClassSeat.seat,"value":"true"};
					 			}

					 			tempClassSeat=defaultClassSeat;


					 		});
							SatuSatu[4] = tempClassSeat.reverse();
							$scope.SatuSatu.push(SatuSatu);


					 	});
						
					 });
					//console.log("ini sudah ada tambahan: \n"+$scope.classSeat);

				})
				.error(function(e){
					localStorage.setItem('errorNoData',"Can't get Some Data\n"+e);

				});

				//// TODO: Fungsi mencari Fare.

	$scope.radioClick 		= function(isi,value){
		$scope.selectionClass 	= isi;
		$scope.selectionRow 	= value;
	};

				$scope.getFare = function(){
					var getFare = [];

					getFare[0]	= {
									"UserName"  : "SA3ADGM",
									"Password"  : "SA3ADGMGOS2011",
									"int"       : 0,
									"inttype"   : 0,
									"nopaxa"    : $scope.adult,
									"nopaxc"    : $scope.child,
									"nopaxi"    : $scope.infant,
									"srvclss"   : $scope.serviceClass,
									"ctfr"      : $scope.origin,
									"ctto"      : $scope.destination,
									"ddate"     : $scope.ddate,
									"trip"      : $scope.tripType,
									"dentry"    : "A25APR15CGKSUB/GA#",
									"dlineno"   : $scope.selectionRow[0],
									"dclass"    : $scope.selectionClass.class,
									"Selection" : {
															"dep" :
															{
																"0" :
																{
																	"0" : $scope.selectionRow[0],
																	"1" : $scope.selectionRow[1],
																	"2" : $scope.selectionRow[2],
																	"3" : $scope.selectionRow[3],
																	"4" : $scope.selectionClass.class,
																	"5" : $scope.selectionRow[5].toUpperCase(),
																	"6" : $scope.selectionClass.seat,
																	"7" : $scope.selectionRow[6],
																	"8" : $scope.selectionRow[7],
																	"9" : $scope.selectionRow[8],
																	"10" :$scope.selectionRow[5]
																}

															},

															"airportDetail" :
															{
																"from" :$scope.originDetail,

																"to" :$scope.destDetail

															}

													}
					};
					console.log(getFare);
                    localStorage['getFareParams']=JSON.stringify(getFare);

				};


}]);
