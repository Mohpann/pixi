# pixi setup

# install vs code
https://code.visualstudio.com/download

# start vs code

CTRL+SHIFT+P, File->preferences->extensions, Add extensions:

C/C++, Python, VS code for node.js (nodesource), gitlens, Remote - SSH


# setup SSH host to EC2
F1->Remote-SSH: Add host

ssh -i PEMFILE ec2-user@ec2-54-84-2-170.compute-1.amazonaws.com

find PEMFILE in explorer, right click->Security, remove everyone but you

F1 Remote-SSH: connect to host

F1 File:Open Folder ~/pixi


# reinstall extensions now you've got connected
File->preferences->extensions

Re-install (in SSH) all extensions listed above

Click Reload Required once done


