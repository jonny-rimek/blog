+++
title = "How to track your own internet traffic"
date = "2018-01-22"
+++

#### Why would you log your own traffic? That's what the NSA is for right?!

I'm absolutely fascinated by Data science and one of my ideas is to analyze my
own browsing behavior. I'm just starting to get into it, but I hope that I can come
back in maybe a year and have hundreds of gigabytes of data to work with.

I hope to gain a deeper understanding of certain protocols and network traffic in general.
I would love to raise awareness about the data that can and is being collected and what you
can learn about a person because of it.

#### Alright, so how did you log yourself

My first idea was to somehow send the data from my router and save it on my raspberry pi.
It quickly turned that my router doesn't offer this functionality, so I settled to
log the traffic directly on my PC.
I had a brief encounter with Wireshark in the past and remembered something about
analyzing network traffic. It turns out Wireshark can't log your traffic.
The program that captures the packages and writes them to a file is called dumpcap.
Wireshark itself is only for analyzing the data from dumpcap.

`dumpcap -b filesize:1048576 -w /opt/dumpcap/log.pcaqng`

This command starts a log file in the /opt/dumpcap folder (which I created) and
starts a new log file if the current one gets to a size of 1 GB (1048576kB)

Because I'm lazy I put the command in the /etc/rc.local file. For Ubuntu this
runs the command on boot as root user.

#### DONE

Now I can spend a year learning Data science and analyze my data at the end.

I didn't find a way to only log the HTTP Headers, that means that the log file size is
equal to my internet traffic. Binge watching all episodes of Orange is the new Black
will blow them up for sure. Even with 100GB of traffic per month, a 8TB HDD
would last for at least 6 years of traffic.
