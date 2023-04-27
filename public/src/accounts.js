/*
  {
    "id": "5f446f2ecfaf0310387c9603",
    "name": {
      "first": "Esther",
      "last": "Tucker"
    },
    ...
  }
*/

function findAccountById(accounts, id) {
    return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
    return accounts.sort((name1, name2) => {
        return name1.name.last > name2.name.last ? 1 : -1;
    });
}

function getTotalNumberOfBorrows(account, books) {
    let result = 0;
    books.forEach(({ borrows }) => {
        //looks through each book obj then goes inside the nested borrows arr;
        //updates result if account id and borrowed id match
        borrows.forEach(({ id }) => {
            if (id === account.id) {
                result++;
            }
        });
    });

    return result;
}

//parse through the books obj as well as the imbedded borrows obj
// push them into a new array of objects
function getBooksPossessedByAccount({ id }, books = [], authors = []) {
    let arr = [];

    books.forEach((book) => {
        const { borrows, authorId } = book;
        //finds the author from the id in obj book;
        let author = authors.find((author) => authorId === author.id);

        borrows.forEach((item) => {
            if (item.id === id && item.returned === false) {
                //if it matches the id and they haven't returned it yet
                //then push the new object into the array
                //with author being imbedded in another object
                arr.push({
                    ...book,
                    author: { ...author },
                });
            }
        });
    });

    return arr;
}

module.exports = {
    findAccountById,
    sortAccountsByLastName,
    getTotalNumberOfBorrows,
    getBooksPossessedByAccount,
};

console.log("this is all for testing no other commits were made");
