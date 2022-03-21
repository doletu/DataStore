
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
    data["acl"]=acl;
    data["roleName"] = "Role Test 1";
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
  
    }).then(function(result){
      console.log(result);
    });
  }
  
  function UpdateRole(i){
    var method ="PUT";
    var url="https://mbaas.api.nifcloud.com/2013-09-01/roles/wuQSRhTHbyN5ZqzS";
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