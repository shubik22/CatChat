Chats = new Meteor.Collection("chats");
Users = new Meteor.Collection("users");

if (Meteor.isClient) {
  Meteor.startup(function() {
    var user_id = Users.insert({
      last_action: Date.now(),
      ping_time: Date.now(),
      username: "AnonCat"
    });
    Session.set("user_id", user_id);
    Session.set("logged_in", Date.now());
    Session.setDefault("username", "AnonCat");
    
    Meteor.setInterval(function() {
      Users.update(Session.get("user_id"), {$set: {ping_time: Date.now()}});
    }, 5000);
  });

  Template.user.selected = function() {
    return (this._id === Session.get("user_id")) ? "selected" : "";
  };
  
  Template.user.catIcon = function() {
    if (Date.now() - 30000 > this.last_action) {
      return "orange_cat.png";
    } else {
      return "green_cat.png";
    }
  };

  Template.chatRoom.events({
    "submit form#username": function(event) {
      event.preventDefault();
      
      var username = $("input#username").val();
      Users.update(Session.get("user_id"), {$set: {username: username}});
      Session.set("username", username);
    },
    
    "click .reset-username": function(event) {
      event.preventDefault();
      
      Session.set("username", "");
    }
  });
  
  Template.chatRoom.users = function() {
    return Users.find();
  };
  
  Template.chatRoom.chats = function() {
    return Chats.find({time_created: {$gt: Session.get("logged_in")}});
  };
  
  Template.chatRoom.username = function() {
    return Session.get("username");
  };
  
  Template.chatRoom.oldUsername = function() {
    var user = Users.findOne(Session.get("user_id"));
    return user && user.username;
  };
  
  Template.chat.rendered = function() {
    var $chats = $("ul#chats");
    var $lastChat = $("ul#chats>li.chat:last-child");
    if ($lastChat && $lastChat.position()) {
      $chats.scrollTop($lastChat.position().top + $lastChat.height());
    }
  };
  
  Template.newMessage.events({
    "submit form.new-message": function(event) {
      event.preventDefault();
      
      var $message = $("input#message");
      Chats.insert({
        message: $message.val(),
        username: Session.get("username"),
        time_created: Date.now()
      });
      Users.update(Session.get("user_id"), {$set: {last_action: Date.now()}})
      $message.val("");
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    Meteor.setInterval(function() {
      Users.remove({ping_time: {$lt: Date.now() - 10000}});
    }, 10000);
  });
}