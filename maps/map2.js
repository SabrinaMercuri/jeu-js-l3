function map2(){

    // le départ
    s1.initTableau();
    s1.setJoueur(s1.tableau[0][1]);
    s1.setChemin(s1.tableau[s1.posJX][s1.posJY]);
    s1.posJX=0;
    s1.posJY=1;

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
    //s1.setMur(s1.tableau[9][11]);
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

    s1.setMonstre(s1.tableau[0][8]);
    s1.setMonstre(s1.tableau[6][0]);
    s1.setMonstre(s1.tableau[8][10]);
    s1.setMonstre(s1.tableau[8][13]);

    // La sortie

    s1.setSortie(s1.tableau[1][14]);

}