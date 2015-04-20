App.service('sharedBookFlightProperties', function ()
{
	
	var oneWay;
	var returnWay;
	var tripType;
	var origin;
	var originDetail;
	var destDetail;
	var outbond;
	var returnBond;
	var destination;
	var dateDeparture;
	var dateReturn;
	var serviceClass;
	var adult;
	var child;
	var infant;
	var user='SA3ADGM';
	var clickValue=false;
	/*get and set value*/
	
	return {
	
		/*getset of oneWaye*/
		getOneWay : function (){
			return oneWay;
		},
		setOneWay : function(value){
			oneWay = value;
		},
		
		/*getset of returnWay*/
		getReturnWay : function (){
			return returnWay;
		},
		setReturnWay : function(value){
			returnWay = value;
		},
		
		/*getset of tripType*/
		getTripType : function(){
			return tripType;
		},
		setTripType : function(value){
			tripType = value;
		},

		/*getset of origin*/
		getOrigin : function (){
			return origin;
		},
		setOrigin : function(value){
			origin = value;
		},
		
		/*getset of destination*/
		getDestination : function(){
			return destination;
		},
		setDestination : function(value){
			destination = value;
		},
		
		/*getset of dateDeparture*/
		getDateDeparture : function(){
			return dateDeparture;
		},
		setDateDeparture : function(value){
			dateDeparture = value;
		},

		/*getset of dateReturn*/
		getDateReturn : function(){
			return dateReturn;
		},
		setDateReturn : function(value){
			dateReturn = value;
		},

		/*getset of serviceClass*/
		getServiceClass : function(){
			return serviceClass;
		},
		setServiceClass : function(value){
			serviceClass = value;
		},
		
		/*getset of adult*/
		getAdult : function(){
			return adult;
		},
		setAdult : function(value){
			adult = value;
		},
		
		/*getset of child*/
		getChild: function(){
			return child;
		},
		setChild: function(value){
			child = value;
		},

		/*getset of Infan*/
		getInfant: function(){
			return infant;
		},
		setInfant: function(value){
			infant = value;
		},

		/*getset originDetail*/
		getOriginDetail : function(){
			return originDetail;
		},
		setOriginDetail : function(value){
			originDetail = value;
		},
		
		/*getset destDetail*/
		getDestDetail : function(){
			return destDetail;
		},
		setDestDetail : function(value){
			destDetail = value;
		},
		
		/*getset outbond*/
		getOutbond : function(){
			return outbond;
		},
		setOutbond : function(value){
			outbond = value;
		},
		
		/*getset returnBond*/
		getReturnBond	: function(){
			return returnBond;
		},
		setReturnBond	: function(value){
			returnBond = value;
		}

	};
});