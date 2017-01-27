InboxSDK.load('1.0', 'sdk_trackermercy_dba13e1d18').then(function(sdk){
    
    // console.log(user_email);
    sdk.Compose.registerComposeViewHandler(function(composeView){
    
        uuid = function () {
        //// return uuid of form xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
        var uuid = '', ii;
        for (ii = 0; ii < 32; ii += 1) {
          switch (ii) {
          case 8:
          case 20:
            uuid += '-';
            uuid += (Math.random() * 16 | 0).toString(16);
            break;
          case 12:
            uuid += '-';
            uuid += '4';
            break;
          case 16:
            uuid += '-';
            uuid += (Math.random() * 4 | 8).toString(16);
            break;
          default:
            uuid += (Math.random() * 16 | 0).toString(16);
          }
        }
        return uuid;
      };
      var track_code = uuid();
        
      composeView.on('presending',function(event){
        console.log(track_code);
        console.log(composeView.getToRecipients());

        composeView.insertTextIntoBodyAtCursor('\n\n\n\n');
        composeView.insertHTMLIntoBodyAtCursor('<img src="mercy.pythonanywhere.com/track/' + track_code +'"></img>');
        composeView.insertHTMLIntoBodyAtCursor('\n\n\n\n\n<a href="https://mercy.pythonanywhere.com"> Sent via Mercy Assistant.</a>');
        var dt = new Date();
        var utcDate = dt.toUTCString();
        var tosObjects = [];
        var ccsObjects = [];
        var bccsObjects = [];
        for(var i = 0 ; i < composeView.getToRecipients().length ; i++){
          tosObjects.push(composeView.getToRecipients()[i].emailAddress);
        }
        for(var i = 0 ; i < composeView.getCcRecipients().length ; i++){
          ccsObjects.push(composeView.getCcRecipients()[i].emailAddress);
        }
        for(var i = 0 ; i < composeView.getBccRecipients().length ; i++){
          bccsObjects.push(composeView.getBccRecipients()[i].emailAddress);
        }
        var data ={
          timestamp: utcDate,
          subject: composeView.getSubject(), 
          track_key : track_code,
          tos: tosObjects,
          ccs: ccsObjects,
          bccs: bccsObjects
        };
        
        url = "https://mercy.pythonanywhere.com/track/mail/new"
        $.ajax({
            type : "GET",
            url: url,
            data: data,
            // dataType: 'xml',.
            complete : function(){
              console.log("Fucking finished");
                // alert(this.url)
            },
            success: function(result){
              console.log("data", result);
              console.log("Success");
            }
        });
        
    });
  });
});