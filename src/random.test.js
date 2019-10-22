const {
  getRandom,
  getRandomFromArray,
  Range,
  intArrayFrom,
  createRandomString,
  createRandomStringFromArray,
  createString,
  createUserCredentials
} = require("./random");

describe("Έλεγχος getRandom", () => {
  it("Αν η αρχή και το τέλος είναι ίδιο δίνει την αρχή (συμπεριλαμβάνονται όρια)", () => {
    expect(getRandom(1, 1)).toBe(1);
  });
  it("Αν η αρχή και το τέλος είναι ίδιο δίνει την αρχή (συμπεριλαμβάνονται όρια)", () => {
    expect(getRandom(1, 0)).toBe(0);
  });
  it("Αν η αρχή και το τέλος είναι ίδιο δίνει την αρχή (τα όρια δεν συμπεριλαμβάνονται)", () => {
    expect(getRandom(1, 1, false)).toBe(1);
  });
  it("Βρίσκει ένα ακέραιο μεγαλύτερο από 5 και μικρότερο απο 7 (τα όρια δεν συμπεριλαμβάνονται)", () => {
    for (_ = 0; _ != 1000; _++) {
      expect(getRandom(5, 7, false) > 5).toBeTruthy();
      expect(getRandom(5, 7, false) < 7).toBeTruthy();
    }
  });
  it("Βρίσκει ένα ακέραιο μεγαλύτερο από 5 και μικρότερο απο 7 (τα όρια συμπεριλαμβάνονται)", () => {
    for (_ = 0; _ != 1000; _++) {
      expect(getRandom(5, 7) >= 5).toBeTruthy();
      expect(getRandom(5, 7) <= 7).toBeTruthy();
    }
  });
});

describe("Έλεγχος getRandomFromArray", () => {
  it("O κενός πίνακας επιστρέφει null", () => {
    expect(getRandomFromArray()).toBe(null);
  });
  it("O μοναδικός πίνακας επιστρέφει το μοναδικό στοιχείο", () => {
    expect(getRandomFromArray(["α"])).toBe("α");
    let obj = { test: 35 };
    expect(getRandomFromArray([1])).toBe(1);
    expect(getRandomFromArray([obj])).toStrictEqual(obj);
  });
  it("Το αποτέλεσμα πρέπει να ανήκει στο πίνακα", () => {
    const testArray = intArrayFrom(34, 567);
    for (_ = 0; _ != 100; _++) {
      const rnd = getRandomFromArray(testArray);
      expect(testArray.filter(val => val === rnd)).toStrictEqual([rnd]);
    }
  });
});

describe("Έλεγχος intArrayFrom", () => {
  it("Αν η αρχή και το τέλος είναι ίδιο δίνει [αρχη]", () => {
    expect(intArrayFrom(1, 1)).toStrictEqual([1]);
  });
  it("Αν το τέλος είναι μικρότερο επιστρέφει [τέλος, αρχή]", () => {
    expect(intArrayFrom(1, 0)).toStrictEqual([0, 1]);
  });
  it("Αν η αρχή και το τέλος είναι ίδιο επιστρέφει κενό πίνακα (τα όρια δεν συμπεριλαμβάνονται)", () => {
    expect(intArrayFrom(1, 1, false, false)).toStrictEqual([]);
  });
  it("Αν η αρχή και το τέλος είναι ίδιο επιστρέφει κενό πίνακα (τo κάτω όριο δεν συμπεριλαμβάνεται)", () => {
    expect(intArrayFrom(1, 1, false, true)).toStrictEqual([]);
  });
  it("Αν η αρχή και το τέλος είναι ίδιο επιστρέφει [ΑΡΧΗ] (τo πάνω όριο δεν συμπεριλαμβάνεται)", () => {
    expect(intArrayFrom(1, 1, true, false)).toStrictEqual([]);
  });
  it("Επιστρέφει τον πίνακα [0..5]", () => {
    expect(intArrayFrom(0, 5)).toStrictEqual([0, 1, 2, 3, 4, 5]);
  });
  it("Επιστρέφει τον πίνακα (0..5]", () => {
    expect(intArrayFrom(0, 5, false)).toStrictEqual([1, 2, 3, 4, 5]);
  });
  it("Επιστρέφει τον πίνακα [0..5)", () => {
    expect(intArrayFrom(0, 5, true, false)).toStrictEqual([0, 1, 2, 3, 4]);
  });
  it("Επιστρέφει τον πίνακα (0..5)", () => {
    expect(intArrayFrom(0, 5, false, false)).toStrictEqual([1, 2, 3, 4]);
  });
  it("Επιστρέφει τον πίνακα [3..7]", () => {
    expect(intArrayFrom(3, 7)).toStrictEqual([3, 4, 5, 6, 7]);
  });
  it("Επιστρέφει τον πίνακα (3..7]", () => {
    expect(intArrayFrom(3, 7, false)).toStrictEqual([4, 5, 6, 7]);
  });
  it("Επιστρέφει τον πίνακα [3..7)", () => {
    expect(intArrayFrom(3, 7, true, false)).toStrictEqual([3, 4, 5, 6]);
  });
  it("Επιστρέφει τον πίνακα (3..7)", () => {
    expect(intArrayFrom(3, 7, false, false)).toStrictEqual([4, 5, 6]);
  });
});

describe("Έλεγχος αντικειμένου Range", () => {
  it("Το αντικείμενο [0,0] δημιουργείται", () => {
    const r = new Range();
    expect(r.start).toBe(0);
    expect(r.end).toBe(0);
    expect(r.array).toStrictEqual([0]);
  });
  it("Το αντικείμενο (0,0) δημιουργείται", () => {
    const r = new Range(0, 0, false, false);
    expect(r.start).toBe(0);
    expect(r.end).toBe(0);
    expect(r.array).toStrictEqual([]);
  });
  it("Το αντικείμενο (0,0] δημιουργείται", () => {
    const r = new Range(0, 0, false);
    expect(r.start).toBe(0);
    expect(r.end).toBe(0);
    expect(r.array).toStrictEqual([]);
  });
  it("Το αντικείμενο (0,1] δημιουργείται", () => {
    const r = new Range(0, 1, false);
    expect(r.start).toBe(0);
    expect(r.end).toBe(1);
    expect(r.array).toStrictEqual([1]);
  });
  it("Το αντικείμενο [3,5] δημιουργείται", () => {
    const r = new Range(3, 5);
    expect(r.start).toBe(3);
    expect(r.end).toBe(5);
    expect(r.array).toStrictEqual([3, 4, 5]);
  });
  it("Το αντικείμενο (3,5] δημιουργείται", () => {
    const r = new Range(3, 5, false);
    expect(r.start).toBe(3);
    expect(r.end).toBe(5);
    expect(r.array).toStrictEqual([4, 5]);
  });
  it("Το αντικείμενο (3,5) δημιουργείται", () => {
    const r = new Range(3, 5, false, false);
    expect(r.start).toBe(3);
    expect(r.end).toBe(5);
    expect(r.array).toStrictEqual([4]);
  });
});

describe("Έλεγχος createRandomString", () => {
  it(`Επιστρέφει γραμματοσειρά από τα chr(65) -> chr(69)`, () => {
    for (_ = 0; _ != 100; _++) {
      let randString = createRandomString(50, 69, 65);
      expect(randString.length).toBe(50);
      expect(
        [...randString].filter(
          val => val.charCodeAt < 65 || val.charCodeAt() > 69
        )
      ).toStrictEqual([]);
    }
  });
  it(`Επιστρέφει '' όταν το len <= 0 αναξαρτήτως ορίων`, () => {
    expect(createRandomString(-10)).toBe("");
  });
  it(`Επιστρέφει '' όταν τα όρια δεν είναι αποδεκτά < 0 > 127 ανεξαρτήρως len`, () => {
    let randString = createRandomString(5);
    expect(createRandomString(5)).toBe("");
  });
  it(`Επιστρέφει γραμματοσειρά με 5 χαρακτήρες `, () => {
    expect(createRandomString(5, 90)).toBe("ZZZZZ");
    expect(createRandomString(5, 90).length).toBe(5);
  });
  it(`Επιστρέφει γραμματοσειρά με 50 κεφαλαίους χαρακτήρες`, () => {
    for (_ = 0; _ != 100; _++) {
      let randString = createRandomString(50, 65, 90);
      expect(randString.length).toBe(50);
      expect(
        [...randString].filter(
          val => val.charCodeAt < 65 || val.charCodeAt() > 90
        )
      ).toStrictEqual([]);
    }
  });
});

describe("Έλεγχος createRandomStringFromArray", () => {
  it(`Επιστρέφει '' σε κενό πίνακα`, () => {
    expect(createRandomStringFromArray(5, [])).toBe("");
  });
  it(`Επιστρέφει '' σε μη κενό κενό πίνακα με len 0`, () => {
    expect(createRandomStringFromArray(0, [45])).toBe("");
  });
  it(`Επιστρέφει '' σε μη κενό κενό πίνακα με len < 0`, () => {
    expect(createRandomStringFromArray(-1, [45])).toBe("");
  });
  it(`Επιστρέφει '' σε κενό πίνακα με len < 0`, () => {
    expect(createRandomStringFromArray(-1, [])).toBe("");
  });
  it(`Επιστρέφει γραμματοσειρά με 5 χαρακτήρες `, () => {
    expect(createRandomStringFromArray(5, [90])).toBe("ZZZZZ");
    expect(createRandomStringFromArray(5, [90]).length).toBe(5);
  });
  it(`Επιστρέφει γραμματοσειρά με 50 κεφαλαίους χαρακτήρες`, () => {
    for (_ = 0; _ != 100; _++) {
      let randString = createRandomStringFromArray(50, intArrayFrom(65, 90));
      expect(randString.length).toBe(50);
      expect(
        [...randString].filter(
          val => val.charCodeAt < 65 || val.charCodeAt() > 90
        )
      ).toStrictEqual([]);
    }
  });
});

describe("Έλεγχος createString", () => {
  it(`Επιστρέφει γραμματοσειρά με 50 χαρακτήρες χωρίς special`, () => {
    for (_ = 0; _ != 100; _++) {
      let randString = createString(50, true, false);
      expect(randString.length).toBe(50);
      expect(
        [...randString].filter(val => {
          let v = val.charCodeAt();
          return v < 48 || v > 122 || (v > 57 && v < 65) || (v > 90 && v < 97);
        })
      ).toStrictEqual([]);
    }
  });
  it(`Επιστρέφει γραμματοσειρά με 50 χαρακτήρες με special`, () => {
    for (_ = 0; _ != 100; _++) {
      let randString = createString(50, true, true);
      expect(randString.length).toBe(50);
      expect(
        [...randString].filter(val => {
          let v = val.charCodeAt();
          return v < 48 || v > 122 || (v > 57 && v < 65) || (v > 90 && v < 97);
        })
      ).not.toStrictEqual([]);
    }
  });
});

describe("createUserCredentials", () => {
  it("creates a user", () => {
    for (_ = 0; _ != 100; _++) {
      const opmail = "@operamail.com";
      const ulen = 14;
      let user = createUserCredentials(opmail, ulen);
      expect(user).not.toBeNull();
      expect(user.password.length > 7).toBeTruthy();
      expect(user.password.length < 13).toBeTruthy();
      //expect(user.username.length).toBe(ulen);
     //expect(user.email.length).toBe(ulen + opmail.length);
    }
  });
});
