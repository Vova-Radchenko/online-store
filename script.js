var app = angular.module('productsApp', []);

app.controller('ProductsController', ProductsController);

function Product (id, name, img, price, description, date) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.description = description;
    this.date = date;
}

function ProductInBasket (id, name, img, price, description, date) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.price = price;
    this.description = description;
    this.date = date;
}

function ProductsController () {
    this.products = [
        new Product(1, "Macbook 12", "img/macbook12.jpg", 1300, "good", 2016),
        new Product(2, "Macbook pro 13", "img/macbookpro.jpg", 3000, "good", 2016),
        new Product(3, "Macbook air", "img/macbookair.jpg", 999, "good", 2014),
        new Product(4, "Macbook pro 15", "img/macbookpro152015.jpg", 2500, "good", 2015),
        new Product(5, "Macbook pro 13", "img/macbookpro132015.jpg", 2000, "good", 2015),
        new Product(6, "Macbook pro 15", "img/macbookpro152016.jpg", 3500, "good", 2016)
    ];

    this.productsInBasket = [];

    this.title = "hello";

    this.editorAction = "Create";

    this.editor = {
        name: "",
        img: "",
        price: null,
        description: "",
        date: null,
        id: null
    }  

    // this.comparePrice = function (productA, productB) {
    //     debugger;
    //     return productA.price - productB.price;
    // }

    function comparePriceUp (productA, productB) {
        return productA.price - productB.price;
    }

    function comparePriceDown (productA, productB) {
        return productB.price - productA.price;
    }

    this.sortPriceUp = function () {
        // this.comparePrice = function (productA, productB) {
        //     return productA.price - productB.price;
        // };
        this.products.sort(comparePriceUp);
    }

    this.sortPriceDown = function () {
        // debugger;
        // function comparePrice(productA, productB) {
        //     return productB.price - productA.price;
        // }

        this.products.sort(comparePriceDown);
    }

    function compareDateUp (productA, productB) {
        return productA.date - productB.date;
    }

    function compareDateDown (productA, productB) {
        return productB.price - productA.price;
    }

    this.sortDateUp = function () {
        this.products.sort(compareDateUp);
    }

    this.sortDateDown = function () {
        this.products.sort(compareDateDown);
    }

    this.buyProduct = function (id) {
        var index = getIndexById.bind(this)(id);

        this.productsInBasket.unshift(this.products[index]);
        //this.productsInBasket.splice(index, 1, this.products[index]);
    }

    this.removeProductInBasket = function (id) {
        var index = getIndexByIdForBasket.bind(this)(id);

        this.productsInBasket.splice(index, 1);
    }

    this.addProduct = function (product) {
        this.products.unshift(product);
    }

    this.removeProduct = function (id) {
        var index = getIndexById.bind(this)(id);

        this.products.splice(index, 1);
    }

    this.updateProduct = function (id) {
        var index = getIndexById.bind(this)(id);
        this.editorAction = "Update";

        this.editor = angular.copy(this.products[index]);
    }

    this.updateProductInList = function (newProduct) {
        var index = getIndexById.bind(this)(newProduct.id);

        this.products.splice(index, 1, newProduct);
    }

    this.resetForm = function () {
        this.editor = {
            name: "",
            img: "",
            price: null,
            description: "",
            date: null,
            id: null
        }  
        this.editorAction = "Create";
    }

    this.submit = function () {
        switch(this.editorAction) {
            case 'Create':
                this.editor.id = Date.now();
                this.addProduct(this.editor);
                break;
            case 'Update':
                this.updateProductInList(this.editor);
                break;
        }
        // this.addUser(this.editor);
        this.resetForm();
    }

    function getIndexByIdForBasket (id) {
        return this.productsInBasket.findIndex(function (product) {
            return product.id === id;
        });
    }

    function getIndexById (id) {
        return this.products.findIndex(function (product) {
            return product.id === id;
        });
    }    
}

var usersController = new UsersController();