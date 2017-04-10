/// <reference path="../../scripts/typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../../scripts/typings/jquery/jquery.d.ts" />
/// <reference path="../../scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../scripts/typings/bootstrap/bootstrap.d.ts" />
var BookViewModel = (function () {
    function BookViewModel() {
        this.bookList = ko.observableArray();
        this.query = ko.observable();
        this.clickedValue = ko.observable();
        this.book = ko.observable();
        this.clickedValue(0);
        this.bookList([]);
        this.sortBooks(0);
        this.book();
    }
    BookViewModel.prototype.enterPress = function (data, event) {
        if (this.query() != "") {
            if (event.which == 13)
                this.search(String(this.query()));
        }
        if (this.query() == "") {
            if (event.which == 13) {
                this.bookList.removeAll;
                this.sortBooks(this.clickedValue());
            }
            else {
                this.bookList.removeAll;
                this.sortBooks(this.clickedValue());
            }
        }
    };
    BookViewModel.prototype.modalCart = function (data) {
        $("#addCartModal").modal("show");
    };
    BookViewModel.prototype.search = function (query) {
        if (this.query() == "") {
            this.bookList.removeAll;
            this.sortBooks(this.clickedValue());
        }
        else {
            var searchingData = this.bookList().filter(function (book) {
                return book.name.indexOf(query) > -1 || book.author.indexOf(query) > -1;
            });
            if (searchingData.length > 0) {
                searchingData[0].id;
                this.bookList(searchingData);
            }
            else {
                $("#myModal").modal("show");
            }
        }
    };
    BookViewModel.prototype.GetBooks = function () {
        $(".loader").show();
        return new Promise(function (resolve, rejected) {
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
                });
            }, 2000);
        });
    };
    BookViewModel.prototype.compareDate = function (dateValue) {
        var d = new Date();
        d.setDate(d.getDate() + 14);
        var d1 = new Date();
        d1.setDate(d1.getDate() - 14);
        var dateAnnouncment = d1.toISOString();
        var datePreview = d.toISOString();
        var isodate = new Date().toISOString();
        if (dateValue > isodate && dateValue < datePreview) {
            return 1;
        }
        else if (dateValue > dateAnnouncment && dateValue < isodate) {
            return 2;
        }
    };
    BookViewModel.prototype.sortBooks = function (cValue) {
        var _this = this;
        this.bookList.removeAll();
        this.GetBooks().then(function (resolve) {
            if (cValue == 0) {
                for (var i in resolve) {
                    resolve[i].publishedDate = resolve[i].publishedDate.substring(0, 10);
                    _this.bookList.push(resolve[i]);
                }
            }
            else if (cValue == 1 || cValue == 2) {
                for (var i in resolve) {
                    if (resolve[i].TypeOfBook.id == cValue) {
                        resolve[i].publishedDate = resolve[i].publishedDate.substring(0, 10);
                        _this.bookList.push(resolve[i]);
                    }
                }
            }
            else if (cValue == 3) {
                for (var i in resolve) {
                    if (resolve[i].publishedDate) {
                        if (_this.compareDate(resolve[i].publishedDate) == 2) {
                            resolve[i].publishedDate = resolve[i].publishedDate.substring(0, 10);
                            _this.bookList.push(resolve[i]);
                        }
                    }
                }
            }
            else if (cValue == 4) {
                for (var i in resolve) {
                    if (_this.compareDate(resolve[i].publishedDate) == 1) {
                        resolve[i].publishedDate = resolve[i].publishedDate.substring(0, 10);
                        _this.bookList.push(resolve[i]);
                    }
                }
            }
            else if (cValue == 5) {
                for (var i in resolve) {
                    if (resolve[i].isSuperOffer == true) {
                        resolve[i].publishedDate = resolve[i].publishedDate.substring(0, 10);
                        _this.bookList.push(resolve[i]);
                    }
                }
            }
        });
    };
    BookViewModel.cart = ko.observableArray([]);
    return BookViewModel;
}());
var Book = (function () {
    function Book() {
        this.id = 0;
        this.name = "";
        this.publishedDate = "";
        this.price = 0.0;
        this.author = "";
        this.publishingHouse = "";
        this.typeOfBook = 0;
        this.isSuperOffer = false;
    }
    return Book;
}());
var Cart = (function () {
    function Cart() {
        this.product = ko.observable();
        this.quantity = ko.observable();
        this.dataStorage = ko.observable();
        this.cost = ko.computed(function () {
            return this.product().price * this.quantity();
        });
    }
    return Cart;
}());
$(document).ready(function () {
    var vm = document.getElementById("bookList");
    ko.applyBindings(new BookViewModel(), vm);
});
//# sourceMappingURL=BookViewModel.js.map