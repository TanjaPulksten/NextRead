# NextRead
This is a project for mobile programming course. 

I chose to build an app for avid readers to find new interesting books and a place to store a wish list of them. The app also has a map function to locate nearest bookstores. 

I first planned the app and it's functions in writing and then made a clickable prototype of it with Axure RP. The proto can be found at https://4eozz1.axshare.com/

Naturally the end result is not an exact copy of the prototype, but all the functions I planned can be found in the app. The app is not published in appstores.

The project uses React Native Elements and multiple useful Expo modules. Books are fetched from Google Books API and saved to a Firebase Real Time Database. 

The front page is simple, with buttons to book search and Wish List. The compass icon navigates to the Bookstore map.

![Front Page](https://github.com/TanjaPulksten/NextRead/blob/main/NextReadApp/pages/images/UI-1.PNG) ![Map](https://github.com/TanjaPulksten/NextRead/blob/main/NextReadApp/pages/images/UI-4.PNG)

The book search can be made by author name, key word search, genre or by any combination of them. A book can then be either added to user’s Wish List or shared to a friend via WhatsApp etc.

When adding a book to Wish List the app asks for a ”rating” that describes user’s level of excitement about reading said book. 

![Book Serach](https://github.com/TanjaPulksten/NextRead/blob/main/NextReadApp/pages/images/UI-2.0.PNG) ![Book Details](https://github.com/TanjaPulksten/NextRead/blob/main/NextReadApp/pages/images/UI-2.1.PNG) ![Add to WishList](https://github.com/TanjaPulksten/NextRead/blob/main/NextReadApp/pages/images/UI-2.2.PNG)

Wish List fetches saved books from Firebase and lists them. There is a Modal Selector (also used in the search for genres) for changing the order of the books. Tapping a book opens a detail page similar to the one above. On long press the book is deleted from the list.

![WishList](https://github.com/TanjaPulksten/NextRead/blob/main/NextReadApp/pages/images/UI-3.0.PNG) ![Sort WishList](https://github.com/TanjaPulksten/NextRead/blob/main/NextReadApp/pages/images/UI-3.1.PNG)

<<<<<<< HEAD
Next steps to further develop this app would be to add a list for books already read and opportunity to change the rating after reading. And then it would be great to have recommendations based on read books with good ratings.
=======
Next steps to further develop this app would be to add a list for books already read and opportunity to change the rating after reading. And then it would be great to have recommendations based on read books with good ratings.
>>>>>>> 6177aeb02f5ca8f5faa9bfec66b3410d020e9076
