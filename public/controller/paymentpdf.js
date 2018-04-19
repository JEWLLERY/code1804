var myApp=angular.module('myApp',[]);
myApp.controller('billpdfCntrl',['$scope','$http','$window',
  function($scope,$http,$window){

 $scope.usernamedetails = window.sessionStorage.getItem("username")
         
          if ($scope.usernamedetails == null) {
             //alert( $scope.usernamedetails);
              $window.location.href = "loginPage.html";
          };
  $scope.desgination = window.sessionStorage.getItem("desgination")

    $scope.pname=window.sessionStorage.getItem("pname");
 $scope.billtype=window.sessionStorage.getItem("Billtype");
 // $scope.voucherId=window.sessionStorage.getItem("voucher");
 // $scope.amounttotal=window.sessionStorage.getItem("tamount");
 // alert($scope.amounttotal+"amount");
 // $scope.datarp=window.sessionStorage.getItem("rpdata");
 // alert("data111111111111111"+$scope.datarp);
 // $scope.dates=window.sessionStorage.getItem("date");
 $scope.dates=new Date();

 // alert("date"+$scope.dates);
 $scope.billnum=window.sessionStorage.getItem("billnumber");
 // alert("billnumber"+$scope.billnum);
//for getting receipt data
$http.get('/getStoredPayment'+$scope.billnum).success(function(response){
  console.log(response);
  console.log(response[0]);
  //voucherNo
  if(response.length != 0){
  $scope.rpamt=response;
 // $scope.voucherId=response[0].vocherNo;
    $scope.partyname = response[0].partyname;
    console.log($scope.partname);
   $scope.voucherId = response[0].voucherNo
  //alert(response.vocherNo)
  receivableAmount(response[0].partyname)
  numberwords(response[0].PaidAmount.$numberDecimal);
  $scope.finalAmount=response[0].PaidAmount.$numberDecimal;
  //receipetCreationCall (response[0].vocherNo)
  paymentsCreationCall(response[0].vocherNo)
///trial changes made by vijay //
   window.sessionStorage.setItem("billnumber",null);
  }
})

  function receivableAmount (name) {
    //alert(name)
    $http.get('/getpaymentReceivableAmount'+name).success(function(response){
           $scope.netReceivable = parseFloat(response).toFixed(2);
       
        //console.log(response.Due.$numberDecimal);
        //  console.log(response[0].Due.$numberDecimal);
        // numberwords(response[0].Due.$numberDecimal)
    })

  }//receivableAmount
  function paymentsCreationCall (voucher) {
      //alert("receipetCreationCall ");
      //alert("details "+$scope.usernamedetails);
      $http.get('/api/paymentsCreation',{params:{"BillNo":$scope.billnum,"voucherNo": voucher,"userId":$scope.usernamedetails}}).success(function(response){
      })
  }//receipetCreationCall

    $http.get('/getmerchantdetails').success(function(response){
       //console.log(response);
       $scope.Landmark =response[0].Address[0].Landmark;
       $scope.Street =response[0].Address[1].Street;
       $scope.Place =response[0].Address[2].Place;
       $scope.Phone =response[0].Address[3].Phone;
       $scope.Mobile =response[0].Address[4].Mobile;
       $scope.email =response[0].Address[5].email;

       $scope.ShopName =response[0].ShopName;

    });
var printconfiguration=null;
 var printLabour=null;
 var printWastage=null;
 var printChgWt=null;
    //configurations for urd weight gross wt or nett wt
    $http.get('/configuration').success(function(response){
          
          $scope.urdweight = response[0].Urd_Weight;
          $scope.LabourTaxCheck = response[0].LabourTax;
           $scope.printconfiguration = response[0].printconfiguration;
            printconfiguration=  $scope.printconfiguration;
             $scope.printLabour = response[0].printLabour;
             printLabour=  $scope.printLabour;
              $scope.printWastage = response[0].printWastage;
             printWastage = $scope.printWastage;
               $scope.printChgWt = response[0].printChgWt;
             printChgWt = $scope.printChgWt;
            //alert(printWastage)
            
          //alert(response[0].printconfiguration)
          //alert($scope.printconfiguration)
    })

    var bill=null;
 if(bill ==null)
   {
    //alert('jjk')
     // alert($scope.printconfiguration)
    if(printconfiguration =='withoutheader')
    {
// alert("hhhh")
 document.getElementById("myDIV").style.display = "none";
    }
    else{
       document.getElementById("myDIV").style.display = "myDIV";
     
      //alert('bbb')
    }

   }

   //for net receivable amount


   //words function
    numberwords = function(total){ 
// alert("numberwords"+total)       
        var amount = total;
    console.log(amount)
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    amount = amount.toString();
    
    console.log(amount)
    
    var atemp = amount.split(".");
    
    console.log(atemp)
    
    var number = atemp[0].split(",").join("");
    
    console.log(number)
    var n_length = number.length;
    
    console.log(n_length)
    var words_string = "";
    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + parseInt(n_array[j]);
                    n_array[i] = 0;
                }
            }
        }
        value = "";
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
        console.log(words_string)
        console.log($scope.wor)
        if ($scope.wor == undefined) {
          $scope.wor = words_string;
        }else{
           $scope.due = words_string;
        }
        
       
    }
  }
  }]);