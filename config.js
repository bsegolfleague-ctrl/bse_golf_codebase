const API_URL = "https://script.google.com/macros/s/AKfycbxoPhbVb2O-OV4C5huz15Ay58r20qJKYpR72_qYl99VNgVk9TbgXjGMZenjilNga1aRkQ/exec";

// READ example
fetch(API_URL)
  .then(res => res.json())
  .then(data => console.log(data));

// WRITE example
fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ Name: "New Player", Score: 75, Date: "2025-09-05" })
})
.then(res => res.json())
.then(data => console.log(data));
