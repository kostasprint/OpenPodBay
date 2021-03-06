# centralina.conf

# See https://www.exratione.com/2013/02/nodejs-and-forever-as-a-service-simple-upstart-and-init-scripts-for-ubuntu/

description "centralina for Pod Bay Door 2"

start on startup
stop on shutdown

# This line is needed so that Upstart reports the pid of the Node.js process
# started by Forever rather than Forever's pid.
expect fork

# The following environment variables must be set so as to define where Node.js
# and Forever binaries and the Node.js source code can be found.
#
# The full path to the directory containing the node and forever binaries.
# env NODE_BIN_DIR="/usr/local/bin"
# Set the NODE_PATH to the Node.js main node_modules directory.
# env NODE_PATH="/usr/local/lib/node_modules"
# The application startup Javascript file path.
# env APPLICATION_PATH="/root/podbay2/pod-bay-door/centralina/server.js"
# Process ID file path.
# env PIDFILE="/var/run/centralina2.pid"
# Log file path.
# env LOG="/home/c/centralina2.log"
# Forever settings to prevent the application spinning if it fails on launch.
# env MIN_UPTIME="5000"
# env SPIN_SLEEP_TIME="2000"

env NODE_BIN_DIR="/usr/bin/nodejs"
env NODE_PATH="/usr/lib/node_modules/"
env APPLICATION_PATH="/root/podbay2/pod-bay-door/centralina/server.js"
env DB_PATH="/root/podbay2/pod-bay-door/centralina/model/db"
env PIDFILE="/var/run/centralina.pid"
env LOG="/home/c/node_server2.log"
env MIN_UPTIME="5000"
env SPIN_SLEEP_TIME="2000"

script
    # Add the node executables to the path, which includes Forever if it is
    # installed globally, which it should be.
    PATH=$NODE_BIN_DIR:$PATH

    cd $DB_PATH

    # The minUptime and spinSleepTime settings stop Forever from thrashing if
    # the application fails immediately on launch. This is generally necessary
    # to avoid loading development servers to the point of failure every time
    # someone makes an error in application initialization code, or bringing
    # down production servers the same way if a database or other critical
    # service suddenly becomes inaccessible.
    exec forever \
      --pidFile $PIDFILE \
      -a \
      -l $LOG \
      -o $LOG \
      -e $LOG \
      --minUptime $MIN_UPTIME \
      --spinSleepTime $SPIN_SLEEP_TIME \
      start $APPLICATION_PATH
end script

pre-stop script
    # Add the node executables to the path.
    PATH=$NODE_BIN_DIR:$PATH
    # Here we're using the pre-stop script to stop the Node.js application
    # process so that Forever is given a chance to do its thing and tidy up
    # its data. Note that doing it this way means that each application that
    # runs under Forever must have a different start file name, regardless of
    # which directory it is in.
    exec forever stop $APPLICATION_PATH
end script
