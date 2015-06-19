
// 
//  index.js
//  useTableViewData
//  
//  Created by Enrique Gachuz on 2015-06-19.
//  Copyright 2015 Enrique Gachuz. All rights reserved.
// 



$.index.open();

var puntosDisponibles=0;



var premios=[{
	"id":1,
	"nombrePremio":"Premio 1",
	"costoPuntos":100,
	"existencias":3,
 },{
	"id":23,
	"nombrePremio":"Premio 2",
	"costoPuntos":500,
	"existencias":8
  },{
	"id":43,
	"nombrePremio":"Premio 3",
	"costoPuntos":1500,
	"existencias":2
  },{
	"id":56,
	"nombrePremio":"Premio 4",
	"costoPuntos":2300,
	"existencias":10
  },{
	"id":105,
	"nombrePremio":"Premio 5",
	"costoPuntos":800,
	"existencias":23
  }];

var data=[];

for(var i=0;i<premios.length;i++){
	
	//create row and add the properties "idPremio","nombre","valorPuntos","existencias"
	var row=Ti.UI.createTableViewRow({
		height:80,
		idPremio:premios[i].id,
		nombre:premios[i].nombrePremio,
		valorPuntos:premios[i].costoPuntos,
		existencias:premios[i].existencias
		
	});
	
	//now create the elements for our custom row, notice for each element we add an "id" property to 
	var contenedorImagen=Ti.UI.createView({
		height:'80%',
		width:'20%',
		backgroundColor:'red',
		left:'5',
		id:'contenedor_Image'
	});
	var imagen=Ti.UI.createImageView({
		image:''
	});
	
	var nombreProducto=Ti.UI.createLabel({
		top:'2%',
		left:'22%',
		text:premios[i].nombrePremio,
		color:'black'
	});
	
	var valorProducto=Ti.UI.createLabel({
		top:'70%',
		left:'22%',
		text:'cost/valor: '+premios[i].costoPuntos,
		color:'black',
		id:'etiquetaValorP'
		
	});
	
	var existencias=Ti.UI.createLabel({
		left:'22%',
		text:'stock: '+premios[i].existencias,
		color:'black',
		id:'etiquetaExistencias'
	});
	//craete our checkbox with default value false
	var checkar=Ti.UI.createSwitch({
		style:Ti.UI.Android.SWITCH_STYLE_CHECKBOX,
		value:false,
		right:'5%',
		id:'checkar'
		
	});
	
	//add our buttons to update the value for @cantidadP
	var botonMas=Ti.UI.createButton({
		height:'25%',
		width:'9%',
		right:'21%',
		title:'+',
		color:'white',
		backgroundColor:'blue',
		id:'mas'
	});
	var botonMenos=Ti.UI.createButton({
		height:'25%',
		width:'8%',
		right:'14%',
		color:'white',
		backgroundColor:'orange',
		title:'-',
		id:'menos'
	});
	
	//this is the value we will change with the "+" "-" buttons 
	var cantidadP=Ti.UI.createLabel({
		bottom:'1%',
		right:'2%',
		text:'0',
		color:'black',
		id:'cantidadSolicitada'
	});
	var cantidadtitulo=Ti.UI.createLabel({
		bottom:'1%',
		right:'5%',
		text:'Cantidad: ',
		color:'black',
		id:'cantidadtitulo'
	});
	
	//this is the container for the imageview
	contenedorImagen.add(imagen);
	
	//add each element into the row notice the order, because this is how we can update and read the elements
	row.add(nombreProducto);
	row.add(valorProducto);
	row.add(existencias);
	row.add(contenedorImagen);
	//@chekar is on the 4 position on the children object array for each row
	row.add(checkar);
	row.add(botonMas);
	row.add(botonMenos);
	//@cantidadP is on the 7 position on the children object array for each row
	row.add(cantidadP);
	row.add(cantidadtitulo);
	data.push(row);
	
}
$.listaPremios.data=data;


///let´s add our event listener for the table view events
$.listaPremios.addEventListener('click',function(e){
	
	//Ti.API.info(''+JSON.stringify(e.source));
	//first we will update the value for @cantidadP elemento on each row
	if(e.source.id=='mas'){
		//to update the label you must read $.tableView.data array and go to the children element position of the row
		//in this case our label is on the 7 position into the children object of the row
		//so our way to reach it is = $.listaPremios.data[0].rows[e.index].children[7];
		//on the "rows" object  notice we use "e.index" to update an especific row
		var actualizarCantidad=$.listaPremios.data[0].rows[e.index].children[7];
		//and for change the value we only need to do this
		actualizarCantidad.text=parseInt(actualizarCantidad.text)+1;
	}
	
	//the same is for the  minus button
	if(e.source.id=='menos'){
		var actualizarCantidad=$.listaPremios.data[0].rows[e.index].children[7];
		actualizarCantidad.text=parseInt(actualizarCantidad.text)-1;
		//if the value < 0 the default value cahnge to '0' 
		if(actualizarCantidad.text=='-1'){
			actualizarCantidad.text='0';
		}
	}
});



$.aceptarCanje.addEventListener('click',function(){
	var lista=$.listaPremios.data;
	// Ti.API.info(''+JSON.stringify(lista));
	//access to $.listaPremios.data object on position 0 of the array
	var lonRows=lista[0].rows;
	//access to $.listaPremios.data[0].rows object array
	Ti.API.info('get data '+JSON.stringify(lonRows[0]));
	//access to $.listaPremios.data[0].rows[i].children object in the row
	var marcado=lonRows[0].children;
	Ti.API.info('children '+JSON.stringify(marcado));
	//access to $.listaPremios.data[0].rows[i].children[i] position of the switch elemento in our row
	var marcadoValue=marcado[4];
	
	Ti.API.info('marcado valure: '+JSON.stringify(marcadoValue));
	var valorval=marcadoValue.value;
	//--and cheeck the value
	Ti.API.info('value valor: '+valorval);
	
	//the same way to check the value for any other element
	var marcado2=marcado[7].text;
	Ti.API.info('valor solicitado:'+marcado2);
	
	//total var
	var totalPuntosGastar=0;
	//save our values
	var valoresEnviar=[];
	
	
	//to interact with the table view data you can do this
	//read the tableview data using the length
	for(var m=0;m<lista.length;m++){
		//use a var to isolate the data object
		var rows=lista[m].rows;
		
		//now we can read the rows and their children elements
		for(var r=0;r<rows.length;r++){
			//get the custom properties for each row
			//obtener el valor de los rows
			Ti.API.info('idPremio '+rows[r].idPremio);
			Ti.API.info('costoPuntos '+rows[r].valorPuntos);
			Ti.API.info('existencias '+rows[r].existencias);
			
			//get the value for the children elements
			//obtener el valor de los elementos hijos de cada row
			//obtener el valor del checkbox
			Ti.API.info('hijo elegido'+rows[r].children[4].value);
			//obtener el valor de la etiqueta de cantidad solicitada
			Ti.API.info('cantidad Solicitada: '+rows[r].children[7].text);
			Ti.API.info('--------------------end Producto-----------------');
			
			//update our "totalPuntosGastar" value only using the switch-checkbox on true
			//if(rows[r].children[4].value==true){
				//totalPuntosGastar=totalPuntosGastar+parseInt(rows[r].valorPuntos);
			//}
			
			//update our "totalPuntosGastar" value using the "cantidadP" value of each row 
			if(rows[r].children[7].text!="0"){
				//update our "totalPuntosGastar" variable
				totalPuntosGastar=totalPuntosGastar+(parseInt(rows[r].valorPuntos)*parseInt(rows[r].children[7].text));
				valoresEnviar.push({"id":rows[r].idPremio,"cantidadSolicitada":rows[r].children[7].text});
			}
			
		}
	}
	
	//our total value
	Ti.API.info('total de puntos a usar:'+totalPuntosGastar);
	Ti.API.info(''+JSON.stringify(valoresEnviar));
	
	$.total.text='Total: '+totalPuntosGastar;
});

