//to insert data into movies collection
db.movies.insertMany([
  {
    title: "Fight Club",
    writer: "Chuck Palahniuko",
    year: 1999,
    actors: ["Brad Pit", "Edward Norton"],
  },
  {
    title: "Pulp Fiction",
    writer: "Quentin Tarantino",
    year: 1994,
    actors: ["John Travolta", "Uma Thurman"],
  },
  {
    title: "Inglorious Basterds",
    writer: "Quentin Tarantino",
    year: 2009,
    actors: ["Brad Pit", "Diane Kruger", "Eli Roth"],
  },
  {
    title: "The Hobbit: An Unexpected Journey",
    writer: "J.R.R. Tolkein",
    year: 2012,
    franchise: "The Hobbit",
  },
  {
    title: "The Hobbit: The Desolation of Smaug",
    writer: "J.R.R. Tolkein",
    year: 2013,
    franchise: "The Hobbit",
  },
  {
    title: "The Hobbit: The Battle of the Five Armies",
    writer: "J.R.R. Tolkein",
    year: 2012,
    franchise: "The Hobbit",
    synopsis:
      "Bilbo and company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness.",
  },
  { title: "Pee Wee Herman's Big Adventure" },
  {
    title: "Avatar",
  },
]);
//get all documents
db.movies.find()

//get all documents with writer set to "Quentin Tarantino"
db.movies.find({writer:"Quentin Tarantino"})

//get all documents where actors include "Brad Pit"
db.movies.find({actors:"Brad Pit"})

//get all documents with franchise set to "The Hobbit"
db.movies.find({franchise:"The Hobbit"})

//get all movies released in the 90s
db.movies.find({year:{$gt:1990,$lt:2000}})

//get all movies released before the year 2000 or after 2010
db.movies.find( {$or:[{year:{$lt:2000}},{year:{$gt:2010}}] } )

/** Update Documents starts **/

//add synopsis to "The Hobbit: An Unexpected Journey": "A reluctant hobbit,Bilbo Baggins,sets out to the lonely Mountain with a spirited group of dwarves to reclaim thier mountain home - and the gold within it - from the dragon Smaug"
db.movies.update({title:"The Hobbit: An Unexpected Journey"},{$set:{synopsis:"A reluctant hobbit,Bilbo Baggins,sets out to the lonely Mountain with a spirited group of dwarves to reclaim thier mountain home - and the gold within it - from the dragon Smaug"}})

//add a synopsis to "The Hobbit: The Desoltaion of Smaug": "The Dwarves,along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring"
db.movies.update({title:"The Hobbit: The Desolation of Smaug"},{$set:{synopsis:"The Dwarves,along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring"}})

//add an actor named "Samuel L. Jackson" to the movie "Pulp Fiction"
db.movies.update({title:"Pulp Fiction"},{$push:{actors:"Samuel L. Jackson"}})

/** Update Documents ends **/


/** Text Search starts **/

db.movies.createIndex({synopsis:"text"})
//find all movies that have a synopsis that contains the word "Bilbo"
db.movies.aggregate([{$match : {$text : { $search:"Bilbo"}}}])

//find all movies that have a synopsis that contains the word "Gandalf"
db.movies.aggregate([{$match : {$text : { $search:"Gandalf"}}}])

//find all movies that have a synopsis that contain the word "Bilbo" and not the word "Gandalf"
db.movies.aggregate([{$match : {$text : { $search:"Bilbo  -Gandalf"}}}])

//find all movies that have a synopsis that contain the word "dwarves" or "hobbit"
db.movies.aggregate([{$match : {$text : { $search:"dwarves  hobbit"}}}])

//find all movies that have a synopsis that contain the word "gold" and "dragon"
db.movies.aggregate([{$match : {$text : { $search:"gold  dragon"}}}])

/** Text Search ends **/

/** Delete Documents starts **/
//delete the movie "Pee Wee Herman's Big Adventure"
db.movies.deleteOne({title : "Pee Wee Herman's Big Adventure"})

//delete the movie "Avatar"
db.movies.deleteOne({title : "Avatar"})

/** Delete Documents ends **/

/** assignment 2 */
//use find to get zipcodes wehre city is ATLANTA and state is GA
db.zipcodes.find({city:"ATLANTA",state:"GA"})

//use aggreagte $match to get above result
db.zipcodes.aggregate([ {$match : { $and: [{city:"ATLANTA"},{state:"GA"}]} }])

//use $group to count number of zipcodes in ATLANTA
db.zipcodes.aggregate([ {$macth: {city:"ATLANTA"} },{$count:""}])

//use $group to find total population in ATLANTA


//use aggragate to calculate total population of each state


//sort the above result by population, highest first


//limit the above result to just first 3


//use aggregate to calculate total population of each city


//sort the above result by population, highest first


//limit the above result to 3


//what are the top 3 cities in population in Texas