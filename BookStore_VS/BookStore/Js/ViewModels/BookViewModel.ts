/// <reference path="../../scripts/typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../scripts/typings/bootstrap/bootstrap.d.ts" />


class BookViewModel {
    public bookList = ko.observableArray<Book>();
    public static cart = ko.observableArray<Cart>([]);
    public query = ko.observable<string>();
    public clickedValue = ko.observable<number>();
    public book = ko.observable<Book>();

    constructor() {
        this.clickedValue(0);
        this.bookList([]);
        this.sortBooks(0);
        this.book();
    }

    public enterPress(data, event) {

        if (this.query() != "") {
            if (event.which == 13)
                this.search(String(this.query()));
        }
        if (this.query() == "") {
            if (event.which == 13) {
                this.bookList.removeAll;
                this.sortBooks(this.clickedValue());
            } else {
                this.bookList.removeAll;
                this.sortBooks(this.clickedValue());
            }
            
        }
    }

    public modalCart(data: Book) {
        $("#addCartModal").modal("show");
    }

    public search(query: string) {
        if (this.query() == "") {
            this.bookList.removeAll;
            this.sortBooks(this.clickedValue());
        } else {
            var searchingData = this.bookList().filter((book) => {
                return book.name.indexOf(query) > -1 || book.author.indexOf(query) > -1;
            });
            if (searchingData.length > 0) {
                searchingData[0].id;
                this.bookList(searchingData);
            } else {
                $("#myModal").modal("show");
            }
        }
    }

    public GetBooks() {
        $(".loader").show();
        return new Promise((resolve, rejected) => {
            setTimeout(function () {
                $.ajax({
                    'url': 'http://localhost:52700/Books/GetBooks',
                    'success': function (data) {
                        var jsonString = String(data);
                        var parse = JSON.parse(jsonString);
                        resolve(parse);
                    },
                    'complete': function () {
                        $(".loader").fadeOut(250);
                    }
                })
            }, 2000);
        });
    }

    public compareDate(dateValue): number {

        var d = new Date();
        d.setDate(d.getDate() + 14);

        var d1 = new Date();
        d1.setDate(d1.getDate() - 14);

        var dateAnnouncment = d1.toISOString();
        var datePreview = d.toISOString();
        var isodate = new Date().toISOString();

        if (dateValue > isodate && dateValue < datePreview) {
            return 1;
        } else if (dateValue > dateAnnouncment && dateValue < isodate) {
            return 2;
        }

    }

    public sortBooks(cValue: number): void {

        this.bookList.removeAll();
        this.GetBooks().then((resolve) => {
            if (cValue == 0) {
                for (var i in resolve) {
                    resolve[i].publishedDate = resolve[i].publishedDate.substring(0, 10);
                    this.bookList.push(resolve[i]);
                }
            } else if (cValue == 1 || cValue == 2) {
                for (var i in resolve) {
                    if (resolve[i].TypeOfBook.id == cValue) {
                        resolve[i].publishedDate = resolve[i].publishedDate.substring(0, 10);
                        this.bookList.push(resolve[i]);
                    }
                }
            }
            else if (cValue == 3) {
                for (var i in resolve) {
                    if (resolve[i].publishedDate) {
                        if (this.compareDate(resolve[i].publishedDate) == 2) {
                            resolve[i].publishedDate = resolve[i].publishedDate.substring(0, 10);
                            this.bookList.push(resolve[i]);
                        }
                    }
                }
            } else if (cValue == 4) {
                for (var i in resolve) {
                    if (this.compareDate(resolve[i].publishedDate) == 1) {
                        resolve[i].publishedDate = resolve[i].publishedDate.substring(0, 10);
                        this.bookList.push(resolve[i]);
                    }
                }
            } else if (cValue == 5) {
                for (var i in resolve) {
                    if (resolve[i].isSuperOffer == true) {
                        resolve[i].publishedDate = resolve[i].publishedDate.substring(0, 10);
                        this.bookList.push(resolve[i]);
                    }
                }
            }
        });
    }

}

class Book {
    public id: number;
    public name: string;
    public publishedDate: string;
    public price: number;
    public author: string;
    public publishingHouse: string;
    public typeOfBook: number;
    public isSuperOffer: boolean;

    constructor() {
        this.id = 0;
        this.name = "";
        this.publishedDate = "";
        this.price = 0.0;
        this.author = "";
        this.publishingHouse = "";
        this.typeOfBook = 0;
        this.isSuperOffer = false;
    }
}

class Cart {
    public product = ko.observable<Book>();
    public quantity = ko.observable<number>();
    public dataStorage = ko.observable<string>();
    public cost = ko.computed(function () {
        return this.product().price * this.quantity();
    });
}


$(document).ready(function () {
    var vm = document.getElementById("bookList");
    ko.applyBindings(new BookViewModel(), vm);
});


