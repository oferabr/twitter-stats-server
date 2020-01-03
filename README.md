# twitterStats-svc

simple service that get stats from twitter

install & start
* yarn 
* yarn start


## Endpoints

* ```/twitterStats/isAlive``` - endpoint for checking the availability of the service.
```

    "message": "twitterStats server is alive:: Sat Dec 21 2019 18:03:22 GMT+0200 (Israel Standard Time)"

```

* ```twitterStats/stats``` returns twitter statistics on top words, users, hashtags and number of tweets per second


response:<br>

returns the response status for each request in the requests array (matching order) and number of invokes
<br>response example:
```

 {
 stats:{
      "tweetsPerSecond": string
     "topWords": [
     {
        value:string,
        occurrences:number
        
     }],
     "topHastags": [
     {
             value:string,
             occurrences:number
             
      }],
     "topUsers":[
     {
             value:string,
             occurrences:number
             
      }]
    }
 }
```

##### Solution thought process

the two main requirments are the
* respond within 2ms
* server needs to "stay alive" for at least 15 minutes.<br>

the first requirment lead my to the though that I have to get the response in o(1).
means that the calculation of the top values must be on going and not during the request process. (and this is also the implementation)

after reading the second requirement I started reading about different solutions, like "trie" data structure and Lossy Counting algorithm.
as one of the requirements is work time < 3 hrs I decided to start with my original simple idea. map of words for each category.
and on my local machine it lasted for 25 minutes (and maybe more, but I shut it down)

##### Parts not handled/not handled optimally on purpose and why
* error handling: <br>
no detailed message for the user.
usually when creating error handling mechanism for each error the user will see appropriate message, or generic one.
I chose not to handle and display generic message for the user.
* logging: 
as it is home task and no tracking/bugs investigation will be done (as in production) I chose to skip ths part.

##### What you would do differently in a production environment

* I would dive into more reading/research on the best way to save the string without occurences, and in more efficient data structure
and use more elegant algorithm as mentioned in the solution thought.
* all data shouldn'tt be save in the service memory, and usage of DB is needed.
* as in prod we have several of instances we need to verify that no double counting is made, we can verify it using one of the json fields 
* same approach to the average number of tweets, the service can't save his own startup time.
* load tests
* integration tests


##### engineering assumptions
* there's a single instance of the service running
* stream handling should start when service is up
* there are words that we shouldn't count (I've added set of words that I ignore, but there are more that should be ignored)
