+++
title: "My first company, wowmate.io"
date: 14.09.19
draft: true
+++

# wowmate.io a log aggregation and analysis SaaS for world of warcraft

#### Idea:

The main service is a client, that basically reads the file and looks for certain events (e.g. end of a bossfight) and then automatically uploads a part of the log file to my backend, which processes it and makes it accessible to the player. 

The motivation for the player is that they can further analyse how the bossfight went. There are in game addons that offer a similar service, but the functionality is limited compared to what the players can do online.

That makes the speed of the processing of the file pretty important, for a single bossfight it should take less than 30 seconds.

#### Existing solutions:

There is only 1 product on the market, the name is warcraftlogs.com.
It has been around since Mists of Pandaria (2013), which means it is rather mature and has plenty of features.

I never liked the website mostly because thy UI/UX is horrible, also the perfomance isn't that good, but that improved over time. At it's worst it actually froze the whole browser for 10+ seconds, but that was a couple years ago.

It is important to note that the website is not a profit oriented product, rather a hobby project, that tries to cover it's AWS cost (5k$), through ads and a premium subscription. The only benefit is that premium users are on dedicated servers, for improved performance.

Warcraftlogs also provides an API (afaik also for free), that allows other projects to access it's data. This led to awesom opensource tools like WoWAnalyzer.

Outstanding features are that you can create you're own query to analyze the data. The other one is that you can view a primitiv replay of the bossfight, that show the position of the players on a map and all combatlog related data at that time of the boss fight. This is pretty impressive feature and helps alot if you try to "debug" the bossfight. I'm also not quite sure how I could implement such a feature myself.

#### advantages of my product.

The main advantages I hope to achieve are:

- a way better UI/UX
- better performance
- ingame addon to display a summary of past logs
- focus on privacy
- different philosophie towards damage
- no login for upload
- combatlog is not tied to an specific account and can't be deleted
- built in plugin system (saved queries)

#### disadvantages

- limited functionality in free


#### technical implementation

out of scope

#### problems im facing

dedicated post

#### fear setting

dedicated post

####  pvp as a feature?

#### goal:

release nmvp asap 

competetive offering for next expension
