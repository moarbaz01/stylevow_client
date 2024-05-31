import jacket from "./assets/images/products/jacket-1.jpg";
import women from "./assets/images/products/clothes-1.jpg";
import watch from "./assets/images/products/watch-1.jpg";
import sports from "./assets/images/products/sports-1.jpg";
import shoe from "./assets/images/products/shoe-1.jpg";
import shampoo from "./assets/images/products/shampoo.jpg";
import shorts from "./assets/images/products/shorts-1.jpg";
import perfume from "./assets/images/products/perfume.jpg";

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const categoriesData = [
  {
    id: 1,
    url: jacket,
    name: "JACKETS",
    stock: 53,
  },
  {
    id: 2,
    url: women,
    name: "T-SHIRT",
    stock: 53,
  },
  {
    id: 3,
    url: watch,
    name: "WATCH",
    stock: 26,
  },

  {
    id: 4,
    url: sports,
    name: "SPORTS",
    stock: 28,
  },
  {
    id: 5,
    url: shorts,
    name: "SHORTS",
    stock: 3,
  },

  {
    id: 6,
    url: shoe,
    name: "SHOE",
    stock: 12,
  },
  {
    id: 7,
    url: shampoo,
    name: "SHAMPOO",
    stock: 4,
  },
  {
    id: 8,
    url: perfume,
    name: "PERFUME",
    stock: 21,
  },
];

const colors = [
  {
    id: 1,
    color: "red",
  },
  {
    id: 2,
    color: "orange",
  },
  {
    id: 3,
    color: "blue",
  },
  {
    id: 4,
    color: "green",
  },
  {
    id: 5,
    color: "yellow",
  },
  {
    id: 6,
    color: "purple",
  },
  {
    id: 7,
    color: "black",
  },
  {
    id: 8,
    color: "white",
  },
  {
    id: 9,
    color: "gray",
  },
];

const sizes = [
  {
    id: 1,
    size: "S",
  },
  {
    id: 2,
    size: "M",
  },
  {
    id: 3,
    size: "L",
  },
  {
    id: 4,
    size: "XL",
  },
  {
    id: 5,
    size: "XXL",
  },
  {
    id: 6,
    size: "2XL",
  },
];

const dealOfTheDay = {
  url: shampoo,
  name: "Shampoo, Conditionar & Facewash Pack",
  desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita totam qui quibusdam dolores incidunt aliquid ut magnam perspiciatis quia magni",
  price: 150,
  cutPrice: 300,
  sold: 20,
  available: 40,
  date: new Date(),
};

const product = {
  id: 1,
  title: "Mens Casual Premium Slim Fit T-Shirts ",
  price: 109,
  description:
    "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
  category: "Mens",
  mainImage:
    "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  descriptionImages: [
    "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
  ],
  images: [
    "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
  ],
  colors: ["orange", "yellow", "green", "blue"],
  sizes: ["S", "M", "L", "Xl", "XLL"],
  rating: {
    rate: 3.9,
    count: 120,
  },
  additionalDetails: {
    material: "cotton",
    stock: 50,
    brand: "nike",
  },
  averageRating: 4,
  reviews: [
    {
      user: "raju736",
      review: "Wow amazing product you should purchase this product",
      rating: 4.5,
    },

    {
      user: "modak36",
      review: "So beautiful, So elegant, Just looking like a wow",
      rating: 2,
    },
  ],
};

const cartProduct = [
  {
    title: "Casual Premium Slim Fit T-Shirts",
    img: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    price: 21,
    quantity: 2,
    totalPrice: 42,
    color: "black",
    size: "M",
    desc: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
  },
  {
    title: "Slim-fitting style",
    img: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    price: 42,
    quantity: 1,
    totalPrice: 42,
    color: "red",
    size: "XL",
    desc: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
  },
  {
    title: "Slim-fitting style",
    img: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    price: 42,
    quantity: 1,
    totalPrice: 42,
    color: "red",
    size: "XL",
    desc: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
  },
];

export { categoriesData, dealOfTheDay, colors, sizes, product, cartProduct, month };
