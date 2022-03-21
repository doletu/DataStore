var acl ={
  "*":{
     "read":true,
     "write":true
  }
}

function initData(jsonData){
  var field = ' <input class="styled" value="Update" type="button" onclick="RenewlByID(this)">'+
                  ' <input class="styled" value="Delete" type="button" onclick="DeleteByID(this)">'+
                  ' <input class="styled" value="ResetPassword" type="button" onclick="ResetPassword(this)">'; 
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
          { 'data': 'userName',
            "render": function ( data, type, row, meta ) {
              return '<input id="userName" type="text" value="'+data+'"/>';
            }
          },
          { 'data': 'mailAddress',
          "render": function ( data, type, row, meta ) {
            return '<input id="mailAddress" type="text" value="'+data+'"/>';
          } },
          { 'data': null,
            'render': function ( data, type, row, meta ) {
              return field;},
          }
        ],
      paging: true,
      search:false,
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
      console.log(data);
      return data.json();
    }
  }).then(function(result){
    var jsonData=result.results;
    var field = ' <input class="styled" value="Update" type="button" onclick="RenewlByID(this)">'+
                  ' <input class="styled" value="Delete" type="button" onclick="DeleteByID(this)">'+
                  ' <input class="styled" value="ResetPassword" type="button" onclick="ResetPassword(this)">'; 
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
          { 'data': 'userName',
            "render": function ( data, type, row, meta ) {
              return '<input id="userName" type="text" value="'+data+'"/>';
            }
          },
          { 'data': 'mailAddress',
          "render": function ( data, type, row, meta ) {
            return '<input id="mailAddress" type="text" value="'+data+'"/>';
          } },
          { 'data': null,
            'render': function ( data, type, row, meta ) {
              return field;},
          }
        ],
      paging: true,
      search:false,
    });   
  });

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
  
    var password = $(document).find("#password").val();
    data["password"]=password;
  
    var mailAddress = $(document).find("#mailAddress").val();
    data["mailAddress"]=mailAddress;
  
    data["acl"] =acl;


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
      FetchData();
    });



   
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


function RenewlByID(i){
  var method ="PUT";
  
  var mailAddress =  $(i).closest("tr").find('td').find('input[id="ObjectID"]').val();
  var url="https://mbaas.api.nifcloud.com/2013-09-01/users/"+mailAddress;
  var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
  

  var data={};
  $(i).closest("tr").find('td').each(function(){
    if($(this).children().prop('disabled')==false){
      var key=$(this).children().attr("id");
      var value=$(this).children().val();
      if(key!="" && value!="" &key!=undefined){
        data[key]=value;
        console.log("key:" +key+ ",Value:" + value );
      }
  
    }
  });
 


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


function DeleteByID(i){
  var method ="DELETE";
  
  var mailAddress =  $(i).closest("tr").find('td').find('input[id="ObjectID"]').val();
  var url="https://mbaas.api.nifcloud.com/2013-09-01/users/"+mailAddress;
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
function LogOut(){
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

function SearchData(){
  
  var key = $('#KeySearch').val();
  var value = $('.box[id="Search"]').find(".Value").val();

  var method ="GET";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/users"+'?where={"'+key +'":"'+ value+'"}';
  var timeStamp= "2022-03-19T07:07:12.670Z";
  // var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);
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
      return data.json();
    }else{
      alert("Fail");
    }   
  }).then(function(response){
      var data = response.results;
      initData(data);
      
  });

}
function EmailConfirm(){
  var method ="GET";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/applications/IKf4ZEliNRS3VlWc/mailAddressConfirm?token=5gDeZrh7EiUqazFbBvpAW8nhN";
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
    mode:"no-cors",
    headers: headers,
  });
  fetch(request).then(function(data){
    if(data!=null){
      return data;
    }
  }).then(function(result){
      console.log(result);
  });
}
function ResetPassword(i){
  
  var method ="POST";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/requestPasswordReset";
  var timeStamp=new Date().toISOString();
  
  var sig =signature(url,method,timeStamp);

  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/json"
  };
  var data={};
   
  var mailAddress =  $(i).closest("tr").find('td').find('input[id="mailAddress"]').val();
  
  data["mailAddress"]=mailAddress;
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
        console.log(data);
      }
      
    });
}





