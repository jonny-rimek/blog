+++
title = "git basics"
date = "2018-02-09"
tags = ["git"]
+++

In one of my [earlier](https://jay_dee_bee.GitLab.io/jekyll/blog/2018/01/25/iwannalearnprogramming.html)
posts I recommended that new programmers should start learning git from the very
beginning. In this article, I want to touch on why git is such a valuable skill to learn.

#### What is git exactly?

Git is a so-called Version Control System (VCS). The idea behind is that every time
you make a significant change to your code, e.g. you add a new feature or in my case
write a new blog post, you want to "save" your changes. In git this is called a
_commit_ the associated command is `git commit`.<br/>
But unlike saving an ordinary file, your next commit doesn't overwrite your last
commit. That means you can check your code from 2 weeks ago. This can be crucial
if you want to track down a bug, you can go back a certain amount of time
and check if it existed back then.<br/>
Under the hood, a commit is not simply a copy of the code at a certain time. It
merely saves the changes from the last commit to the current one. To get a
better idea you can check out this [commit](https://GitLab.com/jay_dee_bee/config_files/commit/b7c66934b1dae1dec7c1863fe2eaefed1d355c67?view=inline&w=1) That means we can take a look what changed in our code since the bug was introduced.
This gives us a good starting point to track down and fix the bug.<br/>
This is but one of many use cases for git<br/>

#### What is new?

The next basic git command is `git add`. A commit by itself is not aware of any
changes in the code. As the name suggests we have to add the content before we can
commit it.<br/>
It is important to realize that git will only new files if you tell it to.
With `git add -A` you can add all files in the project directory.<br/>
In bigger projects, you pretty much always have files that you definitely don't
want to track. Those could be log files, binaries or most importantly secrets
like passwords for your database. To avoid adding those files you can create a
`.gitignore` file in the root directory of your project and simply add the file
names.<br/>
For example:
````
_site
.sass-cache
.jekyll-metadata
public/
````
Due to the fact that you always want to add changes before you commit them the
`git commit` command has the -a option which allows you to combine add and commit
into one command. This does not add new files only changes to files that were
already added. To add new files and commit them you have to run `git add -A && git commit`
<br/>

#### TLDR

There is one important part of commits we didn't talk about yet.<br/>
Seeing exactly what changed in the last couple of commits is neat, but big projects
can easily have __houndreds of thousands of commits__, like the Linux [kernel](https://github.com/torvalds/linux).
How could you possibly get an overview of what changed?<br/>
The solution is the git commit message. Every commit has to have a title. In this
title, you want to concisely summarize what changed in this commit. The second
optional part is the commit description. Here you generally want to record why
you changed to code. What and how exactly to write in the commit message warrants
an article on its own.

#### The big picture

The summary of all commits in git is called a repository and contains all the
versions of the code that you committed.

#### Show off!

In order to impress potential employers, you can make your code public and host it
on services like [GitLab.com](https://GitLab.com) or [github.com](https://github.com).
Both allow you to create free accounts.<br/>
Personally, I prefer GitLab for the following reasons:

Most people use GitHub just for the fact that it is the most popular one. Most
open source projects collaborate on GitHub. But the mere fact that it is the biggest
platform for open source projects is not open source itself just blows my mind.
GitLab's core, on the other hand, is open source.<br/>

I also really like the company ideals of GitLab, for one they are very open about
pretty much everything. For example there internal [document](https://about.GitLab.com/handbook/)
that describes their processes is public. They also openly talk about when things
go wrong, like the [incident](https://about.GitLab.com/2017/02/01/GitLab-dot-com-database-incident/)
from the 31.01.2017. Where they lost 6 hours of data.<br/>

You are allowed to have private projects. I find this useful for small and possibly
very old pet projects with shitty code that I don't really want anyone to see or
programming tasks for job interviews that the company doesn't want to be public.<br/>

You can even host the community edition on your own server, in case you don't want
your code on 3rd party services or just for fun.<br/>

Last and least the term merge request makes way more sense than pull request, at least to me.

In order to publish your commits on either platform, you need the `git push` command.
How exactly you can push your code to GitLab is explained when you create a new repository.

#### Shortcuts

Those are my bash aliases for the commands I explained in this post the rest you can find [here](https://GitLab.com/jay_dee_bee/config_files/blob/master/.bash_aliases)
````
#GIT

#git add commit push
#-v = verbose it displays all changes in the text editor where you write the commit message
  alias gacp='git add -A && git commit -v && git push'
  alias gac='git add -A && git commit -v'
  alias gcap='git commit -av && git push'
  alias gca='git commit -av'
````

#### Tip of the iceberg

What I explained here are just the very basics for using git alone. The biggest
benefit of git is how easy it becomes to work with multiple people on a single
project. Pretty much every company that is working with any kind of code will use
a VCS and git is the most popular one. So start learning git now.
