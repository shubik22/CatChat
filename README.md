#CatChat

CatChat is a lightweight chat room for cats built with Meteor (a space ripe for disruption).  It's hosted at [catchat.meteor.com](http://catchat.meteor.com).  A few features worth pointing out:

* The chat room autoscrolls to the bottom each time a chat is added.
* Active users automatically ping the server every five seconds.  The server maintains a list of current users by removing users who haven't pinged within a certain period of time.
* Users' statuses change from green (active) to orange (inactive) after thirty seconds of inactivity.

## TODOs

* Change autoscrolling so that the chat only autoscrolls if users are currently viewing the most recent chat.
* Add statuses for cat users.
* Set maximum length for usernames.
* Enable one-on-one cat chats.
* Allow users to access chat history prior to the time they entered the room.
* Write a cat bot that will appear if there's only one user in the room.