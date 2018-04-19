 var myApp=angular.module('myApp',[]); 

myApp.controller('stockDetailsCntrl',['$scope','$http','$window','$q',
function($scope,$http,$window,$q){
 $scope.usernamedetails = window.sessionStorage.getItem("username")
         
          if ($scope.usernamedetails == null) {
             //alert( $scope.usernamedetails);
              $window.location.href = "loginPage.html";
          };
  $scope.desgination = window.sessionStorage.getItem("desgination")


//for group
 $http.get('/getinventorygroupmaster').success(function(response){
       console.log(response);
       $scope.inventorygroupmaster1 = response
        
  });
//for category
 $http.get('/getsalescategorymaster').success(function(response){
        console.log(response);
        $scope.salescategorymaster1 = response
 });
 // $scope.item = [];
//for group and category
$scope.groupAndCategory = function (barcode) {
 // alert(barcode);
  $http.get('/groupAndCategoryBarcode', {params:{"barcode":barcode}}).success(function(response){
     // alert(" response.length "+response.length )

      if (response.length != 0) {
      console.log(response[0].InvGroupName);
      console.log(response[0].SaleCategory);
      
      $scope.item.SaleCategory = response[0].SaleCategory;
      $scope.item.InvGroupName = response[0].InvGroupName;
      $scope.displayBarcodedItems();
      $scope.codedBarcodedItems();
    }else{
      //alert(barcode)
      if (barcode == '' || barcode == undefined ) {
       // alert(" uergureguiergui ")
        $scope.displayBarcodedItems();
        $scope.codedBarcodedItems();
      }
      else if ((barcode != undefined ) && response.length == 0 ) {
        alert(" Barcode is Invalid "+barcode);
        //$scope.item.barcode ="";
      }
      // else{
      //   $scope.displayBarcodedItems();
      //   $scope.codedBarcodedItems();
      // }
      
     
    }
    
  })
    

}//groupAndCategory;
//display call
$scope.displayBarcodedItems = function () {
	//alert("diss");
	//alert($scope.item.InvGroupName)
	$http.get('/stockDetaildisplayBarcodedItems', {params:{"InvGroupName":$scope.item.InvGroupName,"SaleCategory":$scope.item.SaleCategory,}}).success(function(response){
       
      //  console.log(response);
        //alert(response.length);
        $http.get('/stockResetTrue', {params:{"InvGroupName":$scope.item.InvGroupName,"SaleCategory":$scope.item.SaleCategory,}}).success(function(result){
        	  $scope.sortedBarcodeDataItems = result;
        	 	$scope.itemsFound = result.length;
            if (result.length == 0 && response.length == 0) {
              alert(" No matches are found  ");
           }

        	 	$scope.foundScaleWt = null;
        	 	$scope.foundPieces = null;
         	for (var j = result.length - 1; j >= 0; j--) {
         		$scope.foundScaleWt = $scope.foundScaleWt + result[j].gwt;
         		$scope.foundPieces = $scope.foundPieces +result[j].gpcs;
         	}
        })
       
        $scope.displayBarcoded = response;

        //alert(" response "+response.length);
       
        $scope.item.barcode = undefined;
       // sortedBarCode = [];
        totalCall()
 	});

}

var totalCall = function () {
	$http.get('/stockTotalCall', {params:{"InvGroupName":$scope.item.InvGroupName,"SaleCategory":$scope.item.SaleCategory,}}).success(function(response){
     	//console.log(response[0].count);
     	//console.log(response[0].gwt);
     	//	console.log(response[0].gpcs)
      if (response.length!=0) {
     	$scope.itemsListedTotal = response[0].count ;
     	$scope.totalScaleWt = response[0].gwt;
     	$scope.totalScale = response[0].gpcs;
     }else{
          $scope.itemsListedTotal = "" ;
      $scope.totalScaleWt = "";
      $scope.totalScale = "";
     }
     		
     	
     })  
    // }

}
//var lengthCheckValidation = 0;
$scope.codedBarcodedItems = function () {

  var barcodenum = $scope.item.barcode;
  var len = barcodenum.toString().length;
  // if (len<8) {
  //   alert(" Please enter valid barcode ")
  // }
  //console.log(barcodenum.toString().length);
  if (len == 8 ){
  	//{params:{}}).success(function(response){
       
  	//alert("codedBarcodedItems");
      $http.get('/stockCodedBarcodedItems', {params:{"barcode":$scope.item.barcode,"InvGroupName":$scope.item.InvGroupName,"SaleCategory":$scope.item.SaleCategory,}}).success(function(response){  
      		console.log(response.length);
          console.log(response);
         
          // if (response.length == lengthCheckValidation) {
          //   alert(" No match");
          // }else{
          //    lengthCheckValidation = response.length;
          //    lengthCheckValidation+1;
          // }

         	//console.log($scope.displayBarcoded.length);
         	$scope.sortedBarcodeDataItems = response;
           
         	$scope.itemsFound = response.length;

	            $scope.foundScaleWt = null;
        	 	$scope.foundPieces = null;
         		for (var j = response.length - 1; j >= 0; j--) {
         				$scope.foundScaleWt = $scope.foundScaleWt + response[j].gwt;
         				$scope.foundPieces = $scope.foundPieces +response[j].gpcs;
         		}

         	
           		 //console.log( $scope.sortedBarcodes);
           		 $http.get('/stockDetaildisplayBarcodedItems', {params:{"InvGroupName":$scope.item.InvGroupName,"SaleCategory":$scope.item.SaleCategory,}}).success(function(response){
       
        				 //console.log(response);
        				 $scope.displayBarcoded = response;
        		 })
 
        })
   }
}
$scope.resetCall = function (sortedBarcodeDataItems) {
	//alert(sortedBarcodeDataItems.length);
	if($scope.item.barcode=undefined)
  {
    alert("Please Press List Button")
  }
	for (var i = sortedBarcodeDataItems.length - 1; i >= 0; i--) {
		//alert(sortedBarcodeDataItems[i]._id);
		//console.log(sortedBarcodeDataItems[i]._id)
		$http.get('/stockUninstallReset', {params:{"id":sortedBarcodeDataItems[i]._id}}).success(function(response){  
     		 //console.log(response);
     		 $scope.sortedBarcodeDataItems = "";
      		 $scope.item.barcode ="";
      });
		 const timeoutSendData = setTimeout(() => {
                           // res.json(printfinalary);
                          // sendResponseInsert() 
     						$scope.displayBarcodedItems();
                         }, 1000);
	}
	 

	// body...
}

$scope.clearData = function () {
 $scope.displayBarcoded = '';
  $scope.sortedBarcodeDataItems = '';
} 
 
}]);