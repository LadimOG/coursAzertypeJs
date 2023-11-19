/**
 *
 * @param {number} score
 * @param {number} nombreTotalMot
 */
function afficherResultat(score, nombreTotalMot) {
  let elScore = document.querySelector("span");
  elScore.innerText = `${score} / ${nombreTotalMot}`;
}

/**
 *
 * @param {string} mot
 */
function afficherPropositionMot(mot) {
  let affichageMot = document.querySelector("h2");
  affichageMot.innerText = mot;
}

/**
 *
 * @param {string} nom
 * @param {string} email
 * @param {string} score
 */
function envoyerEmail(nom, email, score) {
  let message = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`;
  location.href = message;
}

/**
 *
 * @param {string} nom
 * @throws {erreur}
 */
function validerNom(nom) {
  if (nom.length <= 2) {
    throw new Error("Le nom doit contenir plus de 2 caractères !");
  }
}

/**
 *
 * @param {string} email
 * @throws {erreur}
 *
 */
function validerEmail(email) {
  let regex = new RegExp("[a-zA-Z0-9.-_]+@[a-zA-Z]+\\.[a-zA-Z]+");
  if (!regex.test(email)) {
    throw new Error("L'adresse mail n'est pas valide !");
  }
}

function gererFormulaire(score) {
  try {
    let sujet = document.querySelector("#nom").value;
    let email = document.querySelector("#email").value;
    validerNom(sujet);
    validerEmail(email);
    afficherMsgError("");
    envoyerEmail(sujet, email, score);
  } catch (error) {
    afficherMsgError(error.message);
  }
}

/**
 *
 * @param {string} msg
 */
function afficherMsgError(msg) {
  let displayMsg = document.getElementById("errorMessage");
  if (!displayMsg) {
    let popup = document.querySelector(".popup");
    displayMsg = document.createElement("span");
    displayMsg.id = "errorMessage";
    displayMsg.style.color = "red";
    popup.appendChild(displayMsg);
  }
  displayMsg.innerText = msg;
}

function relancer() {
  location.reload();
}

function lancerJeu() {
  //Variables
  let btnRadios = document.querySelectorAll("input[type=radio]");
  let champJoueur = document.getElementById("inputText");
  let btnValider = document.getElementById("btnValider");
  let btnPartager = document.querySelector("#partager");
  let form = document.querySelector(".popup form");
  let btnRelancer = document.querySelector("#relancer");
  let score = 0;
  let i = 0;
  let listProposition = listMots;

  // --------------------- faire le choix entre Mot ou phrase ------------------------
  for (let index = 0; index < btnRadios.length; index++) {
    btnRadios[index].addEventListener("change", (e) => {
      if (e.target.value === "mot") {
        listProposition = listMots;
      } else {
        listProposition = listPhrases;
      }
      afficherPropositionMot(listProposition[i]);
    });
  }
  //---------------------------------------------------
  btnValider.addEventListener("click", () => {
    if (listProposition[i] === champJoueur.value) {
      score++;
    }
    console.log(listProposition[i]);
    console.log(champJoueur.value);
    i++;
    champJoueur.value = "";
    afficherResultat(score, i);
    if (listProposition[i] === undefined) {
      btnValider.disabled = "false";
      btnRadios.forEach((el) => {
        el.disabled = "false";
      });
      return afficherPropositionMot("fin du jeu!!!");
    } else {
      afficherPropositionMot(listProposition[i]);
    }
  });

  btnPartager.addEventListener("click", () => {
    form.classList.toggle("popup-active");
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let partageScore = `${score} / ${i}`;
    gererFormulaire(partageScore);
  });

  btnRelancer.addEventListener("click", () => {
    relancer();
  });

  afficherResultat(score, i);
}
