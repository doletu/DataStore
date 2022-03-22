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
    var jsonData=result.results;
    console.log(jsonData);
    initData(jsonData);
  
  });

}


function UpdateData(i){
  var table = $('#example').DataTable();
  var className = $(document).find("#ClassValue").val();
  
  var id =$(i).closest("tr").find("#ObjectID").val();



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
  
  var id =$(i).closest("tr").find("#ObjectID").val();



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
  
  var key = $('#KeySearch').val();
  var value = $('.box[id="Search"]').find(".Value").val();

  var method ="GET";
  var url="https://mbaas.api.nifcloud.com/2013-09-01/classes/"+className+'?where={"'+key +'":{"$regex":"'+ value+'"}}';
  var timeStamp= "2022-03-19T07:07:12.670Z";
  // var timeStamp=new Date().toISOString();

  var sig =signature(url,method,timeStamp);
  var headers = {
    "X-NCMB-Application-Key":    NCMB.applicationKey,
    "X-NCMB-Signature":          sig,
    "X-NCMB-Timestamp":          timeStamp,
    "content-type": "application/x-www-form-urlencoded"
  };
  
  
  var request = new Request(encodeURI(url),{
    method: method,
    mode:"cors",
    headers: headers,
  });
  fetch(request).then(function(data){
    if(data.status==200|| data.status==201){
      return data.json();
    }else{
      alert("Fail");
    }   
  }).then(function(response){
      var data = response.results;
      initData(data);

  });

}
