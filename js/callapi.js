
var NCMB = {};
NCMB.applicationKey = "543e6ee053794c0ebbce6e668e4e86cf17a96dd2e841d3a99a6bc32576d314e0";
NCMB.clientKey = "6c53e766837d00a8c4c7254c39c6536d1e1455aeb2dd30a0ee40ba0502375fba";

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


function Registration(){
  var className = $(document).find("#ClassValue").val();

  var method ="POST";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/classes/"+className;
  // var timeStamp= "2022-03-18T02:41:36.941Z";
  
  var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
  
  var data={};
  $('.mob-box').each(function(){
    var key=$(this).find(".Key").val();
    var value=$(this).find(".Value").val();
    if(key!="" && value!=""){
      data[key]=value;
      console.log("key:" +key+ ",Value:" + value );
    }
  });
    
  
  var request = new Request(url,{
    method: method,
    mode:"cors",
    headers: headers,
    body: JSON.stringify(data)
  });
  fetch(request).then(function(data){
    if(data.status==200|| data.status==201){
      alert("Success");
      FetchData();
    }else{
      alert("Fail");
    }
    
  });

        

    


  // var xhttp = new XMLHttpRequest();
  //       xhttp.open(method, url, true);
  //       xhttp.setRequestHeader("X-NCMB-Application-Key",   NCMB.applicationKey);
  //       xhttp.setRequestHeader("X-NCMB-Signature", sig);
  //       xhttp.setRequestHeader( "X-NCMB-Timestamp",timeStamp);
  //       xhttp.setRequestHeader("content-type", "application/json");
  //       xhttp.send(JSON.stringify({}));
}

function FetchData(){
  var table =$(document).find("#myapiTable").children("tbody");
  table.remove();
  var className = $(document).find("#ClassValue").val();

  var method ="GET";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/classes/"+className+"/";
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
    return data.json();
  }).then(function(result){
    var data=result.results;
    
    var total=(data.length/10);
    if(total>1){
      var count=1;
      var currentpage=1;
      var tab$=$('<div id="'+currentpage+'">');
      for(var i=0; i<data.length;i++){
        if(count>10){
          count=1;
          currentpage++;
          $("#myapiTable").append(tab$);
          var tab$=$('<div id="'+currentpage+'">');
        }
        count++;
        var field = ' <input class="styled" value="Update" type="button" onclick="UpdateData(this)">'+
                    ' <input class="styled" value="Delete" type="button" onclick="DeleteData(this)">'; 
        var row$ = $('<tr/>');
        row$.append($('<td id="ObjectID">').html(data[i].objectId));
        row$.append($('<td/>').html(data[i].createDate));
        row$.append($('<td/>').html(data[i].updateDate));
        row$.append($('<td/>').html(field));
        tab$.append(row$);
      }
      
    }else{
      for(var i=0; i<data.length;i++){
        count++;
        var field = ' <input class="styled" value="Update" type="button" onclick="UpdateData(this)">'+
                    ' <input class="styled" value="Delete" type="button" onclick="DeleteData(this)">'; 
        var row$ = $('<tr/>');
        row$.append($('<td id="ObjectID">').html(data[i].objectId));
        row$.append($('<td/>').html(data[i].createDate));
        row$.append($('<td/>').html(data[i].updateDate));
        row$.append($('<td/>').html(field));
        $("#myapiTable").append(row$);
      }
    }
    
  });

}
function UpdateData(i){
  var className = $(document).find("#ClassValue").val();
  
  var id =$(i).closest("tr").find("#ObjectID").text();
  console.log(id);


  var method ="PUT";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/classes/"+className+"/"+id;
  // var timeStamp= "2022-03-18T02:41:36.941Z";
  var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };


  var data={};
  $('.mob-box').each(function(){
    var key=$(this).find(".Key").val();
    var value=$(this).find(".Value").val();
    if(key!="" && value!=""){
      data[key]=value;
      console.log("key:" +key+ ",Value:" + value );
    }
  });
  
  var request = new Request(url,{
    method: method,
    mode:"cors",
    headers: headers,
    body: JSON.stringify(data)
  });
  fetch(request).then(function(data){
    if(data.status==200|| data.status==201){
      alert("Success");
      FetchData();
    }else{
      alert("Fail");
    }
    
  });
}


function DeleteData(i){
  var className = $(document).find("#ClassValue").val();
  
  var id =$(i).closest("tr").find("#ObjectID").text();
  console.log(id);


  var method ="DELETE";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/classes/"+className+"/"+id;
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
    if(data.status==200|| data.status==201){
      alert("Success");
      FetchData();
    }else{
      alert("Fail");
    }
    
  });
}


function SearchData(){
  var className = $(document).find("#ClassValue").val();
  
  var key = $('.box[id="Search"]').find(".Key").val();
  var value = $('.box[id="Search"]').find(".Value").val();
  

  var method ="GET";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/classes/"+className+"?where={'"+key+"' '"+value+"'}";
  // var timeStamp= "2022-03-18T07:40:04.320Z";
  var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);
  console.log(sig);
  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
    
  
  var request = new Request(encodeURI(url),{
    method: method,
    mode:"cors",
    headers: headers,
  });
  fetch(request).then(function(data){
    if(data.status==200|| data.status==201){
      alert("Success");
    }else{
      alert("Fail");
    }
    
  });

}