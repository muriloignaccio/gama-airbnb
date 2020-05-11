const feed = document.querySelector(".main__feed");
const form = document.querySelector(".form");
const input = document.querySelector(".form__input");
const locationsInfoSection = document.querySelector('.locations-info');

const setAtt = (element, atributes) => {
  for(att in atributes) {
    element.setAttribute(att, atributes[att]);
  }
};

const appendChildren = (element, ...children) => {
  children.forEach(child => element.appendChild(child));
};

const getProperties = async (e) => {

  e.preventDefault();

  const propertiesData = await fetch("https://api.sheety.co/30b6e400-9023-4a15-8e6c-16aa4e3b1e72");
    const propertiesJson = await propertiesData.json();
    
    const locationsCount = document.createElement('p');
    locationsCount.setAttribute('class', 'locations-info__count');
    locationsCount.innerHTML = `Mais de ${propertiesJson.length - 1} acomodações`;

    const locationsName = document.createElement('h2');
    locationsName.setAttribute('class', 'locations-info__name');
    locationsName.innerHTML = `Acomodações em ${input.value}`;

    appendChildren(locationsInfoSection, locationsCount,locationsName);

  propertiesJson.forEach(({photo: src, property_type, name, price }) => {
    const card = document.createElement('article');
      setAtt(card, {class: 'card'});

      const figure = document.createElement('figure');
      const img = document.createElement('img');
      setAtt(img, {
        src, 
        alt: "Property's Picture",
        class: "card__image"
      });
      figure.appendChild(img);

      const propertyInfoDiv = document.createElement('div');
      propertyInfoDiv.setAttribute('class', 'card__property-info');
      

      const propertyName = document.createElement('p');
      propertyName.setAttribute('class', 'card__property-name')
      propertyName.innerHTML = name;

      const propertyType = document.createElement('p');
      propertyType.setAttribute('class', 'card__property-type');
      propertyType.innerHTML = `
        <i class="fa fa-building card__icon"></i>
        ${property_type}
      `;
      
      const propertyPrice = document.createElement('span');
      propertyPrice.setAttribute('class', 'card__property-price');
      propertyPrice.innerHTML = `
        <i class="fa fa-tags card__icon"></i>
        R$ ${price}/noite
      `;

      appendChildren(propertyInfoDiv, propertyName, propertyType, propertyPrice);

      appendChildren(card, figure, propertyInfoDiv);

      feed.appendChild(card);

  })

  return propertiesJson;
}

form.addEventListener('submit', getProperties)