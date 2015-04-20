/*
==========================================================================
 Controller get data profile
 on my-profile.js
 ==========================================================================
*/
App.controller('MyProfileController',function($scope,$http){
	
	$http.get('server/myProfile.json')
	.success(function(data){
		$scope.Profile = data;
		//alert(data);
		$scope.Profile.date = new Date();
		//alert($scope.Profile.date);
	})
	.error(function(data){
		alert('Data Tidak Terbuka');
	});
	


});