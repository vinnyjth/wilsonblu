$(document).ready(function() {

  if($("#status").length > 0){
    $.getJSON("/skynet/status", function(data){
      $("#status").addClass(data.status).removeClass("Offline").children().text(data.status)

    });
  };

  $("#findAction").keyup(function(event){
    $.getJSON(("/skynet/action_search/" + $("#findAction").val()), function(data){
      $(".action-list").children().remove()
      $.each(data, function(key, val){
        $(".action-list").append("<option value='" + val._id + "'>" + val.name + "</option>");
      });
    });
  });

  $("#more").click(function(event){
    $("#uuids").append("<input type='text' name='uuids' class='form-control'></input>")
  });

});