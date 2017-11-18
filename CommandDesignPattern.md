### Command Design Pattern

Command pattern is a data driven design pattern and falls under behavioral pattern category. A request is wrapped under an 
object as command and passed to invoker object. Invoker object looks for the appropriate object which can handle this command and passes the command to the corresponding object which executes the command.

### HUD.js

![alt text](https://github.com/nguyensjsu/cmpe202-loops/blob/master/Research%20Work/command1.png)

Here we have created the invoker function which invokes different commands on different key presses. We have defined the mute command to be invoked when 'm' is pressed.

![alt text](https://github.com/nguyensjsu/cmpe202-loops/blob/master/Research%20Work/command2.png)

We have defined the pause command to be invoked when 's' is pressed.



