+++
title = "My first company wowmate.io"
date = "2019-09-14"
+++

WoWmate.io is a log aggregation and analysis SaaS for World of Warcraft. Think Datadog for WoW. 

The main service is a client, that reads the combatlog.txt and looks for certain events (e.g. end of a bossfight) and then automatically uploads a part of the log file to my backend, which processes it and makes it accessible to the player. 

The motivation for the player is that they can further analyse how the bossfight went. There are in game addons that offer a similar service, but the functionality is limited compared to what the players can do online. That makes the speed of the processing of the file pretty important, for a single bossfight it should take less than 30 seconds.

In addition you can compare yourself to other player and find out what they did differently.

#### Existing solution:

There is only 1 product on the market, the name is warcraftlogs.com.
It has been around since Mists of Pandaria (2012), which means it is rather mature and has plenty of features.

I never liked the website mostly because thy UI/UX is horrible, also the perfomance isn't that good, but that improved over time. At it's worst it actually froze the whole browser for 10+ seconds, but that was a couple years ago.

It is important to note that the website is not a profit oriented product, rather a hobby project, that tries to cover it's AWS cost (5k$), through ads and a premium subscription. The only benefit for premium users is that they are on dedicated servers, for improved performance.

Warcraftlogs also provides an API (afaik also for free), that allows other projects to access it's data. This led to awesom opensource tools like WoWAnalyzer.

Outstanding features are that you can create you're own, query to analyze the data. The other one is that you can view a primitiv replay of the bossfight, that show the position of the players on a map and all combatlog related data at that time of the boss fight. This is pretty impressive feature and helps alot if you try to "debug" the bossfight. I'm also not quite sure how I could implement such a feature myself.

#### How is my product different?

The main advantages I hope to achieve are:

- a way better usability
- better performance

If I could achieve that and feature parity it would probably be enough to absorb the market, but wowmate.io will be different in a number of other ways too.

 - __NO ADS EVEN FOR FREE USERS.__

 - There will be an ingame addon that will display a summary of past logs for certain types of content and difficutly (similar to raider.io plugin)

 - People can opt to now show there logs public on the website and in the addon, even if they didn't upload the log.

 - There will be a slight change to damage leaderboards, there won't be a % behind every log. Instead there will be badges, think SC2 or Dota2 ranks. In addition I want to introduce a comparison like that for damage taken. Overall I want to but an emphasis on playing cleanly instead of maximizing for damage and ignoring everything else.

- You won't need an account to log, just download the slim client and you are good to go. You can also upload it via the website if you don't want to install a client.

_How might wowmate.io be worse?_

Free users will be limited compared to warcraftlogs.com, because it is ad free and a profit oriented business.

#### Problems im facing

The main problem in general is my motivation and the ability to stick with it for longer than two month. I hope that the ball keeps rolling once I put the product out there.

Specifically I'm very confused and annoyed by all the bureaucracy involed in founding a company in germany. I've tried to get into it but without a lot of success. 

#### Problems with the business idea

The problems I see with the product are that World of Warcraft is a pretty old game and the playerbase continues to shrink. People are pretty unhappy with the current expansion. That might get mitigated by the popularity of Classic, but we have to see how that pends out after the hype is over.

The next problem is that it is a B2C business, which is not optimal for a bootstraped business.

#### WoW, a valid platform afterall?

Over the years there plenty of 3rd party solutions built around World of Warcraft.

A couple of years a competitor for wowprogress.com took the wow community by storm, raider.io. They allow for a simple and intuive way to check the progress of other players. Their premium rewards doesn't over any real benefit yet they managed to have over 4.000 patreons, let's say they have 5k MRR.

In order to optimize their rotation and in the and damage output an [open source project](https://github.com/simulationcraft/simc) emerged that allows to specify a rotation (Action Priority List - APL) and compare it to others, thus allowing them to find the mathematically perfect rotation. It's written in C++ and setting up the client was always a huge pain and it was hard to use, e.g. you had to look up some id for an item. Entering the stage is raidbots, it is running simulationcraft
in the cloud with a convenient UI. It had 30k $ MMR in the past and is now at 5.7k patreons with 3$ for the smallest tier.

#### Whats next?

I have my AWS infrastructure figured out and already had a proof of concept in the beginning of the year. I want to build a very minimal MVP (only damage summary and a client to upload the log). Afterwards I want to engage the WoW community and gather feedback early on. Something that I wanted to push back, but will force myself to do as early as possible.

#### Goal:

I want to release my MVP as soon as possible, get feedback early on and by the time the next expension is coming around I want to have a competetive offering.
