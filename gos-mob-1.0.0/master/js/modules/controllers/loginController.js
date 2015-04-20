App.controller('loginController', ['$scope','$http', function ($scope,$http){
	var sessionID = readCookie('sessionId',sId);
	console.log('Ini session IDnya: '+sessionID);

	deleteCookie('sessionId',null,0);
	sessionID = readCookie('sessionId',sId);
	console.log('Ini session IDnya2: '+sessionID);
}]);