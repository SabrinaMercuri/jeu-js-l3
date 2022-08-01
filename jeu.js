class Zone {

  // constructeur de la zone 
  constructor(xmin,ymin,xmax,ymax){

    // coordonée x minimum
    this.xmin=xmin;

    // coordonée y minimum
    this.xmax=xmax;

    // coordonée x maximum
    this.ymin=ymin;

    // coordonée y maximum
    this.ymax=ymax;
  }
}

class Bullet{

  // constructeur du cercle
  constructor(x, y, color, ctx) {
    this.x = x; // coordonée x du debut de la balle
    this.y = y; // coordonée y du debut de ma balle
    this.color = color; // couleur du cercle
    this.dy = 0; // deplacement en y (chaque animation il se déplace de dy)
    this.dx = 2; // deplacement en x (chaque animation il se déplace de dy)
    this.ctx = ctx; // le context dans lequel il se deplace (le canvas)
    this.ctx.fillStyle = this.color;  // remplissage du cercle en fonction de la couleur donnée
  }

  // methode de dessin du projectile
  draw() {
    this.ctx.fillStyle = this.color; // on met la couleur actuel du cercle
    ctx.beginPath(); 
    ctx.fillRect(this.x,this.y,6,6);
    ctx.fill(); // on le rempli pour que ça ne fasse pas un anneau
  }

  // methode d'effacement du projectile
  erase(){
    this.ctx.fillStyle = "white"; // on change la couleur en blanc 
    this.draw(); // on dessine ensuite le cercle blanc
  }

  // methode de déplacement du projectile
  move(index) {
    this.x += this.dx; // on fait bouger le projectile sur l'axe x
    this.y += this.dy; // on fait bouger le projectile sur l'axe y
    this.detectWall(index); // on appel la méthode de détection des murs
    this.detectMonster(index); // on appel la méthode de détection de monstre
  }

  detectWall(index){
    // on vérifie si le projectile touche un bord de la salle
    if( !this.detectBord()){
      // on vérifie si la case sur lequel se situe le projectile est un mur
      if(s1.tableau[Math.floor(this.x/30)][Math.floor(this.y/30)].type=="mur"){
        // si oui on efface le cercle et on l'enlève des projectiles lancés
        s1.bullets[index].erase();
        s1.bullets.splice(index,1);
        s1.nbBullets--;
      } 
    }
    else{
      // si il touche un bord de la salle on l'efface et on l'enlève des projectiles lancés
      s1.bullets[index].erase();
      s1.bullets.splice(index,1);
      s1.nbBullets--;
    }
  }

  detectBord(){
    // on vérifie si le projectile touche les bords de la salle
    if(this.x<=0 || this.y<=0 || this.x>=448 || this.y>=448){
      // retourne vrai si oui
      return true;
    }
    else{
      // retourne faux si non
      return false;
    }
  }

  detectMonster(index){
    // on vérifie si la case sur laquelle le projectile si situe est de type monstre
    if(s1.tableau[Math.floor(this.x/30)][Math.floor(this.y/30)].type=="monstre"){
      // si oui on vérifie dans quel catégorie de monstre il se trouve

      // on cherche si c'est un monstre imobile
      for (let i = 0; i < nbMonstresImob; i++) {
        // si oui on enlève une vie au monstre
        if(Math.floor(this.x/30)== monstresImob[i].posX && Math.floor(this.y/30)==monstresImob[i].posY){
          console.log("monstre touché");
          monstresImob[i].nbVies--;
        }
        // si son nombre de vie tombe à 0 on le fait disparaître car il est considéré comme tué et on ajoute un score de 50
        if(monstresImob[i].nbVies==0){
          s1.setChemin(s1.tableau[monstresImob[i].posX][monstresImob[i].posY]);
          s1.bullets[index].erase();
          monstresImob.splice(i,1);
          s1.score+=50;
          document.getElementById('score').textContent= 'Score : '+s1.score;
          nbMonstresImob--;
        }
      }

      // on cherche si c'est un monstre qui bouge soit honrizontalement soit verticalement
      for (let i = 0; i < nbMonstres; i++) {
        // si oui on enlève une vie au monstre
        if(Math.floor(this.x/30)== monstres[i].posX && Math.floor(this.y/30)==monstres[i].posY){
          monstres[i].nbVies--;
        }
        // si son nombre de vie tombe à 0 on le fait disparaître car il est considéré comme tué et on ajoute un score de 100
        if(monstres[i].nbVies==0){
          s1.setChemin(s1.tableau[monstres[i].posX][monstres[i].posY]);
          s1.bullets[index].erase();
          monstres.splice(i,1);
          s1.score+=100;
          document.getElementById('score').textContent= 'Score : '+s1.score;
          nbMonstres--;
        }
      }

      // on cherche si c'est un monstre qui bouge soit honrizontalement soit verticalement plus rapidement
      for (let i = 0; i < nbMonstresRapide; i++) {
        // si oui on enlève une vie au monstre
        if(Math.floor(this.x/30)== monstresRapide[i].posX && Math.floor(this.y/30)==monstresRapide[i].posY){
          monstresRapide[i].nbVies--;
        }
        // si son nombre de vie tombe à 0 on le fait disparaître car il est considéré comme tué et on ajoute un score de 100
        if(monstresRapide[i].nbVies==0){
          s1.setChemin(s1.tableau[monstresRapide[i].posX][monstresRapide[i].posY]);
          s1.bullets[index].erase();
          monstresRapide.splice(i,1);
          s1.score+=125;
          document.getElementById('score').textContent= 'Score : '+s1.score;
          nbMonstresRapide--;
        }
      }

      // on cherche si c'est un monstre qui bouge dnas une zone et qui suit le joueur
      for (let i = 0; i < nbMonstresZone; i++) {
        // si oui on enlève une vie au monstre
        if(Math.floor(this.x/30)== monstresZone[i].posX && Math.floor(this.y/30)==monstresZone[i].posY){
          monstresZone[i].nbVies--;
        }
        // si son nombre de vie tombe à 0 on le fait disparaître car il est considéré comme tué et on ajoute un score de 150
        if(monstresZone[i].nbVies==0){
          s1.setChemin(s1.tableau[monstresZone[i].posX][monstresZone[i].posY]);
          s1.bullets[index].erase();
          monstresZone.splice(i,1);
          s1.score+=150;
          document.getElementById('score').textContent= 'Score : '+s1.score;
          nbMonstresZone--;
        }
      }
      // si le projectile touche un monstre on l'efface et le supprime des projectiles lancés
      s1.bullets[index].erase();
      s1.bullets.splice(index,1);
      s1.nbBullets--;
    }
  }
}

class Monstre {
  // constructeur du monstre
  constructor(x, y, h,zone) {
    this.posX = x; // coordonée x du monstre dans la salle
    this.posY = y; // coordonée y du monstre dans la salle
    this.h = h //// mouvement horizontal = 1 et vertical =0 et aucun =2

    
    if (h == 1) { // mouvement horizontal
      this.vx = 1; // deplacement en x
      this.vy = 0; // deplacement en y
    }
    else if(h == 0){ // mouvement vertical
      this.vx = 0; // deplacement en x
      this.vy = 1; // deplacement en y
    }

    this.nbVies=3; // vies du monstre
    this.zone=zone; // zone dans laquelle peux bouger le monstre
    this.imgUrl = getRandomMonster(); // image aléatoire sur le monstre
  }

  // méthode de mouvement du monstre
  moveMonstre() {
    // si le mouvement est horizontal
    if (this.h == 1) {
      // si le prochain mouvement du monstre est sur un bord ou un mur
      if (this.detectBord(this.vx,this.vy) || s1.tableau[this.posX + this.vx][this.posY].type == "mur" || s1.tableau[this.posX + this.vx][this.posY].type == "monstre") {
        this.vx = -this.vx; // inversion du mouvement en x
      }
      // si le prochain mouvement du monstre est sur un joueur
      else if (s1.tableau[this.posX + this.vx][this.posY].type == "joueur") {
        s1.changeImg(); // perte de vie du joueur
        this.vx = -this.vx; // inversion du mouvement en x
      }
      // si le joueur est dans la zone d'attaque du monstre 
      else if(this.detectJoueur(this.vx,this.vy)){
        s1.changeImg(); // perte de vie du joueur
      }
      s1.setMonstre(s1.tableau[this.posX + this.vx][this.posY], this.imgUrl); // changement de type de case chemin en monstre
      s1.setChemin(s1.tableau[this.posX][this.posY]); // changement de la case précédente du monstre en chemin
      this.posX += this.vx; // incrémentation du déplacement en x
    }
    else {
      // si le prochain mouvement du monstre est sur un bord ou un mur
      if (this.detectBord(this.vx, this.vy) || s1.tableau[this.posX][this.posY + this.vy].type == "mur"  || s1.tableau[this.posX][this.posY+this.vy].type == "monstre") {
        this.vy = -this.vy; // inversion du mouvement en y
      }
      // si le prochain mouvement du monstre est sur un joueur
      else if (s1.tableau[this.posX][this.posY + this.vy].type == "joueur") {
        s1.changeImg(); // perte de vie du joueur
        this.vy = -this.vy; // inversion du mouvement en y
      }
      // si le joueur est dans la zone d'attaque du monstre 
      else if(this.detectJoueur(this.vx,this.vy)){
        s1.changeImg(); // perte de vie du joueur
      }
      s1.setMonstre(s1.tableau[this.posX][this.posY + this.vy], this.imgUrl); // changement de type de case chemin en monstre
      s1.setChemin(s1.tableau[this.posX][this.posY]); // changement de la case précédente du monstre en chemin
      this.posY += this.vy; // incrémentation du déplacement en y
    }
  }

  // méthode du mouvement 
  moveMonstreZone(){
    var ecartX = this.posX - s1.posJX; // ecart de coordonées en x entre le joueur et le monstre
    var ecartY = this.posY - s1.posJY; // ecart de coordonées en y entre le joueur et le monstre
    // si l'ecart absolue en X est plus grand que celui en Y 
    if(Math.abs(ecartX)>Math.abs(ecartY)){
      if(ecartX>0){
        this.vx = -1; // s'il est positif le joueur est sur une coordonée x inferieur a celui du monstre 
      }
      else if(ecartX<0){
        this.vx =1; // s'il est négatif le joueur est sur une coordonée x superieur a celui du monstre  
      }
      else{
        this.vx =0; // s'il est égal à 0 on le fait pas bouger en x
      }
      this.vy =0; // le mouvement en y est annulé
      this.h=1; // on fait donc un mouvement horizontal
    }
    // si l'ecart absolue en Y est plus grand que celui en X 
    else if(Math.abs(ecartX)<Math.abs(ecartY)){
      if(ecartY>0){
        this.vy = -1; // s'il est positif le joueur est sur une coordonée y inferieur a celui du monstre
      }
      else if(ecartY<0){
        this.vy=1; // s'il est négatif le joueur est sur une coordonée y superieur a celui du monstre
      }
      else{
        this.vy=0; // s'il est égal à 0 on le fait pas bouger en x
      }
      this.vx= 0; // le mouvement en x est annulé
      this.h=0; // on fait donc un mouvement vertical
    }
    // si l'ecart absolue en X est égal à celui en Y 
    else{
      // on fait un random entre 0 ou 1 pour savoir si on fait un mouvement horizontal ou vertical

      // mouvement horizontal, random donne 1
      if(Math.floor(Math.random() * Math.floor(2)) == 1){
        if(ecartX>0){
          this.vx = -1; // s'il est positif le joueur est sur une coordonée x inferieur a celui du monstre
        }
        else if(ecartX<0){
          this.vx =1; // s'il est négatif le joueur est sur une coordonée x superieur a celui du monstre
        }
        else{
          this.vx =0; // s'il est égal à 0 on le fait pas bouger en x
        }
        this.vy =0; // le mouvement en y est annulé
        this.h=1; // on fait donc un mouvement horizontal
      }
      // mouvement vertical, random donne 0
      else{
        if(ecartY>0){
          this.vy = -1; // s'il est positif le joueur est sur une coordonée y inferieur a celui du monstre
        }
        else if(ecartY<0){
          this.vy=1; // s'il est négatif le joueur est sur une coordonée y superieur a celui du monstre
        }
        else{
          this.vy=0; // s'il est égal à 0 on le fait pas bouger en x
        }
        this.vx= 0; // le mouvement en x est annulé
        this.h=0; // on fait donc un mouvement vertical
      }
    }
    // on fait bouger le monstre en appelant la fonction moveMonstre()
    this.moveMonstre();
  }

  detectJoueur(x, y) {
    // verification si le prochain mouvement du monstre est dans sa zone de déplacement
    if (!this.detectBord(x, y) && !this.detectBord(x + 1, y) && !this.detectBord(x - 1, y) && !this.detectBord(x, y + 1) && !this.detectBord(x, y - 1)) {

      // verification si le joueur est dans la zone en crois de une case du monstre
      if ((this.posX + x +1== s1.posJX && this.posY + y == s1.posJY ) || (this.posX + x - 1== s1.posJX && this.posY + y==s1.posJY) || (this.posX + x==s1.posJX && this.posY + y + 1 == s1.posJY) || (this.posX + x==s1.posJX && this.posY + y - 1==s1.posJY)) {
        console.log('vrai chacal');
        return true; // renvoie vrai si le joueur est détecté
      }
      else {
        console.log('pas de joueur chacal');
        return false; // revoie faux si le joueur n'est pas détecté
      }
    }
    else {
      // verification si le joueur est dans la zone en crois de une case du monstre mais hors de sa zone 
      if ((this.posX + x +1== s1.posJX && this.posY + y == s1.posJY ) || (this.posX + x - 1== s1.posJX && this.posY + y==s1.posJY) || (this.posX + x==s1.posJX && this.posY + y + 1 == s1.posJY) || (this.posX + x==s1.posJX && this.posY + y - 1==s1.posJY)) {
        console.log('vrai chacal');
        return true; // renvoie vrai si le joueur est détecté
      }
      else {
        console.log('pas de joueur chacal');
        return false; // revoie faux si le joueur n'est pas détecté
      } 
    }
  }

  detectBord(x, y) {
    // verification si le prochain mouvement du monstre est dans sa zone de déplacement
    if (this.posX + x < this.zone.xmin || this.posY + y < this.zone.ymin || this.posX + x == this.zone.xmax || this.posY + y == this.zone.ymax) {
      return true; // revoie vrai si le prochain mouvement du monstre touche les bords de sa zone de délimitation
    }
    else {
      return false; // revoie faux si le prochain mouvement est dans la zone
    }
  }
}

class Case {
  // constructeur d'une case
  constructor(width, height, type) {
    this.w = width; // largeur de la case
    this.h = height; // hauteur de la case
    this.type = type; // tye de la case
    if (type === 'monstre') this.monsterNumber = null; // numéro du monstre (initialisé dans la méthode getRandomMonster)
  }
}

class Salle {
  // constructeur de la salle
  constructor(width, height, posJX, posJY) {
    this.nbCaseX = 15; // nombre de case de large 
    this.nbCaseY = 15; // nombre de case de long

    // déclaration du tableau de case
    this.tableau = new Array(this.nbCaseX);
    for (var i = 0; i < this.nbCaseX; i++) {
      this.tableau[i] = new Array(this.nbCaseY);
    }

    // position du joueur
    this.posJX = posJX; // en X
    this.posJY = posJY; // en Y

    // initialisation du tableau
    this.initTableau(); // initialisation du tableau en chemin
    this.setJoueur(this.tableau[posJX][posJY]); // // initialisation du joueur

    // init vies
    this.nbVies = 3;

    // init save
    this.nbSave = 0;

    // init nbNiveau
    this.niveau = 1;
    
    // direction du tir
    this.lastDirection="right";

    // tirs
    this.nbBullets=0;
    this.bullets = [];

    // chrono
    this.chrono = 0;

    // score
    this.score=0;

    // nbJoueur
    this.nbJoueur=1;
  }

  // méthode d'initialisation du tableau de case
  initTableau() {
    for (let i = 0; i < this.nbCaseX; i++) {
      for (let j = 0; j < this.nbCaseY; j++) {
        this.tableau[i][j] = new Case(30, 30, "chemin"); // intialisation de chaque case en tant que chemin au départ
      }
    }
  }

  // méthode de changement de case cible en chemin
  setChemin(caseCible) { 
    caseCible.type = "chemin";
  }

  // méthode de changement de case cible en joueur
  setJoueur(caseCible) {
    caseCible.type = "joueur";
  }

  // méthode de changement de case cible en mur
  setMur(caseCible) {
    caseCible.type = "mur";
  }

  // méthode de changement de case cible en save (objet à récolté)
  setSave(caseCible){
    caseCible.type = "save";  
  }

  // méthode de changement de case cible en sortiedu niveau
  setSortie(caseCible) {
    caseCible.type = "sortie";
  }

  // méthode de changement de case cible en vie
  setVie(caseCible) {
    caseCible.type = "vie";
  }

  // méthode de changement de case cible en monstre
  setMonstre(caseCible, monsterNumber) {
    caseCible.type = "monstre";
    caseCible.monsterNumber = monsterNumber;
  }

  // méthode de dessin du tableau
  draw() {
    let i, j;
    for (i = 0; i < this.nbCaseX; i++) {
      for (j = 0; j < this.nbCaseY; j++) {
        ctx.strokeStyle = "black"; // bordure de la case en noir
        ctx.stroke(); // dissin de la case
        ctx.fillStyle = getCaseColor(this.tableau[i][j].type); // remplissage de la case avec soit des images soit une couleur
        ctx.fillRect(i * 30, j * 30, 30, 30); // dessin de la case
        ctx.strokeRect(i * 30, j * 30, 30, 30); // dessin de la bordure
        if (/monstre|sortie|joueur|vie|save/g.test(this.tableau[i][j].type)) {
          drawImg(ctx, i, j, /monstre/g.test(this.tableau[i][j].type) ? this.tableau[i][j].monsterNumber : this.tableau[i][j].type); // remplissage avec une image
        }
      }
    }
  }

  // methode des controles
  controls() {
    // lecture de l'évènement clavier
    document.addEventListener("keydown", event => {
      event.key !== 'F5' && event.preventDefault();
      // cas gauche
      if (event.isComposing || event.keyCode === 37) {
        this.deplace(-1, 0); // appel de la méthode déplace x = -1 et y = 0 
        this.lastDirection="left"; // la dernière direction pour le tir gauche
        return;
      }
      // cas haut
      else if (event.isComposing || event.keyCode === 38) {
        this.deplace(0, -1); // appel de la méthode déplace x = 0 et y = -1
        this.lastDirection="up"; // la dernière direction pour le tir up
        return;
      }
      // cas droite
      else if (event.isComposing || event.keyCode === 39) {
        this.deplace(1, 0); // appel de la méthode déplace x = 1 et y = 0
        this.lastDirection="right"; // la dernière direction pour le tir right
        return;
      }
      // cas bas
      else if (event.isComposing || event.keyCode === 40) {
        this.deplace(0, 1); // appel de la méthode déplace x = 0 et y = 1
        this.lastDirection="down"; // la dernière direction pour le tir down
        return;
      }
      // cas espace
      else if (event.isComposing || event.keyCode === 32) {
        this.shot(this.lastDirection); // appel de la méthode shot pour pouvoir tirer
        return;
      }
    });
  }

  // methode de déplacement du joueur
  deplace(x, y) {
    // détection du mur
    if (this.detectBord(x, y) || this.tableau[this.posJX + x][this.posJY + y].type == "mur") {
      console.log("impossible il y a un obstacle");
    }
    // détection d'un monstre
    else if (this.tableau[this.posJX + x][this.posJY + y].type == "monstre") {
      console.log("impossible il y a un ennemi, vous perdez une vie");
      this.changeImg(); // perte de vie du joueur
    }
    // détection de la vie si le joueur a déjà 3 vies (impossible de bouger)
    else if (this.tableau[this.posJX + x][this.posJY + y].type == "vie" && this.nbVies==3) {
      console.log("impossible vous avez toutes vos vies");
    }
    // détection de la sortie
    else if (this.tableau[this.posJX + x][this.posJY + y].type == "sortie") {
      // vzrification si on a ramassé tous les objets du niveau
      if(!(this.nbSave==3)){
        console.log("il vous manque des personnes a sauver");
      }
      // si tous le objets du niveau ont été ramasser on passe au niveau suivant
      else{
        console.log("félicitation vous avez trouvé la sortie");
        if(this.niveau==7){
          recommencer();
        }
        nextLevel();
      }
    }
    else {
      // si on se déplace dans la zone d'un monstre
      if (this.zoneMonstre(x, y)) {
        console.log("vous entrez dans la zone d'un ennemi, vous perdez une vie");
        this.changeImg(); // perte de vie du joueur
      }
      // si on ramasse un objet
      else if (this.tableau[this.posJX + x][this.posJY + y].type == "save") {
        this.changeSave(); // methode pour "enregistrer le ramassage de l'objet"
      }
      // si on ramasse une vie
      else if (this.tableau[this.posJX + x][this.posJY + y].type == "vie" && this.nbVies<3) {
        console.log("vous rammasser une vie");
        this.takeVie(); // methode pour enregistrer le ramassage d'une vie
      }
      this.setJoueur(this.tableau[this.posJX + x][this.posJY + y]); // changement de type de case chemin en joueur
      this.setChemin(this.tableau[this.posJX][this.posJY]); // changement de la case précédente du joueur en chemin
      this.posJY += y; // incrémentation du déplacement en y
      this.posJX += x; // incrémentation du déplacement en x
    }
  }

  // methode de détecion de la zone du monstre
  zoneMonstre(x, y) {
    // detection si le mouvement dans la zone est dans la salle 
    if (!this.detectBord(x, y) && !this.detectBord(x + 1, y) && !this.detectBord(x - 1, y) && !this.detectBord(x, y + 1) && !this.detectBord(x, y - 1)) {
      // detection si le joueur entre dans la zone ou pas
      if ((this.tableau[this.posJX + x + 1][this.posJY + y].type == "monstre") || (this.tableau[this.posJX + x - 1][this.posJY + y].type == "monstre") || (this.tableau[this.posJX + x][this.posJY + y + 1].type == "monstre") || (this.tableau[this.posJX + x][this.posJY + y - 1].type == "monstre")) {
        return true; // retourne vrai s'il est dans la zone
      }
      else {
        return false; // retourne faux si non
      }
    }
    else {
      return false; // retourne faux si non
    }
  }

  // methode de détection des bord de la salle
  detectBord(x, y) {
    if (this.posJX + x < 0 || this.posJY + y < 0 || this.posJX + x == this.nbCaseX || this.posJY + y == this.nbCaseY) {
      return true; // retourne vrai si le joueur va dans un bord
    }
    else {
      return false; // retourne faux si non
    }
  }

  // methode de perte de vie du joueur
  changeImg() {
    document.getElementById('vie' + this.nbVies).setAttribute("src", "images/coeur_vide.png"); // on change le coeur plein par un coeur vide
    this.nbVies--; // on décrémente le nombre de vie
    const audio = new Audio('./sounds/monster.mp3');
    audio.volume = volume;
    audio.play(); // on joue le son de perte de vie

    // vérification si le joueur n'a plus de vie
    if (this.nbVies == 0) {
      const audio = new Audio('./sounds/game-over.mp3');
      audio.volume = volume;
      audio.play(); // on joue le son de game over
      console.log("vous avez perdu toutes vos vies, GAME OVER");
      recommencer(); // appel de la méthode recommencer
    }
  }

  // methode de changement des objets
  changeSave() {
    document.getElementById('perso' + (this.nbSave+1)).setAttribute("src", "images/coin.png"); // on change la pice vide par une piece pleine
    this.nbSave++; // on incrémente le nombre d'objet récupéré
    const audio = new Audio('./sounds/get-coin.mp3');
    audio.volume = volume;
    audio.play(); // on joue le son de récupération d'objet
  }

  // methode de récuperation des vies
  takeVie(){
    // vérification si le nombre de vie est inférieur à 3
    if(this.nbVies<3){
      document.getElementById('vie' + (this.nbVies+1)).setAttribute("src", "images/coeur_plein.png"); // on change le coeur vide par un coeur plein
      const audio = new Audio('./sounds/heart.wav');
      audio.volume = volume;
      audio.play(); // on joue le son de recuperation de vie
      this.nbVies++; // incrémentation du nombre de vie
    }
  }

  // methode de tir du personnage
  shot(direction){
    // switch en fonction de la dernière direction 
    switch(direction){
      // cas droite
      case "right":
        this.bullets[this.nbBullets] = new Bullet(this.posJX*30+30,this.posJY*30 +15,"black",ctx); // création d'un projectile en fonction de la position du joueur
        this.bullets[this.nbBullets].dx=2; // valeur du mouvement en x de 2
        this.bullets[this.nbBullets].dy=0; // valeur du mouvement en y de 0
        this.nbBullets++;
        break;
      // cas gauche
      case "left":
        this.bullets[this.nbBullets] = new Bullet(this.posJX*30,this.posJY*30+15,"black",ctx); // création d'un projectile en fonction de la position du joueur
        this.bullets[this.nbBullets].dx=-2; // valeur du mouvement en x de -2
        this.bullets[this.nbBullets].dy=0; // valeur du mouvement en y de 0
        this.nbBullets++
        break;
      // cas haut
      case "up":
        this.bullets[this.nbBullets] = new Bullet(this.posJX*30+15,this.posJY*30,"black",ctx); // création d'un projectile en fonction de la position du joueur
        this.bullets[this.nbBullets].dx=0; // valeur du mouvement en x de 0
        this.bullets[this.nbBullets].dy=-2; // valeur du mouvement en y de -2
        this.nbBullets++;
        break;
      // cas bas
      case "down":
        this.bullets[this.nbBullets] = new Bullet(this.posJX*30+15,this.posJY*30+30,"black",ctx); // création d'un projectile en fonction de la position du joueur
        this.bullets[this.nbBullets].dx=0; // valeur du mouvement en x de 0
        this.bullets[this.nbBullets].dy=2; // valeur du mouvement en y de 2
        this.nbBullets++;
        break;
      default:
        console.log("ce n'est pas une direction");
    }
    const audio = new Audio('./sounds/shot.mp3');
    audio.volume = volume;
    audio.play(); // on joue le son du tir du personnage
  }
}

// constante d'initialisation du numéro du monstre 
const getRandomMonster = () => {
  return `monster${Math.floor(Math.random() * (3 - 1 + 1)) + 1}`;
}

// constante du dessin de l'image du monstre
const drawImg = (ctx, i, j, imgName) => {
  const img = document.createElement('img');
  img.src = `./images/${imgName}.png`;
  ctx.drawImage(img, 0, 0, 30, 30, i * 30, j * 30, 30, 30);
};

// constante de la coueleur de la case en fonction du type de celle ci
const getCaseColor = (type) => {
  switch (type) {
    case "chemin":
    case "monstre":
    case "sortie":
    case "vie":
    case "joueur":
    case "save":
      return "rgba(255, 255, 255, 1)";
    case "mur":
      return "black";
    default:
      console.log("aucun type spécifique");
      break;
  }
};

// déclaration des varibles

window.onload = init; // appel de la fonction init lors de l'ouverture de la fenetre
let canvas; // le canvas
let s1; // la salle
let mostresImob; // les monstres imobiles
let nbMonstresImob; // le nombre de monstre imobile
let monstres; // les monstres qui bougent horizontalement ou verticalement
let nbMonstres; // le nombre de monstres qui bougent horizontalement ou verticalement
let monstresRapide; // les monstres qui bougent horizontalement ou verticalement plus rapidement
let nbMonstresRapide; // le nombre de monstres qui bougent horizontalement ou verticalement plus rapidement
let monstresZone; // les monstres qui se déplace  dans une zone
let nbMonstresZone; // le nombre de monstre qui se déplace dans une zone
let interval; // interval pour les monstres qui se déplacent horizontalement ou verticalement
let interval2; // interval pour le chronomètre
let interval3; // interval pour les monstres qui se déplace dans une zone
let interval4; // interval pour les monstres qui se déplacent horizontalement ou verticalement plus rapidement
let volume; // volume des sons

// fonction init 
function init() {
  s1 = new Salle(450, 450, 0, 7); // initialisation de la salle
  selectLevel(); // sélection du niveau en fonction du nbNiveau de la salle (initialisé à 1)
  console.log("salle initialisé");
  console.log("Page chargée");
  canvas = document.querySelector("#myCanvas"); // initialisation du canvas
  ctx = canvas.getContext("2d");
  responsiveCanvas();
  requestAnimationFrame(anime60foisParSecondes); // fonction pour l'animation
  s1.controls(); // initialisation des controls
  volume = readCookie("volume"); // initalisation du volume en focntion du cookie volume
}

// fonction de recuperation du cookie du son
function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0){
      return c.substring(nameEQ.length,c.length); // retourne la valeur du cookie (volume souhaité);
    }
  }
  return 1; // retourne un volume de 1 si le cookie n'est pas initialisé (volume max)
}


// fonction d'animation
function anime60foisParSecondes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // clear du canvas
  s1.draw(); // dessin de la salle

  // dessin des projectiles
  s1.bullets.forEach(function(item, index, array){
    item.move(index); // on fait bouger les projectiles en premier
    item.draw(); // on les dessine ensuite
  });
  requestAnimationFrame(anime60foisParSecondes);
}

// fonction d'incrémentation du chronomètre
function updateChrono(){
  s1.chrono++; // incrémentation du chrono 
  document.getElementById('chrono').textContent = "Time : "+s1.chrono+"     "; // modification de l'affichage
}

// fonction d'initialisation du canvas
function responsiveCanvas() {
  w = 450;
  h = 450;
  canvas.width = w;
  canvas.height = h;
}

// fonction de sélection du niveau
function selectLevel() {
  // switch en fonction du niveau de la salle
  switch (s1.niveau) {
    case 1:
      map1(); // appel de la fonction map1 qui initialise les mur, les monstres, les objet à ramasser, la sortie
      moveMonster(); // appel du mouvement des monstre qui se déplace en ligne
      interval = setInterval(moveMonster, 1000); // on set l'interval du mouvement des monstres
      interval2 = setInterval(updateChrono, 1000); // on set l'interval du chrono
      break;
    case 2:
      clearInterval(interval); // on clear l'interval du mouvement des monstres en ligne droite
      clearInterval(interval2); // on clear l'interval du chrono
      s1.chrono=0; // on remet le chrono à 0
      map2(); // appel de la fonction map2 qui initialise les mur, les monstres, les objet à ramasser, la sortie
      moveMonster(); // appel du mouvement des monstre qui se déplace en ligne
      interval = setInterval(moveMonster, 1000); // on set l'interval du mouvement des monstres
      interval2 = setInterval(updateChrono, 1000); // on set l'interval du chrono
      break;
    case 3:
      clearInterval(interval); // on clear l'interval du mouvement des monstres en ligne droite
      clearInterval(interval2); // on clear l'interval du chrono
      s1.chrono=0; // on remet le chrono à 0
      map3(); // appel de la fonction map3 qui initialise les mur, les monstres, les objet à ramasser, la sortie
      moveMonster(); // appel du mouvement des monstre qui se déplace en ligne
      interval = setInterval(moveMonster, 1000); // on set l'interval du mouvement des monstres
      interval2 = setInterval(updateChrono, 1000); // on set l'interval du chrono
      interval4 = setInterval(moveMonsterFast, 500); // on set l'interval des monstres rapides
      break;
    case 4:
      clearInterval(interval); // on clear l'interval du mouvement des monstres en ligne droite
      clearInterval(interval2); // on clear l'interval du chrono
      clearInterval(interval4); // on clear l'interval des monstres rapides
      s1.chrono=0; // on remet le chrono à 0
      map4(); // appel de la fonction map4 qui initialise les mur, les monstres, les objet à ramasser, la sortie
      moveMonster();
      interval = setInterval(moveMonster, 1000); // on set l'interval du mouvement des monstres
      interval2 = setInterval(updateChrono, 1000); // on set l'interval du chrono
      interval4 = setInterval(moveMonsterFast, 500); // on set l'interval des monstres rapides
      break;
    case 5:
      clearInterval(interval); // on clear l'interval du mouvement des monstres en ligne droite
      clearInterval(interval2); // on clear l'interval du chrono
      clearInterval(interval4); // on clear l'interval des monstres rapides
      s1.chrono=0; // on remet le chrono à 0
      map5(); // appel de la fonction map5 qui initialise les mur, les monstres, les objet à ramasser, la sortie
      moveMonster(); // appel du mouvement des monstre qui se déplace en ligne
      interval = setInterval(moveMonster, 1000); // on set l'interval du mouvement des monstres
      interval2 = setInterval(updateChrono, 1000); // on set l'interval du chrono
      interval4 = setInterval(moveMonsterFast, 500); // on set l'interval des monstres rapides
      break;
    case 6:
      clearInterval(interval); // on clear l'interval du mouvement des monstres en ligne droite
      clearInterval(interval2); // on clear l'interval du chrono
      clearInterval(interval4); // on clear l'interval des monstres rapides
      s1.chrono=0; // on remet le chrono à 0
      map6(); // appel de la fonction map6 qui initialise les mur, les monstres, les objet à ramasser, la sortie
      moveMonster(); // appel du mouvement des monstre qui se déplace en ligne
      interval = setInterval(moveMonster, 1000); // on set l'interval du mouvement des monstres
      interval2 = setInterval(updateChrono, 1000); // on set l'interval du chrono
      interval3 = setInterval(moveMonsterZone, 1000); // on set l'interval du mouvement des monstres en zone
      interval4 = setInterval(moveMonsterFast, 500); // on set l'interval des monstres rapides
      break;
    case 7:
      clearInterval(interval); // on clear l'interval du mouvement des monstres en ligne droite
      clearInterval(interval2); // on clear l'interval du chrono
      clearInterval(interval3); // on clear l'interval du mouvement des monstres en zone
      s1.chrono=0; // on remet le chrono à 0
      map7(); // appel de la fonction map7 qui initialise les mur, les monstres, les objet à ramasser, la sortie
      moveMonster(); // appel du mouvement des monstre qui se déplace en ligne
      interval = setInterval(moveMonster, 1000); // on set l'interval du mouvement des monstres
      interval2 = setInterval(updateChrono, 1000); // on set l'interval du chrono
      interval3 = setInterval(moveMonsterZone, 1000); // on set l'interval du mouvement des monstres en zone
      break;
    default:
      console.log("pas encore de niveau créer");
  }
}

// fonction recommencer lorsque l'on a plus de vie
function recommencer() {
  const modalELement = document.getElementById('modal');
  var lastStorage=1;
  for(var i=0;i<localStorage.length;i++){
    if(localStorage.getItem('Score'+(i+1))!=-1){
      lastStorage++;
    }
  }
  localStorage.setItem('Score'+lastStorage,s1.score);
  modalELement.style.display = 'block'; // affichage d'une modal qui permet de retourner au menu du jeu
}

// fonction de réinitialisation du niveau
function nextLevel() {
  s1.score+=600-s1.chrono; // le score est incrémenté en fonction du temps que l'on a passé a finir le niveau
  document.getElementById('score').textContent= 'Score : '+s1.score; // mise a jour de l'affichage du score
  s1.niveau+=3; // incrémentation du niveau
  s1.nbSave=0; // nombre d'objet réinitialisé à 0
  for(let i=0;i<3;i++){
    document.getElementById('perso' + (i+1)).setAttribute("src", "images/empty-coin.png"); // réinitialisation de l'affichage des objet en objet vide
  }
  selectLevel(); // appel de la fonction selec level pour le changement de niveau
}

// fonxtion du mouvement des monstres en ligne droite
function moveMonster() {
  for (let i = 0; i < nbMonstres; i++) {
    monstres[i].moveMonstre(); // appel de la fonction moveMonstre
  }
}

// fonction du mouvement des monstres rapide
function moveMonsterFast(){
  for (let i = 0; i < nbMonstresRapide; i++) {
    monstresRapide[i].moveMonstre(); // appel de la fonction moveMonstre
  } 
}

// fonction du mouvement des monstres en zone
function moveMonsterZone(){
  for (let i = 0; i < nbMonstresZone; i++) {
    monstresZone[i].moveMonstreZone(); // appel de la fonction moveMonstreZoone
  }
}

function map1() {

  // Le joueur
  s1.setJoueur(s1.tableau[0][7]);
  s1.posJX = 0;
  s1.posJY = 7;

  // Les murs du niveau

  s1.setMur(s1.tableau[0][5]);
  s1.setMur(s1.tableau[0][9]);
  s1.setMur(s1.tableau[1][5]);
  s1.setMur(s1.tableau[1][9]);
  s1.setMur(s1.tableau[2][9]);
  s1.setMur(s1.tableau[3][5]);
  s1.setMur(s1.tableau[3][9]);
  s1.setMur(s1.tableau[4][0]);
  s1.setMur(s1.tableau[4][1]);
  s1.setMur(s1.tableau[4][2]);
  s1.setMur(s1.tableau[4][5]);
  s1.setMur(s1.tableau[4][6]);
  s1.setMur(s1.tableau[4][7]);
  s1.setMur(s1.tableau[4][8]);
  s1.setMur(s1.tableau[4][9]);
  s1.setMur(s1.tableau[4][10]);
  s1.setMur(s1.tableau[4][11]);
  s1.setMur(s1.tableau[4][12]);
  s1.setMur(s1.tableau[4][14]);
  s1.setMur(s1.tableau[5][2]);
  s1.setMur(s1.tableau[5][5]);
  s1.setMur(s1.tableau[6][2]);
  s1.setMur(s1.tableau[6][5]);
  s1.setMur(s1.tableau[7][2]);
  s1.setMur(s1.tableau[8][5]);
  s1.setMur(s1.tableau[9][0]);
  s1.setMur(s1.tableau[9][1]);
  s1.setMur(s1.tableau[9][2]);
  s1.setMur(s1.tableau[9][5]);
  s1.setMur(s1.tableau[10][5]);
  s1.setMur(s1.tableau[10][8]);
  s1.setMur(s1.tableau[10][10]);
  s1.setMur(s1.tableau[10][11]);
  s1.setMur(s1.tableau[10][12]);
  s1.setMur(s1.tableau[10][13]);
  s1.setMur(s1.tableau[10][14]);
  s1.setMur(s1.tableau[11][5]);
  s1.setMur(s1.tableau[11][8]);
  s1.setMur(s1.tableau[12][5]);
  s1.setMur(s1.tableau[12][8]);
  s1.setMur(s1.tableau[13][5]);
  s1.setMur(s1.tableau[13][8]);
  s1.setMur(s1.tableau[14][5]);
  s1.setMur(s1.tableau[14][8]);


  // Les monstres + la zone
  s1.setMonstre(s1.tableau[5][8], getRandomMonster());
  s1.setMonstre(s1.tableau[8][0], getRandomMonster());
  s1.setMonstre(s1.tableau[13][9], getRandomMonster());
  monstresImob = [new Monstre(8, 0, 2, new Zone(0,0,15,15)),new Monstre(13, 9, 2, new Zone(0,0,15,15))];
  nbMonstresImob = 2;
  monstres = [new Monstre(5, 8, 1, new Zone(0,0,15,15))];
  nbMonstres = 1;

  // Save

  s1.setSave(s1.tableau[1][1]);
  s1.setSave(s1.tableau[13][3]);
  s1.setSave(s1.tableau[0][13]);

  // La sortie

  s1.setSortie(s1.tableau[14][13]);

}

function map2() {

  // le départ
  s1.initTableau();
  s1.setJoueur(s1.tableau[0][1]);
  s1.setChemin(s1.tableau[s1.posJX][s1.posJY]);
  s1.posJX = 0;
  s1.posJY = 1;

  // Les murs du niveau

  s1.setMur(s1.tableau[0][3]);
  s1.setMur(s1.tableau[0][11]);
  s1.setMur(s1.tableau[1][3]);
  s1.setMur(s1.tableau[1][11]);
  s1.setMur(s1.tableau[2][3]);
  s1.setMur(s1.tableau[2][11]);
  s1.setMur(s1.tableau[3][3]);
  s1.setMur(s1.tableau[3][8]);
  s1.setMur(s1.tableau[3][11]);
  s1.setMur(s1.tableau[4][3]);
  s1.setMur(s1.tableau[4][8]);
  s1.setMur(s1.tableau[4][11]);
  s1.setMur(s1.tableau[5][0]);
  s1.setMur(s1.tableau[5][1]);
  s1.setMur(s1.tableau[5][3]);
  s1.setMur(s1.tableau[5][8]);
  s1.setMur(s1.tableau[5][11]);
  s1.setMur(s1.tableau[6][8]);
  s1.setMur(s1.tableau[6][11]);
  s1.setMur(s1.tableau[7][8]);
  s1.setMur(s1.tableau[7][11]);
  s1.setMur(s1.tableau[7][13]);
  s1.setMur(s1.tableau[7][14]);
  s1.setMur(s1.tableau[8][8]);
  s1.setMur(s1.tableau[8][11]);
  s1.setMur(s1.tableau[9][08]);
  s1.setMur(s1.tableau[10][4]);
  s1.setMur(s1.tableau[10][5]);
  s1.setMur(s1.tableau[10][6]);
  s1.setMur(s1.tableau[10][7]);
  s1.setMur(s1.tableau[10][8]);
  s1.setMur(s1.tableau[10][11]);
  s1.setMur(s1.tableau[11][4]);
  s1.setMur(s1.tableau[11][11]);
  s1.setMur(s1.tableau[12][4]);
  s1.setMur(s1.tableau[12][11]);
  s1.setMur(s1.tableau[13][4]);
  s1.setMur(s1.tableau[13][11]);
  s1.setMur(s1.tableau[14][4]);
  s1.setMur(s1.tableau[14][11]);


  // Les monstres 
  s1.setMonstre(s1.tableau[0][8], getRandomMonster());
  s1.setMonstre(s1.tableau[6][0], getRandomMonster());
  s1.setMonstre(s1.tableau[10][9], getRandomMonster());
  s1.setMonstre(s1.tableau[2][12], getRandomMonster());
  s1.setMonstre(s1.tableau[5][14], getRandomMonster());
  monstresImob= [new Monstre(0, 8, 2, new Zone(0,0,15,15)),new Monstre(10, 9, 2, new Zone(0,0,15,15)),new Monstre(2, 12, 2, new Zone(0,0,15,15)),new Monstre(5, 14, 0, new Zone(0,0,15,15))];
  nbMonstresImob=4;
  monstres = [new Monstre(6, 0, 0, new Zone(0,0,15,15))];
  nbMonstres = 1;

  // Save

  s1.setSave(s1.tableau[0][10]);
  s1.setSave(s1.tableau[13][1]);
  s1.setSave(s1.tableau[13][13]);

  // La sortie

  s1.setSortie(s1.tableau[1][14]);

}

function map3() {

  // Le joueur
  s1.initTableau();
  s1.setJoueur(s1.tableau[0][14]);
  s1.setChemin(s1.tableau[s1.posJX][s1.posJY]);
  s1.posJX = 0;
  s1.posJY = 14;

  // Les Murs
  s1.setMur(s1.tableau[0][9]);
  s1.setMur(s1.tableau[0][12]);
  s1.setMur(s1.tableau[1][9]);
  s1.setMur(s1.tableau[1][12]);
  s1.setMur(s1.tableau[2][5]);
  s1.setMur(s1.tableau[2][9]);
  s1.setMur(s1.tableau[2][12]);
  s1.setMur(s1.tableau[3][5]);
  s1.setMur(s1.tableau[3][9]);
  s1.setMur(s1.tableau[3][12]);
  s1.setMur(s1.tableau[3][14]);
  s1.setMur(s1.tableau[4][5]);
  s1.setMur(s1.tableau[4][9]);
  s1.setMur(s1.tableau[5][5]);
  s1.setMur(s1.tableau[5][9]);
  s1.setMur(s1.tableau[5][12]);
  s1.setMur(s1.tableau[6][5]);
  s1.setMur(s1.tableau[6][12]);
  s1.setMur(s1.tableau[7][5]);
  s1.setMur(s1.tableau[7][12]);
  s1.setMur(s1.tableau[8][1]);
  s1.setMur(s1.tableau[8][2]);
  s1.setMur(s1.tableau[8][3]);
  s1.setMur(s1.tableau[8][4]);
  s1.setMur(s1.tableau[8][5]);
  s1.setMur(s1.tableau[8][12]);
  s1.setMur(s1.tableau[9][5]);
  s1.setMur(s1.tableau[9][6]);
  s1.setMur(s1.tableau[9][7]);
  s1.setMur(s1.tableau[9][8]);
  s1.setMur(s1.tableau[9][12]);
  s1.setMur(s1.tableau[10][5]);
  s1.setMur(s1.tableau[10][12]);
  s1.setMur(s1.tableau[11][0]);
  s1.setMur(s1.tableau[11][1]);
  s1.setMur(s1.tableau[11][2]);
  s1.setMur(s1.tableau[11][5]);
  s1.setMur(s1.tableau[11][12]);
  s1.setMur(s1.tableau[12][5]);
  s1.setMur(s1.tableau[12][12]);
  s1.setMur(s1.tableau[13][5]);
  s1.setMur(s1.tableau[14][5]);


  // Les Monstres 
  var mSalle3 = [new Monstre(0, 4, 1, new Zone(0,0,15,15)), new Monstre(6, 6, 0, new Zone(0,0,15,15))]; 
  s1.setMonstre(s1.tableau[0][4], mSalle3[0].imgUrl);
  s1.setMonstre(s1.tableau[6][6], mSalle3[1].imgUrl);
  monstres = [mSalle3[0]];
  monstresRapide = [mSalle3[1]];
  nbMonstres = 1;
  nbMonstresRapide=1;

  // Vie

  s1.setVie(s1.tableau[14][7]);

  // Save

  s1.setSave(s1.tableau[0][11]);
  s1.setSave(s1.tableau[12][7]);
  s1.setSave(s1.tableau[0][0]);

  // La sortie

  s1.setSortie(s1.tableau[14][0]);

}

function map4() {

  // Le joueur
  s1.initTableau();
  s1.setJoueur(s1.tableau[6][7]);
  s1.setChemin(s1.tableau[s1.posJX][s1.posJY]);
  s1.posJX = 6;
  s1.posJY = 7;

  // Les Murs
  s1.setMur(s1.tableau[4][1]);
  s1.setMur(s1.tableau[4][2]);
  s1.setMur(s1.tableau[4][3]);
  s1.setMur(s1.tableau[4][4]);
  s1.setMur(s1.tableau[4][5]);
  s1.setMur(s1.tableau[4][6]);
  s1.setMur(s1.tableau[4][7]);
  s1.setMur(s1.tableau[4][8]);
  s1.setMur(s1.tableau[4][9]);
  s1.setMur(s1.tableau[4][10]);
  s1.setMur(s1.tableau[4][11]);
  s1.setMur(s1.tableau[5][5]);
  s1.setMur(s1.tableau[5][11]);
  s1.setMur(s1.tableau[5][12])
  s1.setMur(s1.tableau[6][5]);
  s1.setMur(s1.tableau[7][5]);
  s1.setMur(s1.tableau[7][11]);
  s1.setMur(s1.tableau[7][12]);
  s1.setMur(s1.tableau[7][13]);
  s1.setMur(s1.tableau[8][1]);
  s1.setMur(s1.tableau[8][2]);
  s1.setMur(s1.tableau[8][3]);
  s1.setMur(s1.tableau[8][4]);
  s1.setMur(s1.tableau[8][5]);
  s1.setMur(s1.tableau[8][6]);
  s1.setMur(s1.tableau[8][7]);
  s1.setMur(s1.tableau[8][8]);
  s1.setMur(s1.tableau[8][9]);
  s1.setMur(s1.tableau[8][10]);
  s1.setMur(s1.tableau[8][11]);
  s1.setMur(s1.tableau[9][7]);
  s1.setMur(s1.tableau[10][7]);
  s1.setMur(s1.tableau[12][13]);
  s1.setMur(s1.tableau[13][3]);
  s1.setMur(s1.tableau[13][7]);
  s1.setMur(s1.tableau[13][13]);
  s1.setMur(s1.tableau[14][3]);
  s1.setMur(s1.tableau[14][7]);
  s1.setMur(s1.tableau[14][13]);


  // Les Monstres
  var mSalle4 = [new Monstre(0, 2, 1, new Zone(0,0,15,15)), new Monstre(0, 11, 1, new Zone(0,0,15,15)), new Monstre(12, 7, 0, new Zone(0,0,15,15)),new Monstre(3, 6, 1, new Zone(0,0,15,15)), new Monstre(9, 3, 1, new Zone(0,0,15,15))]
  s1.setMonstre(s1.tableau[0][2], mSalle4[0].imgUrl);
  s1.setMonstre(s1.tableau[0][11], mSalle4[1].imgUrl);
  s1.setMonstre(s1.tableau[3][6], mSalle4[3].imgUrl);
  s1.setMonstre(s1.tableau[9][3], mSalle4[4].imgUrl);
  s1.setMonstre(s1.tableau[12][7], mSalle4[2].imgUrl);
  monstres = [mSalle4[0],mSalle4[1],mSalle4[2]];
  monstresRapide = [mSalle4[4],mSalle4[3]];
  nbMonstres = 3;
  nbMonstresRapide  = 2;

  // Save

  s1.setSave(s1.tableau[0][8]);
  s1.setSave(s1.tableau[10][5]);
  s1.setSave(s1.tableau[3][4]);

  // La sortie

  s1.setSortie(s1.tableau[6][4]);

}

function map5() {

  // Le joueur
  s1.initTableau();
  s1.setJoueur(s1.tableau[0][12]);
  s1.setChemin(s1.tableau[s1.posJX][s1.posJY]);
  s1.posJX = 0;
  s1.posJY = 12;

  // Les Murs
  s1.setMur(s1.tableau[0][6]);
  s1.setMur(s1.tableau[1][6]);
  s1.setMur(s1.tableau[2][6]);
  s1.setMur(s1.tableau[2][9]);
  s1.setMur(s1.tableau[2][10]);
  s1.setMur(s1.tableau[2][11]);
  s1.setMur(s1.tableau[2][12]);
  s1.setMur(s1.tableau[2][13]);
  s1.setMur(s1.tableau[2][14]);
  s1.setMur(s1.tableau[3][0]);
  s1.setMur(s1.tableau[3][1]);
  s1.setMur(s1.tableau[3][2]);
  s1.setMur(s1.tableau[3][3]);
  s1.setMur(s1.tableau[3][4])
  s1.setMur(s1.tableau[3][6]);
  s1.setMur(s1.tableau[4][6]);
  s1.setMur(s1.tableau[5][6]);
  s1.setMur(s1.tableau[6][6]);
  s1.setMur(s1.tableau[6][7]);
  s1.setMur(s1.tableau[6][8]);
  s1.setMur(s1.tableau[6][9]);
  s1.setMur(s1.tableau[6][10]);
  s1.setMur(s1.tableau[6][11]);
  s1.setMur(s1.tableau[7][8]);
  s1.setMur(s1.tableau[8][8]);
  s1.setMur(s1.tableau[9][8]);
  s1.setMur(s1.tableau[9][10]);
  s1.setMur(s1.tableau[9][11]);
  s1.setMur(s1.tableau[9][12]);
  s1.setMur(s1.tableau[9][13]);
  s1.setMur(s1.tableau[9][14]);
  s1.setMur(s1.tableau[10][5]);
  s1.setMur(s1.tableau[10][6]);
  s1.setMur(s1.tableau[10][7]);
  s1.setMur(s1.tableau[10][8]);
  s1.setMur(s1.tableau[11][5]);
  s1.setMur(s1.tableau[12][5]);
  s1.setMur(s1.tableau[12][6]);
  s1.setMur(s1.tableau[12][7]);
  s1.setMur(s1.tableau[12][8]);
  s1.setMur(s1.tableau[12][9]);
  s1.setMur(s1.tableau[12][10]);
  s1.setMur(s1.tableau[12][11]);
  s1.setMur(s1.tableau[12][12]);
  s1.setMur(s1.tableau[13][5]);


  // Les Monstres
  
  var mSalle5 = [new Monstre(11, 0, 0, new Zone(0,0,15,15)), new Monstre(5, 0, 0, new Zone(0,0,15,15)),new Monstre(3, 12, 1, new Zone(0,0,15,15)), new Monstre(8, 7, 0, new Zone(0,0,15,15))]
  s1.setMonstre(s1.tableau[3][12], mSalle5[2].imgUrl);
  s1.setMonstre(s1.tableau[5][0], mSalle5[1].imgUrl);
  s1.setMonstre(s1.tableau[8][7], mSalle5[3].imgUrl);
  s1.setMonstre(s1.tableau[11][0], mSalle5[0].imgUrl);
  monstres = [mSalle5[0],mSalle5[1]];
  monstresRapide = [mSalle5[2],mSalle5[3]];
  nbMonstres = 2;
  nbMonstresRapide = 2;

  // Vie 

  s1.setVie(s1.tableau[4][0]);

  // Save

  s1.setSave(s1.tableau[4][14]);
  s1.setSave(s1.tableau[10][0]);
  s1.setSave(s1.tableau[7][7]);

  // La sortie

  s1.setSortie(s1.tableau[1][0]);

}

function map6() {

  // Le joueur
  s1.initTableau();
  s1.setJoueur(s1.tableau[6][14]);
  s1.setChemin(s1.tableau[s1.posJX][s1.posJY]);
  s1.posJX = 6;
  s1.posJY = 14;

  // Les Murs
  s1.setMur(s1.tableau[0][2]);
  s1.setMur(s1.tableau[1][2]);
  s1.setMur(s1.tableau[2][2]);
  s1.setMur(s1.tableau[3][2]);
  s1.setMur(s1.tableau[4][0]);
  s1.setMur(s1.tableau[4][2]);
  s1.setMur(s1.tableau[4][3]);
  s1.setMur(s1.tableau[4][4]);
  s1.setMur(s1.tableau[4][5]);
  s1.setMur(s1.tableau[4][11]);
  s1.setMur(s1.tableau[4][12]);
  s1.setMur(s1.tableau[5][5]);
  s1.setMur(s1.tableau[5][8]);
  s1.setMur(s1.tableau[5][9]);
  s1.setMur(s1.tableau[5][10]);
  s1.setMur(s1.tableau[5][11]);
  s1.setMur(s1.tableau[6][5]);
  s1.setMur(s1.tableau[6][11]);
  s1.setMur(s1.tableau[7][5]);
  s1.setMur(s1.tableau[7][11]);
  s1.setMur(s1.tableau[8][5]);
  s1.setMur(s1.tableau[8][11]);
  s1.setMur(s1.tableau[8][12]);
  s1.setMur(s1.tableau[8][13]);
  s1.setMur(s1.tableau[8][14]);
  s1.setMur(s1.tableau[9][5]);
  s1.setMur(s1.tableau[9][6]);
  s1.setMur(s1.tableau[9][7]);
  s1.setMur(s1.tableau[9][8]);
  s1.setMur(s1.tableau[10][5]);
  s1.setMur(s1.tableau[10][8]);
  s1.setMur(s1.tableau[11][0]);
  s1.setMur(s1.tableau[11][1]);
  s1.setMur(s1.tableau[11][2]);
  s1.setMur(s1.tableau[11][8]);
  s1.setMur(s1.tableau[12][5]);
  s1.setMur(s1.tableau[12][8]);
  s1.setMur(s1.tableau[12][9]);
  s1.setMur(s1.tableau[12][10]);
  s1.setMur(s1.tableau[12][11]);
  s1.setMur(s1.tableau[12][12]);
  s1.setMur(s1.tableau[13][5]);
  s1.setMur(s1.tableau[14][5]);


  // Les Monstres

  var zone = new Zone(0,8,5,15);
  var zone2 = new Zone(5,0,15,5);
  var mSalle6 = [new Monstre(0,11,0,zone), new Monstre(9,0,0,zone2),new Monstre(11, 9, 1, new Zone(0,0,15,15))]
  s1.setMonstre(s1.tableau[11][9], mSalle6[2].imgUrl);
  s1.setMonstre(s1.tableau[0][11], mSalle6[0].imgUrl);
  s1.setMonstre(s1.tableau[9][0], mSalle6[1].imgUrl);
  monstres = [];
  nbMonstres = 0;
  monstresRapide = [mSalle6[2]];
  nbMonstresRapide = 1;
  monstresZone = [mSalle6[0],mSalle6[1]];
  nbMonstresZone = 2;

  // Vie 

  s1.setVie(s1.tableau[14][6]);

  // Save

  s1.setSave(s1.tableau[2][3]);
  s1.setSave(s1.tableau[14][12]);
  s1.setSave(s1.tableau[7][0]);

  // La sortie

  s1.setSortie(s1.tableau[2][0]);

}

function map7() {

  // Le joueur
  s1.initTableau();
  s1.setJoueur(s1.tableau[5][6]);
  s1.setChemin(s1.tableau[s1.posJX][s1.posJY]);
  s1.posJX = 5;
  s1.posJY = 6;

  // Les Murs
  s1.setMur(s1.tableau[2][8]);
  s1.setMur(s1.tableau[3][8]);
  s1.setMur(s1.tableau[4][0]);
  s1.setMur(s1.tableau[4][1]);
  s1.setMur(s1.tableau[4][2]);
  s1.setMur(s1.tableau[4][3]);
  s1.setMur(s1.tableau[4][4]);
  s1.setMur(s1.tableau[4][5]);
  s1.setMur(s1.tableau[4][6]);
  s1.setMur(s1.tableau[4][7]);
  s1.setMur(s1.tableau[4][8]);
  s1.setMur(s1.tableau[5][5]);
  s1.setMur(s1.tableau[5][8]);
  s1.setMur(s1.tableau[6][8]);
  s1.setMur(s1.tableau[7][5]);
  s1.setMur(s1.tableau[8][5]);
  s1.setMur(s1.tableau[8][8]);
  s1.setMur(s1.tableau[9][5]);
  s1.setMur(s1.tableau[9][6]);
  s1.setMur(s1.tableau[9][7]);
  s1.setMur(s1.tableau[9][8]);
  s1.setMur(s1.tableau[9][9]);
  s1.setMur(s1.tableau[9][10]);
  s1.setMur(s1.tableau[9][11]);
  s1.setMur(s1.tableau[9][12]);
  s1.setMur(s1.tableau[9][13]);
  s1.setMur(s1.tableau[9][14]);
  s1.setMur(s1.tableau[10][6]);
  s1.setMur(s1.tableau[11][6]);
  s1.setMur(s1.tableau[14][6]);


  // Les Monstres
  var zone = new Zone(4,0,15,5);
  var zone2 = new Zone(0,9,8,15);
  var zone3 = new Zone(10,6,15,15);
  var mSalle7 =  [new Monstre(11,0,0,zone), new Monstre(10,12,0,zone3), new Monstre(0,10,0,zone2)];
  s1.setMonstre(s1.tableau[11][0],mSalle7[0].imgUrl);
  s1.setMonstre(s1.tableau[10][12], mSalle7[1].imgUrl);
  s1.setMonstre(s1.tableau[0][10], mSalle7[2].imgUrl);
  monstres = [];
  nbMonstres = 0;
  monstresRapide = [];
  nbMonstresRapide = 0;
  monstresZone = mSalle7;
  nbMonstresZone = 3;

  // Vie 

  s1.setVie(s1.tableau[8][14]);

  // Save

  s1.setSave(s1.tableau[3][14]);
  s1.setSave(s1.tableau[6][0]);
  s1.setSave(s1.tableau[11][14]);

  // La sortie

  s1.setSortie(s1.tableau[1][0]);

}