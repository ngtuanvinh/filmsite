import film from "../assets/film-reel.png";
import star from "../assets/star.png";
import upcomming from "../assets/check-in.png";
import fist from "../assets/fist.png";
import compass from "../assets/compass.png";
import gundam from "../assets/gundam.png";
import comedy from "../assets/comedy.png";
import rifle from "../assets/rifle.png";
import documentary from "../assets/documentary.png";
import drama from "../assets/drama.png";
import family from "../assets/family.png";
import dragon from "../assets/dragon.png";
import history from "../assets/history.png";
import ghost from "../assets/ghost.png";
import headphone from "../assets/headphone.png";
import mystery from "../assets/mystery.png";
import hearts from "../assets/hearts.png";
import ufo from "../assets/science-fiction.png";
import tv from "../assets/tv.png";
import thriller from "../assets/thriller.png";
import swords from "../assets/sword.png";
import cactus from "../assets/cactus.png";
import LanguageIcon from "@mui/icons-material/Language";
import MovieIcon from "@mui/icons-material/Movie";
import TheatersIcon from "@mui/icons-material/Theaters";

export const categories = [
  {
    name: "Popular",
    icon: <img src={film} alt="icon" className="sidebar-icon" />,
    type: "popular",
  },
  {
    name: "Top Rated",
    icon: <img src={star} alt="icon" className="sidebar-icon" />,
    type: "top_rated",
  },
  {
    name: "Upcoming",
    icon: <img src={upcomming} alt="icon" className="sidebar-icon" />,
    type: "upcoming",
  },
];

export const genres = [
  {
    name: "Action",
    id: 28,
    icon: <img src={fist} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Adventure",
    id: 12,
    icon: <img src={compass} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Animation",
    id: 16,
    icon: <img src={gundam} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Comedy",
    id: 35,
    icon: <img src={comedy} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Crime",
    id: 80,
    icon: <img src={rifle} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Documentary",
    id: 99,
    icon: <img src={documentary} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Drama",
    id: 18,
    icon: <img src={drama} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Family",
    id: 10751,
    icon: <img src={family} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Fantasy",
    id: 14,
    icon: <img src={dragon} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "History",
    id: 36,
    icon: <img src={history} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Horror",
    id: 27,
    icon: <img src={ghost} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Music",
    id: 10402,
    icon: <img src={headphone} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Mystery",
    id: 9648,
    icon: <img src={mystery} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Romance",
    id: 10749,
    icon: <img src={hearts} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Science Fiction",
    id: 878,
    icon: <img src={ufo} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "TV Movie",
    id: 10770,
    icon: <img src={tv} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Thriller",
    id: 53,
    icon: <img src={thriller} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "War",
    id: 10752,
    icon: <img src={swords} alt="icon" className="sidebar-icon" />,
  },
  {
    name: "Western",
    id: 37,
    icon: <img src={cactus} alt="icon" className="sidebar-icon" />,
  },
];

export const moviePageBtn = [
  {
    name: "WEBSITE",
    icon: <LanguageIcon className="movieDetail-btn" />,
  },
  {
    name: "IDMB",
    icon: <MovieIcon className="movieDetail-btn" />,
  },
  {
    name: "TRAILER",
    icon: <TheatersIcon className="movieDetail-btn" />,
  },
];
