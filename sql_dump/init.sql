SET CHARACTER_SET_CLIENT = 'utf8mb4';
SET CHARACTER_SET_CONNECTION = 'utf8mb4';
SET CHARACTER_SET_DATABASE = 'utf8mb4';
SET CHARACTER_SET_RESULTS = 'utf8mb4';
SET CHARACTER_SET_SERVER = 'utf8mb4';
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS character_data (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  age SMALLINT(2) NOT NULL,
  weight INT NOT NULL,
  history TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS media_type (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS media (
  id INT NOT NULL AUTO_INCREMENT,
  id_media_type INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  creationDate DATE NOT NULL,
  score DOUBLE(4, 2) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  PRIMARY KEY (id),
  INDEX fk_media_media_type1_idx (id_media_type ASC),
  CONSTRAINT fk_media_media_type1 FOREIGN KEY (id_media_type) REFERENCES media_type (id) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS media_character (
  media_id INT NOT NULL,
  character_id INT NOT NULL,
  PRIMARY KEY (media_id, character_id),
  INDEX fk_media_has_character_character1_idx (character_id ASC),
  INDEX fk_media_has_character_media1_idx (media_id ASC),
  CONSTRAINT fk_media_has_character_media1 FOREIGN KEY (media_id) REFERENCES media (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_media_has_character_character1 FOREIGN KEY (character_id) REFERENCES character_data (id) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS genre (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS media_genre (
  media_id INT NOT NULL,
  genre_id INT NOT NULL,
  PRIMARY KEY (media_id, genre_id),
  INDEX fk_media_has_genre_genre1_idx (genre_id ASC),
  INDEX fk_media_has_genre_media1_idx (media_id ASC),
  CONSTRAINT fk_media_has_genre_media1 FOREIGN KEY (media_id) REFERENCES media (id) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT fk_media_has_genre_genre1 FOREIGN KEY (genre_id) REFERENCES genre (id) ON DELETE NO ACTION ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS user (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL,
  deleted_at TIMESTAMP NULL,
  PRIMARY KEY (id),
  UNIQUE INDEX email_UNIQUE (email ASC))
ENGINE = InnoDB
DEFAULT CHARSET=utf8mb4;

ALTER TABLE character_data ADD INDEX idx_name (name);
ALTER TABLE character_data ADD INDEX idx_age (age);
ALTER TABLE character_data ADD INDEX idx_weight (weight);
ALTER TABLE character_data ADD FULLTEXT idx_history (history);

ALTER TABLE media ADD INDEX idx_title (title);
ALTER TABLE media ADD INDEX idx_creationDate (creationDate);

SET FOREIGN_KEY_CHECKS = 1;

INSERT INTO media_type (id, name) VALUES 
(1, 'Movie'),
(2, 'Serie');

INSERT INTO character_data (id, name, image, age, weight, history) VALUES
(1, "Mickey Mouse", "https://seeklogo.com/images/M/Mickey_Mouse-logo-FE9D875575-seeklogo.com.png", 92, 10, "The iconic cartoon character created by Walt Disney and Ub Iwerks."),
(2, "Minnie Mouse", "https://upload.wikimedia.org/wikipedia/en/0/0f/Minnie_Mouse_Duckipedia.png", 92, 8, "Animated character known for her sweet disposition and large head bows."),
(3, "Donald Duck", "https://static.wikia.nocookie.net/disney/images/0/04/Donald-duck25.png", 86, 15, "He is known for his fiery temper and humorous voice."),
(4, "Goofy", "https://static.wikia.nocookie.net/disney/images/c/c3/Goofy28.png", 88, 25, "A funny-animal cartoon character created in 1932."),
(5, "Pluto", "https://upload.wikimedia.org/wikipedia/en/b/b2/Pluto_%28Disney%29_transparent.png", 90, 20, "A very special dog with a strong sense of loyalty."),
(6, "Elsa", "https://lumiere-a.akamaihd.net/v1/images/ct_frozen_elsa_18466_22a50822.jpeg", 24, 55, "Queen of Arendelle who has the power to control ice and snow."),
(7, "Anna", "https://lumiere-a.akamaihd.net/v1/images/fg_horizontal_frozen_anna_20694_1_a2be9204.jpeg", 21, 50, "The fearless and optimistic princess of Arendelle."),
(8, "Olaf", "https://hips.hearstapps.com/hmg-prod/images/frozen2olafposter-1571826296.jpg", 5, 10, "A friendly snowman who loves warm hugs."),
(9, "Simba", "https://static.wikia.nocookie.net/disney/images/3/37/Profile_-_Simba.jpeg", 15, 70, "A lion who becomes king of the Pride Lands."),
(10, "Nala", "https://static.wikia.nocookie.net/disney/images/5/55/Profile_-_Nala.jpeg", 15, 65, "A lioness who is Simbas childhood friend and later his queen."),
(11, "Woody", "https://static.wikia.nocookie.net/disney/images/a/ab/Woody_4.png", 50, 25, "A cowboy doll that is profoundly loyal to his kid."),
(12, "Buzz Lightyear", "https://static.wikia.nocookie.net/disney/images/7/74/Profile_-_Buzz_Lightyear.jpeg", 25, 30, "A space ranger action figure, part of the Toy Story universe."),
(13, "Ariel", "https://static.wikia.nocookie.net/disney/images/a/a0/Ariel-1.png", 16, 50, "A young mermaid who is curious about the human world."),
(14, "Belle", "https://i.pinimg.com/474x/19/c8/67/19c867aa5ddf71d49bb098b820b40b48.jpg", 20, 55, "Known for her love of books and her ability to see past appearances."),
(15, "Rapunzel", "https://i.pinimg.com/736x/d2/68/ef/d268ef083c209018360fd087407f43ec.jpg", 18, 48, "Known for her long, magical hair."),
(16, "Cinderella", "https://i.pinimg.com/736x/37/83/af/3783af36b9acf313c6a8548504f813a4.jpg", 19, 48, "A kind-hearted young woman living in unfortunate circumstances."),
(17, "Aladdin", "https://static.nationalgeographicla.com/files/styles/image_3200/public/01-aladdin-didnt-know.jpg", 20, 60, "A former street rat who becomes a prince."),
(18, "Jasmine", "https://static.wikia.nocookie.net/disneyprincess/images/0/05/892_Sem_T%C3%ADtulo_20221231170836.png", 18, 50, "A princess of Agrabah known for her beauty and strong will."),
(19, "Mulan", "https://lumiere-a.akamaihd.net/v1/images/pp_princess_mulan_static_mobile_20694_a45e948d.jpeg", 18, 55, "A brave woman who disguised herself as a man to join the army."),
(20, "Pocahontas", "https://i.pinimg.com/originals/ab/7a/2d/ab7a2d3af6661294e08fc2e7d0037a5b.jpg", 20, 50, "A Native American woman known for her association with a colonial settlement.");

INSERT INTO media (id, id_media_type, title, image, creationDate, score) VALUES(1, 1, "Frozen", "https://lumiere-a.akamaihd.net/v1/images/pp_frozen_herobanner_mobile_20501_ae840c59.jpeg", "2013-11-27", 3.00),
(2, 1, "The Lion King", "https://images.bauerhosting.com/legacy/empire-tmdb/films/8587/images/klI0K4oQMsLhHdjA9Uw8WLugk9v.jpg", "1994-06-15", 5.00),
(3, 1, "Toy Story", "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_.jpg", "1995-11-22", 4.00),
(4, 1, "The Little Mermaid", "https://upload.wikimedia.org/wikipedia/en/thumb/e/e9/TheLittleMermaid1989Characters.jpg/250px-TheLittleMermaid1989Characters.jpg", "1989-11-17", 3.00),
(5, 1, "Beauty and the Beast", "https://m.media-amazon.com/images/M/MV5BNzAxZTk2OTktYzZhYi00NTMyLWE2MmItNGU1MGQyMTRiZWU3XkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_QL75_UX500_CR0,47,500,281_.jpg", "1991-11-22", 4.00),
(6, 1, "Tangled", "https://upload.wikimedia.org/wikipedia/en/a/a8/Tangled_poster.jpg", "2010-11-24", 3.00),
(7, 1, "Cinderella", "https://images.moviesanywhere.com/ce1443f2185ea8d06f15c2928e28f6e7/023c9e8e-987b-49c2-82d6-6ebd6b65e408.jpg", "1950-03-04", 3.00),
(8, 1, "Aladdin", "https://www.disneyinyourday.com/wp-content/uploads/2015/01/aladdin-663x1024.jpg", "1992-11-25", 4.00),
(9, 1, "Mulan", "https://lumiere-a.akamaihd.net/v1/images/p_mulan_20529_83d3893a.jpeg", "1998-06-19", 3.00),
(10, 1, "Pocahontas", "https://d23.com/app/uploads/2015/07/pocahontas-1180x600.jpg", "1995-06-23", 3.00),
(11, 2, "Mickey Mouse Clubhouse", "https://m.media-amazon.com/images/S/pv-target-images/21badf3603dc20cf2e03fc3ef1a62fb85ae55f6038215597c59531f6758e5721.jpg", "2006-05-05", 3.00),
(12, 2, "DuckTales", "https://m.media-amazon.com/images/M/MV5BMTU3ODkxNDQtZjVjYi00MjVlLWExYjktYjY1MjVlMjIxOTQxXkEyXkFqcGdeQXVyNTA4NzExMDg@._V1_.jpg", "2017-08-12", 5.00),
(13, 2, "The Adventures of the Gummi Bears", "https://m.media-amazon.com/images/M/MV5BMzZjYWEzM2QtOWNiNS00NGJkLTg5MTgtZGJjY2E0YzNjZTY4XkEyXkFqcGdeQXVyMTIwMjY0NjQz._V1_.jpg", "1985-09-14", 3.00),
(14, 2, "TaleSpin", "https://static.wikia.nocookie.net/disney/images/f/f0/Talespin.jpg", "1990-09-07", 3.00),
(15, 2, "Darkwing Duck", "https://artworks.thetvdb.com/banners/posters/75475-1.jpg", "1991-09-08", 3.00),
(16, 2, "Goof Troop", "https://cdn-fastly.parrotanalytics.com/images/poster-hyphen/68eac23f-2f91-490d-aa49-d8b0377fbb06.jpg", "1992-09-05", 3.00),
(17, 2, "Recess", "https://m.media-amazon.com/images/M/MV5BMThkNmIxNzAtM2Q3OC00ZjIxLWE1MjMtZjQxODRhZjU5ZTFkXkEyXkFqcGdeQXVyNjk1Njg5NTA@._V1_.jpg", "1997-09-13", 2.00),
(18, 2, "The Little Mermaid Series", "https://m.media-amazon.com/images/M/MV5BMGI4YmJkZTgtOTI3Ny00ZjczLTk2MGEtODkyZDg1YjM2YzM5XkEyXkFqcGdeQXVyOTQxNzM2MjY@._V1_FMjpg_UX1000_.jpg", "1992-09-11", 2.00),
(19, 2, "Aladdin Series", "https://assets.change.org/photos/7/ql/yu/FaqlYUyJzhwSzJD-800x450-noPad.jpg", "1994-09-05", 3.00),
(20, 2, "Lilo & Stitch: The Series", "https://m.media-amazon.com/images/M/MV5BOWQzNGNjOWQtYmUzMS00ODM2LWExZTgtNzYyNGJiNjMyY2FiXkEyXkFqcGdeQXVyMTMwMTgyMzQz._V1_.jpg", "2003-09-20", 2.00);

INSERT INTO media_character (media_id, character_id) VALUES
(1, 6), (1, 7), (1, 8), -- Frozen characters to Frozen movie
(2, 9), (2, 10), -- The Lion King characters to The Lion King movie
(3, 11), (3, 12), -- Toy Story characters to Toy Story movie
(4, 13), -- The Little Mermaid characters to The Little Mermaid movie
(5, 14), -- Beauty and the Beast characters to Beauty and the Beast movie
(6, 15), -- Tangled characters to Tangled movie
(7, 16), -- Cinderella characters to Cinderella movie
(8, 17), (8, 18), -- Aladdin characters to Aladdin movie
(9, 19), -- Mulan characters to Mulan movie
(10, 20), -- Pocahontas characters to Pocahontas movie
(11, 1), (11, 2), (11, 4), -- Mickey Mouse Clubhouse series
(12, 3), -- DuckTales series
(13, 3), -- The Adventures of the Gummi Bears series
(14, 3), -- TaleSpin series
(15, 3), -- Darkwing Duck series
(16, 4), -- Goof Troop series
(17, 4), -- Recess series
(18, 13), -- The Little Mermaid Series series
(19, 17), (19, 18), -- Aladdin Series series
(20, 13); -- Lilo & Stitch: The Series series

INSERT INTO genre (id, name, image) VALUES
(1, 'Animation', 'https://hips.hearstapps.com/hmg-prod/images/344rt7wurys-1614943253.jpg'),
(2, 'Adventure', 'https://wp.es.aleteia.org/wp-content/uploads/sites/7/2020/02/web3-01-la-llamada-de-lo-salvaje-the-call-of-the-wild-movie-walt-disney-pictures.jpg'),
(3, 'Family', 'https://s3.us-west-2.amazonaws.com/s3.laprensa.com.ni-bq/wp-content/uploads/2018/03/10110832/cine2.jpg'),
(4, 'Fantasy', 'https://cinepremiere.com.mx/wp-content/uploads/2022/04/el-mago-de-oz-pelicula-900x506.jpg'),
(5, 'Action', 'https://media.gq.com.mx/photos/5be9df325c1fcbd1504c3507/16:9/w_2560%2Cc_limit/john_whick_327.jpg'),
(6, 'Drama', 'https://cdn.computerhoy.com/sites/navi.axelspringer.es/public/media/image/2016/09/192722-11-mejores-peliculas-drama.jpg'),
(7, 'Comedy', 'https://definicion.de/wp-content/uploads/2009/05/comedia.png'),
(8, 'Musical', 'https://cdn.businessinsider.es/sites/navi.axelspringer.es/public/media/image/2018/09/musicales.jpg'),
(9, 'Romance', 'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2018/03/10-peliculas-mas-taquilleras-historia-cine.jpg'),
(10, 'Sci-Fi', 'https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/07/tron_steven_lisberger.jpg');

INSERT INTO media_genre (media_id, genre_id) VALUES
(1, 1), (1, 3), (1, 4), -- Frozen: Animation, Family, Fantasy
(2, 1), (2, 2), (2, 3), -- The Lion King: Animation, Adventure, Family
(3, 1), (3, 3), (3, 7), -- Toy Story: Animation, Family, Comedy
(4, 1), (4, 4), (4, 8), -- The Little Mermaid: Animation, Fantasy, Musical
(5, 1), (5, 4), (5, 9), -- Beauty and the Beast: Animation, Fantasy, Romance
(6, 1), (6, 4), (6, 8), -- Tangled: Animation, Fantasy, Musical
(7, 1), (7, 8), -- Cinderella: Animation, Musical
(8, 1), (8, 2), (8, 8), -- Aladdin: Animation, Adventure, Musical
(9, 1), (9, 2), (9, 6), -- Mulan: Animation, Adventure, Drama
(10, 1), (10, 2), (10, 6), -- Pocahontas: Animation, Adventure, Drama
(11, 1), (11, 7), -- Mickey Mouse Clubhouse: Animation, Comedy
(12, 1), (12, 2), -- DuckTales: Animation, Adventure
(13, 1), (13, 2), -- The Adventures of the Gummi Bears: Animation, Adventure
(14, 1), (14, 2), -- TaleSpin: Animation, Adventure
(15, 1), (15, 7), -- Darkwing Duck: Animation, Comedy
(16, 1), (16, 7), -- Goof Troop: Animation, Comedy
(17, 1), (17, 7), -- Recess: Animation, Comedy
(18, 1), (18, 4), -- The Little Mermaid Series: Animation, Fantasy
(19, 1), (19, 2), -- Aladdin Series: Animation, Adventure
(20, 1), (20, 5); -- Lilo & Stitch: The Series: Animation, Sci-Fi
