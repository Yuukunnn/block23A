// Use the API_URL variable to make fetch requests to the API.
// Replace the placeholder with your cohort name (ex: 2109-UNF-HY-WEB-PT)
const cohortName = "YOUR COHORT NAME HERE";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/2402-ftb-mt-web-pt`;
//players: https://fsa-puppy-bowl.herokuapp.com/api/2402-ftb-mt-web-pt/players



/**
 * Fetches all players from the API.
 * @returns {Object[]} the array of player objects
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2402-ftb-mt-web-pt/players');
    const playersObj = await response.json();
    return playersObj.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

/**
 * Fetches a single player from the API.
 * @param {number} playerId
 * @returns {Object} the player object
 */
const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2402-ftb-mt-web-pt/players/${playerId}`);
    const singlePlayer = await response.json();
    console.log(singlePlayer);
    return singlePlayer.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};


/**
 * Adds a new player to the roster via the API.
 * @param {Object} playerObj the player to add
 * @returns {Object} the player returned by the API
 */
const addNewPlayer = async (playerObj) => {
  try {
    const newPlayer = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2402-ftb-mt-web-pt/players',
    { method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(playerObj)
    }
  );
    const result = await newPlayer.json();
    console.log(result);
    return result.data.newPlayer;

  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

/**
 * Removes a player from the roster via the API.
 * @param {number} playerId the ID of the player to remove
 */
const removePlayer = async (playerId) => {
  console.log(playerId)
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2402-ftb-mt-web-pt/players/${playerId}`,
      {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
      }
    )
      const result = await response.json();
      console.log(result);
      init();
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

/**
 * Updates `<main>` to display a list of all players.
 *
 * If there are no players, a corresponding message is displayed instead.
 *
 * Each player is displayed in a card with the following information:
 * - name
 * - id
 * - image (with alt text of the player's name)
 *
 * Additionally, each card has two buttons:
 * - "See details" button that, when clicked, calls `renderSinglePlayer` to
 *    display more information about the player
 * - "Remove from roster" button that, when clicked, will call `removePlayer` to
 *    remove that specific player and then re-render all players
 *
 * Note: this function should replace the current contents of `<main>`, not append to it.
 * @param {Object[]} playerList - an array of player objects
 */

  const renderAllPlayers = (playersArry) => {
    console.log(playersArry)

    if (playersArry.length >0 ) {
    const playerContainer = document.getElementById('players_container');
    playerContainer.innerHTML ='';

    playersArry.forEach((player) => {
      const playersUl = document.createElement('ul');
      const playerName = document.createElement('li');
      playerName.textContent = `Name: ${player.name}`;
      const playerId = document.createElement('li');
      playerId.textContent = `ID: ${player.id}`;
      const playerImg = document.createElement('img');
      playerImg.src = player.imageUrl;
      playerImg.alt = player.name;
      const detailsButton = document.createElement('button');
      detailsButton.textContent = "Details" 
      const removeButton = document.createElement('button');
      removeButton.textContent = "Remove";

      const playerInfoWrapper = document.createElement('div');
      playerInfoWrapper.className = 'playerInfoWrapper';

      playerInfoWrapper.appendChild(playerName);
      playerInfoWrapper.appendChild(playerId);
      playerInfoWrapper.appendChild(detailsButton);
      playerInfoWrapper.appendChild(removeButton);

      playersUl.appendChild(playerInfoWrapper);
      playersUl.appendChild(playerImg);
      playerContainer.appendChild(playersUl);

      detailsButton.addEventListener('click', (e) => {
        e.preventDefault;
        renderSinglePlayer(player);
      })

      removeButton.addEventListener('click', (e) => {
        e.preventDefault;
        removePlayer(player.id);

      })
    
  })
  } else {
    alert("Unfortunately, No Players availabile!")
  }
};

/**
 * Updates `<main>` to display a single player.
 * The player is displayed in a card with the following information:
 * - name
 * - id
 * - breed
 * - image (with alt text of the player's name)
 * - team name, if the player has one, or "Unassigned"
 *
 * The card also contains a "Back to all players" button that, when clicked,
 * will call `renderAllPlayers` to re-render the full list of players.
 * @param {Object} player an object representing a single player
 */
const renderSinglePlayer = (player) => {
  const playerContainer = document.getElementById('players_container');
    playerContainer.innerHTML ='';

    const playersUl = document.createElement('ul');
    const playerName = document.createElement('li');
    playerName.textContent = `Name: ${player.name}`;
    const playerBreed = document.createElement('li');
    playerBreed.textContent = `Breed: ${player.breed}`;
    const playerId = document.createElement('li');
    playerId.textContent = `ID: ${player.id}`;
    const playerTeam = document.createElement('li');
    if (player.team) {
    playerTeam.textContent = `Team: ${player.team}` 
  } else {
    playerTeam.textContent = "Unassigned";
  };
    const playerImg = document.createElement('img');
    playerImg.src = player.imageUrl;
    playerImg.alt = player.name;
    const backButton = document.createElement('button');
    backButton.textContent = "Back to All";

    backButton.addEventListener('click', (e) => {
      e.preventDefault();
      init()
    });

    const playerInfoWrapper = document.createElement('div');
    playerInfoWrapper.className = 'single';

    playerInfoWrapper.appendChild(playerName);
    playerInfoWrapper.appendChild(playerBreed);
    playerInfoWrapper.appendChild(playerId);
    playerInfoWrapper.appendChild(playerTeam);
    playerInfoWrapper.appendChild(backButton);

    playersUl.appendChild(playerInfoWrapper);
    playersUl.appendChild(playerImg);
    playerContainer.appendChild(playersUl);


};

/**
 * Fills in `<form id="new-player-form">` with the appropriate inputs and a submit button.
 * When the form is submitted, it should call `addNewPlayer`, fetch all players,
 * and then render all players to the DOM.
 */
const renderNewPlayerForm = () => {
  try {

    const newPlayerForm = document.getElementById('new-player-form');
    newPlayerForm.innerHTML = '';

    const fields = ['Name', 'Breed','Status', 'ImageUrl'];
    fields.forEach((field) => {
      const formLabel = document.createElement('label');
      formLabel.textContent = field;
      const formInput = document.createElement('input');
      formInput.id = field + 'Input';
      newPlayerForm.appendChild(formLabel);
      newPlayerForm.appendChild(formInput);
    })

    const submitButton = document.createElement('button');
    submitButton.textContent = "Add";
    submitButton.className = "addNewPlayerBtn";
    newPlayerForm.appendChild(submitButton);
    

    submitButton.addEventListener('click', async (e) => {
      e.preventDefault();

      const newPlayerObj = {};
      const nameElement = document.getElementById('NameInput');
      const breedElement = document.getElementById('BreedInput');
      const statusElement = document.getElementById('StatusInput');
      const urlElement = document.getElementById('ImageUrlInput');

      newPlayerObj.name = nameElement.value;
      newPlayerObj.breed = breedElement.value;
      newPlayerObj.status = statusElement.value;
      newPlayerObj.imageUrl = urlElement.value;
      newPlayerObj.teamId = 421;

      await addNewPlayer(newPlayerObj);

      init();
    })
    
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

/**
 * Initializes the app by fetching all players and rendering them to the DOM.
 */
const init = async () => {
  const players = await fetchAllPlayers();
  renderAllPlayers(players);

  renderNewPlayerForm();
};

// This script will be run using Node when testing, so here we're doing a quick
// check to see if we're in Node or the browser, and exporting the functions
// we want to test if we're in Node.
if (typeof window === "undefined") {
  module.exports = {
    fetchAllPlayers,
    fetchSinglePlayer,
    addNewPlayer,
    removePlayer,
    renderAllPlayers,
    renderSinglePlayer,
    renderNewPlayerForm,
  };
} else {
  init();
}
