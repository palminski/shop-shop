export function pluralize(name, count) {
  if (count === 1) {
    return name
  }
  return name + 's'
}

export function idbPromise(storeName, method, object) {
  return new Promise((resolve, reject) => {
    //open connection to the db shop-shop with the version 1
    const request = window.indexedDB.open('shop-shop',1);

    //create variables to hold references to the DB, transaction, and objectStore
    let db, tx, store;

    //if vedrsion changed or this is the first time using DB run this method and create 3 object stores
    request.onupgradeneeded = function(e) {
      const db = request.result;
      //create object store for each type of data and set the primary key index to be the _id of the data
      db.createObjectStore('products',{keyPath: '_id'});
      db.createObjectStore('categories',{keyPath: '_id'});
      db.createObjectStore('cart',{keyPath: '_id'});
    };

    //handle any errors with connecting
    request.onerror = function(e) {
      console.log('There was an error');
    };

    //sucess
    request.onsuccess = function(e) {
      // save a reference of the database to the 'db' value
      db = request.result;
      //open transaction to do whatever we pass into store name
      tx = db.transaction(storeName, 'readwrite');
      //save reference to the store obj
      store = tx.objectStore(storeName);

      db.onerror = function(e) {
        console.log('error',e);
      };

      //methods
      switch(method) {
        case 'put':
          store.put(object);
          resolve(object);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function() {
            resolve(all.result);
          };
          break;
        case 'delete':
          store.delete(object._id);
          break;
        default:
          console.log('no valid method');
          break;
      }


      //when transaction complete close the connection
      tx.oncomplete = function() {
        db.close();
      };
    } ;
  });
}