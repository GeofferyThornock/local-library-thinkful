const books = require("../../test/fixtures/books.fixture.js");
const authors = require("../../test/fixtures/authors.fixture.js");
//helper functions
//pulled from books.js
function sortBooksBorrowedStatus(books) {
    let borrowed = books.filter((e) => {
        return e.borrows[0].returned === false;
    });
    let notBorrowed = books.filter((e) => {
        return e.borrows[0].returned === true;
    });

    return [borrowed, notBorrowed];
}

function combinedAuthorAndBooks(books, authors) {
    let mappedAuthor = authors.map((e) => {
        //finds all of the books the author has written then maps it unto the author array;
        let book = books.filter((book) => book.authorId === e.id);
        return { ...e, books: book };
    });
    return mappedAuthor;
}

//main functions
function getTotalBooksCount(books) {
    return books.length;
}

function getTotalAccountsCount(accounts) {
    return accounts.length;
}

function getBooksBorrowedCount(books) {
    let arr = sortBooksBorrowedStatus(books);
    return arr[0].length;
}

function getMostCommonGenres(books) {
    let names = [];
    let arr = [];
    //using reduce here just so i can show that i used it and know how to use it
    //I understand there are way better ways of doing this
    books.reduce((acc, e) => {
        const { genre } = e;

        if (names.includes(genre)) {
            //count++;
            //this will only work because names and arr
            //have the same index locations for the "genre names"
            arr[names.indexOf(genre)].count++;
            return acc;
        }

        names.push(genre);
        arr.push({ name: genre, count: 1 });
        return acc;
    }, {});

    return arr.sort((a, b) => b.count - a.count).slice(0, 5);
}

function getMostPopularBooks(books) {
    let arr = [];

    books.forEach((e) => {
        const { borrows } = e;
        arr.push({ name: e.title, count: borrows.length });
    });

    return arr.sort((a, b) => b.count - a.count).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
    let combined = combinedAuthorAndBooks(books, authors);
    let arr = [];

    combined.forEach((e) => {
        const { books, name } = e;
        let popularity = 0;
        //goes through the whole book array that was combined into the author object
        //proceeds to deconstruct borrows and grab the length of it
        //adds it up to popularity incase there are multiple book objects in the array
        books.forEach(({ borrows }) => {
            return (popularity += borrows.length);
        });
        arr.push({ name: `${name.first} ${name.last}`, count: popularity });
    });
    return arr.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
    getTotalBooksCount,
    getTotalAccountsCount,
    getBooksBorrowedCount,
    getMostCommonGenres,
    getMostPopularBooks,
    getMostPopularAuthors,
};
