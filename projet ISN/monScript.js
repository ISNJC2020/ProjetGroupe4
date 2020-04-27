///////////////
/* monScript */
///////////////

/* les variables globales */

var leDessin;

// dimensions de la zone graphique
var longueur = 800;
var largeur = 800;

//variale jeu
var selection = 0;//si 1 alors point sur carte est selectionné(on ne peut plus selectionner
				  //si 2 alors bouton suivant cliqué


//coord lieu a trouver
var ville = "ville";
var villeX=0;
var villeY=0;


//echelle carte
var pixel = 250/184; //184 pixels = 250km



var distance;
var lancerannimation = 0;
var fenetrefin =0;
var fenetresuivant=0;



//score :
var score = 0;
var scoretotal=0;



function calcul()
{
	image(cartefrance,0,0,800,800);
	selection = 1;

	distance = sqrt( ( (mouseX-villeX)) * ( (mouseX-villeX)) + ( (mouseY-villeY)) * ( (mouseY-villeY)) );
	centreX = mouseX;
	centreY = mouseY;
	
	
	//score :
	score = (500-(distance*distance*distance/25000));
	if (score < 0){score=0}
	scoretotal = scoretotal + score;
	print("score : "+score);
	print("scoretotal : "+scoretotal);
}



//variable pour ne pas avoir 2 fois le meme lieu :
var lieu0 = 0;
var lieu1 = 0;
var lieu2 = 0;
var lieu3 = 0;
var lieu4 = 0;
var lieu5 = 0;


var numeroville=0;
var nombreessai = 0;
function villealea()
{
	print("VILLEALEATOIRE");
	nombreessai++;
	
	numeroville = int(random(0,4));
	
	
	
	if (nombreessai==100)
	{
		
		ville = "Fin du jeu";
		print("fin du jeu");
		selection = 1;
		fenetrefin = 1;
		return;
	}
	
	
	
	
	//coord ville a trouver
	if (numeroville==0)
	{
		if(lieu0==0)
		{
		lieu0 = 1;
		ville = "Paris";//paris = "Paris";
		villeX=412;//parisX = 412;
		villeY=200;//parisY = 200;
		}
		else
		{
			//numeroville++;
			//print("+1");
			return villealea();
		}
	}
	if (numeroville==1)
	{
		if(lieu1==0)
		{
		lieu1 = 1;
		ville = "Rennes";//rennes = "Rennes"
		villeX=186;//rennesX = 186;
		villeY=245;//rennesY = 245;
		}
		else
		{
			//numeroville++;
			//print("+1");
			return villealea();
		}
	}
	if (numeroville==2)
	{
		if(lieu2==0)
		{
		lieu2 = 1;
		ville = "Lyon";//lyon = "Lyon";
		villeX=541;//lyonX=541;
		villeY=430;//lyonY=430;
		}
		else
		{
			//numeroville++;
			//print("+1");
			return villealea();
		}
	}
	if (numeroville==3)
	{
		if(lieu3==0)
		{
		lieu3 = 1;
		ville = "Lille";//lille = "Lille";
		villeX=449;//lilleX=449;
		villeY=65;//lilleY=65;
		}
		else
		{
			//numeroville++;
			//print("+1");
			return villealea();
		}
	}
	
	
	

}

var i = 0;
function animation()//cercle qui se reduit
{
	
	image(cartefrance,0,0,800,800);
	fill(255,255,255,128);
	circle(centreX,centreY,i);
	fill(0,0,0,255);
	circle(centreX,centreY,4);
	i+=7;
	if(i>distance*2)
	{
		lancerannimation = 0;
		fenetresuivant=1;
		i=0;
	}
}



// la méthode qui s'exécute au chargement
function preload()
{
	cartefrance=loadImage('data/cartes/france.png');
	pin=loadImage('data/pin.png');
}


function mouseReleased()
{
	if (mouseButton == LEFT) 
	{
		if (selection==0)//si rien de selectionné on selection un point
		{
			calcul();
			lancerannimation = 1;	
		}
		if (fenetresuivant==1)//bouton suivant
		{
			if( (mouseX>350 ) && (mouseX<450 ) && (mouseY>450 ) && (mouseY<490 ) )
			{
				lancerannimation=0;
				fenetresuivant =0;
				selection=0;
				villealea();
				image(cartefrance,0,0,800,800);
				
				
			}
		}
		else{
		if (fenetrefin==1)//bouton restart
		{
			if( (mouseX>350 ) && (mouseX<450 ) && (mouseY>450 ) && (mouseY<490 ) )
			{
				nombreessai=0;
				lancerannimation=0;
				fenetrefin =0;
				selection=0;
				numeroville=0;
				scoretotal=0;
				lieu0=0;lieu1=0;lieu2=0;lieu3=0;lieu4=0;
				villealea();
				image(cartefrance,0,0,800,800);
				
				print("RESTARTING");
			}
		}
		}
	}

}

function setup()
{
	leDessin=createCanvas(longueur,largeur);
	leDessin.parent("dessin");
	background('white');
	image(cartefrance,0,0,800,800);
	print("/////////////////");
	print("debut programme");
	print("/////////////////");
	
	villealea();
	
	print("fin setup");
	print(" ");
}

// la méthode qui s'exécute en boucle

function draw()
{
	
	
	
	if (mouseIsPressed) 
	{
        if (mouseButton == RIGHT) 
		{
		  print(mouseX,mouseY);
		}	
		
    }
	
	
	
	
	if (lancerannimation ==1)//le cercle se créer
	{
		animation();
	}
	
	
	
	
	if (fenetresuivant ==1) //fenetre bouton suivant
	{
		image(pin,villeX-43,villeY-48,70,55);
		fill(255,255,255);
		rect(200, 300, 400, 200);
		fill(0, 102, 153);
		textSize(30);
		text("Bravo !",350,350);
		text("tu es a        km de",220,375);
		text(int(distance*pixel),320,375);
		text(ville,470,375);
		
		fill(100,100,100);
		rect(350, 450, 100, 40, 5);
		
		fill(255,255,255);
		textSize(15);
		text("SUIVANT",370,475);

	}
	
	if (fenetrefin ==1) //fenetre bouton restart
	{
		image(pin,villeX-43,villeY-48,70,55);
		fill(255,255,255);
		rect(200, 300, 400, 200);
		fill(0, 102, 153);
		textSize(30);
		text("Bravo !",350,350);
		text("tu as fini le jeu !",220,375);
		
		text("SCORE :",300,400);
		text(int(scoretotal),435,400);
		
		fill(100,100,100);
		rect(350, 450, 100, 40, 5);
		
		fill(255,255,255);
		textSize(15);
		text("RESTART",370,475);

	}
	
	
	
	textSize(30);
	fill(0,0,0);
	text(ville,20,30);
	
	//print(fenetrefin);
}