function remindMe() {
    var remindData = JSON.stringify({ phoneNumber : $("#phoneNumber").val(),
                                      onDate : $("#onDate").val(),
                                      countryCode : $("#countryCode").val(),
                                      remindText : $("#remindText").val(),
                                      onTime : $("#onTime").val()});
    console.log(remindData);
    $.ajax({
      url: '/remindme',
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=UTF-8',
      data: remindData,
      success: function(){}
    });
}
