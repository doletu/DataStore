
var CLIENT_KEY = "6c53e766837d00a8c4c7254c39c6536d1e1455aeb2dd30a0ee40ba0502375fba";
var APPLICATION_KEY = "543e6ee053794c0ebbce6e668e4e86cf17a96dd2e841d3a99a6bc32576d314e0";
var FQDN="mbaas.api.nifcloud.com";
var SIGNATURE_VERSION="SignatureVersion=2";
var SIGNATURE_METHOD="SignatureMethod=HmacSHA256";

function GenerateSignature(method,url,timeStamp){
    var signature = "";
    var _applicationKey =APPLICATION_KEY;
    var _timestamp = timeStamp;
    var _clientKey = CLIENT_KEY;

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
    alert(forEncodeString);
    var hash = CryptoJS.HmacSHA256(forEncodeString, _clientKey);
    var signature = CryptoJS.enc.Base64.stringify(hash);  

    alert(signature);

    
    return signature;
}


function Registration(){
    var className = $(document).find("#ClassValue").val();

    var method ="POST";
    var url="https://mbaas.api.nifcloud.com/2013-09-01/classes/"+className;

    
    var timeStamp=new Date().toISOString();
    $.ajax({
        url: url,
        method: 'POST',
        beforeSend: function(request){
            request.setRequestHeader("X-NCMB-Application-Key", APPLICATION_KEY);
            request.setRequestHeader("X-NCMB-Timestamp", timeStamp);
            request.setRequestHeader("X-NCMB-Signature", GenerateSignature( method, url, timeStamp));
            request.setRequestHeader("Content-Type", 'application/json');
        },
        dataType: 'json',
        
        success: function(data){
          alert("Success");
        },
        error: function(xhr, status, error){
            alert(xhr.responseText);
        }
      });
    


}