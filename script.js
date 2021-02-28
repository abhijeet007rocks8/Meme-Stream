async function Delete(clicked_id)
  {
      if(confirm("Do you want to delete image id:"+clicked_id)){
        urldel="https://memestagram2.herokuapp.com/memes/"+clicked_id;    
        console.log(urldel);
         await   $.ajax({
                url:urldel,
                type:'DELETE',
                dataType:'json',
                crossDomain:true,
                data:JSON.stringify({"id":clicked_id}),
                 success:function (data){
                  location.reload (true);
                    console.log(data);
                },
                error: function (xhr, textStatus, errorThrown) {
                  location.reload (true);  
                  console.log(errorThrown);
                    console.log(xhr);
                }
            });
      }
    }

let id;

function openform(){
  $('html,body').scrollTop(0);
    document.getElementById("edit-form").style.display = "none";
    document.getElementById("popup-form").style.display = "flex";
}

function closeform(){
    document.getElementById("popup-form").style.display = "none";
}


function openforme(){
  $('html,body').scrollTop(0);
    document.getElementById("popup-form").style.display = "none";
    document.getElementById("edit-form").style.display = "flex";
}

function closeforme(){
    document.getElementById("edit-form").style.display = "none";
}

function Edit(clicked_id_full){
    clicked_id=clicked_id_full.substring(4);
    console.log(clicked_id);
    openforme();
    let name=$('#name'+clicked_id).html();
    let caption=$('#caption'+clicked_id).html();
    let url=$('#image'+clicked_id).attr('src');  
    $('#eName').val(name);
    $('#eCaption').val(caption);
    $('#eUrl').val(url);
    $("#eName").prop('disabled',true);
    id=clicked_id;
}  

function editRequest(){
  let Name=$('#eName').val();
  let Caption=$('#eCaption').val();
  let Url=$('#eUrl').val();
  if((Caption == "")||(Url == ""))
  alert("All Fields are Required");
  else{
  console.log(Name+" "+Caption+" "+Url);
  console.log(JSON.stringify({"name":Name,"caption":Caption,"url":Url}));
  urledit="https://memestagram2.herokuapp.com/memes/"+id;
  console.log(urledit);    
  $.ajax({
              url:urledit,
                type:'PATCH',
                contentType: 'application/json',
                dataType:'',
                crossDomain:true,
                processdata: true,
                data:JSON.stringify({"name":Name,"caption":Caption,"url":Url}),
                 success:function (data){
                  location.reload (true);
                    console.log(data);
                },
                error: function (xhr, textStatus, errorThrown) {
                 location.reload (true);  
                  console.log(errorThrown);
                    console.log(xhr);
         }
  });
  
   
}
}

function add(){
    let Name = $('#Name').val();
    let Caption=$('#Caption').val();
    let Url=$('#Url').val(); 
    console.log(JSON.stringify({"name":Name,"caption":Caption,"url":Url}))
    if((Name=="")||(Caption=="")||(Url==""))
    alert("All fields are required!!");
    else
    {
      $.ajax({
        url:"https://memestagram2.herokuapp.com/memes",
          type:'POST',
          contentType: "application/json",
          dataType:'',
          crossDomain:true,
          processdata: true,
          data:JSON.stringify({"name":Name,"caption":Caption,"url":Url}),
           success:function (data){
          location.reload (true);
              console.log(data);
          },
          error: function (xhr, textStatus, errorThrown) {
          location.reload (true);  
            console.log(errorThrown);
              console.log(xhr);
            }
    });
  }
}


$(document).ready(function () {
    //Function to get data from backend API
    $.ajax({
            url: `https://memestagram2.herokuapp.com/memes`,
            type: 'GET',
            dataType: 'json',
            crossDomain: true,
            success: function (data, textStatus, xhr) {
                console.log(data);
                data=JSON.stringify(data);
                let converted_data=JSON.parse(data);
                console.log(converted_data);
                for(var i=converted_data.length-1;i>=0;i--){
                    converted_data[i]=JSON.stringify(converted_data[i]);
                    node=JSON.parse(converted_data[i]);
                    insert=`<div class="Item"
                    key=`+node.id+
                    `target="_blank">
                    <div class="Card" >
                      <div class="Content">
                        <h4 id="name`+node.id+`">`+node.name+`</h4>
                        <p id="caption`+node.id+`">`+node.caption+`</p>
                        <a id="url`+node.id+`" href=`+node.url+`><img id="image`+node.id+`" src=`+node.url+` alt="" width="280" height="300"></img></a>
                      </div>
                      <div class="Stats">
                      <button id="edit`+node.id+`" class="Button" type="button" onClick="Edit(this.id)">Edit</Button>
                      <button id="`+node.id+`" class="Button" type="button" onClick="Delete(this.id)">Delete</Button>
                      </div>
                    </div>
                  </div>`
                    $('.Grid').append(insert)
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
         
    // //Function to post meme
    // $('button').on('click',function(){
    //     var r= $('<input type="button" value="new button"/>');
    //     $("body").append(r);
    // });


    // //function to update meme
    // $('button').on('click',function(){
    //     var r= $('<input type="button" value="new button"/>');
    //     $("body").append(r);
    // });


    // //function to delete meme
    // $('button').on('click',function(){
    //     var r= $('<input type="button" value="new button"/>');
    //     $("body").append(r);
    // });

});