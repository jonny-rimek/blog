---
title: "Database Types"
date: 2018-02-10T21:07:36+02:00
draft: false
---

 Until recently I only worked with relational databases, namely PostgreSQL, and I
 always found that it offered everything I needed to build the projects I wanted to do. Also, I was confused and overwhelmed by all the NoSQL database types like key-value,
 document, graph and column databases.<br/>
 For a new project, I needed to store log files. An 8min event has around 90.000 lines and a size of 22MB. After some napkin math, I realized I might have to deal with 60TB of data per year. Nothing about this problem sounded like relational databases would be a good solution,
 because of that I looked for alternatives. In the following text, I want to layout what I learned.
 
### Relational Databases 
 
 In order to understand why NoSQL databases emerged we need to understand what problems they tried
 to solve and thus the weaknesses of relational databases.<br/>
 As an example throughout the article, I will use a movie database for a website like [IMDB](http://www.imdb.com/)<br/>
 One of the very basic ideas of relational databases is __atomicity__.
 In our example of a movie database, a movie always has actors.
 
 movie name | movie release year | actor1 | actor2
 -----------|--------------------|--------|---------
 into the wild | 2007 | Emile Hirsch | Vince Vaughn
 
 This might be a very first idea of how we structure our database. But actors are not really a part of movies they can play in multiple movies. To satisfy the principle of atomicity we move actors in
 a dedicated table
 
 _movies:_

  id | name          | release year
 ----|---------------|-------------
 1   | into the wild | 2007

 _actors:_

  id | name
 ---|----
  1  | Emile Hirsch
  2  | Vince Vaughn
 
 Now actors are atomar, but how do we connect actors to movies? One actor can be part of multiple
we find out the id for the movie and look up all entries with said movie_id inside the many-to-many table and
 get a bunch of actor_ids and now we can take those ids and look up their names inside the actor table.<br/>
 This is a very simplified example, but the basic idea is that data is split into multiple tables and you have to do complex queries to get them in a form you actually need. The more tables you have to join together
 the slower everything gets.<br/>
 The advantage is if an actor marries and changes his name you only have to update one record because the of atomicity, but the price can be quite high. The question now is, why don't we save the data in a way that we actually use them?
 
 ### Document Databases
 
 Document databases solve exactly this problem. They save data in a structured and nested way. The data is often saved in JSON an example for our movie might look like this:
 
 ````json
 {
     "movie_name":"Into the Wild",
     "movie_release_year":"2007",
     "actors":
         ["Emile Hirsch", "Vince Vaughn"]
 }
 ````

 Note how all relevant data is saved in one document.
 This drastically speeds up the time to retrieve the data.<br/>
 Another interesting fact is that even though the data is structured, document databases are schemaless. Unlike relational databases, you don't have to decide how your data looks like
 in the beginning.<br/>
 Imagine you don't only want to save movies, but also tv-shows.

````json
 {
     "tv_show_name":"Game of Thrones",
     "seasons":
         [
             {
                 "season_name":"first season",
                 "episodes":
                     [
                         {
                             "episode_name":"Winter is Coming",
                             "episode_release_date":"14.04.2011"
                         },
                         {
                             "episode_name":"The Kingsroad",
                             "episode_release_date":"24.04.2011"
                         }
                     ]
             }
         ]
 }
 ````

Usually, we don't want to save data for the sake of saving it, but we want to work with it.
 In order to do this the program that accesses the database will expect a certain schema
 anyway, but you definitely have more leeway in structuring your data and can adapt faster.
 Examples for document databases are MongoDB, DynamoDB, Azure DocumentDB and ArangoDB
 
### Key-Value Databases
 
 In key-value databases, the data has a very minimalist structure and is never nested.
 Like the name suggests we just have a key, to identify the record, and a value, which
 doesn't have to fit any structure on its own and can be completely different from the
 next key-value pair.<br/>
 What might this be useful for you might ask yourself? The most popular representative of this category is redis and it is also an in-memory database. It is often used for caching. Imagine you want to display the most popular movies. You would compute the average from all ratings for every movie, this is going to take some time no matter which type of database you use. To avoid doing this query everytime someone
 visits the page, you save the result in redis and give it an ID.<br/>
 It is important to note that the borders between the different database types are
 blurry and some products cover multiple areas, both DynamoDB and ArangoDB are key-value
 and document databases and ArangoDB is also a graph database.
 
### Graph Databases
 
 The name relational database might suggest that they are good at displaying relations
 between objects, when in fact they aren't and as mentioned before joins can be very time-consuming.<br/>
 The sole purpose of graph databases is to display relationships between objects.
 Where could that be useful on a movie website? If you want to display movies recommendations based on the ones the user rated a graph database is exactly what you need. You could easily figure out which movies were also highly rated for those people
 that liked "Into the Wild".
 
### Column Databases
 
 Relational Databases are row-oriented, they are very good at retrieving multiple rows fitting certain criteria. But what if you aren't really interested in the rows but a
 summary of one column. Let's take our example of average rating of a movie, for some
 reason we don't want to use any form of caching and we needed to do the task as efficient
 as possible.<br/>
 You can solve the task with relational databases, but they always have to load the whole row in the memory even though we are only interested in one column. This generates alot overhead. The solution is column databases, they are designed to solve exactly this problem.
 The way they do it is that they save the columns separately, which allows them to only
 access the columns that we interested in and thus ignoring the rest, saving a lot of
 time and ram usage.
 
### Summary
 
 Each database type fills books on its own, but I hope you got a rough idea when to use which database and that you definitely shouldn't always use one type. Evaluate the
 problem you try to solve and think which database type helps you do it.
 If you want to know more, I can recommend [this](https://www.youtube.com/watch?v=ASiU89Gl0F0)
 very interesting conference talk by Martin Fowler.
 
 
