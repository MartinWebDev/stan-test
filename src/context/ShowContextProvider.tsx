import React, { Dispatch, PropsWithChildren, SetStateAction, useState } from "react";
import { createContext, useContext } from "react";
import { Show } from '../models/Show';

// TEMPORARY ALL DATA - Note for commit. Ordinarily I would not commit this big block of data. I wouldn't make the commit until I had at least a basic way to get the data from some other source. Server, mock, whatever.
// But since you specifically want to see the commit history, presumably to see the general approach taken, I made an exception this one time. 
// The data is here so as while mocking up the main layout, there was actually some data to reference and display.
const data: Show[] = [
  {
    "id": 67298,
    "title": "Dr. Death",
    "description": "Dr. Death tells the terrifying true story of Dr. Christopher Duntsch (Joshua Jackson), a brilliant but sociopathic neurosurgeon whose patients leave his operating room either permanently maimed or dead, and the two doctors who set out to stop him.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Drama",
    "year": 2021,
    "language": "English"
  },
  {
    "id": 65737,
    "title": "This Way Up",
    "description": "This achingly funny and deeply moving comedy series follows the quick-witted Aine as she tries to get her life back in order and regain some semblance of happiness after suffering a nervous breakdown.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BNjQwYTA4Y2YtYjYyNC00OTBjLTg0ZmEtMjZiMTRlYWU2NzEyXkEyXkFqcGdeQXVyMjM5NDQzNTk@._V1_QL75_UX190_CR0,2,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Comedy",
    "year": 2019,
    "language": "English"
  },
  {
    "id": 67517,
    "title": "Power Book III: Raising Kanan",
    "description": "POWER BOOK III: RAISING KANAN is a prequel set in the 1990s that chronicles the early years of Kanan Stark, the character first played by executive producer Curtis \"50 Cent\" Jackson.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BZDNlYzI4NjItNjM4MS00NWViLTlmZDItZGY0ZTYwNzk0OWE0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX190_CR0,2,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Crime",
    "year": 2021,
    "language": "English"
  },
  {
    "id": 56197,
    "title": "First Wives Club",
    "description": "TV adaptation of the comedy film about best friends Ari, Hazel \u0026 Bree who reunite to navigate Hazel's public divorce, Ari's unsatisfying marriage, and Bree's cheating husband. Together, they learn as long as they have each other, they're unstoppable.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Comedy",
    "year": 2019,
    "language": "English"
  },
  {
    "id": 26702,
    "title": "Black Monday",
    "description": "BLACK MONDAY takes us back to October 19, 1987 – aka Black Monday, the worst stock market crash in the history of Wall Street.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BNjQwYTA4Y2YtYjYyNC00OTBjLTg0ZmEtMjZiMTRlYWU2NzEyXkEyXkFqcGdeQXVyMjM5NDQzNTk@._V1_QL75_UX190_CR0,2,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Comedy",
    "year": 2018,
    "language": "English"
  },
  {
    "id": 3019990,
    "title": "Harry Potter and the Philosopher's Stone",
    "description": "11-year-old orphan Harry Potter discovers he's a wizard and enrols in Hogwarts, school of wizardry. There he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BNmQ0ODBhMjUtNDRhOC00MGQzLTk5MTAtZDliODg5NmU5MjZhXkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_QL75_UY281_CR1,0,190,281_.jpg",
    "rating": "PG",
    "genre": "Fantasy",
    "year": 2001,
    "language": "English"
  },
  {
    "id": 67543,
    "title": "Blindspotting",
    "description": "In this comedy drama series, Ashley's partner of 12 years and father of their son, Miles, is suddenly incarcerated. She's left to navigate a chaotic and humorous existential crisis when she's forced to move in with Miles' mother and half-sister.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BZDNlYzI4NjItNjM4MS00NWViLTlmZDItZGY0ZTYwNzk0OWE0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX190_CR0,2,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Comedy",
    "year": 2021,
    "language": "English"
  },
  {
    "id": 67542,
    "title": "Drag Race España",
    "description": "The Spanish adaptation of the beloved Drag Race franchise is looking for Spain's first Drag Race Superstar. Hosted by Spanish drag star Supremme de Luxe, with Javier Calvo, Javier Ambrossi \u0026 Ana Locking on the panel. (Spanish with English Subtitles)",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Reality",
    "year": 2021,
    "language": "Spanish"
  },
  {
    "id": 60150,
    "title": "The Nest",
    "description": "A wealthy couple make a pact with a troubled teenage girl. But will this deal fulfil their dreams, or assure mutual destruction? An emotional thriller about love, trust and the true cost of buying whatever you want.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BZDNlYzI4NjItNjM4MS00NWViLTlmZDItZGY0ZTYwNzk0OWE0XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_QL75_UX190_CR0,2,190,281_.jpg",
    "rating": "M",
    "genre": "Thriller",
    "year": 2020,
    "language": "English"
  },
  {
    "id": 2993105,
    "title": "The Transporter Refuelled",
    "description": "Frank Martin, a former special ops mercenary, is living a less perilous life. But when he's engaged by a cunning femme fatale, he must use his covert expertise and knowledge in a dangerous game of chess to bring down a Russian crime lord.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Action",
    "year": 2015,
    "language": "English"
  },
  {
    "id": 3019366,
    "title": "Dune",
    "description": "In the year 10191, a spice named melange is the most valuable substance in the universe, only found on desert planet Arrakis. When war breaks out over the land, a Duke’s son must lead warriors in a battle for control of the planet and its spice.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "PG",
    "genre": "Sci-Fi",
    "year": 1984,
    "language": "English"
  },
  {
    "id": 375815,
    "title": "The Messengers",
    "description": "A troubled family enters a forsaken farmhouse where a teenage girl sees nightmarish apparitions. While her sanity is questioned, she must find a way to rescue her family.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Horror",
    "year": 2007,
    "language": "English"
  },
  {
    "id": 63730,
    "title": "Walker",
    "description": "A reimagining of WALKER, TEXAS RANGER about a widower and father of two with his own moral code, who returns home to Austin after being undercover, only to discover there’s harder work to be done at home.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Western",
    "year": 2021,
    "language": "English"
  },
  {
    "id": 19971,
    "title": "RuPaul's Drag Race: All Stars",
    "description": "Fan favourites from past seasons return to the competition. The challenges are super-sized, as the queens do whatever it takes to win a place in the Drag Race Hall Of Fame.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Reality",
    "year": 2012,
    "language": "English"
  },
  {
    "id": 20789,
    "title": "RuPaul's Drag Race: All Stars Untucked",
    "description": "Behind-the-scenes drama and exclusive unseen footage from RUPAUL'S DRAG RACE: ALL STARS.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Reality",
    "year": 2012,
    "language": "English"
  },
  {
    "id": 27656,
    "title": "Miracle Workers",
    "description": "An anthology comedy series starring Daniel Radcliffe and Steve Buscemi, MIRACLE WORKERS features a wild cast of characters and is set everywhere from the offices of Heaven Inc, to the medieval Dark Ages, and the American Old West.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Comedy",
    "year": 2019,
    "language": "English"
  },
  {
    "id": 3028275,
    "title": "Batman v Superman: Dawn of Justice",
    "description": "Fearing that Superman is a threat to humanity after his battle in Metropolis, Batman takes on the Man of Steel, while the world wrestles with what kind of a hero it really needs.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Action",
    "year": 2016,
    "language": "English"
  },
  {
    "id": 68070,
    "title": "Epstein's Shadow: Ghislaine Maxwell",
    "description": "This docuseries investigates the mysterious world of British socialite Ghislaine Maxwell, whose life took a sordid downturn when she met serial sex offender Jeffrey Epstein. A glimpse into the story of power, sex and money that led to her arrest.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Documentary",
    "year": 2021,
    "language": "English"
  },
  {
    "id": 66776,
    "title": "The Republic of Sarah",
    "description": "Faced with the destruction of her town at the hands of a greedy mining company, rebellious high school teacher Sarah Cooper utilises an obscure cartographical loophole to declare her town an independent country.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "PG",
    "genre": "Drama",
    "year": 2021,
    "language": "English"
  },
  {
    "id": 29579,
    "title": "Desus \u0026 Mero",
    "description": "In this weekly late-night series, Desus Nice and The Kid Mero speak off the cuff and chat with guests at the intersection of pop culture, sports, politics and more.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Comedy",
    "year": 2019,
    "language": "English"
  },
  {
    "id": 408308,
    "title": "Argo",
    "description": "Based on true events, ARGO chronicles the life-or-death covert operation to rescue six Americans, which unfolded behind the scenes of the Iran hostage crisis - the truth of which was unknown by the public for decades.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Drama",
    "year": 2012,
    "language": "English"
  },
  {
    "id": 3020031,
    "title": "Outbreak",
    "description": "When a deadly airborne virus is brought to America by a monkey from the African rainforest, it starts killing people off at an epidemic rate; leaving an entire Californian town quarantined, and a handful of scientists struggling to find a cure.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Action",
    "year": 1995,
    "language": "English"
  },
  {
    "id": 3028280,
    "title": "The Wedding Singer",
    "description": "Robbie, a wedding singer, meets Julia, a waitress, at a reception and the two hit it off. When Robbie learns that Julia is engaged to another man, who treats her poorly, he has to pull off the performance of his life to win the girl of his dreams.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Comedy",
    "year": 1998,
    "language": "English"
  },
  {
    "id": 26421,
    "title": "All American",
    "description": "When a rising high school football player from South Central L.A. is recruited to play for Beverly Hills High, two families from vastly different worlds begin to collide.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Drama",
    "year": 2018,
    "language": "English"
  },
  {
    "id": 68148,
    "title": "Beyond Appearances",
    "description": "Alexandra's twin-sister Mamon disappears on the eve of their birthday. The whole family starts an investigation, but every member has their own secret. (French with English subtitles).",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "MA 15+",
    "genre": "Crime",
    "year": 2019,
    "language": "French"
  },
  {
    "id": 3019355,
    "title": "Halloween II (1981)",
    "description": "WARNING: CONTAINS HIGH IMPACT VIOLENCE. While Sheriff Brackett and Dr. Loomis hunt for Michael Myers, a traumatised Laurie is rushed to hospital, and the serial killer is not far behind her.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "R 18+",
    "genre": "Horror",
    "year": 1981,
    "language": "English"
  },
  {
    "id": 67663,
    "title": "Sins of the City",
    "description": "When a murder takes place, how does a city’s character change? This series exposes the dark underbelly of cities, highlighting the mysterious crimes that changed the communities there forever.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Documentary",
    "year": 2021,
    "language": "English"
  },
  {
    "id": 3028281,
    "title": "You've Got Mail",
    "description": "Book superstore magnate, Joe, and independent book shop owner, Kathleen, fall in love in the anonymity of the internet — both blissfully unaware that he's trying to put her out of business.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "PG",
    "genre": "Romance",
    "year": 1998,
    "language": "English"
  },
  {
    "id": 26895,
    "title": "The Bold Type",
    "description": "THE BOLD TYPE follows three spirited, modern young women who work for 'Scarlet', a global women's magazine based in New York City.",
    "type": "series",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Drama",
    "year": 2017,
    "language": "English"
  },
  {
    "id": 1000510,
    "title": "Persepolis",
    "description": "A poignant coming-of-age story of a precocious and outspoken young Iranian girl's life in pre- and post-revolutionary Iran, and then Europe. Based on director Marjane Satrapi's autobiographical graphic novel.",
    "type": "movie",
    "image": "https://m.media-amazon.com/images/M/MV5BMDE0MmJmYTUtNjcyNy00NmI0LWJlOTMtMTlhN2IxYzBkZTFlXkEyXkFqcGdeQXVyMTU1ODIwMTM1._V1_QL75_UX190_CR0,0,190,281_.jpg",
    "rating": "M",
    "genre": "Animation",
    "year": 2006,
    "language": "Iranian"
  }
];

// Since this type here is what the rest of the app will care about we call this "ShowContext" (I don't like appending "Type" to everything like ShowContextType. It just looks bad)...
export type ShowContext = {
  shows: Show[],
  setShows: Dispatch<SetStateAction<Show[]>> // Use this type instead of our own defined function type here just so we can throw the set fn from useState in. Makes it simpler for this example.
};

const initial: ShowContext = {
  shows: [],
  setShows: () => { }
};

// so we give the *actual* context some internal name...
const _ShowContext = createContext<ShowContext>(initial);

// this is fine because we will export this wrapper so we can keep our provider code both clean, and contained here...
export const ShowContextProvider = ({ children }: PropsWithChildren) => {
  const [shows, setShows] = useState<Show[]>([]); // During development, use this one to get those random errors and loading times,
  // const [shows, setShows] = useState<Show[]>(data); // and this one to not do that. This one makes creating the layout less annoying.

  return (
    <_ShowContext.Provider value={{ shows, setShows }}>
      {children}
    </_ShowContext.Provider>
  );
};

// and everywhere else that needs it will use this hook anyway, so nothing else will ever see the internal name here, so it doesn't matter what we call it.
export const useShowContext = () => useContext(_ShowContext);
