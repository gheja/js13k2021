// Gravitational constant, see: https://en.wikipedia.org/wiki/Gravitational_constant
const GRAVITATIONAL_CONSTANT = 6.67430e-11;

const TICKS_PER_SECOND = 60;

const PRERENDER_SIZE = 800;

const LEVEL_WIDTH = 190;
const LEVEL_HEIGHT = 90;

const NOISE_RESOLUTION = 512;

const OBJ_ROCK = 0;
const OBJ_ROCKET = 1;
const OBJ_SATELLITE = 2;
const OBJ_BLACK_HOLE = 3;
const OBJ_DOG = 4;
const OBJ_ROCK2 = 5
const OBJ_PUMPKIN = 6;
const OBJ_SAUCER = 7;
const OBJ_ALIEN = 8;
const OBJ_STAR = 9;
const OBJ_STAR2 = 10;
const OBJ_STAR3 = 11;
const OBJ_ROCK3 = 12;
const OBJ_MOAI = 13;
const OBJ_CAR = 14;
const OBJ_DESTROYER = 15;

const DRAG_VECTOR_MULTIPLIER = 1/500;

const GAME_STATE_RUNNING = 1;
const GAME_STATE_WON = 2;
const GAME_STATE_LOST = 3;

const TEXT_DIVIDER = " &nbsp;&#8901;&nbsp; ";
const TWEET_PREFIX = "https://twitter.com/intent/tweet?text=";
const TWEET_SUFFIX = "%0A%0APlay%20Operation%20Cleanaholeic%20%23js13k%20game%20by%20%40gheja_%20here:%20js13kgames.com%2Fentries%2Foperation-cleanaholeic";

const MESSAGE_NEW_NAME = "a";
const MESSAGE_ENTRY = "b";
const MESSAGE_REQUEST_BOARD = "c";
const MESSAGE_BOARD_DATA = "d";
