const init = () => {
    // console.log("🚀 Script loaded!");
  const inputForm = document.querySelector("form");

//   if (!inputForm) {
//     console.error("❌ Form not found! Check your HTML.");
//     return;
//   }

  inputForm.addEventListener("submit", (event) => {
    event.preventDefault(); //will prevent the default behave of form refreshing
    // console.log("✅ Form submitted!");
    const input = document.querySelector("input#searchByID"); //will get user input
    
    // if (!input) {
    //     console.error("❌ Input field not found! Check if it exists in HTML.");
    //     return;}

    //use fetch method to get data for movie when Id is entered
    fetch(`http://localhost:3000/movies/${input.value}`)
        .then((response) => {
            if (!response.ok){
                throw new Error("Movie not found"); // handle invalid IDs
            }
            return response.json();
        })
        .then ((data) => {
            //select title & summary elements
            const title = document.querySelector("section#movieDetails h4");
            const summary = document.querySelector("section#movieDetails p");

            //update page with movie details
            title.innerHTML = data.title;
            summary.innerText = data.summary;
        })
        .catch((error) =>{
            //display error message if ID is invalid
            const title = document.querySelector("section#movieDetails h4");
            const summary = document.querySelector("section#movieDetails p");
            title.innerText = "Movie not found";
            summary.innerHTML = "Please enter a valid ID.";
            console.error(error);
        });
  });
};

document.addEventListener('DOMContentLoaded', init);