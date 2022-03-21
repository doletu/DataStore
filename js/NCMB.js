var NCMB={};
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
    console.log("Encode:"+_url);
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
  function initData(jsonData){
    var field = ' <input class="styled" value="Update" type="button" onclick="UpdateData(this)">'+
                  ' <input class="styled" value="Delete" type="button" onclick="DeleteData(this)">'; 
    $('#example').DataTable().destroy();
      
     
      $('#example').DataTable( {
        data: jsonData,
        columns: [
          { 'data': 'objectId',
            "render": function ( data, type, row, meta ) {
            return '<input id="ObjectID" type="text" disabled value="'+data+'"/>';
            }
          },
          { 'data': 'createDate' ,
          "render": function ( data, type, row, meta ) {
            return '<input id="createDate" type="text" disabled value="'+data+'"/>';
          }},
          { 'data': 'updateDate' ,
          "render": function ( data, type, row, meta ) {
            return '<input id="updateDate" type="text" disabled value="'+data+'"/>';
          }},
          { 'data': 'Name',
            "render": function ( data, type, row, meta ) {
              return '<input id="Name" type="text" value="'+data+'"/>';
            }
          },
          { 'data': 'Address',
          "render": function ( data, type, row, meta ) {
            return '<input id="Address" type="text" value="'+data+'"/>';
          } },
          { 'data': 'Phone' ,
          "render": function ( data, type, row, meta ) {
            return '<input id="Phone" type="text" value="'+data+'"/>';
          }},
          { 'data': null,
            'render': function ( data, type, row, meta ) {
              return field;},
          }
        ],
      paging: true,
      search:false,
    });
  }