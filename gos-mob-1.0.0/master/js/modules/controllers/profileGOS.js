/*
==========================================================================
 Controller get data profile
 on my-profile.js
 ==========================================================================
*/
App.controller('ProfileGOSController',function($scope,$http){
	
	$http.get('server/profileGOS.json')
	.success(function(data){
		$scope.GOS = data;

	})
	.error(function(data){
		alert('Data Tidak Terbuka');
	});
	


});