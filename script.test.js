const {
  fetchAllPlayers,
  fetchSinglePlayer,
  addNewPlayer,
  removePlayer,
  renderAllPlayers,
  renderSinglePlayer,
  renderNewPlayerForm,
} = require("./script");

describe("fetchAllPlayers", () => {
  // Make the API call once before all the tests run
  let players;
  beforeAll(async () => {
    players = await fetchAllPlayers();
  });

  test("returns an array", async () => {
    expect(Array.isArray(players)).toBe(true);
  });

  test("returns players with name and id", async () => {
    players.forEach((player) => {
      expect(player).toHaveProperty("name");
      expect(player).toHaveProperty("id");
    });
  });
});

// TODO: Tests for `fetchSinglePlayer`
describe("fetchSinglePlayer", () => {
    let player;

  beforeAll(async () => {
    player = await fetchSinglePlayer(4101);
  });

  test("it returns an object not an array", function (){
    expect (Array.isArray(player)).toBe(false);
  })

  test("the name is matching with ID", function(){
    expect (player.name).toBe("Anise");
  })
})


// TODO: Tests for `addNewPlayer`

describe("addNewPlayer", () =>{
    let testNewPlayer; 

    beforeAll(async () => {
      testNewPlayer = await addNewPlayer({
          name: "Yukun",
          breed: "yeye",
          status: "field",
          ImageUrl: "https://www.pexels.com/photo/portrait-photo-of-an-adult-black-pug-1851164/"
      });
    });

    test("the API has a player named 'Yukun'", function () {
      expect (testNewPlayer.name).toBe("Yukun");
    })
  })

// (Optional) TODO: Tests for `removePlayer`
