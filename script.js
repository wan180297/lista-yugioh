const container = document.querySelector(".container");

async function requestYugi() {

    try {
        const request = await fetch("https://db.ygoprodeck.com/api/v7/cardinfo.php");
        const response = await request.json();
      
        return response;
    } catch(error) {
        console.error("Erro ao buscar dados:", error);
  }
}

function createCard(name, img, archetype, descript, atk = 0, def = 0) {
  const divCard = document.createElement("div");
  const divCardIntern = document.createElement("div");
  const title = document.createElement("h1");
  const imageMonsterCard = document.createElement("img");
  const divDesc = document.createElement("div");
  const titleArchetype = document.createElement("h3");
  const desc = document.createElement("p");
  const tagHr = document.createElement("hr");
  const power = document.createElement("div");
  const powerAtk = document.createElement("span");
  const powerDef = document.createElement("span");

  divCard.className = "card";
  divCardIntern.className = "card-intern";
  divDesc.className = "description";
  desc.className = "desc";
  power.className = "power";
  powerAtk.className = "atk";
  powerDef.className = "def";

  container.appendChild(divCard);
  divCard.appendChild(divCardIntern);
  divCardIntern.appendChild(title);
  divCardIntern.appendChild(imageMonsterCard);
  divCardIntern.appendChild(divDesc);
  divDesc.appendChild(titleArchetype);
  divDesc.appendChild(desc);
  divDesc.appendChild(tagHr);
  divDesc.appendChild(power);
  power.appendChild(powerAtk);
  power.appendChild(powerDef);

  title.innerText = name;
  imageMonsterCard.src = img;
  titleArchetype.innerText = archetype;
  desc.innerText = descript;
  powerAtk.innerText = `${atk}/ATK`;
  powerDef.innerText = `${def}/DEF`;;
}

async function addScreenCard() {
  const loading = document.createElement("p");
  loading.innerText = "Carregando...";
  loading.className = "loading";
  container.appendChild(loading);

  try {
    const responseCards = await requestYugi();
    responseCards.data.forEach((element) => {

    const name = element.name || "";
    const image = element.card_images?.[0]?.image_url_cropped || "default-image.jpg";
    const archetype = element.archetype ? `[ ${element.archetype} ]`: "";
    const description = element.desc || "Sem descrição disponível.";
    createCard( name, image, archetype, description, element.atk,element.def);
  });
  } catch (error) {
    console.error("Erro ao carregar cartas:", error);
  } finally {
    container.removeChild(loading);
  }
}
addScreenCard();
