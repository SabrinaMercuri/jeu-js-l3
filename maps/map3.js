function map3(){
    
    // Le joueur
    s1.initTableau();
    s1.setJoueur(s1.tableau[0][14]);
    s1.setChemin(s1.tableau[s1.posJX][s1.posJY]);
    s1.posJX=0;
    s1.posJY=14;

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

    s1.setMonstre(s1.tableau[0][4]);
    s1.setMonstre(s1.tableau[6][6]);

    // La sortie

    s1.setSortie(s1.tableau[14][0]);

}