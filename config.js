const API_URL = "https://script.google.com/macros/s/AKfycbycXyMJdXXVU5kIIIKLgw3b0i8CZTF57nZngPpmLlsEBWIy2rQUN5Q7H73KdBQ8gY3hyQ/exec";

fetch(API_URL)
  .then(res => res.text())  // fetch as text, not JSON directly
  .then(text => JSON.parse(text))
  .then(data => console.log(data));

