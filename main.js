const voteOptions = {
  Catan: "catan-vote-id",
  Activity: "activity-vote-id",
  HedBanz: "hedbanz-vote-id",
};

function fetchVotes() {
  const entries = Object.entries(voteOptions);

  for (let i = 0; i < entries.length; i++) {
    const optionName = entries[i][0];
    const counterId = entries[i][1];

    fetch(`https://api.api-ninjas.com/v1/counter?id=${counterId}`, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Eroare la API");
        return response.json();
      })
      .then((data) => {
        const voteCard = document.getElementById(optionName);
        const voteCountSpan = voteCard.querySelector(".vote-count");
        voteCountSpan.innerText = data.value;
      })
      .catch((error) => {
        console.error(`Eroare la ${optionName}:`, error);
      });
  }
}

document.querySelectorAll(".vote-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const voteCard = button.closest(".vote-card");
    const optionName = voteCard.id;
    const counterId = voteOptions[optionName];

    button.disabled = true;

    fetch(`https://api.api-ninjas.com/v1/counter?id=${counterId}&hit=true`, {
      method: "GET",
      headers: {
        "X-Api-Key": API_KEY,
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Eroare la vot");
        return response.json();
      })
      .then((data) => {
        const voteCountSpan = voteCard.querySelector(".vote-count");
        voteCountSpan.innerText = data.value;
      })
      .catch((error) => {
        console.error("Eroare la trimiterea votului:", error);
      })
      .finally(() => {
        button.disabled = false;
      });
  });
});
