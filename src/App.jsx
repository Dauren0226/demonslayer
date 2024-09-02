import propTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import "./App.css";

const text = `Добро пожаловать на наш сайт, посвящённый захватывающему миру аниме
Здесь вы сможете узнать больше о самых ярких и запоминающихся персонажах из вашего любимого аниме. 
Погружайтесь в истории их героизма, смелости и дружбы, раскрывайте их тайны и особенности, которые делают их уникальными. Каждый персонаж имеет свои уникальные черты и историю, и мы рады поделиться этой увлекательной информацией с вами.
Оставайтесь с нами, чтобы узнать больше о каждом герое, их приключениях и важной роли в их удивительном мире!`;

const cardData = [
  { name: "Гию Томиока", alt: "Гию Томиока", src: "img/Гию.png", className: "Гию" },
  { name: "Мицури Канроджи", alt: "Мицури Канроджи", src: "img/Мицури.png", className: "Мицури" },
  { name: "Обанай Бирдене", alt: "Обанай", src: "img/Обанай.PNG", className: "Обанай" },
  { name: "Санеми Шинадзугава", alt: "Санеми Шинадзугава", src: "img/Шинадзугава.PNG", className: "Санеми" },
  { name: "Гёмей Химеджима", alt: "Гёмей Химеджима", src: "img/Гёмей.PNG", className: "Гёмей" },
  { name: "Муичиро Токито", alt: "Муичиро Токито", src: "img/Токито.PNG", className: "Муичиро" },
  { name: "Шинобу Кочо", alt: "Шинобу Кочо", src: "img/Шинобу.PNG", className: "Шинобу" },
  { name: "Кёджуро Ренгоку", alt: "Кёджуро Ренгоку", src: "img/Ренгоку.PNG", className: "Кёджуро" },
  { name: "Тенген Узуй", alt: "Тенген Узуй", src: "img/Тенген.PNG", className: "Тенген" },
];

const Card = ({ className, alt, src, name, onClick, description }) => {
  const [showDescription, setShowDescription] = useState(false);
  
  return (
    <div>
      <nav
        style={{
          backgroundImage: `url(${src})`,
          backgroundPosition: 'center'
        }}
        onClick={() => setShowDescription(!showDescription)} className={`pointer ${className} ${showDescription ? "Card-show_description" : ""}`}>
        {/* <img alt={alt} src={src} /> */}
        <p>{name}</p>
      </nav>

      <div className={`DescriptionSpan ${showDescription ? "Card-show_description" : ""}`}>
        <p>{description}</p>
      </div>
    </div>
  )
}

Card.propTypes = {
  className: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
}

const descriptions = {
  'Гию Томиока': 'Гию Томиока - Ветеран охотник на демонов, известный своей мастерством и строгим поведением.',
  'Мицури Канроджи': 'Мицури Канроджи - Охотник на демонов с выдающимися навыками и сильным духом.',
  'Обанай Бирдене': 'Обанай Бирдене - Храбрый и целеустремленный охотник, известный своей решимостью.',
  'Санеми Шинадзугава': 'Санеми Шинадзугава - Мощный и упрямый охотник на демонов, известный своей силой.',
  'Гёмей Химеджима': 'Гёмей Химеджима - Один из старейших и мудрых охотников на демонов.',
  'Муичиро Токито': 'Муичиро Токито - Молодой, но очень талантливый охотник на демонов.',
  'Шинобу Кочо': 'Шинобу Кочо - Известная своим умом и изяществом, она также выдающийся охотник на демонов.',
  'Кёджуро Ренгоку': 'Кёджуро Ренгоку - Обладает выдающейся силой и страстью к защите людей.',
  'Тенген Узуй': 'Тенген Узуй - Экстравагантный и мощный охотник, известный своей яркой личностью.',
};


function App() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  // const [description, setDescription] = useState(text);

  // const showMessage = (name) => {
  //   setDescription(descriptions[name] || 'Описание недоступно.');
  // };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.scrollX || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.1; // 20% of viewport height

      if (currentScrollTop > lastScrollTop && currentScrollTop > threshold) {
        // Scrolling down and scrolled past 20% of viewport height
        setIsHeaderVisible(false);
      } else if (currentScrollTop <= lastScrollTop || currentScrollTop <= threshold) {
        // Scrolling up or within the top 20% of the viewport height
        setIsHeaderVisible(true);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop); // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollTop]);

  return (
    <>
      <header className={`header ${isHeaderVisible ? 'visible' : 'hidden'}`}>
        <div className="video-background">
          <video autoPlay muted loop id="myVideo">
            <source src="img/main.background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <img src="img/main4.png" alt="background" />
        <nav className="text">
          <p>
            <strong>
              Данный сайт посвящен всем сильнейшим персонажам встречающимся в
              аниме "Клинок рассекающий демонов"
            </strong>
          </p>
        </nav>
      </header>
      <div className="Столпы">
        {cardData.map((card, index) => (
          <Card
            key={index}
            name={card.name}
            alt={card.alt}
            src={card.src}
            className={card.className}
            description={descriptions[card.name]}
            // onClick={showMessage}
          />
        ))}
      </div>
      {/* <div className='DescriptionSpan'>
        <p>{description}</p>
      </div> */}
    </>
  );
}

export default App;

