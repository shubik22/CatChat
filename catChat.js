var Chats = new Meteor.Collection("chats");

if (Meteor.isClient) {
  var username = function() {
    return Session.get("username") || "AnonCat";
  }
  
  Meteor.startup(function() {
    Session.set("logged_in", Date.now());
  });
  
  Template.chatRoom.events({
    "submit form#username": function(event) {
      event.preventDefault();
      
      var username = $("input#username").val();
      Session.set("username", username);
    },
    
    "click .reset-username": function(event) {
      event.preventDefault();
      
      Session.set("username", "");
    }
  });
  
  Template.chatRoom.chats = function() {
    return Chats.find({time_created: {$gt: Session.get("logged_in")}});
  };
  
  Template.chatRoom.username = function() {
    return Session.get("username");
  };
  
  Template.chat.rendered = function() {
    var $chats = $("ul#chats");
    var $lastChat = $("ul#chats>li.chat:last-child");
    if ($lastChat && $lastChat.position()) {
      $chats.scrollTop($lastChat.position().top);
    }
  };
  
  Template.newMessage.events({
    "submit form.new-message": function(event) {
      event.preventDefault();
      
      var $message = $("input#message");
      Chats.insert({
        message: $message.val(),
        username: username(),
        time_created: Date.now()
      });
      $message.val("");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
