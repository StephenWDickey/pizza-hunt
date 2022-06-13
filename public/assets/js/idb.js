
// we create variable to hold our db connection
let db;


// created indexedDB db called pizza_hunt
// we set it to version 1

// .open() method opens connection to the db
// 2 parameters: name of db, version of db
const request = indexedDB.open('pizza_hunt', 1);


// if our indexedDB connection changes versions
// of when we first create the db, we run this event
request.onupgradeneeded = function(event) {
    
    
    const db = event.target.result;

    // createObjectStore() method creates an object store
    // we set autoincrement so each piece of data gets its own index
    db.createObjectStore('new_pizza', { autoIncrement: true });

};


// we add another event listener to connection
// when connection to db established we store
// object to db variable
request.onsuccess = function(event) {
    db = event.target.result;

    // if app is attached to internet we run uploadPizza()
    if (navigator.onLine) {
        
        // we invoke our function below
        uploadPizza();
    }
};

request.onerror = function(event) {
    console.log(event.target.errorCode);
};


// we write a function for when we have no internet connection
// this will write object to object store
function saveRecord(record) {
    
    // we create a 'transaction' to write an object
    // with key new_pizza, and we give it 
    // read/write permissions
    const transaction = db.transaction(['new_pizza'], 'readwrite');


    // access object store
    const pizzaObjectStore = transaction.objectStore('new_pizza');


    // add record to store
    // we use add() method to add object to object store
    pizzaObjectStore.add(record);
};

// now we write a function that will upload the pizza data
// when we go back online
function uploadPizza() {
    
    // create transaction
    const transaction = db.transaction(['new_pizza'], 'readwrite');

    // target specific object store
    const pizzaObjectStore = transaction.objectStore('new_pizza');

    //retrieve data from object store
    // getAll() method retrieves stored data in object store
    // getAll() method is asynchronous
    const getAll = pizzaObjectStore.getAll();

    // when getAll method is done,
    getAll.onsuccess = function() {

        // if there is data we post data
        if (getAll.result.length > 0) {
            fetch('/api/pizzas', {
                method: 'POST',
                // take indexed data and put it in body
                // .result property is an array of data from
                // the object store
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type' : 'application/json'
                }
            })
                .then(response => response.json())
                .then(serverResponse => {
                    if (serverResponse.message) {
                        throw new Error(serverResponse);
                    }
                    
                    const transaction = db.transaction(['new_pizza'], 'readwrite');

                    const pizzaObjectStore = transaction.objectStore('new_pizza');
                    
                    // clear out indexed data
                    // clear() method achieves this
                    pizzaObjectStore.clear();

                    alert('offline data submitted');
                })
                .catch( err => {
                    console.log(err);
                })
        }
    }
};


// create eventListener for network connection
// if network comes online we run uploadPizza function
window.addEventListener('online', uploadPizza);

