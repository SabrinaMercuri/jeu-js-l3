function map1(){

    // Le joueur
    s1.setJoueur(s1.tableau[0][7]);
    s1.posJX=0;
    s1.posJY=7;

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


    // Les monstres 

    s1.setMonstre(s1.tableau[0][11]);
    s1.setMonstre(s1.tableau[8][0]);
    s1.setMonstre(s1.tableau[9][8]);

    // La sortie

    s1.setSortie(s1.tableau[14][13]);

}