function findAuthorById(authors, id) {
    return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
    return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
    let borrowed = books.filter((e) => {
        return e.borrows[0].returned === false;
    });
    let notBorrowed = books.filter((e) => {
        return e.borrows[0].returned === true;
    });

    return [borrowed, notBorrowed];
}

function getBorrowersForBook({ borrows }, accounts) {
    let arr = [];
    accounts.forEach((e) => {
        //each time the account for loop runs through
        //it runs this borrow function
        borrows.forEach(({ id, returned }) => {
            //parses through the borrowers of a specific book
            //checks to see if any of the ids match the id for
            //the account were accessing
            if (id === e.id) {
                arr.push({ ...e, returned });
            }
        });
    });
    return arr.slice(0, 10);
}

module.exports = {
    findAuthorById,
    findBookById,
    partitionBooksByBorrowedStatus,
    getBorrowersForBook,
};
console.log("this is all for testing no other commits were made");
