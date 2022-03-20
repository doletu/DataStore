
var NCMB = {};
NCMB.applicationKey = "543e6ee053794c0ebbce6e668e4e86cf17a96dd2e841d3a99a6bc32576d314e0";
NCMB.clientKey = "6c53e766837d00a8c4c7254c39c6536d1e1455aeb2dd30a0ee40ba0502375fba";

var count=1;
var currentpage=1;
var numPage=0;
if (window.XMLHttpRequest) { // Mozilla, Safari, ...
  request = new XMLHttpRequest();
} else if (window.ActiveXObject) { // IE
  try {
    request = new ActiveXObject('Msxml2.XMLHTTP');
  } 
  catch (e) {
    try {
      request = new ActiveXObject('Microsoft.XMLHTTP');
    } 
    catch (e) {}
  }
}

function signature(url, method, timestamp){
  var signature = "";
  var _applicationKey = NCMB.applicationKey;
  var _timestamp = timestamp;
  var _clientKey = NCMB.clientKey;

  var _method = method;
  var _url = encodeURI(url);
  var _tmp = _url.substring(_url.lastIndexOf("//") + 2);
  var _fqdn = _tmp.substring(0, _tmp.indexOf("/"));  

  var _position = _url.indexOf("?");
  var _path = "";
  var _data = {};

  if(_position == -1) {
    _path =  _url.substring(_url.lastIndexOf(_fqdn) + _fqdn.length );
  }
  else{
    var _get_parameter= _url.substring(_position + 1);
    _path = _url.substring(_url.lastIndexOf(_fqdn) + _fqdn.length, _position);
    _tmp = _get_parameter.split("&");
    for (var i = 0; i < _tmp.length; i++) {
    _position = _tmp[i].indexOf("=");
    _data[_tmp[i].substring(0 , _position)] = _tmp[i].substring(_position + 1);
    }
  }
  _data["SignatureMethod"] = "HmacSHA256";
  _data["SignatureVersion"] = "2";
  _data["X-NCMB-Application-Key"] = _applicationKey;
  _data["X-NCMB-Timestamp"] = _timestamp;

  var _sorted_data = {};
  var keys = [];
  var k, i, len;
  for (k in _data)
  {
    if (_data.hasOwnProperty(k))
    {
      keys.push(k);
    }
  }
  keys.sort();
  len = keys.length;
  for (i = 0; i < len; i++)
  {
    k = keys[i];
    _sorted_data[k] = _data[k];
  }
  var parameterString = "";
  for (k in _sorted_data)
  {
    if (_sorted_data.hasOwnProperty(k))
    {
      if (parameterString != "") {
        parameterString += "&";
      };
      parameterString = parameterString + k + "=" + _sorted_data[k];
    }
  }
  var forEncodeString = _method + "\n" + _fqdn + "\n" + _path + "\n" + parameterString;
  var hash = CryptoJS.HmacSHA256(forEncodeString, _clientKey);
  var signature = CryptoJS.enc.Base64.stringify(hash);                 
  return signature;
}

function MemberRegistration(){
    var method ="POST";
    
  
    var url="https://mbaas.api.nifcloud.com/2013-09-01/users";
    var timeStamp=new Date().toISOString();
  
    var sig =signature(url,method,timeStamp);
  
    var headers = {
      "X-NCMB-Application-Key":    NCMB.applicationKey,
      "X-NCMB-Signature":          sig,
      "X-NCMB-Timestamp":          timeStamp,
      "content-type": "application/json"
    };
    
    var data={};
   
    var username = $(document).find("#userName").val();
    data["userName"]=username;
    console.log(username);
    var password = $(document).find("#password").val();
    data["password"]=password;
  
    console.log(password);
    var mailAddress = $(document).find("#mailAddress").val();
    data["mailAddress"]=mailAddress;
  
    console.log(mailAddress);

    var request = new Request(url,{
      method: method,
      mode:"cors",
      headers: headers,
      body: JSON.stringify(data)
    });
    fetch(request).then(function(data){
      return data.json();
    }).then(function(result){
      console.log(result);
    });



    // var request = new Request(url,{
    //   method: method,
    //   mode:"cors",
    //   headers: headers,
    //   body: JSON.stringify(data)
    // });
    // fetch(request).then(function(data){
    //   if( data.status==201){
    //     alert("Success");
    //   }else{
    //     alert("Fail");
    //   }
      
    // });
}

function EmailRegister(){
  
  var method ="POST";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/requestMailAddressUserEntry";
  var timeStamp=new Date().toISOString();
  
  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
  var data={};
   
  var username = $(document).find("#UserName").val();
  data["userName"]="A";
  var request = new Request(url,{
      method: method,
      mode:"cors",
      headers: headers,
      body: JSON.stringify(data)
    });
    fetch(request).then(function(data){
      if( data.status==201){
        alert("Success");
      }else{
        alert("Fail");
      }
      
    });
}
function GetUserByID(){
  var method ="GET";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/users/GX4uMBFtdCdYjDFA";
  var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
  

  var request = new Request(url,{
    method: method,
    mode:"cors",
    headers: headers,
  });
  fetch(request).then(function(data){
    return data.json();
  }).then(function(result){
    console.log(result);
  });

}


function RenewlByID(){
  var method ="PUT";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/users/GX4uMBFtdCdYjDFA";
  var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
  

  var data={};
   
  var username = $(document).find("#UserName").val();
  data["userName"]=username;
  
  var password = $(document).find("#password").val();
  data["password"]=password;

  var mailAddress = $(document).find("#mailAddress").val();
  data["mailAddress"]=mailAddress;


  var request = new Request(url,{
    method: method,
    mode:"cors",
    headers: headers,
    body: JSON.stringify(data)
  });
  fetch(request).then(function(data){
    return data.json();
  }).then(function(result){
    console.log(result);
  });

}

function LoginUser(){
  var method ="GET";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/login?userName=ABC&password=123456";
  var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
  

  var request = new Request(url,{
    method: method,
    mode:"cors",
    headers: headers,
  });
  fetch(request).then(function(data){
    return data.json();
  }).then(function(result){
    console.log(result);
  });
}


function DeleteByID(){
  var method ="DELETE";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/users/GtLdsSjy2nmYkWIL";
  var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
  
  var request = new Request(url,{
    method: method,
    mode:"cors",
    headers: headers,
  });
  fetch(request).then(function(data){
    return data.json();
  }).then(function(result){
    console.log(result);
  });

}
function GetUserByID(){
  var method ="GET";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/logout";
  var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
  

  var request = new Request(url,{
    method: method,
    mode:"cors",
    headers: headers,
  });
  fetch(request).then(function(data){
    return data.json();
  }).then(function(result){
    console.log(result);
  });

}

function FetchData(){
  var table =$(document).find("#myapiTable").children("tbody");
  table.remove();
  var method ="GET";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/users/";
  // var timeStamp= "2022-03-18T02:41:36.941Z";
  var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
    
  
  var request = new Request(url,{
    method: method,
    mode:"cors",
    headers: headers,
  });
  fetch(request).then(function(data){
    if(data!=null){
      return data.json();
    }
  }).then(function(result){
    var data=result.results;
    numPage= Math.ceil(data.length/10);
    currentpage=1;
    if(numPage==1)  count=data.length; else count=10;

    var tab$=$('<tbody id="'+currentpage+'">');
    for(var i=0; i<count;i++){
      var field = ' <input class="styled" value="Update" type="button" onclick="UpdateData(this)">'+
                  ' <input class="styled" value="Delete" type="button" onclick="DeleteData(this)">'; 
      var row$ = $('<tr/>');
      
      row$.append($('<td id="ObjectID"/>').html(data[i].objectId));
      row$.append($('<td/>').html(data[i].userName));
      row$.append($('<td/>').html(field));
      tab$.append(row$);
    }
    $("#myapiTable").append(tab$);
  });

}