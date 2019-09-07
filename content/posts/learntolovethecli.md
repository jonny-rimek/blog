+++
title = "learn to love the CLI"
date = "2018-01-31"
tags = ["cli"]
+++

In movies and tv-shows, the Command Line Interface(CLI) is always displayed as a
hacker tool and I want to show you how and why you should familiarize yourself with it.<br/>
Most people prefer a Graphical User Interface(GUI) because most of the time it is
pretty easy to use. You can see all possible actions and use your mouse to navigate it.
If you are lucky the GUI provides shortcuts, like CTRL+P for printing, for tasks
that you have to execute on a regular basis. In case you don't have a shortcut
most of the time there is zero possibility to modify anything, that means you are
stuck in a slow workflow.

**The CLI can fix all the problems of the GUI.**<br/>
The only and admittedly big drawback is that you need a lot of knowledge to do the
most basic operations. Actions like opening a file, creating a folder, setting permissions
or just showing the file all have different commands. So why should you bother learning
all that?

#### The CLI is faster, customizable, allows automation and you can combine commands

"So you are telling me typing `cd exampledirectory` instead of just clicking the folder is faster?"

For a simple task like switching to the next directory, a GUI might be easier and a little faster.
The strength of the command line lies in more complex tasks.
Imagine you want to see all files in the current directory, there file permissions, size,
created date, hidden files and much more.<br/>
Such a command might look like this: `ls -lisah --color=always | less -R`

output:
````
7213692 4,0K drwxrwxr-x 10 jay jay 4,0K Jan 22 18:37 .
7212982 4,0K drwxrwxr-x  3 jay jay 4,0K Jan 23 12:39 ..
7215409  12K -rw-rw-r--  1 jay jay  499 Jan 24 01:54 about.md
````

How on earth this should be faster if you have to remember such a long command you might ask yourself.
Let me introduce you to bash aliases!<br/>
You can add a line like this `alias lisah='ls -lisah --color=always | less -R'` to a file named `.bash_aliases`
in your user directory.<br/>To prove my point here a single command to do so:<br/>
`cd && echo "alias lisah='ls -lisah --color=always | less -R'">>.bash_aliases`

`cd` is the command to change the directory without any parameters it will switch to your user directory.<br/>
`&&` simply tells the command line to execute the next command, that means we can chain multiple commands in one without them having a direct impact on each other, but they will be executed one after another<br/>
`echo` is a rather simple command all it does is *display a line of text*(from the documentation).<br/>
`""` tells the command line that it is just text and should not be executed.<br/>
`>>` means take the output of echo and write it to the file `.bash_aliases`, if the file does not exist create it otherwise append the text to the existing file<br/>
Let me explain the line we wrote to the file. The syntax is rather easy, the line always starts with alias followed by the shortcut we want to use, in our case `lisah` followed by the command we don't want to remember. That means from now if we type `lisah` in the command line it will execute `ls -lisah --color=always | less -R`. Pretty neat if you ask me. Important after you edit the alias file you have to reload the CLI settings using the following command `. ~/.bashrc`, but it will only reload the settings of your current tab, to be save just close it and reopen.<br/>
Let me touch on the command we created an alias for. You might have noticed the pipe `|` in the command.
The pipe allows you to give the output of the command to the left to the command on the right. In this case `ls -lisah` outputs
a list of all files, because I just want a quick look at the files I *pipe* this output to less. *less* opens a list of files in a
temporary window inside the command line. If I got the information I needed I just press **Q** to close
it and come back to the list of commands I entered before. I find it very useful because it allows seeing what you want, but it doesn't clutter your history with the information you really just need for 2 seconds.<br/>
A popular use case for pipe is with the
`grep` command. Imagine you wanna see all you bash aliases that involve the git command.<br/>
`cat .bash_aliases | grep 'git'` `cat` usually just displays the content of the file, but here cat gives the data to grep and grep only outputs
only the lines containing git. The possibilities are virtually limitless.

I also talked about customizability, we didn't really see much of that. Every command comes with options.
In it's base `ls` just lists the content of the directory you are in, the output might look something like this
`Desktop  Documents  Downloads  Music Pictures  Public Templates Videos`. If we type our first alias `lisah`
we get something like this
````
total 1,1M
7208969  12K drwx------ 30 jay jay  12K Jan 31 03:56 .
7208961 4,0K drwxr-xr-x  4 root  root  4,0K Jan 18 22:04 ..
7210180 4,0K drwxrwxr-x  9 jay jay 4,0K Jan 12 07:52 .atom
7214944  12K -rw-rw-r--  1 jay jay 2,2K Jan 31 03:38 .bash_aliases
7216921  40K -rw-------  1 jay jay  26K Jan 30 05:11 .bash_history
7208976  12K -rw-r--r--  1 jay jay  220 Jan  4 04:12 .bash_logout
7208977  12K -rw-r--r--  1 jay jay 3,7K Jan  4 04:12 .bashrc
...
````

`ls -lisah` is a short form for `ls -l -i -s -a -h` every one of those five an option.
Don't worry you don't have to remember 30+ options for all those commands.<br/>
I present to you *man pages*. Do you want to learn more about git? Just type `man git`

````
GIT(1)                                                                  Git Manual                                                                  GIT(1)

NAME
       git - the stupid content tracker
...
````
With this you will find extensive documentation for pretty much every command.

Let me show you 2 more features that will speed up your interaction with the CLI.

**TAB**: start typing a command and hit the Tab key, if there is only one possibility
it will auto-complete for you. If there is more than one option hit Tab twice and it
will display all possibilities!

**CTRL+R**: press ctrl+r and start typing the command you want to execute.
It will display the last command in your history that matches the text you already typed.
Imagine you remember this special git command you used a week ago, but you can't recall
it exactly and you didn't add it to your alias file. Just hit ctrl+r type git, if the
first displayed command is not the one you wanted, just keep pressing ctrl+r until it
shows up!

You can also execute commands on startup of your PC, I talked about that [here](http://localhost:4000/jekyll/blog/2018/01/22/track-your-own-internet-traffic.html).

One last amazing possibility the CLI offers is so-called bash scripts. Basically, you create a file `examplefilename.sh` and type the commands inside you also have
access to loops, control structures like if and much more. But this is it for now.

I hope you got a glimpse of the power and consider learning more about it.

You can check out my alias file [here](https://gitlab.com/jay_dee_bee/config_files)
