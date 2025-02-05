// Import the MongoClient from the 'mongodb' package
const { MongoClient } = require('mongodb');

// MongoDB Atlas URI provided by you
const quizDataDB_URI = 'mongodb+srv://iambibin:cGggPH5xKOVY42I7@map-users.ridby.mongodb.net/quizData?retryWrites=true&w=majority';

// The database and collection you want to insert the data into
const dbName = "quizData"; // Your DB name
const collectionName = "queries"; // Your collection name

// The JSON data you want to store
const questionData = {
  "questions": [
      {
        "questionId": 1,
        "queryLocale": "en_US",
        "query": "Gym near me",
        "viewportAge": "Stale",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=13f_n5K7R2_Ut2g5-f2qWF7eM2KgpDSw&ehbc=2E312F",
        "business": {
          "name": "1- LegacyGym",
          "address": "1891 Yellowstone Rd, Rock Springs, WY 82901",
          "classification": "Sports",
          "distanceToUser": "17.2 km",
          "distanceToViewport": "4.2 km",
          "latLng": "41.64208, -109.25411"
        },
        "correctAnswers": {
          "Navigation": "nav-no",
          "Relevance": "Bad",
          "NameAccuracy": "Partially Correct",
          "AddressAccuracy": "Correct",
          "PinAccuracy": "Next Door",
          "comments": "Relevance: Bad. There are many other results closer to the user.Name Accuracy: Partially Correct. There is a missing space between the two words of the result's name.Pin Accuracy: Next Door. The pin drops on the immediate property next to the intended one."
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": ["distance"],
          "addressReason": []
        }
      },
      {
        "questionId": 2,
        "queryLocale": "en_US",
        "query": "vegan-friendly brunch",
        "viewportAge": "Stale",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1Kk1D2nganu836eFXIg2ZmFmFjeFQqEw&ehbc=2E312F",
        "business": {
          "name": "1. Olde Town Cafe",
          "address": "316 W. Holly St., Bellingham, WA 98225",
          "classification": "Bistro",
          "distanceToUser": "0.6 km",
          "distanceToViewport": "0 km",
          "latLng": "48.75183, -122.48199"
        },
        "correctAnswers": {
          "Navigation": "nav-no",
          "Relevance": "Good",
          "NameAccuracy": "Partially Correct",
          "AddressAccuracy": "Correct",
          "PinAccuracy": "Approximate",
          "comments": "Name includes extra letter 'e'.Pin lands in front of restaurant but within half'n'half rule."
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": ["distance"],
          "addressReason": []
        }
      },
      {
        "questionId": 3,
        "queryLocale": "en_US",
        "query": "houston weather",
        "viewportAge": "Fresh",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1Y4LHLomER2_KuC5kEy12K5L9mbNVJiA&ehbc=2E312F",
        "business": {
          "name": "1. Weather Research Center",
          "address": "5103 Caroline St, Houston, TX 77004",
          "classification": "",
          "distanceToUser": "233 km",
          "distanceToViewport": "230 km",
          "latLng": "29.72753, -95.38474"
        },
        "correctAnswers": {
          "Navigation": "nav-no",
          "Relevance": "Bad",
          "NameAccuracy": "",
          "AddressAccuracy": "",
          "PinAccuracy": "",
          "comments": "The location is well suited for the query, and navigation is fine. Some pin inaccuracies are noted due to the urban setting."
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "yes",
          "relevanceReason": ["userintent"],
          "addressReason": []
        }
      },
      {
        "questionId": 4,
        "queryLocale": "en_US",
        "query": "five guys",
        "viewportAge": "Stale",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1G_P-E9N9VUyrfG1zNSxDK_huohU5pOI&ehbc=2E312F",
        "business": {
          "name": "3. Five Guys",
          "address": "555 Broadway UNIT 124, Chula Vista, CA 91910",
          "classification": "Fast food restaurant",
          "distanceToUser": "3.34 km",
          "distanceToViewport": "9.45 km",
          "latLng": "32.63025, -117.08751"
        },
        "correctAnswers": {
          "Navigation": "nav-no",
          "Relevance": "Excellent",
          "NameAccuracy": "Correct",
          "AddressAccuracy": "Incorrect",
          "PinAccuracy": "Perfect",
          "comments": "Address Accuracy: Incorrect - Unit/Apt. The unit number is not the one the user was searching for. [118]"
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": [],
          "addressReason": ["unit"]
        }
      },
      {
        "questionId": 5,
        "queryLocale": "en_US",
        "query": "Apple Store Chestnut",
        "viewportAge": "Fresh",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1oXRs_DBpQd0spirkEpoKJvmHo9ADVEs&ehbc=2E312F",
        "business": {
          "name": "1. Apple Union Square",
          "address": "300 Post St, San Francisco, CA 94108",
          "classification": "Electronic store",
          "distanceToUser": "9.4 km",
          "distanceToViewport": "0 km",
          "latLng": "37.78861, -122.40697"
        },
        "correctAnswers": {
          "Navigation": "nav-yes",
          "Relevance": "Bad",
          "NameAccuracy": "Correct",
          "AddressAccuracy": "Correct",
          "PinAccuracy": "Perfect",
          "comments": "Relevance: Bad. The query is a chain business with a location modifier, Viewport is fresh and the user inside but user's location has to be disregarded because of the location modifier. There's one result that matches the query and therefore, Navigational. This result does not satisfy the specific location modifier and would not be useful to the user searching only for Apple Store in Chestnut St."
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": ["userintent"],
          "addressReason": [""]
        }
      },
      {
        "questionId": 6,
        "queryLocale": "en_US",
        "query": "Italian",
        "viewportAge": "Fresh",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1hObWhJkpNafeBz2tSiITXwBCq3ttuZU&ehbc=2E312F",
        "business": {
          "name": "3. Anzio's Italian Restaurant",
          "address": "12418 N 28th Dr #1, Phoenix, AZ 85029",
          "classification": "Italian",
          "distanceToUser": "27.5 km",
          "distanceToViewport": "18.6 km",
          "latLng": "33.59882, -112.1203"
        },
        "correctAnswers": {
          "Navigation": "nav-no",
          "Relevance": "Bad",
          "NameAccuracy": "Correct",
          "AddressAccuracy": "Incorrect",
          "PinAccuracy": "Next Door",
          "comments": "Pin lands in the Next Door Rooftop. Check 9.1.4 Next Door"
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": ["distance"],
          "addressReason": ["unit"]
        }
      },
      {
        "questionId": 7,
        "queryLocale": "en_US",
        "query": "green sand beach",
        "viewportAge": "Fresh",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1UdRXj82EFJfxHvU5Fe_9A_0YH31jCMA&ehbc=2E312F",
        "business": {
          "name": "3. Papakōlea Green Sand Beach",
          "address": "Naalehu, HI 96772",
          "classification": "Beach",
          "distanceToUser": "104.1 km",
          "distanceToViewport": "65.8 km",
          "latLng": "18.9363, -155.64604"
        },
        "correctAnswers": {
          "Navigation": "nav-yes",
          "Relevance": "Navigational",
          "NameAccuracy": "Correct",
          "AddressAccuracy": "Correct",
          "PinAccuracy": "Perfect",
        "comments": "Typically natural features do not have a street address, so natural feature results should be returned without any street address components. If a street address is present, it is considered Incorrect. Other Issue."
    
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": [],
          "addressReason": []
        }
      },
      {
        "questionId": 8,
        "queryLocale": "en_US",
        "query": "peabody duck lobby Memphis",
        "viewportAge": "Stale",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1tM2ks2BxOZY3_GRjW2X0EG-JS_vye-w&ehbc=2E312F",
        "business": {
          "name": "2. The Peabody Memphis",
          "address": "149 Union Ave, Memphis, TN 38103",
          "classification": "Hotel",
          "distanceToUser": "11.23 km",
          "distanceToViewport": "0 km",
          "latLng": "35.14271, -90.05194"
        },
        "correctAnswers": {
          "Navigation": "nav-yes",
          "Relevance": "Navigational",
          "NameAccuracy": "Correct",
          "AddressAccuracy": "Correct",
          "PinAccuracy": "Approximate",
        "comments": "The pin drops off the edge of the appropriate rooftop and should be rated Approximate"
    
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": [],
          "addressReason": []
        }
      },
      {
        "questionId": 9,
        "queryLocale": "en_US",
        "query": "1804 Felicity St, New Orleans, LA 70113",
        "viewportAge": "Stale",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1rwsNmm2ud9wqm0Tzg0dlQyB2xNNnVkk&ehbc=2E312F",
        "business": {
          "name": "2. 1804 Felicity St",
          "address": "1804 Felicity St, New Orleans, LA 70113",
          "classification": "",
          "distanceToUser": "1.99 km",
          "distanceToViewport": "933 m",
          "latLng": "29.93822, -90.07996"
        },
        "correctAnswers": {
          "Navigation": "nav-yes",
          "Relevance": "Navigational",
          "NameAccuracy": "N/A",
          "AddressAccuracy": "Correct",
          "PinAccuracy": "Perfect",
        "comments": "The pin drops off the edge of the appropriate rooftop and should be rated Approximate"
    
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": [],
          "addressReason": []
        }
      },
      {
        "questionId": 10,
        "queryLocale": "en_US",
        "query": "how to make a pizza",
        "viewportAge": "Fresh",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1MKk7-b0wCBgJHcZWB8qEYj2a4BYeAkU&ehbc=2E312F",
        "business": {
          "name": "3. Pizzeria Magaddino",
          "address": "1105 NE 13th St, Fort Lauderdale, FL 33304",
          "classification": "Bar",
          "distanceToUser": "3.1 km",
          "distanceToViewport": "0 km",
          "latLng": "26.14275, -80.13228"
        },
        "correctAnswers": {
          "Navigation": "nav-no",
          "Relevance": "Bad",
          "NameAccuracy": "Incorrect",
          "AddressAccuracy": "Correct",
          "PinAccuracy": "Perfect",
        "comments": "Relevance: Bad as the query has no Maps Intent.Name Accuracy: Incorrect, because of classification."
    
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": ["userintent"],
          "addressReason": []
        }
      },
      {
        "questionId": 11,
        "queryLocale": "en_US",
        "query": "denver",
        "viewportAge": "Fresh",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1qLwDnpmshc4gOmBpNbxelzCCOQUBywg&ehbc=2E312F",
        "business": {
          "name": "1.Denver International Airport",
          "address": "1105 NE 13th St, Fort Lauderdale, FL 33304",
          "classification": "Airport",
          "distanceToUser": "23 km",
          "distanceToViewport": "0 km",
          "latLng": "39.85009, -104.67365"
        },
        "correctAnswers": {
          "Navigation": "nav-yes",
          "Relevance": "Good",
          "NameAccuracy": "Correct",
          "AddressAccuracy": "Correct",
          "PinAccuracy": "Perfect",
        "comments": "The result represents the airport within thequeried locality, which satisfies the secondary transit intent."
    
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": ["userintent"],
          "addressReason": []
        }
      },
      {
        "questionId": 12,
        "queryLocale": "en_US",
        "query": "denver",
        "viewportAge": "Fresh",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1qLwDnpmshc4gOmBpNbxelzCCOQUBywg&ehbc=2E312F",
        "business": {
          "name": "3. Denver",
          "address": "Denver, Colorado, USA",
          "classification": "Address",
          "distanceToUser": "5 km",
          "distanceToViewport": "30 km",
          "latLng": "39.74077, -104.98023"
        },
        "correctAnswers": {
          "Navigation": "nav-yes",
          "Relevance": "Navigational",
          "NameAccuracy": "N/A",
          "AddressAccuracy": "Correct",
          "PinAccuracy": "Perfect",
        "comments": "Query is for the city of SDenver and the result satisfies the user intent."
    
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": [],
          "addressReason": []
        }
      },
      {
        "questionId": 13,
        "queryLocale": "en_US",
        "query": "Costco Gasoline",
        "viewportAge": "Fresh",
        "iframesrc": "https://www.google.com/maps/d/embed?mid=1IEdLFRHH3gWcD9R8bGyfRWJgeuHaTDo&ehbc=2E312F",
        "business": {
          "name": "1. Costco Wholesale",
          "address": "4589 Kapolei Pkwy Kapolei, HI 96707 United States",
          "classification": "Warehouse store",
          "distanceToUser": "23 km",
          "distanceToViewport": "300 m",
          "latLng": "21.32671, -158.08776"
        },
        "correctAnswers": {
          "Navigation": "nav-no",
          "Relevance": "Bad",
          "NameAccuracy": "Correct",
          "AddressAccuracy": "Correct",
          "PinAccuracy": "Perfect",
        "comments": "Relevance: Bad sinec the user is looking for costo gasoline not  costo wholesale ."
    
        },
        "radioAnswers": {
          "unexpectedlanguage": "no",
          "POIclosed": "no",
          "relevanceReason": ["userintent"],
          "addressReason": []
        }
      }
    ]
};

async function main() {
  // Connect to MongoDB Atlas using the URI
  const client = new MongoClient(quizDataDB_URI);

  try {
    // Connect to the MongoDB database
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    // Access the database and collection
    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Insert the data into the collection
    const result = await collection.insertOne(questionData);
    console.log("Data inserted with _id:", result.insertedId);
  } catch (error) {
    console.error("Error inserting data:", error);
  } finally {
    // Close the connection to MongoDB
    await client.close();
  }
}

// Run the main function
main().catch(console.error);
