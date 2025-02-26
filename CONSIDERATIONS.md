### What do you think are the greatest areas of risk in completing the project?
Deal with the socket connection, as there are better ways to create and consume messages using sockets, I feel it woulb be better if I had separated the socket connections from server.ts


### List two or three features that you would consider implementing in the future that would add significant value to the project.
I would create a way to add more photos after the product is created, a way to edit the products, and I would like to limit the user to adding more items than the item limit allows.

### Describe the major design/build decisions and why you made them.
1. I decided to use mongodb for its flexibility, we know that the main advantage of a SQL database over a noSQL database, in addition to the relationships, is the data normalization factor, being a very powerful standard to avoid redundancy, but as the data is small and needs to be flexible in addition to using socket.io, I am also transmitting in json, the best database option was noSQL using mongodb, this way I could reuse same data structure in different parts of the project.
2. Those who are more focused on the development world know that we often need resources that we will not use in production, thinking about better organization and not mixing Docker configurations, I created a devcontainer environment. Finally, if you need containerized resources but use the same Docker configuration locally as you use in your real environment, how would you version this? With this configuration I made it,  everything is more organized and in its right place without any worries.
3. Using KISS principle, `K:keep, I: it, S:simple, S:stupid`. Why make things difficult?. 

### How long did the assignment take (in hours)? Please break down your answer into buckets (e.g. "Learning Framework", "Coding", "Debugging").
- Total hours: 11 hours
- Understanding the assignment and drawing the flow: 1 hour
- enviroment configuration (docker, swagger, tests, libraries, database): 3 hours
- coding (creating socket connection, routes, interfaces, components ...): 4 hours (2 backend and 2 frontend)
- testing (testing if every thing is ok, double check each route, each configuration): 1 hours
- documentation: 1 hour
- fixing problems 1 hour



### If you could go back and give yourself advice at the beginning of the project, what would it be?
I believe I did very well, I could have finished sooner but I decided to prioritize the quality of the api in general, but if I could go back I would advise myself on how to quickly resolve some problems I faced in docker configurations such as dev container.

### Did you learn anything new?
Yes, I learned how fix a lot of problems I didn't have before with docker.