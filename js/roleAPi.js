function initDataRole(jsonData){
  var field = ' <input class="styled" value="Update" type="button" onclick="UpdateRole(this)">'+
  ' <input class="styled" value="Delete" type="button" onclick="DeleteRole(this)">'; 
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
          { 'data': 'roleName',
            "render": function ( data, type, row, meta ) {
              return '<input id="roleName" type="text" value="'+data+'"/>';
            }
          },
          { 'data': null,
            'render': function ( data, type, row, meta ) {
              return field;},
          }
        ],
      paging: true,
      search:false,
    });
}


function RoleRegister(){
    var method ="POST";
    var url="https://mbaas.api.nifcloud.com/2013-09-01/roles";
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
        FetchRole();
      
    });
  }
  function FetchRole(){
    var method ="GET";
    var url="https://mbaas.api.nifcloud.com/2013-09-01/roles";
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
      headers: headers
    });
    fetch(request).then(function(data){
      return data.json();
  
    }).then(function(data){
        console.log(data);
        initDataRole(data.results)
    });
  }
  
  function UpdateRole(i){
    var method ="PUT";
    
    var id =$(i).closest("tr").find("#ObjectID").val();
    var url="https://mbaas.api.nifcloud.com/2013-09-01/roles/"+id;
    var timeStamp=new Date().toISOString();
    
    var sig =signature(url,method,timeStamp);
  
    var headers = {
      "X-NCMB-Application-Key":    NCMB.applicationKey,
      "X-NCMB-Signature":          sig,
      "X-NCMB-Timestamp":          timeStamp,
      "content-type": "application/json"
    };
    var data={};
  
    data['belongUser']= {
      "__op": "AddRelation",
      "objects": [
        {
          "__type": "Pointer",
          "className": "user",
          "objectId": "I65XZLrEVwDzZoH2"
        },
        {
          "__type": "Pointer",
          "className": "user",
          "objectId": "4z09sYlkC5ewMClP"
        }
      ]
    }
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
      
      FetchRole();
    });
  }
  
function DeleteRole(i){
    var method ="DELETE";
    
    var roleId =  $(i).closest("tr").find('td').find('input[id="ObjectID"]').val();
    var url="https://mbaas.api.nifcloud.com/2013-09-01/roles/"+roleId;
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
      FetchRole();
    });
  
  }
  
function SearchData(){
  
    var key = $('#KeySearch').val();
    var value = $('.box[id="Search"]').find(".Value").val();
  
    var method ="GET";
    var url="https://mbaas.api.nifcloud.com/2013-09-01/roles"+'?where={"'+key +'":"'+ value+'"}';
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